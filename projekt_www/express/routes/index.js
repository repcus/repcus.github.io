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
router.get('/projekt_www/makieta_write.html',function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'../../../makieta_write.html'));
});
router.get('/projekt_www/makieta_read.html',function(req, res, next) {
  
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
router.get('*/resources/pan.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/pan.png'));
});
router.get('*/resources/pan_fire.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/pan_fire.png'));
});
router.get('*/resources/pan_bzz.png',function(req,res,next){

  res.sendFile(path.join(__dirname+'../../../resources/pan_bzz.png'));
});

router.get('/projekt_www/makieta_read.html/names', async (req,res,next) => {

  var db = new repository();
    
  try{
    await db.connect();
    db.findAllRecipesNames().then( (insertResult) => {
        res.statusCode = 200;
        res.send(insertResult);
        db.disconect();
      }, (error) => {
        console.log(error)
        res.statusCode = 500;
        res.send(error.toString());
        db.disconect();
    });
    
  }
  catch(error){
    console.log(error)
  }
});

router.get('/projekt_www/makieta_read.html:name', async (req,res,next) => {
  
  var db = new repository();
  try{
    await db.connect();
    db.findRecipeByName(req.query.name).then( (insertResult) => {
        res.statusCode = 200;
        res.send( insertResult );
        db.disconect();
      }, (error) => {
        console.log(error)
        res.statusCode = 500;
        res.end(error.toString());
        db.disconect();
    });
    
  }
  catch(error){
    console.log(error)
  }

});

var pattern = 
  {
    "type": "object",
    "properties": {
      "name": { "type": "string", "required": true},
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


router.post('*makieta_write.html*', async (req, res) => {
  var jv = new JSONValidation.JSONValidation();
  var json = req.body
  var validationResult = jv.validate(json, pattern);
  console.log(validationResult)

  if(validationResult.ok == true) {
    var db = new repository();
    
    try{
      await db.connect();
      db.saveRecipe(json).then( (insertResult) => {
          res.statusCode = 201; // created
          res.end(insertResult);
          db.disconect();
        }, (error) => {
          console.log(error)
          res.statusCode = 500;
          res.end(error.toString());
          db.disconect();
      });
      
    }
    catch(error){
      console.log(error)
    }
  } else {
    res.end(`Wrong JSON: ${JSON.stringify(validationResult)}`)
  }
 });

module.exports = router;