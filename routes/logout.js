
module.exports = function(req,res){
    delete req.session.userId;
    delete req.session;
    
    res.redirect('/')
}