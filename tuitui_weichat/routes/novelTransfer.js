var express = require('express');
var router = express.Router();
var NovelTransferModel = require('../model/NovelTransfer');
var mem = require('../util/mem.js')

router.post('/', async(req, res, next) => {
  const docs = await NovelTransferModel.findOne({url: req.body.url });
  if(docs) {
    res.send({data: 'http://erji.nyzda.top/novel_transfer/' + docs._id})
  } else {
    const message = await NovelTransferModel.create({ url: req.body.url });
    res.send({data: 'http://erji.nyzda.top/novel_transfer/' + message._id})
  }
})

router.get('/', async(req, res, next) => {
  const docs = await NovelTransferModel.find();
  res.send({data: docs})
})

router.get('/find_one', async(req, res, next) => {
  const docs = await NovelTransferModel.find({$or:[{ url: req.query.searchUrl },{ replaceUrl: req.query.searchUrl }]});
  if(docs) {
    res.send({success: '查询成功', data: docs})
  } else {
    res.send({error: '查询条件有误，请重新输入'})
  }
})

// 修改replaceUrl
router.post('/update', async(req, res, next) => {
  let id = req.body._id, message = { replaceUrl: req.body.replaceUrl };
  const docs = await NovelTransferModel.findByIdAndUpdate(id, message)
  console.log('id', id)
  console.log('message', message)
  console.log('docs', docs)
  res.send({success: '修改成功', data: docs})
  mem.set('novel_transfer_' + id, {}, 1 * 60).then(function () {
    //console.log('---------set transfer value---------')
  })
})

module.exports = router;