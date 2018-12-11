var MongoClient = require('mongodb').MongoClient,
    Hapi = require('hapi');

// var url = 'mongodb://localhost:27017/learning_mongo'
var url = 'mongodb://localhost:27017'

// var server = new Hapi.Server();
// server.connection({
//     port:8080
// })
server = new Hapi.Server({
    host: 'localhost',
    port: 8080
});
console.log('Hapi running at: ' + server.info.uri);


server.route( [
    // Get tour list
    // {
    //     method: 'GET',
    //     path: '/api/tours',
    //     handler: function(request, reply) {
    //         // reply ("Getting tour list!");
    //         collection.find().toArray(function(error, tours) {
    //             // reply(tours);
    //             // console.log('tours',tours);
    //             return 'testing 123';
    //         })
    //     }
    // },
    {
        method: 'GET',
        path: '/api/tours',
        handler: async function(request, h) {

            try {
                const results = await collection.find().toArray().catch((err) => { throw err });
                return results;

            } catch (err) { console.log(err); }

        }
    },

    // Add new tour
    {
        method: 'POST',
        path: '/api/tours',
        handler: function(request, reply) {
            reply ("Adding new tour");
        }
    },
    // Get a single tour
    {
        method: 'GET',
        path: '/api/tours/{name}',
        handler: function(request, reply) {
            reply ("Retrieving " + request.params.name);
        }
    },
    // Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: function(request, reply) {
            // request.payload variables
            reply ("Updating " + request.params.name);
        }
    },
    // Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: function(request, reply) {
            reply ("Deleting " + request.params.name).code(204);
        }
    },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply( "Hello world from Hapi/Mongo example.")
        }
    }
])

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {

    // check for connection errors
    if (err) throw err;

    // collection = client.collection('tours');

    db = client.db('learning_mongo');

    collection = db.collection('tours');

    // server.start(function(err) {
    //     console.log('Hapi is listening to http://localhost:8080')
    // })
    server.start();

})