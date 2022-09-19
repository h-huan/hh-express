const express = require('express');
const router = express.Router();
const moment = require('moment');

const leaveDao = require('../dao/leaveDao');

/** 添加留言 */
router.post("/add", (req, res) => {
    let data = {
        name: req.body.name,      // 昵称
        email: req.body.email,      // 邮箱
        cent: req.body.cent,      // 留言
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'),   // 创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'),   // 更新时间
    }
    leaveDao.addleave(data, content => {
        res.json(content);
    })
})

/** 查询所有的留言 */
router.get("/list", (req, res) => {
    leaveDao.listLeave(content => {
        res.json(content);
    })
})

/** 对留言进行回复 */
router.put("/upd/:id", (req, res) => {
    let data = {
        id: req.params.id,
        reply: req.body.reply
    }
    leaveDao.updLeave(data, content => {
        res.json(content);
    })
})

/** 根据id删除留言 */
router.delete("/del/:id", (req, res) => {
    let data = {
        id: req.params.id
    }
    leaveDao.delLeave(data, content => {
        res.json(content);
    })
})

module.exports = router;