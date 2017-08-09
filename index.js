const express = require("express");
const MongoClient = require("mongodb").MongoClient;

var app = express();
var movieRouter = express.Router();

movieRouter.get("/recommend", (req, res) => {
    res.send("Server: " + process.env.SERVER_NAME);
});

movieRouter.get("/recommend/:category/:year", (req, res) => {
    res.send({ id: 1, title: "This is a test" });
});

app.use("/movies", movieRouter);
app.listen(process.env.PORT, () => {
    console.log("Server running...");
});