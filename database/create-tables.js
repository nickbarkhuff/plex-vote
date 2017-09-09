const conn = require("../database/connection");

const logErrors = (err) => {
    if (err) console.log(err);
};

conn.query(`
    CREATE TABLE IF NOT EXISTS users(
        foo VARCHAR(20),
        bar VARCHAR(20),
        baz VARCHAR(20)
    )
`, logErrors);

conn.query(`
    CREATE TABLE IF NOT EXISTS votes(
        foo VARCHAR(20),
        bar VARCHAR(20),
        baz VARCHAR(20)
    )
`, logErrors);

conn.end();
