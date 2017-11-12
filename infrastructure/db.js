const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

module.exports = (function () {

    var _db = null;
    var _defaults = {
        reconnectTries: 50,
        reconnectInternval: 1000
    }

    return {
        open: function (url, options) {
            if (_db) return Promise.resolve();
            if (!url) throw new Error("url");

            Object.assign((options || {}), _defaults);

            return MongoClient.connect(url, _defaults).then((database) => {
                _db = database;
            });
        },

        close: function (cb) {
            if (!_db) throw new Error();

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