const {Router} = require('express');
const router = new Router();
const Bank = require('../services/bank')
const Transaction = require('../services/transaction');
const Fee = require('../services/fee');
const Email = require('../services/email');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler')

router.use(require('../middlewares/requireLoggedIn'));
router.use(require('../middlewares/guestLogin'));


router.get('/', asyncHandler (async function (req, res) {
   
    res.render('partials/transfers');
}));
router.post('/', asyncHandler(async function (req, res) {
    if(req.currentUser.token == null){ 
        const receiver = await Bank.findBankbyaccountNumber(req.body.beneficiary);
        if(!receiver){
            if(req.session.status != null) req.session.status = null;
            req.session.status = "Tài khoản người nhận không tồn tại";
            return res.redirect("/notification");
        }
        const { money, charge, content } = req.body;
        const moneymin = await Fee.findid(3);
        const moneymax = await Fee.findid(4);
        if(money < moneymin.fee || money > moneymax.fee    )
        {
            if( req.session.status != null)  req.session.status = null;
            req.session.status = `Số tiền không phù hợp hạn mực trong khoản từ ${moneymin.fee} đến ${moneymax.fee}`;
            return res.redirect("/notification");
    
        }

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
        await Email.send( req.currentUser.email,'Mã chuyển khoản',`Mã xác thực chuyển khoản của bạn: ${transaction.code}`) 
        if (req.session.transaction != null) req.session.transaction = null;
        req.session.transaction = transaction;
        return res.redirect("/verifyMoney");
} else{
        if(req.session.status != null) req.session.status = null;
        req.session.status = "Cần xác nhận Mail để thực hiện chức năng này";
        return res.redirect("/notification");
}

}));

module.exports = router;