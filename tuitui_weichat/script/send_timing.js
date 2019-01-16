var wechat_util = require('../util/get_weichat_client');
var MessageModel = require('../model/Message');
var UserModel = require('../model/Userconf');
var async = require('async');
var schedule = require("node-schedule");

function get_timing_message() {
    MessageModel.find({is_timing: true}, function (err, messages) {
        if (messages) {
            messages.forEach(function (message) {
                send_timing(null, message);
            })
        } else {
            console.log('============= 未找到信息 ==========')
        }
    });
}

function send_timing(user_id, message) {
    if (user_id || (message.timing_time && Date.now() - new Date(message.timing_time).getTime() >= 60 * 1000 && Date.now() - new Date(message.timing_time).getTime() < 120 * 1000)) {
        UserModel.fetch(user_id, message.sex, message.tagId, message.codes, '', '', function (err, users) {
            var l = []
            async.eachLimit(users, 10, async function (user, callback) {
                l.push(user._id)
                var client = await wechat_util.getClient(user.code);
                if (message.type == 0) {
                    client.sendNews(user.openid, message.contents, function (err, res) {
                        console.log(err);
                        setTimeout(function () {
                            callback(null)
                        }, 50)
                    });
                } else if (message.type == 1) {
                    client.sendText(user.openid, message.contents[0].description, function (error, res) {
                        console.log(error);
                        setTimeout(function () {
                            callback(null)
                        }, 50)
                    })
                }
            }, function (err) {
                if (users.length == 50) {
                    UserModel.update({_id: {$in: l}}, {$set: {send_time: Date.now()}}, {
                        multi: true,
                        upsert: true
                    }, function () {
                    })
                    send_timing(users[49]._id, message);
                } else {
                    UserModel.update({_id: {$in: l}}, {$set: {send_time: Date.now()}}, {
                        multi: true,
                        upsert: true
                    }, function () {
                    })
                }
            })
        });
    }
}

var rule = new schedule.RecurrenceRule();
var times = [1];
rule.second = times;
var j = schedule.scheduleJob(rule, function () {
    get_timing_message()
});
