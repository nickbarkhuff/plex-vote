module.exports = {
    name: "Database Connection",
    promise: new Promise((resolve, reject) => {
        const config = require("../config");
        const mysql = require("mysql");
        const conn = mysql.createConnection(config.mysql);
        conn.connect(err => err ? reject(err) : resolve());
        conn.end();
    })
};
