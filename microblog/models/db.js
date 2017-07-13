var setting = require('../setting');
var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
var MongoClient=require('mongodb').MongoClient;
var Server = require('mongodb').Server;

// module.exports = new Db(setting.db,new Server(setting.host, Connection.DEFAULT_PORT, {}));

module.exports = new MongoClient(new Server(setting.host,27017,{},{}));
