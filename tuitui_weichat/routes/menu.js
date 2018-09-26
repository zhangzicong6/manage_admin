var express = require('express');
var router = express.Router();
var MenuModel = require('../model/Menu');

router.get('/', async(req, res, next) => {
    let doc = await MenuModel.find()
    res.send({data: doc})
})

router.post('/create', async(req, res, next) => {
    let data = {
        code:req.body.code,
        values:req.body.values
    }
    let doc = await MenuModel.create(data)
    if(doc){
        res.send({success: '创建成功', data: doc})
    }else{
        res.send({err: '创建失败'})
    }
})

router.post('/update', async(req, res, next) => {
    let id=req.body.id
    let data = {
        code:req.body.code,
        values:req.body.values
    }
    let doc = await MenuModel.findByIdAndUpdate(id,data,{new:true})
    if(doc){
        res.send({success: '修改成功', data: doc})
    }else{
        res.send({err: '修改失败'})
    }
})

router.get('/del', async(req, res, next) => {
    let id=req.query.id
    var doc = await MenuModel.findByIdAndRemove(id)
    res.send({success: '删除成功', data: doc})
})

module.exports = router;
