const debug = require("debug");

// Initialize
const log = debug("app:log");
const error = debug("app:error");
log.log = console.log.bind(console);

module.exports = (function () {
    return { log, error };
})();