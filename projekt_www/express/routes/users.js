var express = require('express');
var router = express.Router();
var MongoRepository = require("../db/repository.js");
/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  var repo = new MongoRepository();
  await repo.connect();

  res.send(await repo.findAllOperations());
  repo.disconect();
});

module.exports = router;
