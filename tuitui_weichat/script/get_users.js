var UserconfModel = require('../model/Userconf');
var ConfigModel = require('../model/Config');
var OpenidModel = require('../model/Openid');
var wechat_util = require('../util/get_weichat_client.js')
var mem = require('../util/mem.js');
var async = require('async');
var UserTagModel = require('../model/UserTag')

function getUserByCode(code) {
    UserconfModel.remove({code: code}, async function (err, doc) {
        get_users(code, null, function () {
            get_user(null, code, async function () {
                await OpenidModel.remove({code: code})
                await mem.set("jieguan_" + code, 1, 30 * 24 * 3600)
                await ConfigModel.update({code: code}, {status: 1})
                tag(code)
                console.log('jieguan end')
            });
        })
    });
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

async function get_user(_id, code, back) {
    if (code) {
        update_user(_id, code, get_user, back);
    } else {
        console.log('update_user end');
        back(null);
    }
}

function update_user(_id, code, next, back) {
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
                        callback(null)
                    }, function (error) {
                        if (error) {
                            console.log(error, '--------------error')
                        }
                        UserconfModel.insertMany(userArr, async function (error, docs) {
                            if (error) {
                                console.log('------insertMany error--------');
                                console.log(error);
                                console.log('------------------------------');
                            }
                            if (users.length == 50) {
                                next(users[49]._id, code, back);
                            } else {
                                next(null, null, back)
                            }
                        })
                    })
                }
            })
        }
    })
}

async function tag(code) {
    let client = await wechat_util.getClient(code)
    client.createTag("男", async function (err, data) {
        await UserTagModel.create({id: data.tag.id, name: "男", code: code})
        let arr1 = []
        UserconfModel.find({sex: "1"}, function (err, data) {
            for (d of data) {
                arr1.push(d.openid)
            }
            client.membersBatchtagging(data.tag.id, arr1, function (error, res) {
                console.log(res)
            })
        })
    })
    client.createTag("女", async function (err, data) {
        await UserTagModel.create({id: data.tag.id, name: "女", code: code})
        let arr2 = []
        UserconfModel.find({sex: "2"}, function (err, data) {
            for (d of data) {
                arr2.push(d.openid)
            }
            client.membersBatchtagging(data.tag.id, arr2, function (error, res) {
                console.log(res)
            })
        })
    })
    client.createTag("未知", async function (err, data) {
        await UserTagModel.create({id: data.tag.id, name: "未知", code: code})
        let arr3 = []
        UserconfModel.find({sex: "0"}, function (err, data) {
            for (d of data) {
                arr3.push(d.openid)
            }
            client.membersBatchtagging(data.tag.id, arr3, function (error, res) {
                console.log(res)
            })
        })
    })
}

module.exports.getUserByCode = getUserByCode
