const {Router} = require('express');

const router = new Router();
router.use(require('../middlewares/requirelogged'));



router.get('/',function getLogin(req,res){
    res.render('warning');
});

module.exports = router;