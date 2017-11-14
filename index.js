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

// DB
const server = app.listen(config.get("PORT"), () => {

    logger.log(`Server listening on ${config.get("PORT")}`);
    logger.log(`Database connecting to ${config.get("DB_URL")}`);

    db.open(config.get("DB_URL")).then(() => {
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