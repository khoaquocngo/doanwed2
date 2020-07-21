const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const db = require('./services/db');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cookieSession({secret: 'todotopsecret'}))
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//auth middlewares
app.use(require('./middlewares/auth'));

//Routes

app.use('/',require('./routes/pageshome'));
app.use('/accountNumber',require('./routes/accountNumber'));
app.use('/changepassword',require('./routes/changepassword'));
app.use('/transactionHistory',require('./routes/transactionHistory'));
app.use('/home',require('./routes/index'));
app.use('/transfers',require('./routes/transfers'));
app.use('/notification',require('./routes/notification'));
app.use('/verifyMoney',require('./routes/verifyMoney'));
app.use(require('./middlewares/auth'));
app.use('/login',require('./routes/login'));
app.use('/verification',require('./routes/verification'));
app.use('/forgotpassword',require('./routes/forgotpassword'));
app.use('/resetPassword',require('./routes/resetPassword'));

app.use('/register',require('./routes/register'));
app.get('/logout',require('./routes/logout'));
app.use(express.static('public'));

db.sync().then(function(){
  app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  })
}).catch(function(err){
  console.error(err)
})