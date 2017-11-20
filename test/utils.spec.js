const expect = require("chai").expect;
const utils = require("../infrastructure/utils");

describe("#Utils", function() {
    it("getRandomSkipValues should return random integer number", function() {
        var skipValue = utils.getRandomSkipValue();
        expect(skipValue).to.be.an("Number");
    });

    it("getenv should remove all line breaks and return environment", function() {
        
        process.env.TEST = "Hello\n\r World!"
        var env = utils.getenv("TEST");

        expect(env).to.be.equals("Hello World!");
    });
});