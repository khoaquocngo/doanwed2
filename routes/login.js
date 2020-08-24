const User = require('../services/user')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const crypto = require('crypto');
const Email = require('../services/email');
const router = new Router();

router.use(require('../middlewares/requirelogged'));

router.get('/', function getLogin(req,res ) {
    
    res.render('pages/login')
});

router.post('/',asyncHandler(async function postLogin(req,res) {
    
    const user = await User.findUserByEmail(req.body.email);    
    if(!user || !User.verifyPassword(req.body.password, user.password)) {
        return res.redirect('/login');
    }
    if(user.block === false) {
        req.session.userId = user.id;
        if(user.decentralize === 2 ||user.decentralize === 0) {
            return res.redirect('/guestAccount');
        }
        
        if(user.token) {
            return res.redirect('/home');
        } else {
            user.code = crypto.randomBytes(3).toString('hex').toUpperCase();
            user.save();
            await Email.send(user.email,'Mã đăng nhập là: ',`${user.code}`)
            return res.redirect('verification');
        }
    }
    else {
        return res.redirect("/warning");
    }

        
    return res.redirect('/login');
    
}));



module.exports = router;