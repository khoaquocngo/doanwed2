const { Router } = require('express');
const router = new Router();
const Bank = require('../../services/bank');
const asyncHandler = require('express-async-handler');



router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));

router.get('/', asyncHandler (async function (req, res) {
   const banks = await Bank.findAllUser();
   res.render('manage/recharge',{banks});
}));

module.exports = router;
