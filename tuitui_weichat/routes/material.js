var express = require('express');
var router = express.Router();
var UserTagModel = require('../model/UserTag');
var MaterialModel = require('../model/Material');
var getMaterials = require('../script/get_material');
var sendTag = require('../script/send_tag_message');


router.get('/', async(req, res, next) => {
    await MaterialModel.remove({})
    let docs = getMaterials.get_aterials(req.query.code)
    res.send({success: '同步成功', data: docs})
})

router.get('/show', async (req, res, next) => {
    let docs = await MaterialModel.find({code: req.query.code,type:'news'}).sort({'update_time':-1})
    res.send({success: '成功', data: docs})
})

router.get('/tag', async (req, res, next) => {
    let doc = await UserTagModel.find()
    res.send({data: doc})
})

router.get('/sendMsg', async (req, res, next) => {
    var id = req.query.id;
    var tagId = req.query.tagId;
    var mediaId = req.query.mediaId;
    sendTag.get_message(id, tagId, mediaId);
    res.send({success: '发送成功'})
})

module.exports = router;
