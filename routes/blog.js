const express = require('express');
const router = express.Router();
const moment = require('moment');

const blogDao = require("../dao/blogDao");

/** 添加博客 */
router.post("/add", (req, res) => {
    let _bloglen = req.body.content.length;
    let _readTime = 0;

    for (let i = 0; i < _bloglen; i++) {
        if (i * 500 < _bloglen < (i + 1) * 500) {
            _readTime = (i + 1);
            break;
        }
    }
    const data = {
        blog_sort_id: req.body.blogSortId, // 分类id
        tag_id:req.body.tabId, // 标签id
        title: req.body.title, // 博客标题
        summary: req.body.summary || null, // 博客简介
        content: req.body.content, // 博客内容
        click_count: 0, // 博客点击数
        collect_count: 0, // 博客收藏数
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间
        is_original: req.body.isOriginal || "0", // 是否原创（0:是 1：不是）
        top_blogs: req.body.topBlogs || "1", // 是否置顶（0:置顶 1:不置顶）
        bloglen: _bloglen,
        read_time: _readTime
    }
    
    blogDao.addBlog(data, content => {
        res.json(content);
    })
})

/** 根据id来查询博客 */
router.get("/get/:id", (req, res) => {
    const data = {
        id: req.params.id
    }
    blogDao.getBlog(data, content => {
        res.json(content);
    })
})

/** 获取博客列表 */
router.get("/list", (req, res) => {
    blogDao.listBlog(content => {
        res.json(content);
    })
})

/** 根据id来删除博客  */
router.delete("/del/:id", (req, res) => {
    const data = {
        id: req.params.id
    };

    blogDao.delBlog(data, content => {
        res.json(content);
    })
})

/** 根据id修改博客 */
router.put("/upd/:id", (req, res) => {
    const data = {
        id: req.params.id,  //博客id
        blog_sort_id: req.body.blogSortId, // 分类id
        tag_id: req.body.tabId, // 标签id
        title: req.body.title, // 博客标题
        summary: req.body.summary || null, // 博客简介
        content: req.body.content, // 博客内容
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间
        is_original: req.body.isOriginal, // 是否原创（0:不是 1：是）
        top_blogs: req.body.topBlogs, // 是否置顶（0:置顶 1:不置顶）
        // is_publish: req.body.isPublish, // 是否发布：0：否，1：是
        // struts: req.body.struts, // 博客状态（0:正常,1:已删除)
    }
    blogDao.updBlog(data, content => {
        res.json(content);
    })
})

/** 根据id添加点击数 */
router.get("/cli/count/:id", (req, res) => {
    let data = {
        id: req.params.id
    }

    blogDao.countCliBlog(data, content => {
        res.json(content);
    })
})

/** 根据id添加收藏数 */
router.get("/coll/count/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    blogDao.countCollBlog(data, content => {
        res.json(content);
    })
})

/** 获取总的博客数 */
router.get("/count", (req, res) => {
    blogDao.getCont(content => {
        res.json(content);
    })
})

/** 根据标题和简介来模糊查询 */
router.get("/like/:cont", (req, res) => {
    let data = {
        cont: req.params.cont
    }
    blogDao.linkBlog(data, content => {
        res.json(content);
    })
})



module.exports = router;