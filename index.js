const express = require("express")
    , os = require("os")
    , routes = require("./routes")
    , logger = require("./infrastructure/logger")
    , db = require("./infrastructure/db")
    , healthCheck = require("./infrastructure/healthcheck")
    , errorHandler = require("./infrastructure/errorhandler")
    , utils = require("./infrastructure/utils");

var app = express();

// Middlewares
app.use("/movies", routes.movie);
app.use(/\/health/, healthCheck.handler);
app.use(errorHandler);

// App initialize
const server = app.listen(utils.getenv("PORT"), () => {

    logger.log(`Server listening on ${os.hostname()}`);

    var dbconf = {
        host: utils.getenv("DB_HOST"),
        port: utils.getenv("DB_PORT"),
        dbname: utils.getenv("DB_NAME")
    };

    if (utils.getenv("DB_AUTH")) {
        dbconf.username = utils.getenv("DB_USERNAME");
        dbconf.password = utils.getenv("DB_PASSWORD");
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