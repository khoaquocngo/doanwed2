const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../services/user')
const Email = require('../services/email');
const crypto = require('crypto');
const { token } = require('morgan');

const router = new Router();

router.get('/', asyncHandler(async function(req,res){
    res.render('pages/forgotpassword');
}));


module.exports = router;    