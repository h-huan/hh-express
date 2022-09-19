let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');


module.exports = {
    /** 添加留言 */
    addleave: (data, success) => {
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
        let sql = "INSERT INTO hh_leave(" + name + ") VALUES (" + value + ")";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    /** 查询所有的留言 */
    listLeave: (success) => {
        let sql = "SELECT  * from hh_leave ORDER BY create_time desc";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    },
    /** 对留言进行回复 */
    updLeave: (data, success) => {
        let sql = "UPDATE hh_leave SET reply=" + `'${data.reply}'` + " WHERE id=" + data.id;

        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    },
    
    // 根据id删除内容
    delLeave: (data, success) => {
        let sql = "DELETE FROM hh_leave WHERE id=" + data.id;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    }

}