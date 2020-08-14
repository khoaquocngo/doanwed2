const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const Fee = require('../../services/fee');
const { body } = require('express-validator');
router.use(require('../../middlewares/requireLoggedIn'));
router.use(require('../../middlewares/adminlogin'));



router.get('/', asyncHandler (async function (req, res) {
    const fees = await Fee.findAll();

    res.render('manage/fee',{fees});
}));


router.post('/', asyncHandler (async function (req, res) {
  
}));


module.exports = router;
