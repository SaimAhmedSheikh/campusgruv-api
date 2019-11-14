'use strict';
const sql = require('./dbConnection.js');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let config = require('../config');
//User object
class User {
    constructor(user) {
        this.user = user;
        this.created_at = new Date();
    }
    static createUser(newUser, result) {
        User.getUserByEmail(newUser.email, 
            function(err, users) {
                if(users.length > 0) {
                    result(null, 'ERROR_USER_EXISTS');
                } else {
                    bcrypt.hash(newUser.password, 10, function(err, hash) {
                        newUser.password = hash;
                        sql.query("INSERT INTO users set ?", newUser, function (err, res) {
                            if (err) {
                                console.log("error: ", err);
                                result(err, null);
                            }
                            else {
                                let token = jwt.sign({email: newUser.email},
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
    static getUserById(userId, result) {
        sql.query("Select * from users where id = ? ", userId, function (err, res) {
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
        sql.query("Select * from users where email = ? ", email, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    static getAllUsers(result) {
        sql.query("Select * from users", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log('users : ', res);
                result(null, res);
            }
        });
    }
    static updateById(id, values, result) {
        let update_set = Object.keys(values).map(value => ` ${value}  = "${values[value]}"`);
     
        let update_query =  `UPDATE users SET ${update_set.join(" ,")} WHERE id = ?`;
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
     
        let update_query =  `UPDATE users SET ${update_set.join(" ,")} WHERE email = ?`;
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
        sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
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

module.exports = User;