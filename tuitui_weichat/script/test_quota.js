var ConfigModel = require('../model/Config');
var wechat_util = require('../util/get_weichat_client.js')

async function test(appid, code) {
    let client = await wechat_util.getClient(code)
    client.clearQuota(appid, function (err, data) {
        console.log('clearQuota end')
    })
}
test('wxc91ed548a6a8afd6', 149)
