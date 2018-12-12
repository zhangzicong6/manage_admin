var UserconfModel = require('../model/Userconf');
var OpenidTagModel = require('../model/OpenidTag');
var SubOpenidTagModel = require('../model/SubOpenidTag');
var wechat_util = require('../util/get_weichat_client.js')

async function getTags(tagId, openId) {
    let client = await wechat_util.getClient(code)
    client.getTagUsers(tagId, openId, function (err, res) {
        OpenidTagModel.insertMany(res.data.openid, function (err, docs) {

        })
    })
}

function compare(id, code) {
    UserconfModel.fetch_openid(id, code, function (err, data) {
        OpenidTagModel.find({code: code, $in: {openid: data}}, ['openid']).exec(function (error, tag_ois) {
            var subArr = subSet(data, tag_ois)
            var openids = [];
            for (var index in subArr) {
                openids.push({'openid': subArr[index], 'code': code});
            }
            SubOpenidTagModel.insertMany(openids, function (err, docs) {

            })
        })
    })
}

var subSet = function (arr1, arr2) {
    var set1 = new Set(arr1);
    var set2 = new Set(arr2);

    var subset = [];

    for (let item of set1) {
        if (!set2.has(item)) {
            subset.push(item);
        }
    }

    return subset;
};