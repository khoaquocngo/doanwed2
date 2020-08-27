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
    const {id,nameinterest,interest,numberMonth} = req.body;
    var i = 0;

    while(id.length > i) {   
        var ir = await InteRestate.findByPk(Number(id[i]));
       
        ir.Name = nameinterest[i];
        ir.interest = interest[i];
        ir.numberMonth = numberMonth[i];
        ir.save();
        i++;
    }
    res.redirect('/interests');
}));


module.exports = router;
