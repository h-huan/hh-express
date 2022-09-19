let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');

module.exports = {
    // 添加博客的图片链接
    addPictureBlog: (data, success) => {
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
        let sql = "INSERT INTO hh_picture_blog(" + name + ") VALUES (" + value + ")";

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    // 修改博客图片链接
    updPicrureBlog: (data, success) => {
        let sql = "UPDATE hh_picture_blog set ";
        let counter = 1;
        let len = Object.keys(data).length;
        _.forEach(data, (key, val) => {
            if (key != null) {
                if (val != "blog_id") {
                    if (counter >= len) {
                        sql += val + "=" + `'${key}'`
                    } else {
                        sql += val + "=" + `'${key}'` + ","
                    }
                }
            }
            counter++;
        });
        sql = sql + " WHERE blog_id = " + data.blog_id;

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    // 删除博客id来图片链接
    delPicrureBlog: (data, success) => {
        let sql = "DELETE FROM hh_picture_blog where blog_id = " + data.blog_id;

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    // 根据博客的id来查询
    getPicrureBlog: (data, success) => {
        let sql = "select * FROM hh_picture_blog where blog_id=" + data.blog_id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    }
}