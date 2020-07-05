module.exports = function requireLoggedIn(req,res,next){
    if(req.currentUser){
        res.redirect('/home')
    }
    else{
        next();
    }
}