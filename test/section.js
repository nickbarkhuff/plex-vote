module.exports = {
    name: "Plex Section Exists",
    promise: new Promise((resolve, reject) => {
        const section = require("../plex/section");
        section
            .then(resolve)
            .catch(reject);
    })
};
