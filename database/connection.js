const config = require("../config");
const mysql = require("mysql");

const conn = mysql.createConnection(config.mysql);

conn.connect();

module.exports = conn;
