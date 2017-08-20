const config = require("nconf");
const express = require("express");

module.exports = function (db) {

    var _db = db;
    var _app = express();

    //Configuration
    config.argv().env();

    // Routes
    _app.get("/movies", (req, res, next) => {

        var skipVal = Math.floor(Math.random() * 5);

        _db.collection("movies")
            .find({}, { _id: false })
            .limit(5)
            .skip(skipVal)
            .toArray((err, result) => {
                res.json(result);
            });
    });

    _app.use((err, req, res, next) => {
        console.error(err);
        next(err);
    });

    return _app;
}