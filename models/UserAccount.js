'use strict';
const sql = require('./dbConnection.js');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let config = require('../config');
//UserAccount object
class UserAccount {
    constructor(userAccount) {
        this.userAccount = userAccount;
        this.created_at = new Date();
    }
    static createUserAccount(newUserAccount, result) {
        UserAccount.getUserByEmail(newUserAccount.email, 
            function(err, users) {
                if(users.length > 0) {
                    result(null, 'ERROR_USER_EXISTS');
                } else {
                    bcrypt.hash(newUserAccount.password, 10, function(err, hash) {
                        newUserAccount.password = hash;
                        sql.query("INSERT INTO user_account set ?", newUserAccount, function (err, res) {
                            if (err) {
                                console.log("SQL error: ", err);
                                result(err, null);
                            }
                            else {
                                let token = jwt.sign(
                                    {
                                        userID: newUserAccount.userId,
                                        email: newUserAccount.email
                                    },
                                    config.secret,
                                    // { expiresIn: '24h' // expires in 24 hours
                                    // }
                                );
                                // return the JWT token for the future API calls
                                console.log(token);
                                result(null, token);
                            }
                        });
                });
            }
        });
    }
    static getUserAccountById(userId, result) {
        sql.query("Select * from user_account where userID = ? ", userId, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log('Response from server: ', res);
                result(null, res);
            }
        });
    }
    static getUserByEmail(email, result) {
        sql.query("Select * from user_account where email = ? ", email, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    static getAllUserAccounts(result) {
        sql.query("Select * from user_account", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log('user_account : ', res);
                result(null, res);
            }
        });
    }
    static updateById(id, values, result) {
        let update_set = Object.keys(values).map(value => ` ${value}  = "${values[value]}"`);
     
        let update_query =  `UPDATE user_account SET ${update_set.join(" ,")} WHERE userID = ?`;
        sql.query(update_query, [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log("response: ", res);
                result(null, res);
            }
        });
    }
    static updateByEmail(email, values, result) {
        let update_set = Object.keys(values).map(value => ` ${value}  = "${values[value]}"`);
     
        let update_query =  `UPDATE user_account SET ${update_set.join(" ,")} WHERE email = ?`;
        sql.query(update_query, [email], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log("response: ", res);
                result(null, res);
            }
        });
    }
    static remove(id, result) {
        sql.query("DELETE FROM user_account WHERE userID = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
}

module.exports = UserAccount;