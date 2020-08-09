const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler')

router.get('/', asyncHandler(async function (req, res) {
    const status = req.session.status;
    res.render("partials/notification", {status})
}));
module.exports = router;