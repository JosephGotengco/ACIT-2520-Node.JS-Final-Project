const MongoClient = require('mongodb').MongoClient;

var _db = null;

module.exports.getDb = () => {
    return _db;
};

module.exports.init = function(callback) {
    MongoClient.connect('mongodb://heroku_vfnsz6n0:lu789kc4ibb8pgo0ggvrgtd1hr@ds135456.mlab.com:35456/heroku_vfnsz6n0', (err, client) => {
        if (err) {
            return console.log('Unable to connect to DB')
        }
        _db = client.db('heroku_vfnsz6n0');
        console.log('Successfully connected to MongoDB server');
    });
};