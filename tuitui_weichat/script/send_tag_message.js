var wechat_util = require('../util/get_weichat_client');
var MaterialModel = require('../model/Material');
var UserTagModel = require('../model/UserTag');
var flags = {};

function get_message(id, tagId, mediaId) {
    if (!flags[id]) {
        flags[id] = true;
        MaterialModel.findById(id).exec(function (err, message) {
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
    var type = message.type
    var opts = {}
    opts[type] = {
        "media_id": message.media_id
    }
    opts.msgtype = type
    client.massSend(opts, tagId, function (err, res) {
        console.log('------------err--------');
        console.log(err);
        console.log('------------res--------');
        console.log(res);
        flags[id] = false;
        return null
    })
}


module.exports.get_message = get_message
