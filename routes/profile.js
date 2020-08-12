const {Router} = require('express');
const router = new Router();
const axios = require('axios');
var FileReader = require('filereader')
const asyncHandler = require('express-async-handler');
const multer  = require('multer');
const User = require('../services/user');
router.use(require('../middlewares/requireLoggedIn'));


var storage = multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,'./upload');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
})
var upload = multer({ storage:storage });


router.get('/', asyncHandler (async function (req, res) {
    res.render('partials/profile');
}));
router.post('/', upload.single('CMNDimg'),asyncHandler (async function (req, res ,next) {
//     // reader.readAsDataURL(req.file.path);
console.log(req.body);
// console.log("?????? "+JSON.stringify(req.body.CMND));
// console.log("?????? "+JSON.stringify(req.file.originalname));
//     console.log("?????? "+JSON.stringify(req.file));
//     reader.onload = () => console.log(reader.result);
//     reader.onerror = error => reject(error);
//    if(req.file!= undefined){ await User.updateUserProfile(req.currentUser.id,req.body.displayName,req.body.CMND,req.file.originalname)}
}));
module.exports = router;