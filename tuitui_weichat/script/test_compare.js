var UserconfModel = require('../model/Userconf');
var OpenidTagModel = require('../model/OpenidTag');
var SubOpenidTagModel = require('../model/SubOpenidTag');

function compare(id,code) {
	Userconf.fetch_openid(id,code,function(err,data){
		OpenidTagModel.find({code:code,$in:{openid:data}},['openid']).exec(function(error,tag_ois){
			var subArr = subSet(data,tag_ois)
			var openids = [];
            for (var index in subArr) {
                openids.push({'openid': subArr[index], 'code': code});
            }
            SubOpenidTagModel.insertMany(openids,function(err,docs){
            	
            })
		})
	})
}

var subSet = function(arr1, arr2) {
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