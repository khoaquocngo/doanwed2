const { Router } = require('express');
const router = new Router();
const User = require('../../services/user');
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler (async function (req, res) {
    users = User.findAll();
    
    res.render('manage/recharge', {users});

}));

module.exports = router;
