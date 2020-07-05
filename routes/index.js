const User = require('../services/user.js')
module.exports = function index(req,res){
    res.render('homepage',{views:req.session.views})
}