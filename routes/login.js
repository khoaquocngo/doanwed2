const User = require('../services/user')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const requireLogged = require('../middlewares/requirelogged');
const router = new Router();

router.use(requireLogged);

router.get('/',function getLogin(req,res){
    res.render('pages/login')
});
router.post('/',asyncHandler(async function postLogin(req,res){
    const user = await User.findUserByEmail(req.body.email);
    if(!user || !User.verifyPassword(req.body.password, user.password)){
        return res.redirect('/home');
    }
    req.session.userId = user.id;
    res.redirect('/home');
}));
router.get('/:id/:token',asyncHandler(async function(req,res){
    const {id,token} = req.params;
    const user = await User.findUserById(id);
    console.log(user.token);
    console.log(token)
    if(user && user.token === token){
        user.token = null;
        user.save();
        req.session.userId = user.id;
    }
    res.redirect('/home');
}))
module.exports = router;