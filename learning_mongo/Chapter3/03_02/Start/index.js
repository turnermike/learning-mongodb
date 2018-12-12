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

    // Add new tour
    // this route will accept POST variables and submit them to the tours table
    // for example, test using Httpie
    // $ http POST http://localhost:8080/api/tours tourName="Mike's Tour" tourPackage="Downtown LA Skate" tourPrice=500 tourLength=3
    {
        method: 'POST',
        path: '/api/tours',
        handler: async function(request, h) {

            try {
                // get post data via request.payload
                const result = await collection.insertOne(request.payload).catch((err) => { throw err });
                return h.response(result);

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

                const result = await collection.findOne({ "tourName": request.params.name }).catch((err) => { throw err });
                // console.log('result',result);
                if(result){
                    return h.response(result);
                }else{
                    return h.response().code(404);
                }


            } catch (err) { console.log(err); }

        }

    },

    // Update a single tour
    // this route will accept a single url parameter for the "tourName"
    // and then update the record with the supplied POST data
    // if the replace parameter is equal to true, the entire record will be replace with provided data
    // without replace example:
    // $ http PUT "http://localhost:8080/api/tours/Mike's Tour" tourBlurb="what what your mom"
    // with replace example:
    // $ http PUT "http://localhost:8080/api/tours/Mike's Tour" tourBlurb="what what your mom" replace==true
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: async function(request, h) {

            try {

                // console.log('request.params.name', request.params.name);

                if(request.query.replace == 'true') {

                    // Note:
                    // request.payload = form post data
                    // request.params = url parameters

                    // set the tourName on payload object so we know what record to replace
                    request.payload.tourName = request.params.name;
                    console.log('request.payload.tourName', request.payload.tourName);

                    // replace
                    const query_result = await collection.replaceOne({ "tourName": request.params.name }, request.payload).catch((err) => { throw err });
                    const find_result = await collection.findOne({ "tourName": request.params.name }).catch((err) => { throw err });

                    return h.response(find_result);

                }

                // return not yet executed, replace is false
                const query_result = await collection.updateOne({ "tourName": request.params.name }, { $set: request.payload }).catch((err) => { throw err });
                const find_result = await collection.findOne({ "tourName": request.params.name }).catch((err) => { throw err });

                return h.response(find_result);

            } catch (err) { console.log(err); }

        }
    },

    // Delete a single tour
    // this route will accept a single url parameter for the "tourName"
    // if found that record will be deleted
    // Hapi will then return a 204 HTTP code
    // for example:
    // $ http DELETE "http://localhost:8080/api/tours/Mike's Tour"
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: async function(request, h) {

            const result = await collection.deleteOne({ tourName: request.params.name }).catch((err) => { throw err });     // Note: no qoutes around index
            return h.response(result).code(204);

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