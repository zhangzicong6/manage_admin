var express = require('express');
var router = express.Router();
var NovelTransferModel = require('../model/NovelTransfer');

router.post('/', async(req, res, next) => {
  await const docs = NovelTransferModel.findOne({url: req.body.url });
  if(docs) {
    res.send({data: 'http://erji.nyzda.top/novel_transfer/' + docs._id})
  } else {
    await const message = NovelTransferModel.create({ url: req.body.url });
    res.send({data: 'http://erji.nyzda.top/novel_transfer/' + message._id})
  }
})

router.get('/', async(req, res, next) => {
  await const docs = NovelTransferModel.find();
  res.send({data: docs})
})

router.get('/find_one', async(req, res, next) => {
  await const docs = NovelTransferModel.find({$or:[{ url: req.query.searchUrl },{ replaceUrl: req.query.searchUrl }]});
  if(docs) {
    res.send({success: '查询成功', data: docs})
  } else {
    res.send({error: '查询条件有误，请重新输入'})
  }
})

// 修改replaceUrl
router.post('/update', async(req, res, next) => {
  let id = req.body._id, message = { replaceUrl: req.body.replaceUrl };
  await const docs = NovelTransferModel.findByIdAndUpdate(id, message)
  res.send({success: '修改成功', data: docs})
})

module.exports = router;