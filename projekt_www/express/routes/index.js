var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
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



module.exports = router;