const express = require("express");
const MongoClient = require("mongodb").MongoClient;

var app = express();
var movieRouter = express.Router();

movieRouter.get("/recommend", (req, res) => {
    res.send({ Ok: true });
});

movieRouter.get("/recommend/:category/:year", (req, res) => {
    res.send({ Ok: true });
});

app.use("/movies", movieRouter);
app.listen(process.env.PORT, () => {
    console.log("Server running...");
});