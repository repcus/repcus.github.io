const { MongoClient } = require('mongodb');
var properties = require('./properties')

const mongoConnectionString = properties.mongoConnectionString;
const userName = properties.userName;
const password = properties.password;
const dbName = properties.dbName;
const operationsCollectionName = properties.operationsCollectionName;
const recipesCollectionName = properties.recipesCollectionName;

MongoClient.connect(mongoConnectionString, { 
  auth:{authdb:'admin', username:'root', password:'password'},
  authSource:'admin',
  useNewUrlParser: true }, async function(err, client) {

    if(err) {
        return console.log('Error: could not connect to mongodb')
    }
    console.log("Connected to mongodb");

    const db = client.db(dbName);  
    createCollection(db, operationsCollectionName);
    createCollection(db, recipesCollectionName);
    await db.command({
        createRole: 'application',
        privileges: [
            { resource: { db: dbName, collection: operationsCollectionName }, actions:['find'] },
            { resource: { db: dbName, collection: recipesCollectionName   }, actions:['find', 'insert'] }
        ], roles: [] });
    console.log("Created application role");
    await addUserToDb(db, dbName, 'application');

    await populateDb(db);
    console.log("Populated database");
    client.close();
  });

async function addUserToDb(db, dbName, role) {
    await db.addUser(userName,  password, {
        roles: [{
            role:   role,
            db:     dbName
            }]
        }, 
        function (err, result) {
            if (err){
                console.log(`Error: could not add user ${userName} to database ${dbName} with role ${role}`);
                throw err;
            }
            console.log(`Added user ${userName} to database ${dbName} with role ${role}`);
        }
    );
}

function createCollection(db, collectionName)  {
    db.createCollection(collectionName, function(err, res) {
        if(err) {
            console.error(`Could not create collection ${collectionName}`);
            throw err;
        }
        console.log(`Collection ${collectionName} created!`);
    });
}

async function populateDb(db) {
    await db.collection(operationsCollectionName).insertOne({operation: 'slice', machineOperation: 'slice'} );
}