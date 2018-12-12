# Learning MongoDB
[https://www.lynda.com/Moodle-tutorials/Welcome/573253/611674-4.html](https://www.lynda.com/Moodle-tutorials/Welcome/573253/611674-4.html?)


## Start Up

1. Start MongoDB Daemon/Server.
```mongod```

2. Start MongoDB Shell in another tab.
```mongo```

3. Start Hapi Server.
```
cd /Users/mike/Sites/Personal/learning-mongo-db/learning_mongo/Chapter3/03_02/Start
node index.js
```


## Testing

HTTPie is a CLI HTTP client that can be used for testing API development. [https://httpie.org/](https://httpie.org/)

A Simple GET request:
```
http http://localhost:8080/api/tours
```

A POST request using Httpie:
```
http POST http://localhost:8080/api/tours tourName="Mike's Tour" tourPackage="Wicked Tuna" tourPrice=500 tourLength=3
```


## Helpful Links

MongoClient issue:
[https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0](https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0)

Hapi issue:
[https://github.com/hapijs/discuss/issues/567](https://github.com/hapijs/discuss/issues/567)

