const express = require("express");
const logger = require("../infrastructure/logger");
const db = require("../infrastructure/db");
const utils = require("../infrastructure/utils");
const healthCheck = require("../infrastructure/healthcheck");

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

            healthCheck.hangThreshold++;
            res.json(result);
        });
});

module.exports = router;
