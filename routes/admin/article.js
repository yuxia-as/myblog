var express = require('express');
var router = express.Router();
var mongodbModel = require('./mongo');
var mongodbObj_cat = new mongodbModel('myblog','mycategory');
var mongodbObj_post = new mongodbModel('myblog','mypost');

/* GET home page. */
router.get('/', function(req, res, next) {
    mongodbObj_post.init();
    mongodbObj_post.find({},function(err,docs){
        if(err){
            res.send(err);
            return;
        }
        res.render('admin/article_list',{data:docs});
    })
});

router.get('/add', function(req, res, next) {
    mongodbObj_cat.init();
    mongodbObj_cat.find({},function(err,docs){
        if(err){
            res.send(err);
            return;
        }
        res.render('admin/article_add',{data:docs});
    })

});
router.post('/add',function(req,res){
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;
    var category = req.body.category;
    var time = new Date();
    var post = {
        "cat":category,
        "title":title,
        "summary":summary,
        "content":content,
        "time":time
    };
    console.log(post);
    mongodbObj_post.init();
    mongodbObj_post.insert(post,function(err,result){
        console.log('connection');
        if(err){
            res.send(err);
            return;
        }
        res.send('insert article successfully <a href="/admin/article">Go Back to Article</a>');
    })
})

module.exports = router;
