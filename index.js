const config = require("nconf");
const express = require("express");
const db = require("./infrastructure/db");
const routes = require("./routes");

var app = express();
config.argv().env();

// Routes
app.use("/movies", routes.movie);

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    return next(err);
});

// DB
app.listen(config.get("PORT"), () => {

    console.log(`Server listening on ${config.get("PORT")}`);
    console.log(`Database connecting to ${config.get("DB_URL")}`)

    db.open(config.get("DB_URL")).then(() => {
        console.log("Database connection successfuly");
    }).catch((err) => {
        console.error(err);
    });
});