const { Router } = require('express');
const router = new Router();
const User = require('../../services/user');
const Bank = require('../../services/bank');
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler (async function (req, res) {
   const banks = await Bank.findAllUser();
   console.log(banks);
   res.render('manage/recharge',{banks});
}));

module.exports = router;
