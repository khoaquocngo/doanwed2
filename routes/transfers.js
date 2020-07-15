const {Router} = require('express');
const router = new Router();
const Bank = require('../services/bank')
const Transaction = require('../services/transaction');
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
        status: 'Giao dịch chưa hoàn tất'
    })
    console.log()
    return res.render("partials/verifyMoney", { transaction });

}));
module.exports = router;