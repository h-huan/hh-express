const express = require('express');
const router = express.Router();
const moment = require('moment');

const menuDao = require('../dao/menuDao');

/** 添加侧边栏 */
router.post("/add", (req, res) => {
    const data = {
        menu_name: req.body.menuName, // 侧边栏
        menu_fid: req.body.menuFid || 0, // 父级id
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间
        user_id: req.body.useId || "1", // 操作管理员id
    }

    menuDao.addMenu(data, content => {
       res.json(content);
    })
});

/** 获取父节点的菜单 */
router.get("/getfm", (req, res) => {
    menuDao.getFMenu(content => {
      res.json(content);
    })
})

/** 获取后台所有的菜单 */
router.get("/All", (req, res) => {
    menuDao.listMenu(content => {
       res.json(content);
    })
});

module.exports = router;