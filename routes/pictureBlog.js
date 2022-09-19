const express = require('express');
const router = express.Router();
const moment = require('moment');

const getClientIP = require('../util/result');
const pictureBlogDao = require("../dao/pictureBlogDao");

// 添加博客的图片链接··
router.post("/add", (req, res) => {
    let data = {
        urls: req.body.urls,                    // 图片链接列表
        blog_id: req.body.blogId,               // 博客id
        picture_sort_id: getClientIP(req),      //修改的IP
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'),    //创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss')    //更新时间
    }

    pictureBlogDao.addPictureBlog(data, content => {
        res.json(content);
    })
})

// 根据博客id,修改列表图片链接
router.put("/upd/:blogId", (req, res) => {
    let data = {
        urls: req.body.urls,                    // 图片链接列表
        blog_id: req.params.blogId,               // 博客id
        picture_sort_id: getClientIP(req),      //修改的IP
        update_time: moment().format('YYYY-MM-DD HH:mm:ss')    //更新时间
    }
    pictureBlogDao.updPicrureBlog(data, content => {
        res.json(content);
    })
})

// 删除博客id来图片链接
router.delete("/del/:blogId", (req, res) => {
    let data = {
        blog_id: req.params.blogId,               // 博客id
    }
    pictureBlogDao.delPicrureBlog(data, content => {
        res.json(content);
    })
})

// 根据博客的id来查询链接
router.get("/get/:blogId", (req, res) => {
    let data = {
        blog_id: req.params.blogId,               // 博客id
        picture_sort_id: getClientIP(req),      //修改的IP
        update_time: moment().format('YYYY-MM-DD HH:mm:ss')    //更新时间
    }
    pictureBlogDao.getPicrureBlog(data, content => {
        res.json(content);
    })
})

module.exports = router; 