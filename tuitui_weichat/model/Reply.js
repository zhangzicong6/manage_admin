var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);

var ReplySchema = new Schema({
    code:Number,
    type:Number, //0文本1点击2关注
    text:String,
    key:String,
    msgId:String
});

var ReplyModel = db.model('Reply', ReplySchema);
module.exports = ReplyModel;

