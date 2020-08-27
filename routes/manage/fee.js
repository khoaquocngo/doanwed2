const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const Fee = require('../../services/fee');

router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));



router.get('/', asyncHandler (async function (req, res) {
    const fees = await Fee.findAlls();
    res.render('manage/fee',{fees});
    
}));


router.post('/', asyncHandler (async function (req, res) {
    const {namefee,fee,id} = req.body;

 
    var i = 0;
    while(namefee.length > i) {   
    var temp = await Fee.findByPk(id[i]);
    temp.Name = namefee[i]; 
    temp.fee = fee[i];
    i++;
    temp.save();

}

    res.redirect('/fee');
}));


module.exports = router;
