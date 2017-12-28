const MongoClient = require('mongodb').MongoClient;
const KEYS = require('../config/serverConfig.js').KEYS;
const URL = KEYS.mongoURI;

var DB;

module.exports = {
    connect: (callback)=> {
        MongoClient.connect(URL, function(err, database) {
            if (err) {
                console.log('Fail to connect', err);
            }
            else {
                DB = database.db('fuse_dev_db');
                return callback(err);
            }
        });
    },
    getDB: ()=> {
        return DB;
    }
};