const User = require('../services/user')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')


const router = new Router();

router.get('/',function getLogin(req,res){
    res.render('pages/verification');
});

router.post('/',asyncHandler(async function postLogin(req,res){
   user = await User.findUserById(req.session.userId);
   const code = req.body.code;
   if(code === user.code)
   {
    user.code = null;
    user.save();
    req.session.userId = user.id;
    res.redirect('/home');
   }
   const warning = "SAI MÃ";
   res.render('pages/verification',{warning});
}));


module.exports = router;