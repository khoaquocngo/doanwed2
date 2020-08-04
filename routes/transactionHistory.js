const {Router} = require('express');
const router = new Router();
const Transaction = require('../services/transaction');
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
    const History = await Transaction.findAllHistory(req.currentUser.id);
    
    res.render('partials/transactionHistory',{History});
}));
module.exports = router;