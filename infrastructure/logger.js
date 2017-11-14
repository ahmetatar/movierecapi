const debug = require("debug");

// Initialize
const log = debug("api:log");
const error = debug("api:error");
log.log = console.log.bind(console);

module.exports = (function () {
    return { log, error };
})();