let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');


module.exports = {
    /** 添加博客 */
    addBlog: (data, success) => {
        let name = "", value = "";
        let len = Object.keys(data).length;
        let counter = 1;
        _.forEach(data, (key, val) => {
            if (key != null) {
                if (counter >= len) {
                    name += val;
                    value += `"${key}"`;
                } else {
                    name += val + ",";
                    value += `"${key}"` + ",";
                }
            }
            counter++;
        });
        let sql = "INSERT INTO hh_blog(" + name + ") VALUES (" + value + ")";
        
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            let sqlTwo = "select * FROM hh_blog where create_time=" + `'${data.create_time}'`;
            DBHelp(sqlTwo, (error, resultTwo, fields) => {
                if (error) {
                    return success({ code: "-1", error: error.message });
                }
                return success({ code: "200", message: "success", data: resultTwo });
            })
        })
    },
    /** 根据id获取博客 */
    getBlog: (data, success) => {
        let sql = "select a.*,b.sort_name,c.tab_name from hh_blog a,hh_blog_sort b,hh_blog_tag c where a.blog_sort_id=b.id and a.tag_id =c.id and a.id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 查询博客列表 */
    listBlog: (success) => {
        let sql = "SELECT * from hh_blog ORDER BY  create_time desc";

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", data: result, message: "success" });
        })
    },
    /** 根据id来删除博客 */
    delBlog: (data, success) => {
        let sql = "DELETE FROM hh_blog where id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据id修改博客 */
    updBlog: (data, success) => {
        let sql = "UPDATE hh_blog set ";
        let counter = 1;
        let len = Object.keys(data).length;
        _.forEach(data, (key, val) => {
            if (key != null) {
                if (val != "id") {
                    if (counter >= len) {
                        sql += val + "=" + `"${key}"`
                    } else {
                        sql += val + "=" + `"${key}"` + ","
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
    /** 添加博客的点击数 */
    countCliBlog: (data, success) => {
        let sql = "UPDATE hh_blog SET click_count = click_count + 1 WHERE id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 添加博客的收藏数 */
    countCollBlog: (data, success) => {
        let sql = "UPDATE hh_blog SET collect_count = collect_count + 1 WHERE id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 获取博客的总数量 */
    getCont: (success) => {
        let sql = "SELECT count(*) count from  hh_blog";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 根据标题和简介来模糊查询 */
    linkBlog: (data, success) => {
        let sql = "SELECT * from hh_blog WHERE title Like '%" + data.cont + "%' or summary Like '%" + data.cont + "%'";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    }
}