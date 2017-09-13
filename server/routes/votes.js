const router = require("express").Router();
const token = require("../../auth/token");

router.get("/", (req, res) => {
    res.end();
});

router.post("/", (req, res) => {
    const userID = token.verify("user", req.body.jwt);

    if(!userID){
        res.status(401).send("UNAUTHORIZED");
        return;
    }

    res.end();
});

module.exports = router;
