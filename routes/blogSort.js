const express = require('express');
const router = express.Router();
const moment = require('moment');

const blogSortDao = require('../dao/blogSortDao');
/** 添加分类 */
router.post("/add", (req, res) => {
    const data = {
        sort_name: req.body.sortName, // 分类内容
        content: req.body.content || null, // 分类简介
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间 
        state: 0, // 状态:0表示正常，1表示注销
        click_count: 0, // 点击数
    }

    blogSortDao.addSort(data, content => {
        res.json(content);
    })

})

/** 获取分类列表 */
router.get("/list", (req, res) => {
    const data = {};

    blogSortDao.listSort(data, content => {
        res.json(content);
    })
})

/** 获取分类列表和对应的博客数 */
router.get("/list/count", (req, res) => {
    blogSortDao.getListCount(content => {
        res.json(content);
    })
})

/** 根据分类id来删除分类 */
router.delete("/del/:id", (req, res) => {
    const data = {
        id: req.params.id
    };
    blogSortDao.delSort(data, content => {
        res.json(content);
    })
})

/** 根据分类id修改分类名称 */
router.put("/name/upd/:id", (req, res) => {
    let data = {
        id: req.params.id,  //分类id
        sort_name: req.body.sortName,  //分类名
        update_time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    blogSortDao.updNameSort(data, content => {
        res.json(content);
    })
})

/** 根据分类id修改分类状态 */
router.put("/state/upd/:id", (req, res) => {
    let data = {
        id: req.params.id,
        state: req.body.state,  //分类的状态
    }
    blogSortDao.updstateSort(data, content => {
        res.json(content);
    })
})

/** 添加分类的点击数 */
router.get("/cli/count/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    blogSortDao.countSort(data, content => {
        res.json(content);
    })
})

/** 获取分类的总数量 */
router.get("/count", (req, res) => {
    blogSortDao.getCont(content => {
        res.json(content);
    })
})

/** 根据id获取对应的博客 */
router.get("/get/blog/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    blogSortDao.getBlog(data, content => {
        res.json(content);
    })
})

module.exports = router;