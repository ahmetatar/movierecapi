const express = require("express");
const MongoClient = require("mongodb").MongoClient;

var db = null;
var app = express();

app.get("/movies", (req, res, next) => {

    var skipVal = Math.floor(Math.random() * 5);

    db.collection("movies")
        .find({}, { _id: false })
        .limit(5)
        .skip(skipVal)
        .toArray((err, result) => {

            res.json(result);
        });
});

app.use((err, req, res, next) => {
    console.error(err);
    next(err);
});

MongoClient.connect(process.env.DB_URL).then((database) => {
    db = database;

    app.listen(process.env.PORT, () => {
        console.log("Server running...");
    });

}).catch((err) => {
    console.error(err);
});