const logger = require("./logger")
    , os = require("os");

const HealthCheckHandler = (function () {

    function sendResponse(res, status, body) {
        res.writeHead(status, { "Content-Type": "text/plain" });
        res.write(body);
        res.end();
    }

    return {
        shutdownsign: false,
        hangThreshold: 0,

        handler: function (req, res, next) {

            if (HealthCheckHandler.shutdownsign) {
                logger.log(`HEALTCHECK::Stop getting traffic - - ${os.hostname()}`);
                return sendResponse(res, 500, "nok");
            }

            if (HealthCheckHandler.hangThreshold < 5) {
                sendResponse(res, 200, "ok");
            }
        }
    }
})();

module.exports = HealthCheckHandler;