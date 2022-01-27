const { MongoClient } = require('mongodb');

const containerIp = localStorage.getItem('containerIp');
const mongoConnectionString = localStorage.getItem('mongoConnectionString');
const userName = localStorage.getItem('userName');
const password = localStorage.getItem('password');
const dbName = localStorage.getItem('dbName');
const operationsCollectionName = localStorage.getItem('operationsCollectionName');
const recipesCollectionName = localStorage.getItem('recipesCollectionName');

/*
    Create new instance, call connect method, do what you need and call disconect
*/
class MongoDbRepository {
    #client;
    #db;
    #recipesCollection;
    #operationsCollection;

    constructor() {}

    async connect() {
        this.#client = new MongoClient(mongoConnectionString, { 
            auth:{authdb: dbName, username:userName, password:password },
            authSource: dbName,
            useNewUrlParser: true });

        this.#client.connect();
        this.#db = this.#client.db(dbName);
        this.#recipesCollection = this.#db.collection(recipesCollectionName);
        this.#operationsCollection = this.#db.collection(operationsCollectionName);
        console.log("Connected to mongodb");
    }

    async findAllRecipesNames() {
        return await this.#recipesCollection.find({}, { "name": 1, _id: 1 }).toArray();
    }

    async findRecipeByName(name) {
        return await this.#recipesCollection.find({ "name": name }).toArray();
    }

    async findAllOperations() {
        return await this.#operationsCollection.find().toArray();
    }
    
    async saveRecipe(json) {
        this.#recipesCollection.insertOne(json, function(err, res) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(res);
            console.log(`Saved to ${recipesCollectionName}: ${json.toArray}`);
        });
    }

    disconect() {
        this.#client.close();
        console.log('Disconected from mongo');
    }
}

module.exports = MongoDbRepository; 