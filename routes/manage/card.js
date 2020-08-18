const { Router } = require('express');
const router = new Router();
const Bank = require('../../services/bank');
const asyncHandler = require('express-async-handler');
const Email = require('../../services/email');
const Recharge = require('../../services/recharge');
const crypto = require('crypto');

router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));

var today = new Date();
var time = today.getDate() +  "-" + today.getMonth() + "-" + today.getYear() + "   " +  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

router.get('/:id', asyncHandler (async function (req, res) {
    if (req.session.card != null) req.session.card
    req.session.card = req.params.id;
    res.redirect("/card");

}));

router.get('/', asyncHandler (async function (req, res) {
    if(req.session.card != null) {
        const bank = await Bank.findBankbyaccountNumber(req.session.card);
        return res.render("manage/card",{bank});
    }
    return res.redirect("/recharge");

}));

router.post('/', asyncHandler (async function (req, res) {
    const bank = await Bank.findBankbyaccountNumber(req.session.card);
    const Money = req.body.money;
    const content = req.body.content;
    bank.defaultMoney = bank.defaultMoney + Number(Money);
    bank.save();
    
    await Recharge.create({
        code: crypto.randomBytes(5).toString('hex').toUpperCase(),
        accuontRecharge: bank.accountNumber,
        nameRecharge: bank.user.displayName,
        Money: Money,
        date: Date.now(),
        content: content
    });
    
    await Email.send( bank.user.email,'Recharge',`SD TK ${bank.accountNumber} +${Money}VNĐ vào lúc ${time} có nội dung: "${content}" từ ngân hàng ShibaBank`); 

    if(req.session.status != null) req.session.status = null;
    req.session.status = "Nạp tiền thành công";

    res.redirect("/notification2");

}));

module.exports = router;
