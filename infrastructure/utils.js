module.exports = (function () {
    return {
        getRandomSkipValue: function () {
            return Math.floor(Math.random() * 5);
        }
    }
})();