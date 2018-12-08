var MaterialModel = require('../model/Material');
var async = require('async');
var weichat_util = require('../util/get_weichat_client.js')

// function getMaterials(code) {
    var api = weichat_util.getClient(7);
    const types = ['image', 'video', 'voice', 'news']
    for(let i = 0; i < types.length; i ++) {
        api.getMaterials(types[i], 0, 20, res => {
            console.log(res)
        });
    }
// }

// module.exports.getUserByCode = getUserByCode
