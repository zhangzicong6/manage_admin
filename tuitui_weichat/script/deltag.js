var wechat_util = require('../util/get_weichat_client.js')
var UserTagModel = require('../model/UserTag')

async function delTag(code) {
    let client = await wechat_util.getClient(code)
    // let tag = await UserTagModel.find(code)
    let tag = [100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120]
    for(let i of tag){
        client.deleteTag(i.id, function (error, res) {
            console.log(res)
        })
    }
}

for (let i = 54; i <= 63; i++) {
    delTag(i)
}

