'use strict';
let middleware = require('../middleware');
let uploadImage = require('../uploadImage');

module.exports = function(app) {
  var users = require('../controllers/usersController');
  var userAuthentication = require('../controllers/loginController');
  var emailverification = require('../controllers/verifyEmailController');
  var passwordReset = require('../controllers/resetPassController.js');
  var posts = require('../controllers/postsController');

  // users Routes
  app.route('/users/accounts')
    .get(middleware.checkToken, users.list_all_user_accounts)
  app.route('/users/userinfo')
    .get(middleware.checkToken, users.list_all_user_info)
  
  app.route('/users/account/:userId')
    .get(middleware.checkToken, users.read_user_account)
    .put(middleware.checkToken, users.update_user_account)
    .delete(middleware.checkToken, users.delete_user_account);
  app.route('/users/info/:userId')
    .get(middleware.checkToken, users.read_user_info)
    .put(middleware.checkToken, users.update_user_info)
    .delete(middleware.checkToken, users.delete_user_info);
  
    app.route('/users/signup').post(users.create_a_user);
  
    // user login Route
  app.post('/login', userAuthentication.loginUser);

  // email verify Route
  app.post('/verify', emailverification.sendVerifyEmail);
  app.get('/verify/:token', emailverification.verify);
  
   // password reset Route
   app.post('/reset', passwordReset.resetPasswordRequest);
   app.get('/reset/:token', passwordReset.reset);

     // posts Routes

  app.route('/posts')
      .get(middleware.checkToken, posts.filter_posts)
      .post(middleware.checkToken, /*uploadImage.upload.array('post_images[]', 3),*/ posts.create_a_post);
 
  app.route('/posts/:postId')
    .get(middleware.checkToken, posts.read_a_post)
    .put(middleware.checkToken, posts.update_a_post)
    .delete(middleware.checkToken, posts.delete_a_post);

  //  app.post('/upload', middleware.checkToken, upload.array('photo', 3), (req, res) => {
  //   console.log('file', req.files)
  //   console.log('body', req.body)
  //   res.status(200).json({
  //     success: true,
  //     message: 'success!',
  //   })
  // })

};

