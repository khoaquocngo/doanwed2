const {Router} = require('express');
const router = new Router();
const Save = require('../services/save');
const Interests = require('../services/inteRestate'); 
const asyncHandler = require('express-async-handler');

function insterest(s)
{
  const diffTime = Math.abs(new Date() - s.sentDate);
  const diffDays = Math.ceil(diffTime / ((1000 * 60 * 60 * 24) - 1 ));
  console.log(diffDays);
  console.log(s.interestRate);
  console.log(s.Money * s.interestRate * (diffDays- 1) / 360);
  return s.Money * s.interestRate * (diffDays- 1) / 360 ;
}

function insterest2(s,interest)
{
  const diffTime = Math.abs(new Date() - s.sentDate);
  const diffDays = Math.ceil(diffTime / ((1000 * 60 * 60 * 24)));
  return s.Money * interest * (diffDays - 1) / 360;
}

function _month(s)
{
  const diffTime = Math.abs(new Date() - s.sentDate);
  const diffMonth = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30 ));
  
  return Number(diffMonth);
}

router.get('/', asyncHandler(async function (req, res) {
  const save = await Save.findAllAcount(req.currentUser.id);

  save.forEach( async function(s){
    var interests = await Interests.findid(s.term);

    if(s.finalize == false) {  
      //Kiểm tra tài khoản tiết kiệm đến thời hạn tất toán chưa nếu đã đến thì tất toán
        if (_month(s) >= interests.numberMonth && s.term != 0 ) {   
        s.finalize = true;
      }
      s.interest = insterest(s);
      if(s.finalize == true) {
          s.finalizeDate = Date.now();
          req.bank.defaultMoney = req.bank.defaultMoney +  s.interest  + s.Money;
          req.bank.save();
      }
      s.save();
    }
  });
  res.render('partials/accountSave',{save});
}));

//Tất toán tài khoản tiết kiệm nếu tài khoản tiết kiệm có thời hạn tất toán thì lãi suất sẽ bằng với lãi suất của không thời hạn  
router.get('/:id', asyncHandler (async function (req, res) {
    const id = req.params.id;
    const save = await Save.findByCode(id);
    const interests = await Interests.findid(0);
    save.interest = insterest2(save,interests.interest);
    save.finalize = true;
    save.finalizeDate = Date.now();
    req.bank.defaultMoney = req.bank.defaultMoney +  save.interest + save.Money;
    req.bank.save();
    save.save();
    if (req.session.status != null)
    {
      req.session.status = null;
    }
    req.session.status = "Tất toán thành công";
    res.redirect("/notification");
}));

module.exports = router;