const router = require("express").Router();
const token = require("../../auth/token");
const conn = require("../../database/connection");

const RATING_MIN = 1;
const RATING_MAX = 5;

router.get("/", (req, res) => {
    conn.query(`
        SELECT * FROM votes
    `, (err, results) => {

        // Check for DB errors
        if(err){
            res.status(500).end();
            return;
        }

        // Success
        res.send(results);
    });
});

router.post("/", (req, res) => {

    // Parameters
    const userID = token.verify("user", req.body.jwt);
    const mediaID = req.body.media;
    const rating = parseInt(req.body.rating);

    // Check that the user is authenticated
    if(!userID){
        res.status(401).end();
        return;
    }

    // Check that all necessary parameters were supplied
    if(!mediaID || !rating || rating < RATING_MIN || rating > RATING_MAX){
        res.status(422).end();
        return;
    }

    // Add vote
    conn.query(`
        INSERT INTO votes (user_id, media_id, rating)
        VALUES (
            ${userID},
            "${mediaID}",
            ${rating}
        )
    `, (err) => {

        // Check for DB errors
        if(err){
            res.status(500).end();
            return;
        }

        // Success
        res.end();
    });
});

module.exports = router;
