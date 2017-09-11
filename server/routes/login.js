const router = require("express").Router();

router.get("/", (req, res) => res.send("Login API"));

module.exports = router;
