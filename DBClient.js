var mongodb = require('mongodb');

var db;
var dburl;
// export the class
module.exports = DBClient;

// Constructor
function DBClient(url){
    this.dburl = url;
}

DBClient.prototype.connect = function(url, callback){
    mongodb.MongoClient.open(url, function(err, database){
        if(err){
            console.error("errorrrrS!:", err);
        }else{
            console.log("yes!");
            this.db = database;
            callback(err);
        }

    });
};

DBClient.prototype.find = function(collection, query, callback){
    this.db.collection(collection).find(query).toArray().then(callback(docs));
};

DBClient.prototype.update = function(collection, selector, doc){
    // Get the documents collection
    var col = this.db.collection(collection);

    // do some work here with the database.
    //collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, function(err, result) {});
    col.update(selector, doc, {upsert: true}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            //console.log('modified %d documents in the ' + collection + ' collection.', result.result.nModified);
            console.log('modified %d documents in the ' + collection + ' collection. Failure:', result.result.nModified, result.message.queryFailure, result.message.numberReturned);
            //console.log(result.connection);
        }
    });
/*
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
    */
};
