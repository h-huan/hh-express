const express = require('express');
const router = express.Router();
const moment = require('moment');


const commentDao = require('../dao/commentDao');

// 添加评论
router.post("/add", (req, res) => {
    let data = {
        user_name: req.body.user_name, // 标签内容
        email: req.body.email, // 邮箱
        content: req.body.content, // 评论
        blog_id: req.body.blog_id, // 博客id
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 修改时间
    }
    commentDao.addComment(data, content => {
        res.json(content)
    })
})
// 删除评论
router.delete("/del/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    commentDao.delComment(data, content => {
        res.json(content)
    })
})
// 对评论进行回复
router.put("/upd/:id", (req, res) => {
    let data = {
        id: req.params.id,
        reply: req.body.reply 
    }
    commentDao.updComment(data, content => {
        res.json(content)
    })
})
// 查询所有评论
router.get("/list/all", (req, res) => {
    commentDao.listAllComment(content => {
        res.json(content)
    })
})

// 根据博客id获取对应的所有评论
router.get("/get/:blog_id", (req, res) => {
    let data = {
        blog_id: req.params.blog_id
    }
    commentDao.getComment(data, content => {
        res.json(content)
    })
})

module.exports = router;