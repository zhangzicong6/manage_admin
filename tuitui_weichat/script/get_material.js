var MaterialModel = require('../model/Material');
var async = require('async');
var weichat_util = require('../util/get_weichat_client.js')

async function getMaterials(code) {
    var api = await weichat_util.getClient(code);
    const types = ['image', 'video', 'voice', 'news']
    await api.getMaterialCount(async (err, result, res) => {
        for( key in result) {
            let num = Math.ceil(result[key]/20)
            for(let i = 0; i < num; i ++) {
                await getMaterial(api, key, i)
            }
        }
    })
}

async function getMaterial(client, type, offset) {
    await client.getMaterials(type, offset, 20, async (err, result, res) => {
        let data = result.item
        for(let j = 0; j < data.length; j ++) {
            data[j].type = type.split('_')[0]
        }
        let docs = await MaterialModel.insertMany(data)
        if(docs) {
            return docs
        } else {
            console.logg('获取素材出错')
        }
    });
}

module.exports = getMaterials;
