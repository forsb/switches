var express = require('express');
var app = express();

var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;

var dburl = 'mongodb://localhost:27017/homer';

function dbinsert(collection, document){

    MongoClient.connect(dburl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', dburl);

            // Get the documents collection
            var col = db.collection(collection);

            // do some work here with the database.
            col.insert(document, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.insertedCount, result);
                }
            });
    
            //Close connection
            db.close();
        }
    });
}

function dbupdate(collection, keydoc, fielddoc){

    MongoClient.connect(dburl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', dburl);

            // Get the documents collection
            var col = db.collection(collection);

            // do some work here with the database.
            //collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, function(err, result) {});
            col.update(keydoc, fielddoc, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log('modified %d documents in the ' + collection + ' collection.', result.result.nModified);
                    console.log('modified %d documents in the ' + collection + ' collection. Failure:', result.result.nModified, result.message.queryFailure, result.message.numberReturned);
                    //console.log(result.connection);
                }
            });
    
            //Close connection
            db.close();
        }
    });
}

function dbfind(collection, document){

    MongoClient.connect(dburl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', dburl);

            // Get the documents collection
            var col = db.collection(collection);

            // do some work here with the database.
            var cursor = col.find(document);

            //Lets iterate on the result
            cursor.each(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log('Fetched:', doc);
            }
            });
            //Close connection
            db.close();
        }
    });
}


//List all resources
app.get('/resources/', function (req, res) {
    dbfind('switches', {});
    res.send('List all resources');
})

//List a resource
app.get('/resources/:id', function (req, res) {
    var id = req.params.id;

    if(!isNaN(id)){
        res.send('List resource ' + id + '\n');
    }
    else{
        res.status(400).send('id ' + id + ' NaN\n');        
    }
})

//Replace entire collection
app.put('/resources/', function (req, res) {
    res.send('Replace entire collection');
   
})

//Replace a resource
app.put('/resources/:id', function (req, res) {
    var id = req.params.id;
    var body = req.body;
    console.log(body);

    if(!isNaN(id)){
        dbupdate('switches', {name:'korvss'}, {$set:{sauce: true}});
        res.send('Replace member ' + id + '\n');
    }
    else{
        res.status(400).send('id ' + id + ' NaN\n');        
    }
    
   
})

//Create a new resource in the collection, return id
app.post('/resources/', function (req, res) {
    dbinsert('switches', {name:'apapapa'});
    res.send('Create new resource\n');
   
})

//Not used, create a collection inside resource
app.post('/resources/:id', function (req, res) {
    res.status(400).send('Functionality not used\n');
   
})

//Not used, delete entire collection
app.delete('/resources/', function (req, res) {
    res.status(400).send('Functionality not used\n');
   
})

//Delete resource
app.delete('/resources/:id', function (req, res) {
    var id = req.params.id;

    if(!isNaN(id)){
         res.send('Delete resource ' + id + '\n');
    }
    else{
        res.status(400).send('id ' + id + ' NaN\n');        
    }
   
})



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})