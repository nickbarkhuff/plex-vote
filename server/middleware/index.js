const router = require("express").Router();

// Middleware
router.use(require("./body-parser"));

module.exports = router;