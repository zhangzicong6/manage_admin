var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var StaticsTuiGuangModel = require('../model/StaticsTuiGuang.js');
var TransferModel = require('../model/Transfer.js');
var DomainModel = require('../model/Domain.js');
var TokenArrModel = require('../model/TokenArr.js');
var BannerModel = require('../model/Banner.js');
var multer = require('multer');
var fs = require('fs')
var mem = require('../util/mem.js')
const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

//线上
var juedui_lujing = '/home/prac/tuiguang/project/public/images/tuiguang'

//线下
//var juedui_lujing ='../public/images/tuiguan'

var upload = multer({
    dest: juedui_lujing
});

router.post('/novel/upload', upload.single('imageFile'), function(req, res, next) {
    fs.rename(req.file.path, juedui_lujing+"/"+req.file.filename+'.jpg', function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({filename: req.file.filename + '.jpg'});
})

router.post('/update', async (req, res, next) => {
    let id = '5b76aa2ac3ed4a4798d7045d';
    let messages = {
        image: req.body.image,
        link: req.body.link,
        position: req.body.position
    }
    let docs = await BannerModel.findByIdAndUpdate(id, messages)
    let docs1 = await BannerModel.find()
    res.send({success: 'ok', data: docs1})
})

router.post('/novel/add', (req, res, next) => {
    TuiGuangModel.find({id: req.body.id}, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }else {
            if (data != '') {
                res.send({err: '此id已存在'})
            } else {
                var novelInfo = {
                    type: req.body.type,
                    id: req.body.id,
                    pageTitle: req.body.pageTitle,
                    articleTit: req.body.articleTit,
                    name: req.body.name,
                    desc: req.body.desc,
                    picurl: req.body.picurl,
                    capter1: req.body.capter1,
                    capter2: req.body.capter2 || '',
                    linkUrl: req.body.linkUrl || '',
                    statisticsUrl1: req.body.statisticsUrl1 || '',
                    statisticsUrl2: req.body.statisticsUrl2 || '',
                    tokenCodes: req.body.tokenCodes || '',
                    channel: req.body.channel,
                    remarks: req.body.remarks
                }
                var user = new TuiGuangModel(novelInfo)
                user.save(function(err, data) {
                    if(err) {
                        console.log("Error:" + err);
                    } else {
                        res.send({message: '创建成功'})
                    }
                });
            }
        }
    })
    
})

router.post('/novel/delete_one', (req, res, next) => {
    var selector = {
        id: req.body.id
    }
    TuiGuangModel.find(selector, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            if (data != '') {
                TuiGuangModel.remove(selector, function(err, result){
                    res.send({message: '删除成功'})
                })
            } else {
                res.send({message: '没有此项数据'})
            }
        }
    })
})

router.get('/novel/show', async(req, res, next) => {
    var messages = await TuiGuangModel.find({},{capter1:0,capter2:0}).sort({_id:-1});
    var domain_names = await DomainModel.find();
    res.send({data: messages, domain_names: domain_names})
})

router.get('/novel/get_content', async(req, res, next) => {
    var id = req.query._id
    var messages = await TuiGuangModel.findById(id);
    res.send({data: messages})
})

router.post('/novel/update', async(req, res, next) => {
    var id = req.body._id
    var message = {
        type: req.body.type,
        id: req.body.id,
        pageTitle: req.body.pageTitle,
        articleTit: req.body.articleTit,
        name: req.body.name,
        desc: req.body.desc,
        picurl: req.body.picurl,
        linkUrl: req.body.linkUrl || '',
        statisticsUrl1: req.body.statisticsUrl1,
        statisticsUrl2: req.body.statisticsUrl2 || '',
        tokenCodes: req.body.tokenCodes || '',
        channel: req.body.channel,
        remarks: req.body.remarks
    }
    if(req.body.capter1) {
        message.capter1= req.body.capter1
    }
    if(req.body.capter2) {
        message.capter2= req.body.capter2
    }
    var docs = await TuiGuangModel.findByIdAndUpdate(id, message)
    if (docs) {
        mem.set('weitiao_'+req.params.index,{},60).then(function(){
             console.log('---------set weitiao value---------')
        })
        mem.set('singlepage_'+req.params.index,{},60).then(function(){
             console.log('---------set singlepage value---------')
        })
        mem.set('multipage_'+req.params.index,{},60).then(function(){
             console.log('---------set multipage value---------')
        })
        mem.set('capter_'+req.params.index,{},60).then(function(){
             console.log('---------set capter value---------')
        })
        res.send({success: '修改成功'})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/token_arr', async(req, res, next) => {
    var tokenArr = req.query.tokenArr;
    var docs = await TokenArrModel.findByIdAndUpdate('5bc06e2e2f6ed40b684421a4', {tokenArr: tokenArr})
    res.send({success: '修改成功', data: docs})
})


router.get('/data',async(req,res,next)=>{
    let tid= req.query.tid
    if(!tid){
        return res.send('请输入transfer id')
    }
    let transfer = await TransferModel.findOne({id:tid})
    if(!transfer){
        return res.send('没有找到相关的transfer')
    }
    //console.log(transfer)

    var data={
        tuiguang:[],
        duibi:[]
    }

    let links = transfer.links.concat(transfer.back_urls)
    for (var i = 0; i < links.length; i++) {
        var link = links[i]
        var params = link.substr(link.lastIndexOf('/')+1)
        var index = params.split('?')[0]
        var channel = params.split('channel=')[1]
        let uv = await redis_client.pfcount('qiyue_website_tuiguang_'+channel+'_'+index);
        let cv = await redis_client.pfcount('qiyue_website_tuiguang_copy_'+channel+'_'+index);
        let ip = await redis_client.pfcount('qiyue_website_tuiguang_ip_'+channel+'_'+index);
        let wv = await redis_client.pfcount('qiyue_website_tuiguang_wechat_'+channel+'_'+index);

        data.tuiguang.push({
            index : index,
            uv : uv,
            cv : cv,
            wv : wv,
            ip : ip
        })
        data.duibi.push({
            index : index,
            copy_uv : (cv/uv * 100).toFixed(2) +'%',
            wechat_uv : (wv/uv * 100).toFixed(2) +'%',
        })
    }
    return res.send(data)
})

router.get('/data/del',async(req,res,next)=>{
    let tid= req.query.tid
    if(!tid){
        return res.send('请输入transfer id')
    }
    let transfer = await TransferModel.findOne({id:tid})
    if(!transfer){
        return res.send('没有找到相关的transfer')
    }

    for (var i = 0; i < transfer.links.length; i++) {
        var link = transfer.links[i]
        var params = link.substr(link.lastIndexOf('/')+1)
        var index = params.split('?')[0]
        var channel = params.split('channel=')[1]
        let uv = await redis_client.del('qiyue_website_tuiguang_'+channel+'_'+index);
        let cv = await redis_client.del('qiyue_website_tuiguang_copy_'+channel+'_'+index);
        let ip = await redis_client.del('qiyue_website_tuiguang_ip_'+channel+'_'+index);
        let wv = await redis_client.del('qiyue_website_tuiguang_wechat_'+channel+'_'+index);

    }
    return res.send('删除成功')
})


router.get('/statics/zeng',async(req,res,next)=>{
    var tid = req.query.tgid;
    var datas = await StaticsTuiGuangModel.find({tuiguang_id:tid,type:0}).sort({date:-1}).limit(24)
    return res.render('statics/zeng',{
        data : JSON.stringify(datas)
    })
})

module.exports = router;