const {Router} = require('express');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Email = require('../services/email');
const User = require('../services/user');
const router = new Router();
router.use(require('../middlewares/requirelogged'));

router.get('/', function(req,res){
    
    res.render('pages/forgotpassword');
});

router.post('/',asyncHandler (async function (req,res){
    req.session.email = req.body.email;
    console.log(req.session.email); 
    user = await User.findUserByEmail(req.body.email);
    user.codeForgot = crypto.randomBytes(3).toString('hex').toUpperCase();
    user.save();
    await Email.send(user.email,'Mã xác nhận quên mật khẩu của bạn: ',`${user.codeForgot}`)
    
    res.redirect('/resetPassword');
}));

module.exports = router;    