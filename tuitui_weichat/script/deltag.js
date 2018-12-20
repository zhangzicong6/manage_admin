var wechat_util = require('../util/get_weichat_client.js')
var UserTagModel = require('../model/UserTag')

async function delTag(code) {
    let client = await wechat_util.getClient(code)
    // let tag = await UserTagModel.find(code)
    client.getTags(function (err,res) {
        console.log(res,'------------------res')
        for(let i of res.tags){
            client.deleteTag(i.id, function (error, res) {
                console.log(res)
            })
        }
    })
}

for (let i = 54; i <= 63; i++) {
    delTag(i)
}

