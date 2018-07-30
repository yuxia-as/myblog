var express = require('express');
var router = express.Router();
var mongodbModel = require('../admin/mongo');
var mongodbObj_cat = new mongodbModel('myblog','mycategory');
var mongodbObj_post = new mongodbModel('myblog','mypost');
/* GET home page. */
router.get('/', function(req, res, next) {
  mongodbObj_post.init();
  mongodbObj_cat.init();
  mongodbObj_post.find({},function(err,docs){
    if(err){
      res.send(err);
      return;
    }
    mongodbObj_cat.find({},function(err,result){
      if(err){
        res.send(err);
        return;
      }
      res.render('home/index', { data1:docs, data2:result });
    })
  })

});

module.exports = router;
