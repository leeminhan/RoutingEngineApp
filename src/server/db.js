const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/RoutingEngineDB'
const databaseName = 'RoutingEngineDB'

// MongoClient.connect(connectionURL, {useNewUrlParser: true}, async(error, client)
const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true});

const insertHandler = async(data, collectionName) => {
    // client.connect() should one called once -- IMPORTANT
    await client.connect().then(async() => {
        console.log("insertHandler: Connected to Database")
        // console.log("Collection Name:", collectionName)
        const collection = client.db(databaseName).collection(collectionName)
        await collection.insertOne(data)
        console.log("insertHandler --- end \n")
    }).catch(error => {
        console.log("Failed to insert:", error)
    })
}

const findHandler = async(query, collectionName) => {

    try{
        console.log("findHandler: Connected to Database")
        // console.log("Collection Name:", collectionName)
        const collection = client.db(databaseName).collection(collectionName)
        const result = await collection.findOne(query)
        console.log("findHandler --- end \n")
        return result

    }catch(error){
        console.log("Failed to insert:", error)
    }
}

const updateHandler = async(data, collectionName) => {

    await client.connect().then(async() => {
        console.log("updateHandler: Connected to Database")
        // console.log("Collection Name:", collectionName)
        const collection = client.db(databaseName).collection(collectionName)
        await collection.updateOne(data)
        ////missing code here
        console.log("Successfully udpated to database:", data)
    }).catch(error => {
        console.log("Failed to insert:", error)
    })
}
module.exports = {
    insertHandler: insertHandler,
    updateHandler: updateHandler,
    findHandler: findHandler
}