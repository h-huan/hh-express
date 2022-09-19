const express = require('express');
const router = express.Router();
const moment = require('moment');

const linkDao = require("../dao/linkDao");

/** 添加友情链接 */
router.post("/add", (req, res) => {
    let data = {
        title: req.body.title,               // 标题
        summary: req.body.summary || null,   // 简介
        email: req.body.email,              // 邮箱
        url: req.body.url,                   //url
        ico: req.body.ico,                   //ico
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'),    //创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'),    //更新时间
        link_state: 0,   //友链状态： 0 申请中， 1：已上线，  2：已下架',
    }
    linkDao.addLink(data, content => {
        res.json(content);
    })
});

/** 查询所有的链接 */
router.get("/list/All", (req, res) => {

    linkDao.listAllLink(content => {
        res.json(content);
    })
})

/** 更改id修改留言的状态 */
router.put("/upd/:id", (req, res) => {
    let data = {
        id: req.params.id,
    }
    linkDao.updLink(data, content => {
        res.json(content);
    })
})

/** 更改id修改内容 */
router.put("/upd/cont/:id", (req, res) => {
    let data = {
        id: req.params.id,
        title: req.body.title,
        email: req.body.email,
        url: req.body.url,
        ico: req.body.ico,
        update_time: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    linkDao.updContLink(data, content => {
        res.json(content);
    })
})

/** 查询申请成功的链接 */
router.get("/list/suc", (req, res) => {
    linkDao.listSuc(content => {
        res.json(content);
    })
})

/** 根据id查询内容 */
router.get("/get/:id", (req, res) => {
    let data = {
        id: req.params.id
    };
    linkDao.getLink(data, content => {
        res.json(content);
    })
})

/** 根据id删除 */
router.delete("/del/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    linkDao.delLink(data, content => {
        res.json(content);
    })
})

/** 添加点击数 */
router.get("/cli/count/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    linkDao.countLink(data, content => {
        res.json(content);
    })
})

module.exports = router;   