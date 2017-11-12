module.exports = function logErrors(err, req, res, next) {
    // Handle error or pass error to default error handler
    return next(err);
}