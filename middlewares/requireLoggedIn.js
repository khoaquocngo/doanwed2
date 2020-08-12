module.exports = function requireLoggedIn(req,res,next){
    if(!req.currentUser){
       return res.redirect('/');
    }else if(req.currentUser.block == true){
        delete req.session.userId;
        return res.redirect('/warning');
    } 
    else{
        next();
    }
}