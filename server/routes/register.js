const router = require("express").Router();
const register = require("../../auth/register");

router.post("/", (req, res) => {
    register(req.body.username, req.body.password)
    .then((token) => {
        res.send({success: true, token});
    })
    .catch((error) => {
        res.send({success: false, error})
    });
});

module.exports = router;
