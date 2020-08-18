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

router.post('/', asyncHandler (async function (req, res) {
    var recharge;
    const temp = req.body.temp;
    if(!temp) {
    return res.redirect('/historyRecharge');
    }

    recharge = await Recharge.findCode(temp);

    if(recharge.length != 0) {
       return  res.render('manage/historyRecharge',{recharge});
   }

    recharge = await Recharge.findAccuontRecharge(temp);

    if(recharge.length != 0) {
       return res.render('manage/historyRecharge',{recharge});
    }

    return res.render('manage/historyRecharge',{recharge});

}));


module.exports = router;
