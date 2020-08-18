const {Router} = require('express');
const router = new Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');

router.use(require('../middlewares/requireLoggedIn'));

router.get('/', asyncHandler (async function (req, res) {
    
    res.render('partials/changepassword');

}));

router.post('/',asyncHandler (async function(req,res) {
    const user = await User.findUserById(req.currentUser.id);
    const {passwordOld,passwordNew1,passwordNew2} = req.body;
    if (passwordNew1 != passwordNew2) {
        return res.redirect('/changepassword');
    }
    if (!User.verifyPassword(passwordOld,user.password)) {
        return res.redirect('/changepassword');
    }
    user.password = User.hassPassword(passwordNew1);
    user.save();
    
    return res.redirect('/logout');

}));

module.exports = router;