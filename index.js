const config = require("nconf");
const express = require("express");
const routes = require("./routes");
const logger = require("./infrastructure/logger");
const db = require("./infrastructure/db");
const healthCheck = require("./infrastructure/healthcheck");
const errorHandler = require("./infrastructure/errorhandler");

var app = express();
config.argv().env();

// Middlewares
app.use("/movies", routes.movie);
app.use(/\/health/, healthCheck.handler);
app.use(errorHandler);

// App initialize
const server = app.listen(config.get("PORT"), () => {

    logger.log(`Server listening on ${config.get("PORT")}`);

    var dbconf = {
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT"),
        dbname: config.get("DB_NAME")
    };

    if (app.get("env") != "development") {
        dbconf.username = config.get("DB_USERNAME");
        dbconf.password = config.get("DB_PASSWORD");
    }

    db.open(dbconf).then(() => {
        logger.log("Database connection successfuly");
    }).catch((err) => {
        logger.error(err);
    });
});

process.on("SIGTERM", () => {
    healthCheck.shutdownsign = true;

    server.close((err) => {
        if (err) logger.error(err);

        db.close((dberr) => {
            if (err) logger.error(dberr);
            process.exit(0);
        });
    });
});