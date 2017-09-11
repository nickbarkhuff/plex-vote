const parser = require("xml2json");
const config = require("../config");
const plexFetch = require("./fetch");

module.exports = new Promise((resolve, reject) => {
    plexFetch("/library/sections")
        .then(res => res.text())
        .then(xmlString => {
            const json = parser.toJson(xmlString, {object: true});
            const sections = json.MediaContainer.Directory.filter(section => section.title === config.plex.section);
            if(sections.length > 0)
                resolve(sections[0].key);
            else
                reject("Your specified Plex section does not exist.")
        })
        .catch(reject);
});