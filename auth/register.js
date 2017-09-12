const conn = require("../database/connection");
const token = require("./token");
const hash = require("./hash");

module.exports = (username, password) => {
    return new Promise((resolve, reject) => {

        // Check that a username and a password were provided
        if(!username || !password){
            reject("Username or password not specified");
            return;
        }

        // Check that the username is not already in use
        conn.query(`
            SELECT * FROM users
            WHERE username="${username}"
        `, (err, results) => {

            // Check for DB errors
            if(err){
                reject("Internal error");
                return;
            }

            // Check results length
            if(results.length > 0){
                reject("User with that username already exists");
                return;
            }

            // Add the user
            conn.query(`
                INSERT INTO users (username, password)
                VALUES (
                    "${username}",
                    "${hash.generate(password)}"
                )
            `, (err, results) => {

                // Check for DB errors
                if(err){
                    reject("Internal error");
                    return;
                }

                // Success
                resolve(token.create("user", results.insertId));
            });
        });
    });
};
