var ConfigModel = require('../model/Config');
var wechat_util = require('../util/get_weichat_client.js')

async function a() {
    let client = await wechat_util.getClient(parseInt(15))
    client.getTags(function (error, res) {
        console.log(error,res,'------------------')
    })
}
a()

