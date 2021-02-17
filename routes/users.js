const express = require('express');
const User = require('../models/User');
const router = express.Router();



//const User = require('../models/User');

//router.get('/login', (req, res) => res.render('login'));

router.get('/index', (req, res) => res.render('index'));


router.post('/index', (req, res) => {
    const { email } =  req.body; //sini tukar nnti
    let errors = [];

    if(!email){

        errors.push({ msg: 'Please fill in all fields'});
    }

    if(email != email){
            errors.push({ msg: 'Password do not match'});
    }
        
    if(email.length > 100) {
            errors.push({ msg: 'Password should be at least 100 character'});
    }

    if(errors.length > 0){
        res.render('index', {
            errors, 
            
            email,
            
        });
    } else {
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                errors.push({ msg: 'Email is already registed'});
                res.render('index', {
                    errors, 
                
                    email,
                    
                });
            }else{
                const newUser = new User({
                    
                    email,
                    
                });

                newUser.email = email;

                newUser.save()
                .then(user =>{
                    req.flash('success_msg', 'Report has been generated to your email, Please open your email');
                    res.redirect('/users/index');
                })

                
            }
        });
    }


});


module.exports = router;


