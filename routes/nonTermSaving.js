const {Router} = require('express');
const router = new Router();
const Save = require('../services/save');
const Interest  = require('../services/inteRestate');
const crypto = require('crypto');

const asyncHandler = require('express-async-handler');

var war = "";
router.get('/', function (req, res) {
    res.render('partials/nonTermSaving',{war});
});
router.post('/', asyncHandler(async function (req, res) {
    const {money} = req.body;
    var date = new Date();
    const interest = await Interest.findid(0);



 //Tạo tài khoản tiết kiệm   
 if(req.bank.defaultMoney >= money)
 {
        const nonTerm = await Save.create({
        code: crypto.randomBytes(12).toString('hex').toUpperCase(),
        Money: money,
        interest: 0,
        interestRate: interest.interest,
        term: 0,
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