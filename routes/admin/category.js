var express = require('express');
var router = express.Router();
var mongodbModel = require('./mongo');
var mongodbObj = new mongodbModel('myblog','mycategory');
var ObjectId = require('mongodb').ObjectId;//ObjId is a function

mongodbObj.init();
// GET category page.
router.get('/', function(req, res) {
    mongodbObj.find({},function(err,data){
        if(err){
            res.send(err);
            return;
        }
        res.render('admin/category_list',{data:data});
    })
});
//get add page
router.get('/add', function(req, res) {
    res.render('admin/category_add');
});
//form post in add page
router.post('/add',function(req,res){
    //receive data from the form
    var title = req.body.title;
    var order = req.body.order;
    //save data to mongodb, give save success message and go back to add page
    mongodbObj.insert({title:title,order:order},function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send('successfully added category <a href="/admin/category">Go Back to Category</a>')
        }

    })

})
//get edit page
router.get('/edit', function(req, res) {
    var id = req.query.id;
    mongodbObj.find({_id:ObjectId(id)},function(err,docs){
        if(err){
            res.send(err);
        }else{
            res.render('admin/category_edit',{data:docs[0]});
        }
    })
});
router.post('/edit',function(req,res){
    var title = req.body.title;
    var order = req.body.order;
    var id = req.body.id;
    mongodbObj.update({_id:ObjectId(id)},{$set:{title:title,order:order}},function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send('successfully uppdated category <a href="/admin/category">Go Back to Category</a>')
        }
    })
})

router.get('/delete',function(req,res){
    var id = req.query.id;
    mongodbObj.remove({_id:ObjectId(id)},function(err,result){
        if(err){
            res.send(err);
            return;
        }
        res.redirect('/admin/category')
    })
})
module.exports = router;
