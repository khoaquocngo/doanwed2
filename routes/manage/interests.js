const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const InteRestate = require('../../services/inteRestate');
router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));



router.get('/', asyncHandler (async function (req, res) {
    const inteRestates = await InteRestate.findAll();
    res.render('manage/interests',{inteRestates});
    
}));


router.post('/', asyncHandler (async function (req, res) {
    const {nameinterest,interest,numberMonth} = req.body;
    for(let i = 0; i < nameinterest.length; i++) {
       let InteRestates = await InteRestate.findName(nameinterest[i]);
       InteRestates.Name = nameinterest[i];
       InteRestates.interest = interest[i];
       InteRestates.numberMonth = numberMonth[i];
       InteRestates.save();
    }
    res.redirect('/interests');
}));


module.exports = router;
