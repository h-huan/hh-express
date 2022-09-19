let _ = require('lodash')
let DBHelp = require('../conf/DBHelp');

module.exports = {
    // 增加访问量
    addVisit: (data, success) => {
        let sql = "INSERT INTO hh_visit(ip,create_time) VALUES (" + `'${data.ip}'` + "," + `'${data.create_time}'` + ")";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            success({ code: "200", message: "success" });
        })
    },
    // 查询访问量
    countVisit: (success) => {
        let sql = "select  count(*) '访问量' from hh_visit";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        });
    },
    // 查询访问人数
    countPerVisit: (success) => {
        let sql = "SELECT count(*) '访问人数' FROM (SELECT date_format(create_time,'%Y-%m-%d'),ip from hh_visit GROUP BY ip,date_format(create_time,'%Y-%m-%d')) a";
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            success({ code: "200", message: "success", data: result });
        })
    }
}