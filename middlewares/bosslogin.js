module.exports = function requireLoggedIn(req,res,next){
   
    if(req.currentUser.decentralize != 0) {
        res.redirect('/home');

    } else {
        next();
        
    }
}