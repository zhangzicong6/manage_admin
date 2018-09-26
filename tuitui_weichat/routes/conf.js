var express = require('express');
var router = express.Router();
var ConfigModel = require('../model/Config');
var mem = require('../util/mem.js');

router.get('/', async(req, res, next) => {
    let doc = await ConfigModel.find()
    res.send({data: doc})
})

router.post('/create', async(req, res, next) => {
    let data = {
        name: req.body.name,
        appid: req.body.appid,
        appsecret: req.body.appsecret,
        token: req.body.token,
    }
    let doc = await ConfigModel.create(data)
    if (doc) {
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

router.post('/update', async(req, res, next) => {
    let id = req.body.id
    let code = req.body.code
    let data = {
        name: req.body.name,
        appid: req.body.appid,
        appsecret: req.body.appsecret,
        token: req.body.token,
    }
    let doc = await ConfigModel.findByIdAndUpdate(id, data,{new:true})
    if (doc) {
        await mem.set("configure_" + code, doc,30*24*3600)
        res.send({success: '修改成功', data: doc})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/del', async(req, res, next) => {
    let id = req.query.id
    var doc = await ConfigModel.findByIdAndRemove(id)
    res.send({success: '删除成功', data: doc})
})

router.get('/reset', async(req, res, next) => {
    var config = new ConfigModel()
    config.nextCount(function (err, count) {
        config.resetCount(function (err, nextCount) {
        });
    });
    res.send({success: '重置成功'})
})

module.exports = router;
