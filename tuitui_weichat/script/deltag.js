var wechat_util = require('../util/get_weichat_client.js')
var UserTagModel = require('../model/UserTag')

async function delTag(code) {
    let client = await wechat_util.getClient(code)
    // let tag = await UserTagModel.find(code)
    let tag = ["100","101","102"]
    for(let i of tag){
        client.deleteTag(i, function (error, res) {
            console.log(res)
        })
    }
}

for (let i = 54; i <= 62; i++) {
    delTag(i)
}

