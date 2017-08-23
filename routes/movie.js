const express = require("express");
const db = require("../infrastructure/db");

var router = express.Router();

router.get("/", (req, res) => {
    var skipVal = Math.floor(Math.random() * 5);

    db.collection("movies")
        .find({}, { _id: false })
        .limit(5)
        .skip(skipVal)
        .toArray((err, result) => {
            res.json(result);
        });
});

module.exports = router;
