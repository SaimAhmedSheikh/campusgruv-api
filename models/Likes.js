'use strict';
const sql = require('./dbConnection.js');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// let config = require('../config');
//likes object
class Like {
    constructor(like) {
        this.like = like;
    }
    static createLike(newLike, result) {
        sql.query("INSERT INTO likes set ?", newLike, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    static getlikesById(likeId, result) {
        sql.query("Select * from likes where id = ? ", likeId, function (err, res) {
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
    static getlikesByPostId(postId, result) {
        sql.query("Select * from likes where post_id = ? ", postId, function (err, res) {
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
    static getlikesByUserId(userId, result) {
        sql.query("Select * from likes where user_id = ? ", userId, function (err, res) {
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
    static getAllLikes(result) {
        sql.query("Select * from likes", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log('likes : ', res);
                result(null, res);
            }
        });
    }
    static updateById(id, values, result) {
        let update_set = Object.keys(values).map(value => ` ${value}  = "${values[value]}"`);
     
        let update_query =  `UPDATE likes SET ${update_set.join(" ,")} WHERE id = ?`;
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

    static remove(id, result) {
        sql.query("DELETE FROM likes WHERE id = ?", [id], function (err, res) {
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

module.exports = Like;