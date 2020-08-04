const {Router} = require('express');
const router = new Router();
const Save = require('../services/save');
const asyncHandler = require('express-async-handler')

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

router.get('/', asyncHandler (async function (req, res) {
    const save = await Save.findAllAcount( req.currentUser.id);
    save.forEach(function(s){
      if(s.finalize == false)
        {
          s.insterest = insterest(s);
          s.save();
        }
      else {
        if(s.term != 0)
        {
          save.insterest = insterest(save);
          save.finalize = true;
          save.save();
        }
      }
      });
    res.render('partials/accountSave',{save});
}));

router.get('/:id', asyncHandler (async function (req, res) {
    const id = req.params.id;
    const save = await Save.findByCode(id);
    save.insterest = insterest2(save);
    save.finalize = true;
    save.finalizeDate = Date.now();
    save.save();
    res.redirect("/accountSave");

}));
module.exports = router;