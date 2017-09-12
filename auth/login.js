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

        // Get user
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
            if(results.length === 0){
                reject("Username is incorrect");
                return;
            }

            // Check password
            if(!hash.compare(password, results[0].password)){
                reject("Username or password is incorrect");
            }
            else{
                resolve(token.create("user", results[0].id));
            }
        });
    });
};
