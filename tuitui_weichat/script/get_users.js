var UserconfModel = require('../model/Userconf');
var ConfigModel = require('../model/Config');
var OpenidModel = require('../model/Openid');
var wechat_util = require('../util/get_weichat_client.js')
var mem = require('../util/mem.js');
var async = require('async');
var UserTagModel = require('../model/UserTag')

async function getUserByCode(code) {
    let client = await wechat_util.getClient(code)
    async.waterfall([
        function (callback) {
            UserconfModel.remove({code: code}, async function (err, doc) {
                callback(null)
            })
        }, function (callback) {
            get_users(code, null, function () {
                callback(null)
            })
        }, function (callback) {
            client.createTag("未知", async function (err, data) {
                console.log(data,'---------------------data')
                await UserTagModel.create({id: data.tag.id, name: "未知", code: code})
                let tagId0 = data.tag.id
                callback(null, tagId0)
            })
        }, function (tagId0, callback) {
            client.createTag("男", async function (err, data) {
                await UserTagModel.create({id: data.tag.id, name: "男", code: code})
                let tagId1 = data.tag.id
                callback(null, tagId0, tagId1)
            })
        }, function (tagId0, tagId1, callback) {
            client.createTag("女", async function (err, data) {
                await UserTagModel.create({id: data.tag.id, name: "女", code: code})
                let tagId2 = data.tag.id
                callback(null, tagId0, tagId1, tagId2)
            })
        }], function (error, tagId0, tagId1, tagId2) {
        get_user(null, code, tagId0, tagId1, tagId2, async function () {
            await OpenidModel.remove({code: code})
            await mem.set("jieguan_" + code, 1, 30 * 24 * 3600)
            await ConfigModel.update({code: code}, {status: 1})
            console.log('jieguan end')
        });
    })


}

async function get_users(code, openid, callback) {
    console.log('code : ' + code + ' , openid : ' + openid);
    let client = await wechat_util.getClient(code)
    if (openid) {
        client.getFollowers(openid, async function (err, result) {
            if (err) {
                console.log('-------getFollowers error-------')
                console.log(err)
            }
            // console.log(result);
            if (result && result.data && result.data.openid) {
                var openids = [];
                for (var index in result.data.openid) {
                    openids.push({'openid': result.data.openid[index], 'code': code});
                }
                OpenidModel.insertMany(openids, async function (error, docs) {
                    if (error) {
                        console.log('------insertMany error--------');
                        console.log(error);
                        console.log('------------------------------');
                    }
                    if (result.next_openid) {
                        console.log('-----------code -------' + code + '---------update--contitue------')
                        get_users(code, result.next_openid, callback);
                    } else {
                        console.log('-----------code -------' + code + '---------update--end')
                        callback(null)
                    }
                })
            } else {
                console.log('not have openid arr-----------code -------' + code + '---------update--end')
                callback(null)
            }
        });
    } else {
        client.getFollowers(async function (err, result) {
            if (err) {
                console.log('-------getFollowers error-------')
                console.log(err)
            }
            // console.log(result);
            if (result && result.data && result.data.openid) {
                var openids = [];
                for (var index in result.data.openid) {
                    openids.push({'openid': result.data.openid[index], 'code': code});
                }
                OpenidModel.insertMany(openids, async function (error, docs) {
                    if (error) {
                        console.log('------insertMany error--------');
                        console.log(error);
                        console.log('------------------------------');
                    }
                    if (result.next_openid) {
                        console.log('-----------code -------' + code + '---------update--contitue------')
                        get_users(code, result.next_openid, callback);
                    } else {
                        console.log('-----------code -------' + code + '---------update--end')
                        callback(null)
                    }
                })
            } else {
                console.log('not have openid arr -----------code -------' + code + '---------update--end')
                callback(null)
            }
        });
    }
}

async function get_user(_id, code, tagId0, tagId1, tagId2, back) {
    if (code) {
        update_user(_id, code, tagId0, tagId1, tagId2, get_user, back);
    } else {
        console.log('update_user end');
        back(null);
    }
}

function update_user(_id, code, tagId0, tagId1, tagId2, next, back) {
    OpenidModel.fetch(_id, code, async function (error, users) {
        var user_arr = [];
        users.forEach(function (user) {
            user_arr.push(user.openid)
        })
        let client = await wechat_util.getClient(parseInt(code))
        if (user_arr.length == 0) {
            console.log(user_arr, '-------------------user null')
            next(null, null, back)
        } else {
            client.batchGetUsers(user_arr, function (err, data) {
                if (err) {
                    console.log(err, '----------------userinfo err')
                    if (users.length == 50) {
                        next(users[49]._id, code, back);
                    } else {
                        next(null, null, back)
                    }
                }
                if (data && data.user_info_list) {
                    let userArr = []
                    let arr0 = []
                    let arr1 = []
                    let arr2 = []
                    async.eachLimit(data.user_info_list, 50, function (info, callback) {
                        if (info.nickname) {
                            userArr.push({
                                code: info.code,
                                openid: info.openid,
                                nickname: info.nickname,
                                headimgurl: info.headimgurl,
                                sex: info.sex,
                                sign: 1
                            })
                        }
                        if (info.sex == 1) {
                            arr1.push(info.openid)
                        } else if (info.sex == 2) {
                            arr2.push(info.openid)
                        } else {
                            arr0.push(info.openid)
                        }
                        callback(null)
                    }, function (error) {
                        if (error) {
                            console.log(error, '--------------error')
                        }
                        client.membersBatchtagging(tagId0, arr0, function (error, res) {
                            console.log(res)
                        })
                        client.membersBatchtagging(tagId1, arr1, function (error, res) {
                            console.log(res)
                        })
                        client.membersBatchtagging(tagId2, arr2, function (error, res) {
                            console.log(res)
                        })
                        UserconfModel.insertMany(userArr, async function (error, docs) {
                            if (error) {
                                console.log('------insertMany error--------');
                                console.log(error);
                                console.log('------------------------------');
                            }
                            if (users.length == 50) {
                                next(users[49]._id, code, tagId0, tagId1, tagId2, back);
                            } else {
                                next(null, null, null, null, null, back)
                            }
                        })
                    })
                }
            })
        }
    })
}

module.exports.getUserByCode = getUserByCode
