const {Router} = require('express');
const router = new Router();
const Bank = require('../services/bank')
const Save = require('../services/save');
const crypto = require('crypto');

const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler (async function (req, res) {
    res.render('partials/termSaving');
}));
router.post('/', asyncHandler(async function (req, res) {

}));
module.exports = router;