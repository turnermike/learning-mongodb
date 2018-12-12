# Learning MongoDB
[https://www.lynda.com/Moodle-tutorials/Welcome/573253/611674-4.html](https://www.lynda.com/Moodle-tutorials/Welcome/573253/611674-4.html?)

Working file is learning_mongo/Chapter3/03_02/Start/index.js


## Start Up

1. Start MongoDB Daemon/Server.
```mongod```

2. Start MongoDB Shell in another tab.
```mongo```

3. Start Hapi Server.
```
cd /Users/mike/Sites/Personal/learning-mongo-db/learning_mongo/Chapter3/03_02/Start
nodemon index.js
```


## Testing

HTTPie is a CLI HTTP client that can be used for testing API development. [https://httpie.org/](https://httpie.org/)

Simple Get Request
```
http http://localhost:8080/api/tours
```

Make A Post Request With Data (insert)
```
http POST http://localhost:8080/api/tours tourName="Kirsten's Fabulous Tour" tourPackage="Fun in the sun" tourPrice=1000 tourLength=5
```

A Put Request With Parameter (update)
```
http PUT "http://localhost:8080/api/tours/Mike's Tour" tourBlurb="what what your mom" replace==true
```

A Delete Request
```
http DELETE "http://localhost:8080/api/tours/Mike's Tour"
```


## Related Docs

Commands/Cheat Sheet:
[https://docs.mongodb.com/manual/reference/mongo-shell/#command-helpers](https://docs.mongodb.com/manual/reference/mongo-shell/#command-helpers)

Docs:
[https://docs.mongodb.com/manual/core/databases-and-collections](https://docs.mongodb.com/manual/core/databases-and-collections)


## Helpful Links

MongoClient issue:
[https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0](https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0)

Hapi issue:
[https://github.com/hapijs/discuss/issues/567](https://github.com/hapijs/discuss/issues/567)

