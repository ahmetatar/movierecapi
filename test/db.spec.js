const assert = require("chai").assert
    , proxyquire = require("proxyquire");

describe("#DB", function () {
    it("open should retry if connection is fail", function () {

        var attempCount = 0;
        var mongodb = { MongoClient: {}, ObjectID: {} };
        var db = proxyquire("../infrastructure/db", { "mongodb": mongodb });

        mongodb.MongoClient.connect = () => {
            attempCount++;
            return Promise.reject("socket error");
        };

        var dbconfig = {
            host: "localhost",
            port: 12345,
            dbname: "test",
            retry: 5,
            retryDelay: 10
        };

        return db.open(dbconfig).catch((err) => {
            assert.equal(attempCount, 5);
            assert.equal(err, "socket error");
        });
    });

    it("open should retry if connection is fail and return database when it success", function () {

        var attempCount = 0;
        var mongodb = { MongoClient: {}, ObjectID: {} };
        var db = proxyquire("../infrastructure/db", { "mongodb": mongodb });

        mongodb.MongoClient.connect = () => {
            attempCount++;
            if (attempCount == 3) return Promise.resolve("database");

            return Promise.reject("socker error");
        };

        var dbconfig = {
            host: "localhost",
            port: 12345,
            dbname: "test",
            retry: 5,
            retryDelay: 10
        };

        return db.open(dbconfig).then((db) => {
            assert.equal(db, "database");
            assert.equal(attempCount, 3);
        });
    });
});