const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
    res.render('manage/guestAccount');

}));
module.exports = router;