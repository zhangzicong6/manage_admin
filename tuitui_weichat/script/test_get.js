var OpenidTagModel = require('../model/OpenidTag');
var wechat_util = require('../util/get_weichat_client.js')
var UserTagModel = require('../model/UserTag')

async function getTags(tagId, code, openId) {
    let client = await wechat_util.getClient(code)
    client.getTagUsers(tagId, openId, function (err, res) {
        console.log(res,'------------------res')
        // let openids = []
        // for (let openid of res.data.openid) {
        //     openids.push({'openid': openid, 'code': code, tagid: tagId});
        // }
        // OpenidTagModel.insertMany(openids, function (err, docs) {
            // if (res.next_openid) {
            //     getTags(tagId, code, res.next_openid)
            // }
        // })
    })
}

function updateTag(code) {
    UserTagModel.find({code: code}, function (err, data) {
        for (let i of data) {
            getTags(i.id, code, null)
        }
    })
}
updateTag(26)