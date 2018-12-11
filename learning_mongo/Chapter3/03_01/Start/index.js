var MongoClient = require('mongodb').MongoClient;

// var url = 'mongodb://localhost:27017/learning_mongo';
var url = 'mongodb://localhost:27017';

var findDocuments = function(db, callback) {

    var collection = db.collection('tours');

    collection.find({"tourPackage":"Snowboard Cali"}).toArray(function(err, docs) {
        console.log(docs);
        callback;
    })
}

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {

    // check for connection errors
    if (err) throw err;

    // connect the db
    var db = client.db('learning_mongo');
    // console.log('db', db);

    // look for documents and close the connection after callback
    findDocuments(db, function(){
        client.close();
    });


});
