const router = require("express").Router();

router.get("/", (req, res) => res.send("Vote API"));

module.exports = router;
