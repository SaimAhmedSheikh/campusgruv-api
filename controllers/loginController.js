'use strict';
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
let config = require('../config');
const UserInfo = require('../models/UserInfo');
const UserAccount = require('../models/UserAccount');

exports.loginUser = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log('login: ',email);
    
    // For the given email/password fetch user from DB
    UserAccount.getUserByEmail(email, 
    function(err, result) {
        console.log('error -> ' ,err ,'result -> ' ,result)
        if (err) {
            res.json({
                error: true,
                message: 'Email not registered. Enter correct email or signup first.'
                });
        }
        let user;
        result && result.forEach(row => { user = row });
        console.log('', user);
        if(!user) {
            res.json({
                error: true,
                message: 'Unable to login! Try again.'
                });
        } else {
            if (email && password && email === user.email) {
                bcrypt.compare(password, user.password, function(isError, isSuccessfull) {
                    if(isSuccessfull) {
                        let token = jwt.sign({
                            userID: user.userID,
                            email: email
                            },
                            config.secret,
                            // { expiresIn: '24h' // expires in 24 hours
                            // }
                        );
                        // return the JWT token for the future API calls
                        res.json({
                            error: false,
                            message: 'Signin Successful!',
                            token: token,
                            userId: user.userID
                        });
                    } else {  
                        res.json({
                            error: true,
                            message: 'Incorrect password.'
                            });
                    }
                });
            } else {
                res.json({
                    error: true,
                    message: 'Incorrect email'
                });
            }
        }

    });

}