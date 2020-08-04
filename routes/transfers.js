const {Router} = require('express');
const router = new Router();
const Bank = require('../services/bank')
const Transaction = require('../services/transaction');
const Email = require('../services/email');
const crypto = require('crypto');

const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
   
    res.render('partials/transfers');
}));
router.post('/', asyncHandler(async function (req, res) {

    const receiver = await Bank.findBankbyaccountNumber(req.body.beneficiary);
    const { money, charge, content } = req.body;
    const transaction = await Transaction.create({
        code: crypto.randomBytes(5).toString('hex').toUpperCase(),
        accuontSender: req.bank.accountNumber,
        accountReceiver: receiver.accountNumber,
        nameReceiver: receiver.user.displayName,
        Money: Number(money),
        content: content,
        charge: charge,
        userId: req.currentUser.id,
        status: 'Giao dịch chưa hoàn tất',
        code: crypto.randomBytes(3).toString('hex').toUpperCase(),
    })
    console.log(transaction.code);
    await Email.send( req.currentUser.email,'Mã chuyển khoản',`Mã xác thực chuyển khoản của bạn: ${transaction.code}`) 
    if (req.session.transaction != null) req.session.transaction = null;
    req.session.transaction = transaction;
    
    return res.redirect("/verifyMoney");

}));

module.exports = router;