const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

module.exports = (function () {

    var _db = null;

    return {
        open: function (url) {
            if (_db) return Promise.resolve();
            if (!url) throw new Error("url");

            return MongoClient.connect(url).then((database) => {
                _db = database;
            });
        },

        close: function () {
            if (!_db) throw new Error();

            _db.close();
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