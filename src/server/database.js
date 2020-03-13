
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);
   
    insertDocuments(db, function() {
    client.close();
    });
});

//Function for inserting Documents
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('Users');
    // Insert some Users into collection
    collection.insertMany([
      {id:100232, firstName: "Ashe", lastName:"Berkshire", language:"English", communication:"Call", category:"Software"}, {id:300534, firstName: "Benjamin", lastName:"Button", language:"Irish", communication:"Chat", category:"Hardware"}, 
    ], function(err, result) {
      console.log("Inserted 2 Users into the collection");
      callback(result);
    });
  }
