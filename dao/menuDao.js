let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');

module.exports = {
    /** 添加侧边栏 */
    addMenu: (data, success) => {
        let sql = "INSERT INTO `hh_menu`(";
        _.forEach(data, (key, val) => {
            sql = sql + val + ",";
        })

        sql = sql.substring(0, sql.length - 1);
        sql = sql + ') values (';
        _.forEach(data, (key, val) => {
            sql = sql + `'${key}'` + ",";
        })
        sql = sql.substring(0, sql.length - 1);
        sql = sql + ')';

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },

    /** 查询父节点的菜单 */
    getFMenu: (success) => {
        let sql = "SELECT * FROM `hh_menu` where menu_fid = 0";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });

            }
            return success({ code: "200", message: "success", data: result });
        })
    },

    /** 查询所有菜单 */
    listMenu: (success) => {
        let sql = "select * from hh_menu";

        DBHelp(sql, (error, result, fields) => {
            if (error) throw error;
            var arrJson = [];
            for (i = 0; i < result.length; i++) {
                // 获取根元素
                if (result[i].menu_fid == 0) {
                    let son = getAllChild(result, result[i].id);
                    if (son.length != 0) {
                        result[i].son = son;
                    }
                    arrJson.push(result[i]);
                }
            }
            success({ code: "200", message: "success", data: arrJson });
        })

        function getAllChild(result, index) {
            let son = [];
            for (const i in result) {
                if (result[i].menu_fid == index) {
                    son.push(result[i]);
                }
            }
            return son;
        }
    },

}