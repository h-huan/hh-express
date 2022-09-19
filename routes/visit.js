const express = require('express');
const router = express.Router();
const moment = require('moment');

const getClientIP = require('../util/result');
const visitDao = require("../dao/visitDao");


// 添加访问量
router.get("/add", (req, res) => {
    let data = {
        ip: getClientIP(req),
        create_time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    visitDao.addVisit(data, content => {
        res.json(content);
    })
})

// 查询总的访问量
router.get("/count", (req, res) => {
    visitDao.countVisit(content => {
        res.json(content);
    })
})

// 查询访问人数
router.get("/count/per", (req, res) => {
    visitDao.countPerVisit(content => {
        res.json(content);
    })
})


module.exports = router; 