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
    {
        // this route will accpet a url parameter and use that as it's search criteria
        // for example: http://localhost:8080/api/tours?tourPackage=Backpack Cal
        method: 'GET',
        path: '/api/tours',
        config: {json: { space: 2}},
        handler: async function(request, h) {
            try {

                // object to store results
                const findObject = {};
                // loop each url parameter key/value
                for(var key in request.query) {
                    // save to object
                    findObject[key] = request.query[key];
                }
                // run query using those key/value pairs in the find method
                const results = await collection.find(findObject).toArray().catch((err) => { throw err });
                // return the results
                return results;


            } catch (err) { console.log(err); }

        }
    },

    // // Add new tour
    // this route will accept POST variables and submit them to the tours table
    // for example, test using Httpie
    // $ http POST http://localhost:8080/api/tours tourName="Mike's Tour" tourPackage="Wicked Tuna" tourPrice=500 tourLength=3
    {
        method: 'POST',
        path: '/api/tours',
        handler: async function(request, h) {

            try {
                // get post data via request.payload
                const result = await collection.insertOne(request.payload).catch((err) => { throw err });
                return request.payload;

            } catch (err) { console.log(err); }
        }
    },

    // Get a single tour
    {
        // this route will accept a single url parameter for the "tourName"
        // .findOne() is used to retrieve a single item
        // for example: http://localhost:8080/api/tours/Big%20Sur%20Retreat
        method: 'GET',
        path: '/api/tours/{name}',
        handler: async function(request, h) {

            try {

                const results = await collection.findOne({ "tourName": request.params.name}).catch((err) => { throw err });
                return results;

            } catch (err) { console.log(err); }

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