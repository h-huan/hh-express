let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');


module.exports = {
    /** 添加链接 */
    addLink: (data, success) => {
        let name = "", value = "";
        let len = Object.keys(data).length;
        let counter = 1;
        _.forEach(data, (key, val) => {
            if (key != null) {
                if (counter >= len) {
                    name += val;
                    value += `'${key}'`;
                } else {
                    name += val + ",";
                    value += `'${key}'` + ",";
                }
            }
            counter++;
        });

        let sql = "INSERT INTO hh_link(" + name + ") VALUES (" + value + ")";

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 查询所有 */
    listAllLink: (success) => {
        let sql = "select * FROM hh_link where link_state = 0";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 查询申请成功的链接 */
    listSuc: (success) => {
        let sql = "select * from hh_link where  link_state = 1";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 更加id修改留言的状态 */
    updLink: (data, success) => {
        let sql = "UPDATE hh_link set  link_state = 1 WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 更加id修改内容 */
    updContLink: (data, success) => {
        let sql = "UPDATE hh_link set ";
        let counter = 1;
        let len = Object.keys(data).length;
        _.forEach(data, (key, val) => {
            if (key != null) {
                if (val != "id") {
                    if (counter >= len) {
                        sql += val + "=" + `'${key}'`
                    } else {
                        sql += val + "=" + `'${key}'` + ","
                    }
                }
            }
            counter++;
        });
        sql = sql + " WHERE id = " + data.id;

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据id查询内容 */
    getLink: (data, success) => {
        let sql = "select * FROM hh_link where id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据id删除链接 */
    delLink: (data, success) => {
        let sql = "DELETE from hh_link WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 添加点击数 */
    countLink: (data, success) => {
        let sql = "UPDATE hh_link SET click_count  = click_count+1 WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    }
}