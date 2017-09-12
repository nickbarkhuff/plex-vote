const config = require("../config");
const jwt = require("jsonwebtoken");

module.exports = {
    create: (role, id) => {
        return jwt.sign({role, id}, config.secret);
    },
    verify: (role, token) => {
        try{
            const payload = jwt.verify(token, config.secret);
            if(payload.role === role)
                return payload.id;
            else
                return false;
        }
        catch(err){
            return false;
        }
    }
};