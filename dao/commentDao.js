let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');


module.exports = {
    addComment: (data, success) => {
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
        let sql = "INSERT INTO hh_comment(" + name + ") VALUES (" + value + ")";

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    delComment: (data, success) => {
        let sql = "DELETE FROM hh_comment WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    updComment: (data, success) => {
        let sql = "UPDATE hh_comment SET reply = " + `'${data.reply}'` + " WHERE id = " + data.id;

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    listAllComment: (success) => {
        let sql = "SELECT * from hh_comment ORDER BY create_time desc";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    getComment: (data, success) => {
        let sql = "SELECT * from hh_comment WHERE blog_id=" + `'${data.blog_id}'`;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    }
}