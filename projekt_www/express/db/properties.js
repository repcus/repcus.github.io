const containerIp = '192.168.99.100';
const mongoConnectionString = `mongodb://${containerIp}:27017`;
const userName = "user";
const password = "password";
const dbName = "applicationDb";
const operationsCollectionName = "operations";
const recipesCollectionName = "recipes";


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
localStorage.setItem('containerIp',containerIp);
localStorage.setItem('mongoConnectionString',mongoConnectionString);
localStorage.setItem('userName',userName);
localStorage.setItem('password',password);
localStorage.setItem('dbName',dbName);
localStorage.setItem('operationsCollectionName',operationsCollectionName);
localStorage.setItem('recipesCollectionName',recipesCollectionName);