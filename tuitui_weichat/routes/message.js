var express = require('express');
var router = express.Router();
var MessageModel = require('../model/Message');
var ConfigModel = require('../model/Config');
var send = require('../script/send_message');
var sendUser = require('../script/send_user_message');

router.get('/', async(req, res, next) => {
    let messages = await MessageModel.find().limit(20).sort({_id: -1});
    for (let i = 0; i < messages.length; i++) {
        let d = new Date(messages[i].timing_time);
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let date = d.getDate()
        let hour = d.getHours()
        let minutes = d.getMinutes()
        let seconds = d.getSeconds()
        if (month < 10) {
            month = '0' + month
        }
        if (date < 10) {
            date = '0' + date
        }
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        let times = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
        messages[i].time = times
    }
    res.send({messages: messages})
})

router.get('/get_code', async(req, res, next) => {
    let doc = await ConfigModel.find()
    res.send({data: doc})
})


router.post('/create', async(req, res, next) => {
    var message = {
        codes: req.body.codes,
        sex: req.body.sex,
        task: req.body.task,
        is_timing: req.body.is_timing,
        delay: req.body.delay,
        timing_time: req.body.timing_time,
        type: parseInt(req.body.type),
        contents: req.body.contents,
        img: req.body.img,
        take_over: req.body.take_over,
        tagId: req.body.tagId
    }
    var docs = await MessageModel.create(message);
    if (docs) {
        res.send({success: '成功', data: docs})
    } else {
        res.send({err: '创建失败，请检查输入是否有误'})
    }

})

router.post('/update', async(req, res, next) => {
    var id = req.body.id;
    var message = {
        codes: req.body.codes,
        sex: req.body.sex,
        task: req.body.task,
        is_timing: req.body.is_timing,
        delay: req.body.delay,
        timing_time: req.body.timing_time,
        type: parseInt(req.body.type),
        contents: req.body.contents,
        img: req.body.img,
        take_over: req.body.take_over,
        tagId: req.body.tagId
    }
    var docs = await MessageModel.findByIdAndUpdate(id, message)
    if (docs) {
        res.send({success: '修改成功', data: docs})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/delete', async(req, res, next) => {
    var id = req.query.id;
    var docs = await MessageModel.findByIdAndRemove(id)
    var docs1 = await MessageModel.find()
    res.send({success: '删除成功', data: docs1})
})

router.get('/send', async(req, res, next) => {
    var id = req.query.id;
    var take_over = req.query.take_over;
    console.log('take_over-------------' + take_over)
    if (take_over) {
        sendUser.get_message(id);
        res.send({success: '发送成功'})
    } else {
        send.get_message(id);
        res.send({success: '发送成功'})
    }
})

module.exports = router
