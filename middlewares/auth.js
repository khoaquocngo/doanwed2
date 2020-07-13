const User = require('../services/user.js')
const Bank = require('../services/bank')
const asyncHandler = require('express-async-handler')
module.exports = asyncHandler(async function auth(req,res,next){
    const userId = req.session.userId;
    res.locals.currentUser = null;
    res.locals.bank = null;
    if(!userId){
        return next();
    }
    const user = await User.findUserById(userId)
    if(!user){
        return next();
    }
    if(user.code){
        return next();
    }
    const bank = await Bank.findBankbyuserId(user.id);

    req.currentUser = user;
    req.bank = bank;
    res.locals.bank = bank;
    res.locals.currentUser = user;
    next();
})