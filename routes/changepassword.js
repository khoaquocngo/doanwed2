const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
    res.render('partials/changepassword');
}));
router.post('/',asyncHandler (async function(req,res){
  
    
    const {password1,password2} = req.body;
    console.log(user);
    if(password1 != password2)
    {
        return res.redirect('/changepassword');

    }
    else
    {
        if (code === user.codeForgot)
        {
            user.password = User.hassPassword(password1);
            user.codeForgot = null;
            user.save();
            return res.redirect('/login');
        }
    }
    return res.redirect('/changepassword');
}));
module.exports = router;
