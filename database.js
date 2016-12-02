var mongodb = require('mongodb');


// Constructor
function DBClient(url){
    this.dburl = url;
}

function connect(url, callback){
    mongodb.MongoClient.connect(dburl, function(err, database){
        this.db = database;
        callback(err, database);
    });
}

function find(collection, query, callback){
    this.db.collection(collection).find(query).toArray().then(callback(docs));
}

function update(collection, keydoc, fielddoc){

    MongoClient.connect(dburl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            // We are connected. 
            console.log('Connection established to', this.dburl);

            // Get the documents collection
            var col = this.db.collection(collection);

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
            this.db.close();
        }
    });
}

// export the class
module.exports = DBClient;
