window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let db;
let dbReq = indexedDB.open('ArkanoidDB', 1);

dbReq.onupgradeneeded = function (event) {
    db = event.target.result;
    let gameResults = db.createObjectStore('gameResults', { autoIncrement: true });
}

dbReq.onsuccess = function (event) {
    db = event.target.result;
}

dbReq.onerror = function(event) {
    alert('error opening database ' + event.target.errorCode);
}

function addGameResults(db, message) {
    let tx = db.transaction(['gameResults'], 'readwrite');
    let store = tx.objectStore('gameResults');
    let gameResults = {mode: message.mode, nick: message.name, timestamp: Date.now(), time: message.seconds + " s"};
    store.add(gameResults);
    tx.oncomplete = function() { console.log('stored gameResults!') }
    tx.onerror = function(event) {
        alert('error storing gameResults ' + event.target.errorCode);
    }
}

dbReq.onsuccess = function(event) {
    db = event.target.result;
}
