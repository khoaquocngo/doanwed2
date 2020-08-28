const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler')
const User = require('../services/user');

router.use(require('../middlewares/requirelogged'));


router.get('/',function (req,res){
    
    res.render('pages/resetPassword');
    
});

router.post('/',asyncHandler (async function(req,res){
    const email = req.session.email;
    const {password1,password2,code} = req.body;
    const user  = await User.findUserByEmail(email);
    if(password1 != password2) {
        return res.redirect('/resetPassword');
    } else {
        if (code === user.codeForgot) {
            user.password = User.hassPassword(password1);
            user.codeForgot = null;
            user.save();
            return res.redirect('/login');
        }
    }
   
    return res.redirect('/resetPassword');
}));

module.exports = router;