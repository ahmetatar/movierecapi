const express = require("express")
    , logger = require("../infrastructure/logger")
    , db = require("../infrastructure/db")
    , utils = require("../infrastructure/utils")
    , healthCheck = require("../infrastructure/healthcheck");

var router = express.Router();

router.get("/", (req, res, next) => {
    var skipVal = utils.getRandomSkipValue();

    db.collection("movies")
        .find({}, { _id: false })
        .limit(5)
        .skip(skipVal)
        .toArray((err, result) => {
            if (err) {
                logger.error(err);
                return res.json({ error: "opps!" });
            }

            //healthCheck.hangThreshold++;
            res.json(result);
        });
});

module.exports = router;
