const { Router } = require('express');
const router = new Router();
const User = require('../../services/user');
const Bank = require('../../services/bank');
const asyncHandler = require('express-async-handler');

router.get('/:id', asyncHandler (async function (req, res) {
    if (req.session.card != null) req.session.card
    req.session.card = req.params.id;
    res.redirect("/card");
}));
router.get('/', asyncHandler (async function (req, res) {
    const bank = await Bank.findBankbyaccountNumber(req.session.card);
    res.render("manage/card",{bank});
}));
router.post('/', asyncHandler (async function (req, res) {
    const bank = await Bank.findBankbyaccountNumber(req.session.card);
    bank.defaultMoney = bank.defaultMoney + req.body.money;
    bank.save();
    if(req.session.status != null) req.session.status = null;
    req.session.status = "Nạp tiền thành công";
    res.redirect("/notification");
}));
module.exports = router;
