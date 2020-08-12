const { Router } = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const Recharge = require('../../services/recharge');



router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));

router.get('/', asyncHandler (async function (req, res) {
    const recharge = await Recharge.findAll();

    res.render('manage/historyRecharge',{recharge});
}));

module.exports = router;
