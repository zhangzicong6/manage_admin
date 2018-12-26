var wechat_util = require('../util/get_weichat_client.js')

var menu_obj={
  	"button":[
  		{
	  		"type":"view",
	        "name":"🔞刺激",
	        "url":"http://t.cn/Eb73eOT"
  		},
  		{
	  		"type":"view",
	        "name":"💋激情",
	        "url":"http://t.cn/Eb71vVb"
  		},
  		{
	  		"type":"view",
	        "name":"🚫香艳",
	        "url":"http://t.cn/Eb7lIcD"
  		}
  	]
  }

/*for (var i = 68; i < 88; i++) {
	setTimeout(create_menu,(i-68)*1000,i)

}*/

create_menu(88)

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
