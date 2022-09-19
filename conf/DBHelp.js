let DB_MYSQL = require('mysql');
let DB_CONFIG = require('./dbConfig');
/**
 * 数据库连接池
 * @type {Pool}
 */
let pool = DB_MYSQL.createPool({
    database: DB_CONFIG.database.DATABASE,
    user: DB_CONFIG.database.USERNAME,
    password: DB_CONFIG.database.PASSWORD,
    host: DB_CONFIG.database.HOST,
    port: DB_CONFIG.database.PORT
});
/**
 * 通用方法
 * @param sql
 * @param options
 * @param callback
 */
let query = (sql, options, callback) => {
    pool.getConnection((error, connection) => {
        if (error) {
            callback(error, null, null);
        } else {
            connection.query(sql, options, (error, results, fields) => {
                callback(error, results, fields);
            });
        }
        pool.releaseConnection(connection);
    });

};


module.exports = query;
