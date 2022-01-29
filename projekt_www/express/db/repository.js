const { MongoClient } = require('mongodb');
var properties = require('./properties');

const mongoConnectionString = properties.mongoConnectionString;
const userName = properties.userName;
const password = properties.password;
const dbName = properties.dbName;
const operationsCollectionName = properties.operationsCollectionName;
const recipesCollectionName = properties.recipesCollectionName;


/*
    Create new instance, call connect method, do what you need and call disconect
*/
class MongoDbRepository {
    

    constructor() {}

    async connect() {
        this.client = new MongoClient(mongoConnectionString, { 
            auth:{authdb: dbName, username:userName, password:password },
            authSource: dbName,
            useNewUrlParser: true });

        this.client.connect();
        this.db = this.client.db(dbName);
        this.recipesCollection = this.db.collection(recipesCollectionName);
        this.operationsCollection = this.db.collection(operationsCollectionName);
        console.log("Connected to mongodb");
    }

    async findAllRecipesNames() {
        return await this.recipesCollection.find({}, { "name": 1, _id: 1 }).toArray();
    }

    async findRecipeByName(name) {
        return await this.recipesCollection.find({ "name": name }).toArray();
    }

    async findAllOperations() {
        return await this.operationsCollection.find().toArray();
    }
    
    async saveRecipe(json) {
        return new Promise((resolve, reject) => {
            this.recipesCollection.insertOne(json, 
                function(err, res) {
                if(err) {
                    console.log(err);
                    reject(new Error("Error, recipe not saved!"));
                }
                console.log(`Saved to ${recipesCollectionName}: ${json.toArray}`);
                resolve("Saved recipe.");
            });
        });
    }

    disconect() {
        this.client.close();
        console.log('Disconected from mongo');
    }
}

module.exports = MongoDbRepository; 