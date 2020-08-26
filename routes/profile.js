const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
router.use(require('../middlewares/requireLoggedIn'));





router.get('/', asyncHandler (async function (req, res) {
    res.render('partials/profile');
}));
router.post('/',asyncHandler (async function (req, res ,next) {
    
    const {imageCMND,displayName,CMND} = req.body;
    req.currentUser.CMND = CMND;
    if(req.currentUser.pictureCMND) {
    req.currentUser.codeCMND = 1;
    }
    req.currentUser.pictureCMND = imageCMND;
    req.currentUser.displayName = displayName;
    req.currentUser.save();
    res.redirect('/profile');
}));
module.exports = router;