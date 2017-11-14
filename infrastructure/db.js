const logger = require("./logger");
const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

module.exports = (function () {

    var _db = null;
    var _attempCount = 0;
    const RETRY_COUNT = 10;
    const RETRY_DELAY_MS = 2000;

    return {
        open: function (url, options) {
            if (_db) return Promise.resolve();
            if (!url) throw new Error("url");

            return new Promise((resolve, reject) => {

                var _err = null;
                var _attemp = function () {
                    if (_attempCount == RETRY_COUNT) {
                        reject(err);
                    }
                    else {
                        MongoClient.connect(url).then((database) => {
                            _db = database;
                            resolve();
                        }).catch((e) => {
                            _attempCount++;
                            _err = e;

                            logger.error("Mongo connection failed. Retrying to connect %d", _attempCount);
                            setTimeout(() => _attemp(), 2000);
                        });
                    }
                }
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
        }
    };
})();