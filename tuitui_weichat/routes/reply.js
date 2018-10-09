var express = require('express');
var router = express.Router();
var ReplyModel = require('../model/Reply');
var mem = require('../util/mem.js');
var wechat_util = require('../util/get_weichat_client.js')
var multer = require('multer');
var fs = require('fs')

var upload = multer({
    dest: './public/uploads'
});

router.post('/upload', upload.single('imageFile'), function(req, res, next) {
    fs.rename(req.file.path, "./public/uploads/"+req.file.filename+'.jpg', function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({filename: req.file.filename + '.jpg'});
})

router.get('/', async(req, res, next) => {
    let doc = await ReplyModel.find()
    res.send({data: doc})
})

router.post('/create', async(req, res, next) => {
    if (req.body.replyType == 1 && req.body.url) {
        let client = wechat_util.getClient(req.body.code);
        client.uploadImageMaterial(req.body.url, async function (error, result) {
            if (result) {
                let media = {
                    type: "image",
                    content: {
                        mediaId: result
                    }
                }
                let data = {
                    code: req.body.code,
                    type: req.body.type,
                    replyType: req.body.replyType,
                    url: req.body.url,
                    media: media,
                    text: req.body.text,
                    key: req.body.key
                }
                let doc = await ReplyModel.create(data)
                if (doc) {
                    if (req.body.text) {
                        await mem.set("reply_" + doc.code + "_" + doc.text, doc.media, 30 * 24 * 3600)
                    } else if (req.body.key) {
                        await mem.set("reply_" + doc.code + "_" + doc.key, doc.media, 30 * 24 * 3600)
                    }else{
                        await mem.set("reply_" + doc.code + "_subscribe", doc.media, 30 * 24 * 3600)
                    }
                    res.send({success: '创建成功', data: doc})
                } else {
                    res.send({err: '创建失败'})
                }
            } else {
                res.send({err: '创建失败'})
            }
        });
    } else {
        let data = {
            code: req.body.code,
            type: req.body.type,
            replyType: req.body.replyType,
            text: req.body.text,
            key: req.body.key,
            msgId: req.body.msgId
        }
        let doc = await ReplyModel.create(data)
        if (doc) {
            if (req.body.text) {
                await mem.set("reply_" + doc.code + "_" + doc.text, doc.msgId, 30 * 24 * 3600)
            } else if (req.body.key) {
                await mem.set("reply_" + doc.code + "_" + doc.key, doc.msgId, 30 * 24 * 3600)
            }
            res.send({success: '创建成功', data: doc})
        } else {
            res.send({err: '创建失败'})
        }
    }
})

router.post('/update', async(req, res, next) => {
    let id = req.body.id
    if (req.body.replyType == 1 && req.body.url) {
        let client = wechat_util.getClient(req.body.code);
        client.uploadImageMaterial(req.body.url, async function (error, result) {
            if (result) {
                let media = {
                    type: "image",
                    content: {
                        mediaId: result
                    }
                }
                let data = {
                    code: req.body.code,
                    type: req.body.type,
                    replyType: req.body.replyType,
                    url: req.body.url,
                    media: media,
                    text: req.body.text,
                    key: req.body.key
                }
                let doc = await ReplyModel.findByIdAndUpdate(id, data, {new: true})
                if (doc) {
                    console.log(doc.code,doc.text,doc.key,'---------------------ttttttttt')
                    if (req.body.text) {
                        await mem.set("reply_" + doc.code + "_" + doc.text, doc.media, 30 * 24 * 3600)
                    } else if (req.body.key) {
                        await mem.set("reply_" + doc.code + "_" + doc.key, doc.media, 30 * 24 * 3600)
                    }else{
                        await mem.set("reply_" + doc.code + "_subscribe", doc.media, 30 * 24 * 3600)
                    }
                    res.send({success: '修改成功', data: doc})
                } else {
                    res.send({err: '修改失败'})
                }
            } else {
                res.send({err: '修改失败'})
            }
        });
    } else {
        let data = {
            code: req.body.code,
            type: req.body.type,
            replyType: req.body.replyType,
            text: req.body.text,
            key: req.body.key,
            msgId: req.body.msgId
        }
        let doc = await ReplyModel.findByIdAndUpdate(id, data, {new: true})
        if (doc) {
            if (req.body.text) {
                await mem.set("reply_" + doc.code + "_" + doc.text, doc.msgId, 30 * 24 * 3600)
            } else if (req.body.key) {
                await mem.set("reply_" + doc.code + "_" + doc.key, doc.msgId, 30 * 24 * 3600)
            }
            res.send({success: '修改成功', data: doc})
        } else {
            res.send({err: '修改失败'})
        }
    }
})

router.get('/del', async(req, res, next) => {
    let id = req.query.id
    var doc = await ReplyModel.findByIdAndRemove(id)
    if (doc) {
        if (doc.text) {
            await mem.set("reply_" + doc.code + "_" + doc.text, '', 1)
        } else if (doc.key) {
            await mem.set("reply_" + doc.code + "_" + doc.key, '', 1)
        }
        res.send({success: '删除成功', data: doc})
    } else {
        res.send({err: '删除失败'})
    }
})

module.exports = router;
