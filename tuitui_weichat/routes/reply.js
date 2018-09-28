var express = require('express');
var router = express.Router();
var ReplyModel = require('../model/Reply');

router.get('/', async(req, res, next) => {
    let doc = await ReplyModel.find()
    res.send({data: doc})
})

router.post('/create', async(req, res, next) => {
    let data = {
        code: req.body.code,
        type: req.body.type,
        text: req.body.text,
        key: req.body.key,
        msgId: req.body.msgId
    }
    let doc = await ReplyModel.create(data)
    if (doc) {
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

router.post('/update', async(req, res, next) => {
    let id = req.body.id
    let data = {
        code: req.body.code,
        type: req.body.type,
        text: req.body.text,
        key: req.body.key,
        msgId: req.body.msgId
    }
    let doc = await ReplyModel.findByIdAndUpdate(id, data, {new: true})
    if (doc) {
        if (req.body.text) {
            await mem.set("reply_" + code + "_" + req.body.text, doc.msgId, 30 * 24 * 3600)
        } else if(req.body.key){
            await mem.set("reply_" + code + "_" + +req.body.key, doc.msgId, 30 * 24 * 3600)
        }
        res.send({success: '修改成功', data: doc})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/del', async(req, res, next) => {
    let id = req.query.id
    var doc = await ReplyModel.findByIdAndRemove(id)
    res.send({success: '删除成功', data: doc})
})

module.exports = router;
