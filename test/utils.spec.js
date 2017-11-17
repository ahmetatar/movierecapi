const expect = require("chai").expect;
const utils = require("../infrastructure/utils");

describe("#Utils", function() {
    it("getRandomSkipValues should return random integer number", function() {
        var skipValue = utils.getRandomSkipValue();
        expect(skipValue).to.be.an("Number");
    });
});