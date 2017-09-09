const fs = require("fs");

// Console colors
const colors = {
    green: "\x1b[32m",
    red: "\x1b[31m"
};

// Read files in this directory
fs.readdir(__dirname, (err, files) => {

    // Check for errors
    if(err){
        console.log("There was an error reading from the test directory:");
        console.log(colors.red, "" + err);
        return;
    }

    // Print test results
    console.log("Test results:");
    files
        .filter(x => x !== "index.js")
        .map(x => require("./" + x))
        .forEach((test) => {
            test.promise
                .then(() => {
                    console.log(colors.green, "* " + test.name + ": Success");
                })
                .catch((error) => {
                    console.log(colors.red, "* " + test.name + ": " + error);
                });
        });
});

