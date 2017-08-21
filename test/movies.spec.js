const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;

before(function (done) {
    app.initialize(done);
});

describe("#GET / movies", function () {
    it("should returns random five movies", function (done) {
        
        request(app)
            .get("/movies")
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an("array");
                expect(res.body.length).to.be.equal(5);
                
                done();
            });
    });
});