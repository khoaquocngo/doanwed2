
    module.exports = function requireLoggedIn(req,res,next){
    
    if(req.currentUser.decentralize == 1) {
        res.redirect('/home');
    
    } else {
        next();

    }
}