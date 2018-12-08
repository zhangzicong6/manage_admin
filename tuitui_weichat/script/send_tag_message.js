var wechat_util = require('../util/get_weichat_client');
var MessageModel = require('../model/Message');
var UserTagModel = require('../model/UserTag');
var flags = {};

function get_message(id, tagId, mediaId) {
    if (!flags[id]) {
        flags[id] = true;
        MessageModel.findById(id).exec(function (err, message) {
            if (message) {
                send_users(id, message, tagId, mediaId);
            } else {
                flags[id] = false;
                console.log('============= 未找到信息 ==========')
            }
        });
    } else {
        console.log('============= 当前信息正在执行中 ==========')
    }
}

async function send_users(id, message, tagId, mediaId) {
    let tag = await UserTagModel.findOne({id: tagId})
    let code = tag.code
    var client = await wechat_util.getClient(code);
    if (message.type == 0) {
        client.massSendNews(mediaId, tagId, function (err, res) {
            flags[id] = false;
            return null
        })
    } else if (message.type == 1) {
        client.massSendText(message.contents[0].description, tagId, function (err, res) {
            flags[id] = false;
            return null
        })
    } else {
        return null
    }
}


module.exports.get_message = get_message
