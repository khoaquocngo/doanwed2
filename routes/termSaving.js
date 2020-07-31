const {Router} = require('express');
const router = new Router();
const Interest  = require('../services/inteRestate');
const Save = require('../services/save');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');



router.get('/', asyncHandler (async function (req, res) {
    res.render('partials/termSaving');
}));
router.post('/', asyncHandler(async function (req, res) {
const {term,money} = req.body;
const interest = await Interest.findid(term);


 //Tạo tài khoản tiết kiệm   
 if(req.bank.defaultMoney >= money)
 {
        const nonTerm = await Save.create({
        code: crypto.randomBytes(12).toString('hex').toUpperCase(),
        Money: money,
        interest: 0,
        interestRate: interest.interest,
        term: term,
        sentDate:  Date.now() ,
        userId:  req.currentUser.id,
    })
    req.bank.defaultMoney = req.bank.defaultMoney - money;
    req.bank.save();
}
else
{
 war = 'Tài khoản không đủ';
 res.render('partials/nonTermSaving',{war});
}


// Trừ tiền tài khoản mặc định


    return res.redirect('/home');

}));
module.exports = router;