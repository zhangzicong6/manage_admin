var ConfigModel = require('../model/Config');
var wechat_util = require('../util/get_weichat_client.js')

async function test(code) {
    let client = await wechat_util.getClient(code)
    client.clearQuota('wx44e6274ee3d462a0',function (err,data) {
        console.log(err,'-------------------err')
        console.log(data,'-------------------data')
    })
}
test(112)
