let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');


module.exports = {
    /** 添加标签 */
    addTab: (data, success) => {
        let sql = `SELECT * from hh_blog_tag WHERE tab_name = "${data.tanName}"`;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            if (result.length > 0) {
                return success({ code: "402", error: "该标签已经存在" });
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
                let sqlTwo = "INSERT INTO hh_blog_tag(" + name + ") VALUES (" + value + ")";
                DBHelp(sqlTwo, (error, result, fields) => {
                    if (error) {
                        return success({ code: "-1", error: error.message });
                    }
                    return success({ code: "200", message: "success" });
                })
            }
        })
    },
    /** 获取分类标签 */
    listTab: (success) => {
        let sql = "SELECT * from hh_blog_tag WHERE state = 0";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", data: result, message: "success" });
        })
    },
    /** 获取分类列表和对应的博客数 */
    getListCount: (success) => {
        // let sql = "select a.id,a.tab_name,count(b.tag_id) as count from hh_blog_tag as a LEFT JOIN hh_blog as b  on a.id = b.tag_id GROUP BY tab_name,id";
        let sql = "SELECT * from hh_blog_tag WHERE state = 0";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 根据分类id来删除分类 */
    delTab: (data, success) => {
        let sql = "DELETE FROM hh_blog_tag where id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据分类id修改分类名称 */
    updNameTab: (data, success) => {
        let sql = "UPDATE hh_blog_tag SET tab_name = " + `'${data.tab_name}'` + ",update_time = " + `'${data.update_time}'` + " WHERE id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 根据分类id修改分类状态 */
    updstateTab: (data, success) => {
        let sql = "UPDATE hh_blog_tag SET state = " + data.state + " WHERE id = " + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 添加分类的点击数 */
    countTab: (data, success) => {
        let sql = "UPDATE hh_blog_tag SET click_count  = click_count+1 WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 获取分类的总数量 */
    getCont: (success) => {
        let sql = "SELECT count(*) count from  hh_blog_tag";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 根据id获取对应的博客 */
    getBlog: (data, success) => {
        let sql = `select a.*,b.tab_name from hh_blog a,hh_blog_tag b where a.tag_id=b.id and a.tag_id like "%${data.id}%";`
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    }
}