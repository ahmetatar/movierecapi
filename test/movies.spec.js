const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;

before(function (done) {
    app.initialize(done);
});

describe("Get Movies", function () {
    it("should returns random five movies", function (done) {
        
    });
});