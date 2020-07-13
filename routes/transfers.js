const {Router} = require('express');
const router = new Router();
const Bank = require('../services/bank')
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
    res.render('partials/transfers');
}));
module.exports = router;