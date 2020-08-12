const {Router} = require('express');
const router = new Router();
const User = require('../services/user')
const asyncHandler = require('express-async-handler')
router.use(require('../middlewares/requireLoggedIn'));


router.get('/', function getLogin(req, res) {
    
    res.render('homepage');
});


router.get('/:id/:token',asyncHandler(async function(req,res){
    const {id,token} = req.params;
    const user = await User.findUserById(id);
    if(user && user.token === token){
        user.token = null;
        user.save();
        req.session.userId = user.id;
    }
    
    res.redirect('/home');
}));

module.exports = router;