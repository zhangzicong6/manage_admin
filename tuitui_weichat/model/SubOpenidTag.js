var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);

var SubOpenidTagSchema = new Schema({
    openid: String,
    code: Number,
    sign: {type: Number, default: 0},
    sex: {type: String, default: "0"}
});


var SubOpenidTagModel = db.model('SubOpenidTag', SubOpenidTagSchema);

module.exports = SubOpenidTagModel;