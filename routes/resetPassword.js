const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler')

router.post('/',function isRegister(req,res){
    console.log(req.body);
});


module.exports = router;