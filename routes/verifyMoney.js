const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler')
const Bank = require('../services/bank');
const Fee = require('../services/fee');
const Transaction = require('../services/transaction');


router.get('/', asyncHandler(async function (req, res) {
    const transaction = await Transaction.findTransactionByCode(req.session.transaction.code);
    const fee = await Fee.findid(1);
    
    res.render("partials/verifyMoney", {transaction,fee})
}));

router.post('/', asyncHandler(async function (req, res) {
    const code = req.body.code;
    const fee = await Fee.findid(1);
    
    if (req.session.status != null)  req.session.status = null;
    
    const transaction = await Transaction.findTransactionByCode(req.session.transaction.code);
    const accuontSender = await Bank.findBankbyaccountNumber(transaction.accuontSender);
    const accountReceiver = await Bank.findBankbyaccountNumber(transaction.accountReceiver);
    
    if (accuontSender.defaultMoney >= transaction.Money && transaction.code == code) {
        accuontSender.defaultMoney = Number(accuontSender.defaultMoney - transaction.Money);
        accountReceiver.defaultMoney = Number(accountReceiver.defaultMoney + transaction.Money);
        var today = new Date();
        transaction.date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " (" + today.getDate() + "/" + Number(today.getMonth() + 1 )  + "/" + today.getFullYear()  +")";
        transaction.status = "Giao dịch thành công";
    } else {
        if(accuontSender.defaultMoney < transaction.Money)
        req.session.status = "Giao dịch thất bại số dư không đủ";
        if(transaction.code != code)
        req.session.status = "Giao dịch thất bại mã xác thực không đúng";
        
        return res.redirect("/notification");
    }
    if (transaction.charge == "1") {
        accuontSender.defaultMoney = Number(accuontSender.defaultMoney - fee.fee);
    } else {
        accountReceiver.defaultMoney = Number(accountReceiver.defaultMoney - fee.fee);
    }
    accuontSender.save();
    accountReceiver.save();
    transaction.save();
    req.session.status = "Giao dịch thành công";
    
    return res.redirect("/notification");
}));

module.exports = router;