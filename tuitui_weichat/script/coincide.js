var UserconfModel = require('../model/Userconf');

UserconfModel.remove({},function (err) {
	console.log(err)
})