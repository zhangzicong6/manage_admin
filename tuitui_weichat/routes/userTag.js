var express = require('express');
var router = express.Router();
var UserTagModel = require('../model/UserTag');
var WechatUtil = require('../util/wechat_get.js');

router.get('/', async(req, res, next) => {
    let doc = await UserTagModel.find()
    res.send({data: doc})
})

module.exports = router;
