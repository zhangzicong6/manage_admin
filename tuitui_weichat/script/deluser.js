var UserconfModel = require('../model/Userconf');

async function get_codes() {
	let res = await UserconfModel.aggregate([
	   {
	     $group: {
	        _id : "$code"
	     }
	   }
	])
	console.log(res)
}

get_codes()