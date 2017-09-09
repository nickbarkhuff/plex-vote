const router = require("express").Router();

// Routes
router.use("/example", require("./example-api"));

// Send success message when connected to root
router.get("/", (req, res) => res.send("Connected to API!"));

// Send error message when API route is not valid
router.use("*", (req, res) => res.status(404).send("API route is not valid."));

module.exports = router;