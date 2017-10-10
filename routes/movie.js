const express = require("express");
const db = require("../infrastructure/db");
const utils = require("../infrastructure/utils");
const config = require("nconf");

var router = express.Router();

router.get("/", (req, res) => {
    var skipVal = utils.getRandomSkipValue();
    
    res.send(config.get("DB_URL"));

/*     db.collection("movies")
        .find({}, { _id: false })
        .limit(5)
        .skip(skipVal)
        .toArray((err, result) => {
            res.json(result);
        }); */
});

module.exports = router;
