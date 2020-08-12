const {Router} = require('express');
const router = new Router();

router.use(require('../middlewares/requireLoggedIn'));


router.get('/', function getLogin(req, res) {
    
    res.render('homepage');
});

module.exports = router;