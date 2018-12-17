var UserconfModel = require('../model/Userconf');
var ConfigModel = require('../model/Config');
var OpenidModel = require('../model/Openid');
var wechat_util = require('../util/get_weichat_client.js')
var mem = require('../util/mem.js');
var async = require('async');
var UserTagModel = require('../model/UserTag')

async function getUserByCode(code) {
    await mem.set('access_token' + code, '', 10)
    let client = await wechat_util.getClient(code)
    async.waterfall([
        function (callback) {
            client.createTag("明星说未知", async function (err, data) {
                console.log(data, '---------------------data')
                await UserTagModel.create({id: data.tag.id, name: "未知", code: code})
                get_tag(null, code, data.tag.id, '0', function () {
                    callback(null)
                })
            })
        }, function (callback) {
            client.createTag("明星说男", async function (err, data) {
                await UserTagModel.create({id: data.tag.id, name: "男", code: code})
                get_tag(null, code, data.tag.id, '1', function () {
                    callback(null)
                })
            })
        }, function (callback) {
            client.createTag("明星说女", async function (err, data) {
                await UserTagModel.create({id: data.tag.id, name: "女", code: code})
                get_tag(null, code, data.tag.id, '2', function () {
                    callback(null)
                })
            })
        }], async function (error) {
        await OpenidModel.remove({code: code})
        await mem.set("jieguan_" + code, 1, 30 * 24 * 3600)
        await ConfigModel.update({code: code}, {status: 1})
        console.log('jieguan end')
    })
}

async function get_tag(_id, code, tagId, sex, back) {
    if (code) {
        update_tag(_id, code, tagId, sex, get_tag, back);
    } else {
        console.log('update_tag end');
        back(null);
    }
}

function update_tag(_id, code, tagId, sex, next, back) {
    UserconfModel.fetchTag(_id, code, sex, async function (error, users) {
        var user_arr = [];
        users.forEach(function (user) {
            user_arr.push(user.openid)
        })
        let client = await wechat_util.getClient(code)
        if (user_arr.length == 0) {
            console.log(user_arr, '-------------------user null')
            next(null, null, null, null, back)
        } else {
            client.membersBatchtagging(tagId, user_arr, function (error, res) {
                console.log(res)
            })
            if (users.length == 50) {
                next(users[49]._id, code, tagId, sex, back);
            } else {
                next(null, null, null, null, back)
            }
        }
    })
}

getUserByCode(28)

module.exports.getUserByCode = getUserByCode
