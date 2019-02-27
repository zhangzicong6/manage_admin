var express = require('express');
var router = express.Router();
var MsgHistoryModel = require('../model/MsgHistory');
var weichat_util = require('../util/get_weichat_client.js')

router.get("/state", async (req, res, next) => {
  let client = await weichat_util.getClient(req.query.code)
  client.getMassMessageStatus(req.query.msg_id, function(err, res){
    if(err) {
      return
    } else {
      res.send({data: res})
    }
  })
})

router.get('/', async (req, res, next) => {
  let docs = await MsgHistoryModel.find({
    code: req.query.code,
    type: 'news'
  }).sort({
    'update_time': -1
  }).limit(10)
  let messages = [], arr= [], results = [], item = {};
  for (let i = 0; i < docs.length; i ++) {
    arr = docs[i].content.news_item
    for (let j = 0; j < arr.length; j ++) {
      messages.push({title: arr[j].title})
    }
    item = {
      update_time: docs[i].update_time,
      media_id: docs[i].media_id,
      msg_id: docs[i].msg_id,
      content: {
        news_item: messages
      },
      _id: docs[i]._id,
      timing: docs[i].timing,
      isTiming: docs[i].isTiming,
      tagId: docs[i].tagId,
      code: docs[i].code
    }
    results.push(item)
    messages = []
  }
  res.send({
    success: '成功',
    data: results
  })
})

router.get('/del_msg', async (req, res, next) => {
  var api = await weichat_util.getClient(req.query.code);
  api.deleteMass(req.query.msg_id, Number(req.query.article_idx), (err, result) => {
    console.log('result------------------------', result, 'result------------------------')
    console.log('err------------------------', err, 'err------------------------')
    res.send({success: '删除成功'})
  });
})

router.get('/clear', async (req, res, next) => {
  let docs = await MsgHistoryModel.remove({code: req.query.code})
  if(docs) {
    res.send({success: '已删除全部历史记录'})
  }
})

module.exports = router;