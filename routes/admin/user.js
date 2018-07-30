var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongodbModel = require('./mongo');
var mongodbObj_user = new mongodbModel('myblog','users');
/* GET users listing. */

router.use('/login',checkLogin);
router.get('/login', function(req, res, next) {
  res.render('admin/login');
});
router.post('/signin',function(req,res){
  var user = req.body.user;
  var password = req.body.password;
  mongodbObj_user.init();
  mongodbObj_user.find({user:user,password:password},function(err,docs){
    if(err){
      res.send(err);
      return;
    }
    if(docs.length){
      console.log('here');
      req.session.isLogin = true;
      res.redirect('/admin');
    }else{
      res.redirect('/admin/user/login')
    }
  })
})
router.get('/logout',function(req,res){
  req.session.isLogin = null;
  res.redirect('/admin/user/login');
})
function checkLogin(req,res,next){
  if(req.session.isLogin){
    res.redirect('back');
  }
  next();
}
module.exports = router;
