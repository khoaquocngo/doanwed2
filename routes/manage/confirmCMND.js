const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const User = require('../../services/user');
const Bank = require('../../services/bank');
router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));

router.get('/', asyncHandler (async function (req, res) {
    const banks = await Bank.findAllUser();
    
    res.render('manage/confirmCMND',{banks});

}));

router.get('/:email/confirm', asyncHandler (async function (req, res) {
   const email = req.params.email;
   const user = await User.findUserByEmail(email);
   user.codeCMND = 0;
   user.save();
   res.redirect('/confirmCMND');
}));

router.get('/:email/unconfirm', asyncHandler (async function (req, res) {
    const email = req.params.email;
    const user = await User.findUserByEmail(email);
    user.codeCMND = 2;
    user.save();
    res.redirect('/confirmCMND');
 }));

module.exports = router;