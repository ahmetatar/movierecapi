const config = require("nconf");
const express = require("express");
const db = require("./infrastructure/db");
const routes = require("./routes");

module.exports = (function () {

    var app = express();

    return {
        initialize: function (cb) {
            // Config
            config.argv().env();

            // Routes
            app.use("/movies", routes.movie);

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