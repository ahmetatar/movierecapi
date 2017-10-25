const express = require("express");
const db = require("../infrastructure/db");
const utils = require("../infrastructure/utils");

var router = express.Router();

router.get("/", (req, res) => {
    var skipVal = utils.getRandomSkipValue();
    
    db.collection("movies")
        .find({}, { _id: false })
        .limit(5)
        .skip(skipVal)
        .toArray((err, result) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }

            console.log(result);
            res.json(result);
        });
});

module.exports = router;
