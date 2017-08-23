const appModule = require("../app");
const request = require("supertest");
const expect = require("chai").expect;

var _app = null;

before(function (done) {
    appModule.initialize((err, app) => {
        if (err) throw err;

        _app = app;
        done();
    });
});

describe("#GET / movies", function () {
    it("should returns random five movies", function (done) {
        
        request(_app)
            .get("/movies")
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an("array");
                expect(res.body.length).to.be.equal(5);
                
                done();
            });
    });
});