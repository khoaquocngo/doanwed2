const { Router } = require('express');
const router = new Router();
const Bank = require('../../services/bank');
const User = require('../../services/user');
const asyncHandler = require('express-async-handler');

router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));

router.get('/', asyncHandler (async function (req, res) {
   const banks = await Bank.findAllUser();
   
   res.render('manage/recharge',{banks});

}));

//Tìm kiếm phải đúng email|CMND|STK
router.post('/', asyncHandler (async function (req, res) {
   var banks;
   const temp = req.body.temp; 
   if(!temp) {
   return res.redirect('/recharge');
   }
  
   banks = await Bank.findCmnd(temp);
   if(banks.length != 0) {
      return res.render('manage/recharge',{banks});
   }
  
   banks = await Bank.findEmail(temp);
   if(banks.length != 0) {
      return res.render('manage/recharge',{banks});
   }
   banks = await Bank.findAccount(temp);
   if(banks.length != 0) {
      return res.render('manage/recharge',{banks});
   }

   return res.render('manage/recharge',{banks});

}));

module.exports = router;
