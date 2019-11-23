'use strict';

const Post = require('../models/PostModel.js');
const url = require('url');


exports.filter_posts = function(req, res) {
  Post.getFilteredPosts(req.query, function(err, posts) {
    if (err)
      res.json({ error: err.code, message: err.message });
    console.log('res', posts);
    res.json({ error: false, message: 'Posts fetched successfully', posts });
  }); 
}

exports.create_a_post = function(req, res) {
  var new_post = new Post(req.body);
  const [ file1, file2, file3 ] = req.files;
  new_post.post.image1 = file1 ? file1.filename : '';
  new_post.post.image2 = file2 ? file2.filename : ''
  new_post.post.image3 = file3 ? file3.filename : ''
  
  console.log('images: ', req.files)
  console.log('body: ', req.body)
  //handles null error 
   if(!new_post.post){
            res.json({ error: true, message: 'Unable to create post!' });
    }
    else {
      Post.createPost(new_post.post, function(err, resp) {
        if (err)
          res.status(404).send({ error: true, message: 'Unable to create post!' });
        else
          {
            console.log('res =====>' ,resp);
            
            res.status(200).send({ error: false, message: 'Post created', id: resp.insertId });
          }
      });
    }
}

exports.read_a_post = function(req, res) {
  Post.getPostById(req.params.postId, function(err, post) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
    res.json(post);
  });
}


exports.update_a_post = function(req, res) {
  Post.updateById(req.params.postId, req.body, function(err, post) {
    if (err)
      res.json({ error: true, message: 'Unable to update this post!' });
    res.json({ message: 'Post successfully updated.' });
  });
}

exports.delete_a_post = function(req, res) {
  Post.remove( req.params.postId, function(err, post) {
    if (err)
      res.json({ error: true, message: 'Unable to delete this post!' });

    res.json({ message: 'Post successfully deleted' });
  });
}

