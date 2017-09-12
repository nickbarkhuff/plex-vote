const router = require("express").Router();
const login = require("../../auth/login");

router.post("/", (req, res) => {
    login(req.body.username, req.body.password)
    .then((token) => {
        res.send({success: true, token});
    })
    .catch((error) => {
        res.send({success: false, error})
    });
});

module.exports = router;
