var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var crypto = require('crypto');
var taobao_apiClient = require('../util/taobaoke/index.js').ApiClient;
// var weichat_conf = require('../conf/weichat.json');
var ConfigModel = require('../model/Config');
var MenuModel = require('../model/Menu');
var ReplyModel = require('../model/Reply');
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
        if (config) {
            config = config[0]
            await mem.set("configure_" + request.params.code, config, 30 * 24 * 3600)
        } else {
            return res.replay('')
        }
    }
    var reply = await mem.get("replyText_" + request.params.code);
    if (!reply) {
        reply = await ReplyModel.find({code: request.params.code})
        if (reply) {
            await mem.set("replyText_" + request.params.code, reply, 30 * 24 * 3600)
        } else {
            return res.replay('')
        }
    }
    if (!request.query.openid) {
        validate(request, response);
    } else {
        wechat(config, async function (req, res, next) {
            var message = req.weixin;
            var openid = message.FromUserName;
            getUserInfo(openid, config, message, request, req, res, async function (openid, config, message, request, req, res) {
                if (message.MsgType === 'text') {
                    var text = message.Content.trim();
                    if (reply.length > 0) {
                        for(let i of reply){
                            if(i.text == text){
                                if (i.type == 0) {
                                    return res.reply(i.text)
                                } else if (i.type == 1) {
                                    return res.reply({
                                        type: "image",
                                        content: {
                                            mediaId: i.text
                                        }
                                    });
                                } else if (i.type == 2) {
                                    var client = wechat_util.getClient(request.params.code);
                                    client.sendNews(openid, i.contents, function (err, res) {
                                        setTimeout(function () {
                                            return res.reply('')
                                        }, 50)
                                    });
                                }else{
                                    return res.reply('')
                                }
                            }
                        }
                        return res.reply('')
                    } else {
                        return res.reply('')
                    }
                } else if (message.MsgType === 'event') {
                    if (message.Event === 'subscribe') {
                        subscribe(openid, config, message, res, reply.text);
                    } else if (message.Event === 'SCAN') {
                        scan(openid, message, res)
                    } else if (message.Event.toLowerCase() == 'click') {
                        if (reply.length > 0) {
                            for(let i of reply){
                                if(i.key == message.EventKey){
                                    if (i.type == 0) {
                                        return res.reply(i.text)
                                    } else if (i.type == 1) {
                                        return res.reply({
                                            type: "image",
                                            content: {
                                                mediaId: i.text
                                            }
                                        });
                                    } else if (i.type == 2) {
                                        var client = wechat_util.getClient(request.params.code);
                                        client.sendNews(openid, i.contents, function (err, res) {
                                            setTimeout(function () {
                                                return res.reply('')
                                            }, 50)
                                        });
                                    }else{
                                        return res.reply('')
                                    }
                                }
                            }
                            return res.reply('')
                        } else {
                            return res.reply('')
                        }
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

async function subscribe(openid, config, message, res, reply) {
    console.log('--------subscribe------- ', config);
    if (message.EventKey.indexOf("replay") != -1) {
        var id = JSON.parse(message.EventKey.split('_')[1]).replay;
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
        res.reply(reply)
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

module.exports = router;

