const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler')
const Bank = require('../services/bank');
const Transaction = require('../services/transaction');


router.get('/:code', asyncHandler(async function (req, res) {
    const { code } = req.params;
    var status;
    const transaction = await Transaction.findTransactionByCode(code);
    const accuontSender = await Bank.findBankbyaccountNumber(transaction.accuontSender);
    const accountReceiver = await Bank.findBankbyaccountNumber(transaction.accountReceiver);
    if (accuontSender.defaultMoney >= transaction.Money) {
        accuontSender.defaultMoney = Number(accuontSender.defaultMoney - transaction.Money);
        accountReceiver.defaultMoney = Number(accountReceiver.defaultMoney + transaction.Money);
        var today = new Date();
        transaction.date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " (" + today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()  +")";
        transaction.status = "Giao dịch thành công";
    }
    else {
        status = "Giao dịch thất bại số dư không đủ";
        return res.render("partials/notification", { status });

    }
    if (transaction.charge == "1") {
        accuontSender.defaultMoney = Number(accuontSender.defaultMoney - 2200);
    }
    else {
        accountReceiver.defaultMoney = Number(accountReceiver.defaultMoney - 2200);
    }
    accuontSender.save();
    accountReceiver.save();
    transaction.save();
    status = "Giao dịch thành công";
    return res.render("partials/notification", { status });


}));




module.exports = router;