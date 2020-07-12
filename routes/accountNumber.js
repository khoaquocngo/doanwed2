const {Router} = require('express');
const router = new Router();
const Bank = require("../services/bank");
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
    const bank = await Bank.findBankbyuserId(req.currentUser.id);
    res.render('partials/accountNumber',{bank});
}));
module.exports = router;