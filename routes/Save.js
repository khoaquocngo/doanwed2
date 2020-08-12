const {Router} = require('express');
const router = new Router();
const Interest  = require('../services/inteRestate');
const Save = require('../services/save');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Email = require('../services/email');

router.use(require('../middlewares/requireLoggedIn'));


var today = new Date();
var time = today.getDate() +  "-" + today.getMonth() + "-" + today.getYear() + "   " +  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

router.get('/', asyncHandler (async function (req, res) {
    const interest = await Interest.find();
    res.render('partials/Save',{interest});
}));
router.post('/', asyncHandler(async function (req, res) {
    const {term,money} = req.body;
    const interest = await Interest.findid(term);
    //Tạo tài khoản tiết kiệm   
    if(req.bank.defaultMoney >= money) {
       const s =  await Save.create({
        code: crypto.randomBytes(12).toString('hex').toUpperCase(),
        Money: money,
        interestRate: interest.interest,
        term: interest.id,
        nameTerm: interest.Name,
        sentDate:  Date.now() ,
        userId:  req.currentUser.id,
    })
        req.bank.defaultMoney = req.bank.defaultMoney - money;
        req.bank.save();

        await Email.send( req.currentUser.email,'SAVE',`TK tiết kiệm được mở ${s.code} với số tiền gửi: ${money}VNĐ. SD TK ${req.bank.accountNumber} còn ${req.bank.defaultMoney}VNĐ vào lúc ${time}`) 



        
    } else {
        war = 'Tài khoản không đủ';
        res.render('partials/Save',{war});
    }
    if(req.session.status != null) req.session.status = null;
    req.session.status = "Mở tài khoản tiết kiệm thành công";
    return res.redirect('/notification');
}));

module.exports = router;