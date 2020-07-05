const User = require('../services/user.js')
const asyncHandler = require('express-async-handler')
module.exports = asyncHandler(async function auth(req,res,next){
    const userId = req.session.userId;
    res.locals.currentUser = null;
    if(!userId){
        return next();
    }
    const user = await User.findUserById(userId)
    if(!user){
        return next();
    }
    req.currentUser =user;
    res.locals.currentUser = user;
    next();
})