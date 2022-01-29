var express = require('express');
var router = express.Router();
var path = require('path');
var JSONValidation = require('json-validation');
var repository = require('../db/repository');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'../../../index.html'));
});
router.get('*index.html', function(req, res, next) {
  res.sendFile(path.join(__dirname+'../../../index.html'));
});
router.get('/projekt_www/makieta_write*',function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'../../../makieta_write.html'));
});
router.get('/projekt_www/makieta_read*',function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'../../../makieta_read.html'));
});
router.get('/scripts/add.js',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../scripts/add.js'));
});
router.get('/resources/whisk.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/whisk.png'));
});
router.get('/favicon.ico',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../favicon.ico'));
});
router.get('*style.css',function(req,res,next){ 

  res.sendFile(path.join(__dirname+'../../../css/style.css'));
});
router.get('*/whisk.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/whisk.png'));
});
router.get('*style_car.css',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../css/style_car.css'));
});
router.get('*read.js',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../scripts/read.js'));
});
router.get('/resources/pan.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/pan.png'));
});
router.get('/resources/pan_fire.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/pan_fire.png'));
});
router.get('/resources/pan_bzz.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/pan_bzz.png'));
});
var pattern = 
  {
    "type": "array",
          "minItems": 1,
          "items":[
              {"type":"string"},
              {"type":"number"}],
    "type": "array",
          "minItems": 1,
          "items":[
              {"type":"number"},
              {"type":"string"},
              {"description":"string"}],
    "type": "array",
    "minItems": 1,
    "items":[
        {"type":"number"},
        {"type":"string"},
        {"additionalArguments":"array",
            "maxItems":2,
            "items":[
                {"type":"string"},
                {"type":"number"}]}
            ]
};


router.post('*index.html', function(req, res){
  // var jv = new JSONValidation.JSONValidation();
   var temp = req.body //JSON.parse(req.body)
  // var result = jv.validate(temp,pattern);
  // res.send(result);
  var db = new repository();
  try{
    db.connect();
    db.saveRecipe(temp);

  }
  catch(error){
    res.send("false");
  }
  res.send("Ok");

 });
module.exports = router;