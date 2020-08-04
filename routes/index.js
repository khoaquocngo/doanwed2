const {Router} = require('express');
const router = new Router();
const requireLoggedIn = require("../middlewares/requireLoggedIn");

router.use(requireLoggedIn);

router.get('/', function getLogin(req, res) {
    
    res.render('homepage');
});

module.exports = router;