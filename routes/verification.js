const User = require('../services/user')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')


const router = new Router();

router.get('/',function getLogin(req,res){
    res.render('pages/verification');
});

router.post('/',asyncHandler(async function postLogin(req,res){
   const code = req.body.code;
   if(code === req.currentUser.code)
   {
    res.redirect('/home');
   }
   const warning = "SAI MÃ";
   res.render('pages/verification',{warning});
}));


module.exports = router;