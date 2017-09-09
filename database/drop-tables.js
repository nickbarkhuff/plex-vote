const conn = require("../database/connection");

const logErrors = (err) => {
    if (err) console.log(err);
};

conn.query(`DROP TABLE IF EXISTS users`, logErrors);
conn.query(`DROP TABLE IF EXISTS votes`, logErrors);

conn.end();
