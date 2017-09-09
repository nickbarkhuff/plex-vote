const config = require("../config");
const express = require("express");
const path = require("path");

const app = express();

// Start the server
app.listen(config.port, () => {
    console.log("Server started on port " + config.port + "\n");
});

// Serve static files
app.use(express.static("www"));

// Import API routes / middleware
app.use("/api", require("./middleware"), require("./routes"));

// Fallback for unknown requests
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../www/index.html"));
});