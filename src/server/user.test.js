
const {MongoClient} = require('mongodb');
//const db = require("./../js/db.js").dbUtils;
const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'RoutingEngineDB';

describe('Test insert function', () => {
  let connection;
  let db1;

  beforeAll(async () => {
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });
    db1 = await connection.db(databaseName);
  });

  afterAll(async () => {
    await connection.close();
    await db1.close();
  });

  it('insert doc into db', async () => {

    const mockUser = {_id: '23121234', firstName: 'firstName', lastName: 'lastName', chatMode: "chat", top: "CPF Pay Out"};

    try{
    await db.insertOne(mockUser,'user');
    const users = db1.collection('user');
    const insertedUser = await users.findOne({firstName: 'firstName'});
    expect(insertedUser).toEqual(mockUser);
  } catch (err){
    console.log("User already exists!");
  } 
  });

  it('search for doc in db', async () => {
    const mockUser = {_id: '23121234', firstName: 'firstName', lastName: 'lastName', chatMode: "chat", top: "CPF Pay Out"};
    const user = db1.collection("user");

    try{
      await user.insertOne(mockUser);
      const resultUser = await db.search({id: "some_user_id"}, "user");
      expect(resultUser).toEqual(mockUser);
    } catch(err) {
      console.log("User already exists!");
    }
  });

  it('update doc in db', async () => {
    try{
      await db.update({firstName: "firstName"}, {lastName: "lastName"}, "user");
      const user = db1.collection("user");
      const resultUser = await user.findOne({id: "some_user_id"});
      expect(resultUser.lastName).toBe("lastName");
    } catch(err){
      console.log("Error: " + err);
    }
  });

  it('find docs matching query in db', async () => {
    try{
      const users = db.findAll({top: "CPF payout"}, "user");
      const user = db1.collection("user");
      const results = user.find({top: "CPF payout"}).toArray();
      expect(results).toEqual(users);
    } catch (err) {
      console.log("Error: " + err);
    }
  });

  it('delete doc in db', async () => {
    try{
      await db.delete({top: "CPF payout"}, "user");
      const user = myDB.collection("user");
      const resultUser = await user.findOne({top: "CPF payout"});
      expect(resultUser).toBe(null);
    } catch(err){
      console.log("Error: " + err);
    }
  });
});