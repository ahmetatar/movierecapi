module.exports = (function () {
    return {
        getenv: function (name) {
            return process.env[name] ? process.env[name].replace(/(\r\n|\n|\r)/gm, "") : "";
        },

        getRandomSkipValue: function () {
            return Math.floor(Math.random() * 5);
        }
    }
})();