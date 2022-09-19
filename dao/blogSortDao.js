let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');

module.exports = {
    /** 添加分类 */
    addSort: (data, success) => {
        let sql = `SELECT * from hh_blog_sort WHERE sort_name = "${data.sort_name}"`;
        
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            if (result.length > 0) {
                return success({ code: "402", error: "该分类添加失败" });
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
                let sqlTwo = "INSERT INTO hh_blog_sort(" + name + ") VALUES (" + value + ")";
                DBHelp(sqlTwo, (error, result, fields) => {
                    if (error) {
                        return success({ code: "-1", error: error.message });
                    }
                    return success({ code: "200", message: "success" });
                })
            }
        })

    },
    /** 查询分类列表 */
    listSort: (data, success) => {
        let sql = "SELECT * from hh_blog_sort WHERE state = 0";

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", data: result, message: "success" });
        })
    },
    /** 获取分类列表和对应的博客数 */
    getListCount: (success) => {
        let sql = "select a.id,a.sort_name,count(b.blog_sort_id) as count from hh_blog_sort as a LEFT JOIN hh_blog as b  on a.id = b.blog_sort_id GROUP BY sort_name,id";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 根据分类id来删除分类 */
    delSort: (data, success) => {
        let sql = "DELETE FROM hh_blog_sort where id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据分类id修改分类名称 */
    updNameSort: (data, success) => {
        let sql = "UPDATE hh_blog_sort SET sort_name = " + `'${data.sort_name}'` +
            ",update_time = " + `'${data.update_time}'` + " WHERE id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据分类id修改分类状态 */
    updstateSort: (data, success) => {
        let sql = "UPDATE hh_blog_sort SET state = " + data.state + " WHERE id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 添加分类的点击数 */
    countSort: (data, success) => {
        let sql = "UPDATE hh_blog_sort SET click_count  = click_count+1 WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 获取分类的总数量 */
    getCont: (success) => {
        let sql = "SELECT count(*) count from  hh_blog_sort";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 根据id获取对应的博客 */
    getBlog: (data, success) => {
        let sql = "select a.*,b.sort_name from hh_blog a,hh_blog_sort b where a.blog_sort_id=b.id and blog_sort_id = " + data.id;

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    }
}