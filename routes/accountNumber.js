const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
router.use(require('../middlewares/requireLoggedIn'));


router.get('/', asyncHandler (async function (req, res) {
    
    res.render('partials/accountNumber');
}));

module.exports = router;