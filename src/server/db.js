const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
// const connectionURL = 'mongodb://127.0.0.1:27017/RoutingEngineDB'
const connectionAtlasURL = 'mongodb+srv://minhan:Sutd@1234@cluster0-ptwab.mongodb.net/test' //put into git ignore once proj ends
const databaseName = 'RoutingEngineDB'

// MongoClient.connect(connectionURL, {useNewUrlParser: true}, async(error, client)
const client = new MongoClient(connectionAtlasURL, { useNewUrlParser: true, useUnifiedTopology: true});

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

// For User with specific TOP and shortest timestamp
const findConditionHandler = async(query, collectionName) => {

    try{
        console.log("findHandler: Connected to Database")
        // console.log("Collection Name:", collectionName)
        const collection = client.db(databaseName).collection(collectionName)
        const result = await collection.find(query).next() //next() will go to the first entry
        console.log("findHandler --- end \n")
        console.log("result:",result)
        console.log(typeof(result))
        return result

    }catch(error){
        console.log("Failed to insert:", error)
    }
}

const deleteHandler = async(query, collectionName) => {
    try{
        console.log("deleteHandler: Connected to Database")
        const collection = client.db(databaseName).collection(collectionName)
        console.log("deleteHandler --- end \n")
        await collection.deleteOne(query) //note there is no await as we need this object returned to perform other filters
        
    }catch(error){
        console.log("Failed to delete:", error)
    }
}

const updateHandler = async(data, update, collectionName) => {

    await client.connect().then(async() => {
        console.log("updateHandler: Connected to Database")
        // console.log("Collection Name:", collectionName)
        const collection = client.db(databaseName).collection(collectionName)
        await collection.updateOne(data, update)

        // db.collection('agent').updateOne({
        //     agentId: agentId
        // },{
        //     $set:{
        //         availability: "busy" 
        //     }
        // }).then((result) => {
        //     console.log("Agent Availability Updated:", result)
        // }).catch(error => {
        //     console.log("Failed to update agent")
        //     console.log(error)
        // })

        console.log("Successfully udpated to database:", data)
    }).catch(error => {
        console.log("Failed to insert:", error)
    })
}
module.exports = {
    insertHandler: insertHandler,
    updateHandler: updateHandler,
    findHandler: findHandler,
    deleteHandler: deleteHandler,
    findConditionHandler: findConditionHandler
}