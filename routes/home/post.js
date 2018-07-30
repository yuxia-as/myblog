var express = require('express');
var router = express.Router();
var mongodbModel = require('../admin/mongo');
var mongodbObj_cat = new mongodbModel('myblog','mycategory');
var mongodbObj_post = new mongodbModel('myblog','mypost');
var ObjectId = require('mongodb').ObjectId;//ObjId is a function

router.get('/',function(req,res,next){
    var id = req.query.id;
    mongodbObj_post.init();
    mongodbObj_cat.init();
    mongodbObj_post.find({_id:ObjectId(id)},function(err,docs){
        if(err){
            res.send(err);
            return;
        }
        mongodbObj_cat.find({},function(err,result){
            if(err){
                res.send(err);
                return;
            }
            res.render('home/article', { data1:docs[0], data2:result });
        })
    })

})


module.exports = router;