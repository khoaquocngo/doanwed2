const {Router} = require('express');
const router = new Router();
const Save = require('../services/save');
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
    const save = await Save.findAllAcount( req.currentUser.id);
    save.forEach(function(s){
        
        const diffTime = Math.abs(new Date() - s.sentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        s.interest = s.Money * s.interestRate / 360 * diffDays;
        s.save();
      });
    res.render('partials/accountSave',{save});
}));
module.exports = router;