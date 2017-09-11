module.exports = {
    name: "Plex Connection",
    promise: new Promise((resolve, reject) => {
        const plexFetch = require("../plex/fetch");

        plexFetch("/")
            .then(resolve)
            .catch(reject);
    })
};
