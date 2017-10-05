const config = require("nconf");
const express = require("express");
const db = require("./infrastructure/db");
const routes = require("./routes");
const dbg = require("debug")("app");

var app = express();
config.argv().env();

// Routes
app.use("/movies", routes.movie);

// Middlewares
app.use((err, req, res, next) => {
    dbg(err);
    return next(err);
});

// DB
db.open(config.get("DB_URL")).then(() => {
    app.listen(config.get("PORT"), () => {
        dbg("Server listening on %s", config.get("PORT"));
    });
}).catch((err) => {
    dbg(err);
});