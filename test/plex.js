module.exports = {
    name: "Plex Connection",
    promise: new Promise((resolve, reject) => {
        const plexFetch = require("../plex/fetch");

        plexFetch("/")
            .then((res) => {
                if(res.status === 401){
                    reject("Plex token is invalid.");
                    return;
                }

                resolve();
            })
            .catch(reject);
    })
};
