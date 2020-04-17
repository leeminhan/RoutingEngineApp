const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/RoutingEngineDB'
const databaseName = 'RoutingEngineDB'

// MongoClient.connect(connectionURL, {useNewUrlParser: true}, async(error, client)
const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true});

const insertHandler = async(data, collectionName) => {

    await client.connect().then(async() => {
        console.log("insertHandler: Connected to Database")
        console.log("Collection Name:", collectionName)
        const collection = client.db(databaseName).collection(collectionName)
        await collection.insertOne(data)
        console.log("Successfully inserted to database")
    }).catch(error => {
        console.log("Failed to insert:", error)
    })
}

module.exports = {
    insertHandler: insertHandler
}