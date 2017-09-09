const config = require("../config");
const fetch = require("node-fetch");

module.exports = (route = "/", options = {}) => {
    const url = "http://" + config.plex.host + ":" + config.plex.port + route + "?X-Plex-Token=" + config.plex.token;
    return fetch(url, options);
};
