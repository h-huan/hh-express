let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');
const tokens = require('../token/index');
let _data;

module.exports = {
    /** 登录 */
    getLogin: (data, success) => {
        let sql = "SELECT * FROM `hh_admin` where uuid=" + `'${data.uuid}'` + " AND  pass_word=" + `'${data.pass_word}'`;

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            _data = result;
            let sqltwo = "UPDATE hh_admin set last_login_ip=" + `'${data.last_login_ip}'` + ",last_login_time =" + `'${data.last_login_time}'` + " where  uuid=" + `'${data.uuid}'`

            if (_data.length != 0) {
                DBHelp(sqltwo, (errorTwo, resulttwo, fields) => {
                    if (errorTwo) {
                        return success({ code: "-1", error: errorTwo.message });
                    }
                    tokens.setToken(data.uuid).then((token) => {
                        return success({ code: "200", token: token });
                    });
                });
            } else {
                return success({ code: "-2", error: "请输入正确的账户和密码" });
            }
        })
    },
    /** 添加用户  */
    addUser: (data, success) => {
        let sql = "select * from hh_admin where uuid=" + `'${data.uuid}'`;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            if (result.length != 0) {
                return success({ code: "-2", error: "该用已经存在" });
            } else {
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
                let sqlTwo = "INSERT INTO hh_admin(" + name + ") VALUES (" + value + ")";
                DBHelp(sqlTwo, (error, resultTwo, fields) => {
                    if (error) {
                        return success({ code: "-1", error: error.message });
                    }
                    return success({ code: "200", message: "success" });
                })
            }
        })

    },
    /** 更加id修改用户密码 */
    updPass: (data, success) => {
        let sqlOne = "SELECT * from hh_admin WHERE uuid=" + `'${data.uuid}'` + " and  pass_word =" + `'${data.oldPassWord}'`;

        DBHelp(sqlOne, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            let sqlTwo = "UPDATE hh_admin set pass_word=" + `'${data.pass_word}'` + " WHERE uuid = " + `'${data.uuid}'`;

            DBHelp(sqlTwo, (error, resultTwo, fields) => {
                if (error) {
                    return success({ code: "-1", error: error.message });
                }
                return success({ code: "200", message: "success" });
            })
        })
    },
    /** 根据uuid修改用户信息 */
    updUser: (data, success) => {
        let sql = "UPDATE hh_admin set ";
        let counter = 1;
        let len = Object.keys(data).length;

        _.forEach(data, (key, val) => {
            if (key != null) {
                if (val != "uuid") {
                    if (counter >= len) {
                        sql += val + "=" + `'${key}'`
                    } else {
                        sql += val + "=" + `'${key}'` + ","
                    }
                }
            }
            counter++;
        });
        if (sql.substring(sql.length - 1) == ",") {
            sql = sql.substring(0, sql.length - 1);
        }
        sql = sql + " WHERE uuid = " + `'${data.uuid}'`;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据uuid查询用户信息 */
    setUser: (data, success) => {
        let sql = "SELECT * from hh_admin where uuid =" + `'${data.uuid}'`;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 更加id删除用户 */
    delUser: (data, success) => {
        let sql = "DELETE FROM hh_admin WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    }

}