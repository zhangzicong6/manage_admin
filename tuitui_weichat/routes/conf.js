var express = require('express');
var router = express.Router();
var ConfigModel = require('../model/Config');
var mem = require('../util/mem.js');
var user = require('../script/get_users')

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
        EncodingAESKey: "tw4a1yTUv0VJURGNif96ibI4z3oWPJJWpuo2mHTvzLb"
    }
    let doc = await ConfigModel.create(data)
    if (doc) {
        await mem.set("configure_" + doc.code, doc, 30 * 24 * 3600)
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

router.post('/update', async(req, res, next) => {
    console.log('doc-conf', req.body)
    let id = req.body._id
    let data = {
        name: req.body.name,
        appid: req.body.appid,
        appsecret: req.body.appsecret,
        token: req.body.token,
        EncodingAESKey: "tw4a1yTUv0VJURGNif96ibI4z3oWPJJWpuo2mHTvzLb"
    }
    let doc = await ConfigModel.findByIdAndUpdate(id, data, {new: true})
    console.log('doc-conf', doc)
    if (doc) {
        await mem.set("configure_" + doc.code, doc, 30 * 24 * 3600)
        res.send({success: '修改成功', data: doc})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/del', async(req, res, next) => {
    let id = req.query.id
    var doc = await ConfigModel.findByIdAndRemove(id)
    if (doc) {
        await mem.set("configure_" + doc.code, '', 1)
        res.send({success: '删除成功', data: doc})
    } else {
        res.send({err: '删除失败'})
    }
})

router.get('/reset', async(req, res, next) => {
    var config = new ConfigModel()
    config.nextCount(function (err, count) {
        config.resetCount(function (err, nextCount) {
        });
    });
    res.send({success: '重置成功'})
})

router.get('/jieguan', async(req, res, next) => {
    let code = req.query.code
    console.log(code,'--------------code')
    let jieguan = await mem.get("jieguan_" + code)
    // if(!jieguan){
        await ConfigModel.findOneAndUpdate({code:code},{status:-1})
        user.getUserByCode(code)
        res.send({success: '设置接管成功'})
    // }else{
    //     res.send({success: '已接管'})
    // }
})

module.exports = router;
