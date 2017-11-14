const logger = require("./logger");

module.exports = function logErrors(err, req, res, next) {
    logger.error(err);
    return res.json({ error: err });
}