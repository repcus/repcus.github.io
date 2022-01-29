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
    "type": "object",
    "properties": {
      "ingredients": { "type": "array", "minItems": 1, "required": true,
                      "items":
                        { "type": "object", "properties":
                          { "name": {"type":"string", "required": true}, "weight": {"type":"number", "required": true} } }
                    },
      "steps": { "type": "array", "minItems": 1, "required": true,
                      "items":
                        { "type": "object", "properties":
                          { "number": {"type":"number", "required": true},
                            "title": {"type":"string", "required": true},
                            "description": {"type":"string", "required": true} }
                        }
                      
                    },
      "stepsForMachine": {"type": "array", "minItems": 1, "required": true,
                      "items":
                        { "type": "object", "properties":
                          { "number": {"type":"number", "required": true}, "operation": {"type":"string", "required": true}, 
                            "additionalArguments": {"type":"array", "maxItems": 2,
                                "items":
                                  { "type": "object", "properties": 
                                    { "argumentType": {"type":"string", "required": true}, "argumentValue": {"type":"number", "required": true} } }
                                
                            }
                          }
                        }
                      
                    }
    }
};


router.post('*index.html', function(req, res){
  var jv = new JSONValidation.JSONValidation();
  var body = req.body
  var result = jv.validate(body, pattern);
  console.log(result)
  // // res.send(result);
  // var db = new repository();
  // try{
  //   db.connect();
  //   db.saveRecipe(temp);

  // }
  // catch(error){
  //   res.send("false");
  // }
  res.send("Ok");

 });
module.exports = router;