const express = require("express")
    , os = require("os")
    , routes = require("./routes")
    , logger = require("./infrastructure/logger")
    , db = require("./infrastructure/db")
    , healthCheck = require("./infrastructure/healthcheck")
    , errorHandler = require("./infrastructure/errorhandler")
    , utils = require("./infrastructure/utils");

var server = null;
var app = express();

var dbconfig = {
    host: utils.getenv("DB_HOST"), 
    port: utils.getenv("DB_PORT"), 
    dbname: utils.getenv("DB_NAME")
};

if (utils.getenv("DB_AUTH")) {
    dbconfig.username = utils.getenv("DB_USERNAME");
    dbconfig.password = utils.getenv("DB_PASSWORD");
}

const READINESS_PROBE_DELAY = 4000; // periodSeconds * failureThreshold

// Middlewares
app.use("/movies", routes.movie);
app.use(/\/health/, healthCheck.handler);
app.use(errorHandler);

// Initialize app
db.open(dbconfig).then(() => {
    logger.log("Database connection successfuly");

    server = app.listen(utils.getenv("PORT"), () => {
        logger.log(`Server listening on ${os.hostname()}`);
    });
}).catch((err) => {
    logger.error(err);
});

process.on("SIGTERM", () => {
    healthCheck.shutdownsign = true;

    setTimeout(() => {
        server.close((err) => {
            if (err) return logger.error(err);
            logger.log("SIGTERM::Closed all waiting connections");

            db.close((dberr) => {
                if (err) logger.error(dberr);
                logger.log("SIGTERM::Closed database connection");
                process.exit(0);
            });
        });
    }, READINESS_PROBE_DELAY);
});