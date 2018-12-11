// var MongoClient = require('mongodb').MongoClient;
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27027/learning_mongo';

MongoClient.connect(url, function(err, db) {
    console.log('Connected successfully!');
    db.close();
})