const express = require('express');
const router = express.Router();
const moment = require('moment');


const blogTabsDao = require('../dao/blogTabsDao');

/** 添加标签 */
router.post("/add", (req, res) => {
    const data = {
        tab_name: req.body.tanName, // 标签内容
        content: req.body.content || null, // 标签简介
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间 
        state: 0, // 状态:0表示正常，1表示注销
        click_count: 0, // 点击数
    }

    blogTabsDao.addTab(data, content => {
        res.json(content);
    })
})

/** 获取标签标签 */
router.get("/list", (req, res) => {
    blogTabsDao.listTab(content => {
        res.json(content);
    })
})

/** 获取标签和对应的博客数 */
router.get("/list/count", (req, res) => {
    blogTabsDao.getListCount(content => {
        res.json(content);
    })
})

/** 根据标签id来删除分类 */
router.delete("/del/:id", (req, res) => {
    const data = {
        id: req.params.id
    };
    blogTabsDao.delTab(data, content => {
        res.json(content);
    })
})

/** 根据分类id修改分类名称 */
router.put("/name/upd/:id", (req, res) => {
    let data = {
        id: req.params.id,  //分类id
        tab_name: req.body.tanName,  //分类名
        update_time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    blogTabsDao.updNameTab(data, content => {
        res.json(content);
    })
})

/** 根据分类id修改分类状态 */
router.put("/state/upd/:id", (req, res) => {
    let data = {
        id: req.params.id,
        state: req.body.state,  //分类的状态
    }
    blogTabsDao.updstateTab(data, content => {
        res.json(content);
    })
})

/** 修改分类的点击数 */
router.get("/cli/count/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    blogTabsDao.countTab(data, content => {
        res.json(content);
    })
})

/** 查询标签的总数量 */
router.get("/count", (req, res) => {
    blogTabsDao.getCont(content => {
        res.json(content);
    })
})

/** 根据id获取对应的博客 */
router.get("/get/blog/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    blogTabsDao.getBlog(data, content => {
        res.json(content);
    })
})

module.exports = router;