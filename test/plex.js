module.exports = {
    name: "Plex Connection",
    promise: new Promise((resolve, reject) => {
        const config = require("../config");
        const fetch = require("node-fetch");
        fetch("http://" + config.plex.host + ":" + config.plex.port + "/?X-Plex-Token=" + config.plex.token)
            .then(resolve)
            .catch(reject);
    })
};
