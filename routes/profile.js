const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const multer  = require('multer');
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
    console.log(req.file);
}));
module.exports = router;