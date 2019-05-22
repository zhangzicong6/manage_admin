var TuiGuangModel = require('../model/TuiGuang');

TuiGuangModel.findOneAndUpdate({id:"2"},{id:"2019032201"},function (err,result) {
	console.log(err)
	console.log(result)
})

