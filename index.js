const app = require("./app");
const config = require("nconf");

app.initialize((err, app) => {
    if (err) {
        return console.error(err);
    }

    console.log(`Server listening on port ${config.get("PORT")}...`);
});