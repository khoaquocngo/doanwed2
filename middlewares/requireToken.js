module.exports = function requireLoggedIn(req,res,next){
    if(req.currentUser.token!==null){
        res.redirect('/home')
    }
    else{
        next();
    }
}