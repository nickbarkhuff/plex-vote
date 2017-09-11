const router = require("express").Router();

router.get("/", (req, res) => res.send("Votes API"));

module.exports = router;
