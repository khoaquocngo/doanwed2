const User = require('../services/user')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const crypto = require('crypto');
const Email = require('../services/email');

const router = new Router();

router.get('/',function getLogin(req,res){
    res.render('pages/login')
});
router.post('/',asyncHandler(async function postLogin(req,res){
    const user = await User.findUserByEmail(req.body.email);
    if(!user || !User.verifyPassword(req.body.password, user.password)){
        return res.redirect('/login');
    }
    req.session.userId = user.id;
    if(user.token)
    {
        res.redirect('/home');
    }
    else
    {
        user.code = crypto.randomBytes(3).toString('hex').toUpperCase();
        user.save();
        await Email.send(user.email,'Mã đăng nhập là: ',`${user.code}`)
        res.redirect('verification');
    }
}));
router.get('/:id/:token',asyncHandler(async function(req,res){
    const {id,token} = req.params;
    const user = await User.findUserById(id);
    if(user && user.token === token){
        user.token = null;
        user.save();
        req.session.userId = user.id;
    }
    res.redirect('/home');
}))
module.exports = router;