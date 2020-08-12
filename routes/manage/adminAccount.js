const { Router } = require('express');
const router = new Router();
const User = require('../../services/user');
const asyncHandler = require('express-async-handler');

router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/bosslogin'));



router.get('/', asyncHandler(async function (req, res) {
    const users = await User.findManage();
    res.render('manage/adminAccount', { users });
}));
router.post('/', asyncHandler(async function (req, res) {
    const { displayName, username, password } = req.body;
    const passhash = User.hassPassword(password);
    const user = await User.CreateManage(displayName, username, passhash);
    res.redirect("/adminAccount");

}));
router.get('/:email/block', asyncHandler(async function (req, res) {
    const email = req.params.email;
    const user = await User.findUserByEmail(email);
    console.log(user);
    user.block = true;
    user.save();
    res.redirect("/adminAccount");
}));
router.get('/:email/unblock', asyncHandler(async function (req, res) {
    const email = req.params.email;
    const user = await User.findUserByEmail(email);
    user.block = false;
    user.save();
    res.redirect("/adminAccount");
}));
module.exports = router;