const expect = require("chai").expect;
const db = require("../infrastructure/db");

describe("#DB", function() {
    it("getConnectionString should return valid mongo connection string", function() {

        var config = {
            host: "localhost",
            port: 27017,
            dbname: "moviedb",
            username: "root",
            password: "123"
        };

        var connstr = db.getConnectionString(config);

        expect(connstr).to.be.an("String");
        expect(connstr).eq("mongodb://localhost:27017/moviedb");
    });
});