var ConfigModel = require('../model/Config');
var UserTagModel = require('../model/UserTag')
var wechat_util = require('../util/get_weichat_client.js')


async function a() {
    // await ConfigModel.update({code: 199}, {status: -2})

    let client = await wechat_util.getClient(code)
    client.getTags(function (err,data) {
        console.log(data,'-----------------data')
    })
    // client.createTag("明星说女", async function (err, data) {
    //     await UserTagModel.create({id: data.tag.id, name: "女", code: code})
    //     get_tag(null, code, data.tag.id, '2', function () {
    //         callback(null)
    //     })
    // })
}
a()