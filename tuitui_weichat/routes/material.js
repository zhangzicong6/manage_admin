var express = require('express');
var router = express.Router();
var UserTagModel = require('../model/UserTag');
var MaterialModel = require('../model/Material');
var getMaterials = require('../script/get_material');
var sendTag = require('../script/send_tag_message');
var weichat_util = require('../util/get_weichat_client.js')


router.get('/', async (req, res, next) => {
  let docs = getMaterials.get_aterials(req.query.code)
  if (docs) {
    res.send({
      success: '同步成功',
      data: docs
    })
  }
})

router.get('/show', async (req, res, next) => {
  let docs = await MaterialModel.find({
    code: req.query.code,
    type: 'news'
  }).sort({
    'update_time': -1
  })
  res.send({
    success: '成功',
    data: docs
  })
})

router.get('/tag', async (req, res, next) => {
  let doc = await UserTagModel.find({
    code: req.query.code
  })
  res.send({
    data: doc
  })
})

router.get('/clear', async (req, res, next) => {
  let docs = await MaterialModel.remove({code: req.query.code})
  if(docs) {
    res.send({success: '已删除全部素材，如有需要请重新同步素材'})
  }
})

router.get('/clear', async (req, res, next) => {
  let doc = await UserTagModel.find({
    code: req.query.code
  })
  res.send({
    data: doc
  })
})

router.get('/sendMsg', async (req, res, next) => {
  var id = req.query.id;
  var tagId = req.query.tagId;
  var mediaId = req.query.mediaId;
  let docs = sendTag.get_message(id, tagId, mediaId);
  await MaterialModel.findOneAndUpdate({
    media_id: data[j].media_id
  }, {
    msg_id: docs.msg_id
  })
  res.send({
    success: '发送成功'
  })
})

module.exports = router;