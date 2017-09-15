const router = require("express").Router();
const token = require("../../auth/token");
const conn = require("../../database/connection");
const {wilson} = require("../../lib");

const RATING_MIN = 1;
const RATING_MAX = 5;

router.get("/", (req, res) => {
    conn.query(`
        SELECT
            media_id AS media,
            users.username,
            rating
        FROM votes
        INNER JOIN users
        ON users.id = user_id
    `, (err, results) => {

        // Check for DB errors
        if(err){
            res.status(500).end();
            return;
        }

        // Group votes
        let grouped = {};
        results.forEach((item) => {
            const vote = {
                username: item.username,
                rating: item.rating
            };
            if(grouped[item.media]){
                grouped[item.media].votes.push(vote);
            }
            else{
                grouped[item.media] = {
                    score: null,
                    votes: [vote]
                };
            }
        });

        // Calculate ratings
        Object.keys(grouped).forEach((key) => {
            const positive = grouped[key].votes.reduce((acc, cur) => acc + cur.rating, 0);
            const total = grouped[key].votes.length * RATING_MAX;
            grouped[key].score = wilson(positive, total);
        });

        // Success
        res.send(grouped);
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
