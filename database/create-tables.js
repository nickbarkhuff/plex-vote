const conn = require("../database/connection");

const logErrors = (err) => {
    if (err) console.log(err);
};

conn.query(`
    CREATE TABLE IF NOT EXISTS users(
        id       int          NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL
    )
`, logErrors);

conn.query(`
    CREATE TABLE IF NOT EXISTS votes(
        id       int          NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id  int          NOT NULL,
        media_id varchar(255) NOT NULL,
        rating   int          NOT NULL
    )
`, logErrors);

conn.end();
