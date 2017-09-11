const parser = require("xml2json");
const config = require("../config");
const plexFetch = require("./fetch");

module.exports = new Promise((resolve, reject) => {
    plexFetch("/library/sections")
        .then(res => res.text())
        .then(xmlString => {
            const json = parser.toJson(xmlString, {object: true});
            const sections = json.MediaContainer.Directory;
            const section = sections.filter(section => section.title === config.plex.section)[0];
            const sectionID = section.key;
            resolve(sectionID);
        })
        .catch(reject);
});