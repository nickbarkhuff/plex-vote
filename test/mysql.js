module.exports = {
    name: "MySQL Connection",
    promise: new Promise((resolve, reject) => {
        const conn = require("../database/connection");
        conn.query("SELECT version()", err => err ? reject(err) : resolve());
        conn.end();
    })
};
