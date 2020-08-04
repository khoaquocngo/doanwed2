const {Router} = require('express');
const router = new Router();
const Save = require('../services/save');
const asyncHandler = require('express-async-handler');

function insterest(s)
{
  const diffTime = Math.abs(new Date() - s.sentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return s.Money * s.interestRate / 360 * diffDays;
}

function insterest2(s)
{
  const diffTime = Math.abs(new Date() - s.sentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return s.Money * 0.015 / 360 * diffDays;
}

function _month(s)
{
  const diffTime = Math.abs(new Date() - s.sentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30 ));
  
  return Number(diffDays);
}

router.get('/', asyncHandler(async function (req, res) {
  const save = await Save.findAllAcount( req.currentUser.id);
  save.forEach(function(s){
    if(s.finalize == false) {      
      if (s.term == 1 && _month(s) == 3) {   
        s.finalize = true;
      }
      if (s.term == 2 && _month(s) == 6 ) {
        s.finalize = true;
      }
      if (s.term == 3 && _month(s) == 12){
          s.finalize = true;
      }
      s.interest = insterest(s);
      if(s.finalize == true) {
          req.bank.defaultMoney = req.bank.defaultMoney +  s.interest;
          req.bank.save();
      }
      s.save();
    }
  });
    
  res.render('partials/accountSave',{save});
}));

router.get('/:id', asyncHandler (async function (req, res) {
    const id = req.params.id;
    const save = await Save.findByCode(id);
    save.interest = insterest2(save);
    save.finalize = true;
    save.finalizeDate = Date.now();
    req.bank.defaultMoney = req.bank.defaultMoney +  s.interest;
    req.bank.save();
    save.save();

    res.redirect("/accountSave");
}));

module.exports = router;