var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var crypto = require('crypto');
var ConfigModel = require('../model/Config');
var ReplyModel = require('../model/Reply');
var MsgModel = require('../model/Msg');
var wechat_util = require('../util/get_weichat_client.js')
var book_wechat_conf = require('../conf/book_wechat.json');
var taobao_conf = require('../conf/taobao.json');
var TaobaoUtil = require('../util/taobaoke_util.js');
var async = require('async');
var WechatUtil = require('../util/wechat_get.js');
var ImageUtil = require('../util/image_util.js');
var mem = require('../util/mem.js');

var TokenModel = require('../model/Token.js');
var UserModel = require('../model/User.js');
var UserOrderModel = require('../model/UserOrder.js');
var AddFreeOrderModel = require('../model/AddFreeOrder.js');
var BookModel = require('../model/Book.js');
var UserBookAuthorityModel = require('../model/UserBookAuthority.js');
var UserActionMiaoShaModel = require('../model/UserActionMiaoSha.js');
var UserWaitMessageModel = require('../model/UserWaitMessage.js');
var QRcodeModel = require('../model/QRcode.js');

// var MessageServer = require('../message_server.js');

var purchase = require('./zero_purchase');
var weichat_apis = {};

var request = require('request');
var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

var send_codes = require('../conf/proj.json').send_wechat;
var getClient = require('../util/get_weichat_client');


router.use('/:code', async function (request, response, next_fun) {
    var config = await mem.get("configure_" + request.params.code);
    if (!config) {
        config = await ConfigModel.find({code: request.params.code})
        config = config[0]
        if (config) {
            await mem.set("configure_" + request.params.code, config, 30 * 24 * 3600)
        }
    }
    if (!request.query.openid) {
        validate(request, response);
    } else {
        wechat(config, function (req, res, next) {
            var message = req.weixin;
            var openid = message.FromUserName;
            getUserInfo(openid, config, message, request, req, res, function (openid, config, message, request, req, res) {
                console.log(message.MsgType, '--------MsgType---------')
                if (message.MsgType === 'text') {
                    var text = message.Content.trim();
                    reply(request.params.code, res, 0, text, openid)
                } else if (message.MsgType === 'event') {
                    console.log(message.Event, '--------Event---------')
                    if (message.Event === 'subscribe') {
                        var client = wechat_util.getClient(request.params.code);
                        reply(request.params.code, res, 2, '', openid)
                        subscribe(openid, config, message, res, client);
                    } else if (message.Event === 'SCAN') {
                        scan(openid, message, res)
                    } else if (message.Event.toLowerCase() == 'click') {
                        reply(request.params.code, res, 1, message.EventKey, openid)
                    } else {
                        res.reply('');
                    }
                } else {
                    res.reply('');
                }
            });
        })(request, response, next_fun);
    }
});

async function scan(openid, message, res) {
    if (message.EventKey.indexOf("replay") != -1) {
        console.log('---------message.EventKey---------')
        console.log(message.EventKey)
        var id = JSON.parse(message.EventKey).replay;
        QRcodeModel.findById(id, function (err, doc) {
            if (doc) {
                UserModel.findOneAndUpdate({"openid": openid}, {$addToSet: {tagIds: doc.tagId}}, function (data) {
                })
                return res.reply(doc.content)
            } else {
                return res.reply('')
            }
        })
    } else {
        return res.reply('')
    }
}

async function subscribe(openid, config, message, res, client) {
    console.log('--------subscribe------- ', config);
    if (message.EventKey.indexOf("replay") != -1) {
        var id = JSON.parse(message.EventKey.split('_')[1]).replay;
        QRcodeModel.findById(id, function (err, doc) {
            if (doc) {
                UserModel.findOneAndUpdate({"openid": openid}, {$addToSet: {tagIds: doc.tagId}}, function (data) {
                })
                client.sendText(openid, doc.content, function (error, res) {
                    console.log(error);
                    setTimeout(function () {
                        return;
                    }, 50)
                })
            } else {
                return;
            }
        })
    } else {
        return;
    }
}

async function validate(req, res) {
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var config = await mem.get("configure_" + req.params.code);
    if (!config) {
        config = await ConfigModel.find({code: req.params.code})
        config = config[0]
        console.log(config, '--------------------------config')
        await mem.set("configure_" + req.params.code, config, 30 * 24 * 3600)
    }
    var token = config.token;
    // var token = weichat_conf[req.params.code].token;

    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "");

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");

    console.log(echostr);
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
        res.send(echostr);
    } else {
        res.send("error");
    }
}

function getUserInfo(openid, config, message, request, w_req, w_res, next) {
    //var client = new WechatAPI(config.appid, config.appsecret);
    async.waterfall([
        function (callback) {
            UserModel.findOneAndUpdate({
                openid: openid,
                code: config.code
            }, {action_time: Date.now()}, function (err, user) {
                callback(null, user);
            });
        },
        function (user, callback) {
            if (!user) {
                user = new UserModel();
                user.nickname = '';
                user.openid = openid;
                user.code = config.code;
                user.current_balance = 0;
                user.action_time = Date.now();
                user.save(function () {
                    callback(null, user);
                })
            } else {
                callback(null, user)
            }

        }
    ], function (err, user) {
        if (err) {
            //console.log(err);
        }
        if (message.MsgType === 'event') {
            if (message.Event === 'subscribe') {
                user.subscribe_time = Date.now();
                user.subscribe_flag = true;
                user.save(function () {
                })
            } else if (message.Event === 'unsubscribe') {
                user.unsubscribe_time = Date.now();
                user.subscribe_flag = false;
                user.save(function () {
                })
            }
        }
        next(openid, config, message, request, w_req, w_res);
    });
}

async function reply(code, res, type, param, openid) {
    // var reply = await mem.get("reply_" + code + "_" + param);
    var reply = ''
    console.log(reply, '--------reply---------1')
    if (!reply) {
        console.log(code,type,param,reply, '--------reply---------a')
        if (type == 0) {
            reply = await ReplyModel.find({code: code, type: type, text: param})
        } else if (type == 1) {
            reply = await ReplyModel.find({code: code, type: type, key: param})
        } else if (type == 2) {
            reply = await ReplyModel.find({code: code, type: type})
        }
        console.log(reply, '--------reply---------2')
        if (reply[0] && reply[0].replyType == 0) {
            reply = {type: 0, msg: reply[0].msgId}
        } else if (reply[0] && reply[0].replyType == 1) {
            reply = {type: 1, msg: reply[0].media}
        } else {
            return res.reply('')
        }
        await mem.set("reply_" + code + "_" + param, reply, 30 * 24 * 3600)
    }

    console.log(reply, '--------reply---------')
    if (reply.type == 1) {
        return res.reply(reply.msg)
    } else {
        var content = await mem.get("msg_" + reply.msg);
        if (!content) {
            content = await MsgModel.find({msgId: reply.msg})
            if (content) {
                content = content[0]
                console.log(reply.msg,content,'------------------------cm')
                await mem.set("msg_" + reply.msg, content, 30 * 24 * 3600);
                console.log(content, '--------content1---------')
                replyMsg(res, content)
            } else {
                return res.replay('')
            }
        } else {
            console.log(content, '--------content2---------')
            replyMsg(res, content)
        }
    }
}

async function replyMsg(res, content) {
    console.log(content, '--------content3---------')
    if (content.type == 0) {
        return res.reply(content.description)
    } else if (content.type == 2) {
        var client = await wechat_util.getClient(code);
        client.sendNews(openid, content.contents, function (err, data) {
            setTimeout(function () {
                return res.reply('')
            }, 50)
        });
        return res.reply('')
    } else {
        return res.reply('')
    }
}
module.exports = router;

