const express = require('express');
const router = express.Router();
const getClientIP = require('../util/result');
const moment = require('moment');

const adminRouter = require('./admin');
const menuRouter = require('./menu');
const blogSortRouter = require('./blogSort');
const blogTabROuter = require('./blogTabs');
const blogROuter = require('./blog');
const linkROuter = require('./link');
const pictureBlogROuter = require('./pictureBlog');
const leaveROuter = require('./leave');
const visitROuter = require('./visit');
const commentROuter = require('./comment');

const adminDao = require('../dao/adminDao');

router.use("/admin", adminRouter);   //管理员
router.use("/menu", menuRouter);     // 菜单
router.use("/sort", blogSortRouter); //分类
router.use("/tabs", blogTabROuter);  //标签
router.use("/blog", blogROuter);     //博客
router.use("/link", linkROuter);     //链接
router.use("/pictureBlog", pictureBlogROuter);     //图片
router.use("/leave", leaveROuter);     //留言
router.use("/visit", visitROuter);     //流量
router.use("/comment", commentROuter);     //评论

/** 登录: 可以通过,手机号,邮箱，用户id */
router.post("/login", (req, res) => {
    const data = {
        uuid: req.body.uuid,  // 用户id
        pass_word: req.body.passWord, //密码
        last_login_ip: getClientIP(req), //最后登录的ip
        last_login_time: moment().format('YYYY-MM-DD HH:mm:ss'),  //最后登录时间
    }
    adminDao.getLogin(data, content => {
        res.json(content);
    })
})

module.exports = router;