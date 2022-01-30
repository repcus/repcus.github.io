var express = require('express');
var router = express.Router();
var MongoRepository = require("../db/repository.js");
/* GET users listing. */
router.get('/:name', async function(req, res, next) {
  
  var repo = new MongoRepository();
  await repo.connect();

  console.log(req.params);
  res.send(await repo.findRecipeByName(req.params.name));

  repo.disconect();
});

router.get('/', async function(req, res, next) {
  
  var repo = new MongoRepository();
  await repo.connect();

  res.send(await repo.findAllRecipesNames());
  repo.disconect();
});

module.exports = router;
