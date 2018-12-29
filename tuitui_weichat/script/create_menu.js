var wechat_util = require('../util/get_weichat_client.js')

var menu_obj={
  	"button":[
  		{
	  		"type":"view",
	        "name":"💌 都市",
	        "url":"https://c66481.818tu.com/referrals/index/4186741"
  		},
  		{
	  		"type":"view",
	        "name":"💋 言情",
	        "url":"https://c66481.818tu.com/referrals/index/4186749"
  		},
  		{
	  		"type":"view",
	        "name":"🔥小说",
	        "url":"https://c66481.818tu.com/referrals/index/4186754"
  		}
  	]
  }

for (var i = 68; i < 89; i++) {
	setTimeout(create_menu,(i-68)*1000,i)

}

//create_menu(88)

async function create_menu(code) {
	console.log(code)
	var client = await wechat_util.getClient(code)
	//console.log(client)
	client.removeMenu(function(err,res){
		if(err){
			console.log('--------removeMenu-----err-----'+code+'-------')
			console.log(err)
			console.log(res)
		}
		client.createMenu(menu_obj, function(err,res){
			if(err){
				console.log('--------createMenu-----err-----'+code+'-------')
				console.log(err)
				console.log(res)
			}
			client.getMenu(function(err,res_m){
				console.log('--------createMenu-----success-----'+code+'-------')
				console.log(err)
				console.log(JSON.stringify(res_m));
			});
		});
	});
}

async function remove_menu(code) {
	console.log(code)
	var client = await wechat_util.getClient(code)
	//console.log(client)
	client.removeMenu(function(err,res){
		console.log('--------removeMenu--------'+code+'-------')
		console.log(err)
		console.log(res)
		
	});
}
