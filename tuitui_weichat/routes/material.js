var express = require('express');
var router = express.Router();
var UserTagModel = require('../model/UserTag');
var MaterialModel = require('../model/Material');
var MsgHistoryModel = require('../model/MsgHistory');
var getMaterials = require('../script/get_material');
var sendTag = require('../script/send_tag_message');

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
  }).limit(10)
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

router.get('/sendMsg', async (req, res, next) => {
  var id = req.query.id;
  var tagId = req.query.tagId;
  var mediaId = req.query.mediaId;
  // let docs = await sendTag.get_message(id, tagId, mediaId);
  // if(!docs){
  //   return res.send({
  //      error: '正在发送消息'
  //   })
  // }
  let result = await MaterialModel.findByIdAndUpdate(id, {
    // msg_id: docs.msg_id,
    tagId: tagId
  }, {new: true}, async (err, docs) => {
    if(err) {
      console.log("err", err)
      return
    }
    let message = await MsgHistoryModel.create(result)
    res.send({
      success: '发送成功', result: result, docs: docs, message: message
    })
  })
  // if(!result) {
  //   res.send({error: "发送失败"})
  // } else {
  //   result.tagId = tagId
  //   console.log(result)
  //   console.log("----------------------------result--------------------------------")
    
  //   console.log(message)
  //   console.log("----------------------------message--------------------------------")
    
  // }
})

module.exports = router;