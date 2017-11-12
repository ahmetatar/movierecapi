module.exports = (function () {

    return {
        shutdownsign: false,
        hangThreshold: 0,

        handler: function (req, res, next) {
            console.log(`Health request: ${req.url}`);

            if (this.shutdownsign) {
                console.log(`Stop getting traffic - ${new Date().toISOString()}`);
                return res.status(500).end("nok");
            }

            if (this.hangThreshold < 5) {
                return res.status(200).end("ok");
            }
        }
    }
})();