var express = require('express');
var path = require('path');
//var mongodb = require('mongodb');
var DBClient = require('./DBClient');
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;


var app = express();
//var MongoClient = mongodb.MongoClient;

var dburl = 'mongodb://localhost:27017/homer';

console.log("apapapa");
var db = new DBClient(dburl);

//TODO:
//Error handling

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Serve all files in the /public folder
app.use(express.static(path.join(__dirname, 'public')));

//Connect to the database before starting the application server.
// mongodb.MongoClient.connect(dburl, function (err, database) {
db.connect(dburl, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    //Save database object from the callback for reuse.
    //db = database;
    console.log("Database connection ready");

    //Spawn rf listener
    var ls = spawn('pwd', []);

    ls.stdout.on('data', function (data) {
        console.log('stdout: ' + data );
        data = '{"sensorId": 1, "packageCount": 1337, "temp": 23.40, "humidity": 87.60, "blinkCount": 1337}';
        output = JSON.parse(data);


    });

    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    ls.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });


    //Initialize the app.
    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port);
    });
});

//Send index.html
app.get('/switches/', function (req, res) {
    res.sendFile(path.join(__dirname , 'public', 'index.html'));
});

//List all resources
app.get('/resources/', function (req,res) {
    database.find(query, function(docs){
        console.log(docs);
        res.send(docs);
    });

    // db.collection('switches').find({}).toArray().then(function (docs) {
    //     console.log(docs);
    //     res.send(docs);
    // });
});

//List a resource
app.get('/resources/:id', function (req, res) {
    var resid = req.params.id;

    if(!isNaN(resid)){
        db.collection('switches').find({id: parseInt(resid)}).toArray().then(function (docs) {
            console.log(docs);
            res.send(docs);
        });
    }
    else{
        res.status(400).send(resid + ' NaN\n');
    }
});

//TODO Replace entire collection
app.put('/resources/', function (req, res) {
    res.send('Replace entire collection');
});

//TODO Replace a resource
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
});

//Create a new resource in the collection
app.post('/resources/', function (req, res) {
    db.collection('switches').insert(req.body).then(function (docs){
        console.log(docs);
        res.send(docs.ops);
    });
});

//Not used, create a collection inside resource
app.post('/resources/:id', function (req, res) {
    res.status(400).send('Functionality not used\n');
});

//Not used, delete entire collection
app.delete('/resources/', function (req, res) {
    res.status(400).send('Functionality not used\n');

});

//Delete resource
app.delete('/resources/:id', function (req, res) {
    var resid = req.params.id;

    if(!isNaN(resid)){
        db.collection('switches').remove({id:parseInt(resid)}).then(function (docs){
            console.log(docs.result);
            res.send(docs.result);
        });
    }
    else{
        res.status(400).send('id ' + id + ' NaN\n');
    }

});



// function dbupdate(collection, keydoc, fielddoc){

//     MongoClient.connect(dburl, function (err, db) {
//         if (err) {
//             console.log('Unable to connect to the mongoDB server. Error:', err);
//         } else {
//             //HURRAY!! We are connected. :)
//             console.log('Connection established to', dburl);

//             // Get the documents collection
//             var col = db.collection(collection);

//             // do some work here with the database.
//             //collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, function(err, result) {});
//             col.update(keydoc, fielddoc, function (err, result) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     //console.log('modified %d documents in the ' + collection + ' collection.', result.result.nModified);
//                     console.log('modified %d documents in the ' + collection + ' collection. Failure:', result.result.nModified, result.message.queryFailure, result.message.numberReturned);
//                     //console.log(result.connection);
//                 }
//             });

//             //Close connection
//             db.close();
//         }
//     });
// }
