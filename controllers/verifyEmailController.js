'use strict';

const UserAccount = require('../models/UserAccount');
let jwt = require('jsonwebtoken');
let config = require('../config');
const sendSignupMail = require('../server-mails/signup.js');

exports.sendVerifyEmail = function(req, res) {
    if(req.body.email && req.body.userID)
        sendSignupMail(req.body.email, req.body.first_name, req.body.userID);
}

exports.verify = function(req, res) {
    if((`${req.protocol}://${req.get('host')}`) ==(config.apiBaseUrl))
    {
        console.log("Domain is matched. Information is from Authentic email");
        const decoded = jwt.verify(req.params.token, config.secret);
        console.log(decoded);
        
        UserAccount.updateById(decoded.userID, { email_verified: 1 }, function(err, resp) {
            if (err)
                console.log(err);
                res.send("<p>Bad request! Email not verified.</p>");
            if(resp && resp.affectedRows > 0) {
                console.log("Email is verified");
                res.send("<h2>Your email has been verified successfully. </h2>");    
            } else {
                console.log("Email not verified");
                res.send("<p>Bad request! Email not verified.</p>");
            }
        });
    }
}