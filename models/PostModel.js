'use strict';
const sql = require('./dbConnection.js');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let config = require('../config');
//Post object

class Post {
    constructor(post) {
        this.post = post;
        this.created_at = new Date();
    }

    static createPost(newPost, result) {
        sql.query("INSERT INTO posts set ?", newPost, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    
    static getPostById(postId, result) {
        sql.query("Select * from posts where id = ? ", postId, function (err, res) {
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
    static getPostsByUser(userId, result) {
        sql.query("Select * from posts where user_id = ? ", userId, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    static getPostsByCampus(campusId, result) {
        sql.query("Select * from posts where campus_id = ? ", campusId, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    static getAllPosts(query, result) {
        const params = [];
        let sqlQuery = `SELECT user_id, title FROM posts
                        WHERE user_id IN (SELECT follower_id FROM followers WHERE followers.user_id = ?) 
                        AND id > ? 
                        LIMIT ?`;
        sql.query(sqlQuery, [userId, lastId, limit], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log('posts : ', res);
                result(null, res);
            }
        });
    }

    static getFilteredPosts(queryParams, result) {
        let values_set = Object.values(queryParams);
        let orderBy = '';
        let limit = ` LIMIT ${queryParams.limit ? queryParams.limit : 50}`;
        let params_set = Object.keys(queryParams).map((fieldName, index) => {
            if(fieldName === 'user_id')
                return ` posts.user_id IN (SELECT follower_id FROM followers WHERE followers.user_id = ?)`;
            else if(fieldName === 'last_id'){
                values_set[index] = parseInt(values_set[index]);
                return ' posts.postID > ?';
            }
            else if(fieldName === 'category_id') {
                return ` posts.category_id IN (?)`;
            }
            else if (fieldName === 'from')
                return ` posts.post_create_date >= ?`;
            else if (fieldName === 'to')
                return ` posts.post_create_date < ?`;
            else 
                return ` ${fieldName} = ?`;
        });
        let search_query =  params_set.join(' AND ');
        let sqlQuery = `SELECT * FROM ((posts INNER JOIN categories ON posts.category_id = categories.categoryID) INNER JOIN users ON posts.user_id = users.userID) WHERE 1=1 LIMIT 30`;
        if(queryParams.orderby === 'date') {
            orderBy = ' ORDER BY posts.post_create_date'
        }
        if (search_query.length > 0)
            sqlQuery = sqlQuery.replace('1=1', search_query);
        sqlQuery.concat(orderBy, limit);

        console.log(params_set, values_set, search_query, sqlQuery);

        sql.query(sqlQuery, values_set, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log('posts : ', res);
                result(null, res);
            }
        });
    }
    static updateById(id, values, result) {
        let update_set = Object.keys(values).map(value => ` ${value}  = "${values[value]}"`);
     
        let update_query =  `UPDATE posts SET ${update_set.join(" ,")} WHERE id = ?`;
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
        sql.query("DELETE FROM posts WHERE id = ?", [id], function (err, res) {
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

module.exports = Post;