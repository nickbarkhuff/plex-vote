const config = require("../config");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports = {
    generate: (str) => {
        return bcrypt.hashSync(str + config.secret, SALT_ROUNDS);
    },
    compare: (str, hash) => {
        return bcrypt.compareSync(str + config.secret, hash);
    }
};
