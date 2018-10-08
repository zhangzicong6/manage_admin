var express = require('express');
var router = express.Router();
var MenuModel = require('../model/Menu');
var WechatUtil = require('../util/wechat_get.js');

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
        let res = await createMenu(req.body.code)
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

async function createMenu(code) {
    var api = WechatUtil.getClient(code);
    var menu = await MenuModel.find({code:code})
    menu = menu[0]
    console.log(menu);
    if(!menu){
        return
    }
    if(menu.button.length==0){
        api.removeMenu(function(err,res){
            console.log(res);
            api.getMenu(function(err,res_m){
                console.log(JSON.stringify(res_m));
            });
        });
        return
    }
    api.removeMenu(function(err,res){
        if(err){
            console.log('--------removeMenu-----err-----')
            console.log(err)
            console.log(res)
        }
        api.createMenu(menu, function(err,res){
            if(err){
                console.log('--------createMenu-----err-----')
                console.log(err)
                console.log(res)
            }
            api.getMenu(function(err,res_m){
                console.log(err)
                console.log(JSON.stringify(res_m));
            });
        });
    });
}

module.exports = router;
