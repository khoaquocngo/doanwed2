const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');

router.use(require('../middlewares/requireLoggedIn'));

router.get('/', asyncHandler(async function (req, res) {
    const status = req.session.status;
    res.render("manage/notification2", {status})
}));
module.exports = router;