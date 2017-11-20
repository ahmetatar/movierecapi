const express = require("express")
    , os = require("os")
    , routes = require("./routes")
    , logger = require("./infrastructure/logger")
    , db = require("./infrastructure/db")
    , healthCheck = require("./infrastructure/healthcheck")
    , errorHandler = require("./infrastructure/errorhandler");

var app = express();

// Middlewares
app.use("/movies", routes.movie);
app.use(/\/health/, healthCheck.handler);
app.use(errorHandler);

// App initialize
const server = app.listen(process.env.PORT, () => {

    logger.log(`Server listening on ${os.hostname()}`);

    var dbconf = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dbname: process.env.DB_NAME
    };

    if (app.get("env") != "development") {
        dbconf.username = process.env.DB_USERNAME;
        dbconf.password = process.env.DB_PASSWORD;
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