const logger = require("./logger")
    , ObjectId = require("mongodb").ObjectID
    , MongoClient = require("mongodb").MongoClient
    , utils = require("./utils");

var Database = (function () {

    var _db = null;
    var _attemptCount = 0;
    const RETRY_COUNT = 20;
    const RETRY_DELAY_MS = 5000;

    function createConnectionString(config) {
        var cstr = "mongodb://";

        config.username && (cstr += config.username) && (cstr += ":");
        config.password && (cstr += config.password);
        (config.username && config.password) && (cstr += "@");
        config.host && (cstr += config.host);
        config.port && (cstr += ":") && (cstr += config.port);
        config.dbname && (cstr += ("/" + config.dbname));

        return cstr;
    }

    return {
        open: function (config) {
            if (_db) return Promise.resolve();

            var connstr = createConnectionString(config);
            logger.log(`Connecting to database ${connstr}`);

            return new Promise((resolve, reject) => {

                var _err = null;
                var _attempt = function () {
                    if (_attemptCount == (config.retry || RETRY_COUNT)) {
                        reject(_err);
                    }
                    else {
                        MongoClient.connect(connstr).then((database) => {
                            _db = database;
                            resolve(database);
                        }).catch((e) => {
                            _attemptCount++;
                            _err = e;

                            logger.error("Mongo connection failed. Retrying to connect %d", _attemptCount);
                            setTimeout(() => _attempt(), (config.retryDelay || RETRY_DELAY_MS));
                        });
                    }
                }

                _attempt();
            });
        },

        close: function (cb) {
            if (!_db) return cb();

            _db.close(cb);
        },

        collection: function (collectionName) {
            if (!collectionName) throw new Error("collectionName");
            var collection = _db.collection(collectionName);

            collection.findById = function (id) {
                return this.findOne({ _id: new ObjectId(id) });
            };

            return collection;
        },

        createConfigByEnvironment: function () {
            var dbconfig = {
                host: utils.getenv("DB_HOST"),
                port: utils.getenv("DB_PORT"),
                dbname: utils.getenv("DB_NAME")
            };

            if (utils.getenv("DB_AUTH")) {
                dbconfig.username = utils.getenv("DB_USERNAME");
                dbconfig.password = utils.getenv("DB_PASSWORD");
            }

            return dbconfig;
        }
    };
})();

module.exports = Database;