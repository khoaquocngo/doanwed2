const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const Bank = require('../../services/bank');
const User = require('../../services/user');
router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));

router.get('/', asyncHandler (async function (req, res) {
    const banks = await Bank.findAllUser();

    res.render('manage/guestAccount',{banks});

}));
router.get('/:email/block', asyncHandler(async function (req, res) {
    const email = req.params.email;
    const user = await User.findUserByEmail(email);
    user.block = true;
    user.save();

    res.redirect("/guestAccount");

}));
router.get('/:email/unblock', asyncHandler(async function (req, res) {
    const email = req.params.email;
    const user = await User.findUserByEmail(email);
    user.block = false;
    user.save();

    res.redirect("/guestAccount");
    
}));

module.exports = router;