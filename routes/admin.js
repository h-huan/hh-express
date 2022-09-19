const express = require('express');
const router = express.Router();

const getClientIP = require('../util/result');
const moment = require('moment');
const adminDao = require("../dao/adminDao");

// 添加管理员
router.post("/add", (req, res) => {
    const data = {
        uuid: req.body.uuid,    // 账号uuid
        pass_word: req.body.passWord,   // 密码
        last_login_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 最后登录时间
        last_login_ip: getClientIP(req),   // 最后登录IP
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
    }

    adminDao.addUser(data, content => {
        res.json(content);
    })
})

// 根据uuid修改管理员信息
router.put("/upd/:uuid", (req, res) => {
    const data = {
        user_name: req.body.userName || null,   // 管理员名
        uuid: req.params.uuid || null,    // 账号uuid
        gender: req.body.gender || 0,  // 性别(0:男1:女)
        email: req.body.email || null,   // 邮箱
        birthday: req.body.birthday || null,    // 出生年月日
        mobile: req.body.mobile || null,  // 手机
        summary: req.body.summary || null, // 个性签名
        github: req.body.github || null,   // github
        gitee: req.body.gitee || null,     // gitee
        gitlab: req.body.gitlab || null,   // gitlab
    }

    adminDao.updUser(data, content => {
        res.json(content);
    })
})

/** 根据UUid修改管理员密码 */
router.put("/upd/pass/:uuid", (req, res) => {
    let data = {
        uuid: req.params.uuid,
        oldPassWord: req.body.oldPassWord,
        pass_word: req.body.passWord,
    }
    adminDao.updPass(data, content => {
        res.json(content);
    })
})

// 根据uuid查询管理员信息
router.get("/set/:uuid", (req, res) => {
    const data = {
        uuid: req.params.uuid,
    }

    adminDao.setUser(data, content => {
        res.json(content);
    })
})

// 根据id删除管理员信息
router.delete("/del/:id", (req, res) => {
    const data = {
        id: req.params.id,
    }

    adminDao.delUser(data, content => {
        res.json(content);
    })
})

module.exports = router;