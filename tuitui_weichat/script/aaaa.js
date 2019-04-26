var ConfigModel = require('../model/Config');
var UserTagModel = require('../model/UserTag')
var wechat_util = require('../util/get_weichat_client.js')

async function a() {
    let code = process.argv.slice(2)[0]
    let client = await wechat_util.getClient(code)

    // await ConfigModel.update({code: code}, {status: -1})
    //
    // await UserTagModel.remove({code:code})
    // await UserTagModel.create({id: 106, name: "未知", code: code})
    // await UserTagModel.create({id: 107, name: "男", code: code})
    // await UserTagModel.create({id: 108, name: "女", code: code})
    client.deleteTag(100, function (error, res) {
        console.log(res)
    })

    // client.getTags(function (err,data) {
    //     console.log(data,'-----------------aaa')
    // })
    // client.createTag("明星说女", async function (err, data) {
    //     console.log(data, '-----------------data')
    //     await UserTagModel.create({id: data.tag.id, name: "女", code: code})
    //     client.getTags(function (err, data1) {
    //         console.log(data1, '-----------------data1')
    //     })
    // })
}
a()