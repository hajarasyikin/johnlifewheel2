const express = require ('express');
const expressLayouts = require ('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session  = require('express-session');

const app = express();


const db = require('./config/keys').MongoURI;


mongoose.connect('mongodb://localhost:27017/').then(() => {
console.log("Connected to Database");
}).catch((err) => {
console.log("Not Connected to Database ERROR! ", err);
});

app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

