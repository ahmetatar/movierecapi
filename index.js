const db = require("./infrastructure/db");
const app = require("./app")(db);
const config = require("nconf");

db.open(config.get("DB_URL")).then(() => {

    app.listen(config.get("PORT"), () => {
        console.log(`Server listening on port ${config.get("PORT")}...`);
    });
}).catch((err) => {
    console.error(err);
    process.exit(1);
});