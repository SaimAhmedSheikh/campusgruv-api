'use strict';
const fs = require('fs');
const Like = require('../models/Likes');
const url = require('url');


exports.filter_likes = function(req, res) {
  Like.getFilteredLikes(req.query, function(err, likes) {
    if (err)
      res.json({ error: err.code, message: err.message });
    console.log('res', likes);
    res.json({ error: false, message: 'Likes fetched successfully', likes });
  }); 
}

exports.create_a_like = function(req, res) {
  console.log('body: ', req.body);
  const newLike = new Like(req.body);

  //handles null error 
   if(!new_like.like){
            res.json({ error: true, message: 'Unable to create like!' });
    }
    else {
      if(!(new_like.like.user_id && new_like.like.post_id)) {
        res.json({ error: true, message: 'Invalid fields!' });
      } else {
        Like.createLike(new_like.like, function(err, resp) {
          if (err)
            res.json({ error: true, message: 'Unable to create like!' });
          else
            {
              console.log('res =====>' ,resp);
              
              res.json({ error: false, message: 'Like created', id: resp.insertId });
            }
        });
      }
    }
}

exports.read_a_like = function(req, res) {
  Like.getLikeById(req.params.likeId, function(err, like) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
    res.json(like);
  });
}

exports.read_user_likes = function(req, res) {
  Like.getlikesByUserId(req.params.userId, function(err, likes) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
    else
      res.json(likes);
  });
}
exports.read_post_likes = function(req, res) {
  Like.getlikesByPostId(req.params.postId, function(err, likes) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
    else
      res.json(likes);
  });
}

exports.update_a_like = function(req, res) {
  Like.updateById(req.params.likeId, req.body, function(err, like) {
    if (err)
      res.json({ error: true, message: 'Unable to update this like!' });
    res.json({ message: 'Like successfully updated.' });
  });
}

exports.delete_a_like = function(req, res) {
  Like.remove( req.params.likeId, function(err, like) {
    if (err)
      res.json({ error: true, message: 'Unable to delete this like!' });

    res.json({ message: 'Like successfully deleted' });
  });
}

