const config = require("nconf");
const express = require("express");
const db = require("./infrastructure/db");

module.exports = (function () {

    var app = express();

    return {
        initialize: function (cb) {
            // Config
            config.argv().env();

            // Routes
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

            // Middlewares
            app.use((err, req, res, next) => {
                console.error(err);
                next(err);
            });

            // DB
            db.open(config.get("DB_URL")).then(() => {
                app.listen(config.get("PORT"), () => {
                    return cb(null, app);
                });
            }).catch((err) => {
                return cb(err);
            });
        }
    }
})();