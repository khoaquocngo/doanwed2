module.exports = function requireLoggedIn(req,res,next){
   
    if(req.currentUser.decentralize != 1) {
        res.redirect('/guestAccount');
        
    }
   else {
        next();
        
    }
}