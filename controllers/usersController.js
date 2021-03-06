'use strict';

const UserInfo = require('../models/UserInfo');
const UserAccount = require('../models/UserAccount');
const sendSignupMail = require('../server-mails/signup.js');

exports.list_all_user_accounts = function(req, res) {
  UserAccount.getAllUserAccounts(function(err, userAcc) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
      console.log('res', userAcc);
    res.json(userAcc);
  });
}
exports.list_all_user_info = function(req, res) {
  UserInfo.getAllUserInfos(function(err, users) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
      console.log('res', users);
    res.json(users);
  });
}
exports.create_a_user = function(req, res) {
  const userID = req.body.userId; 
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  let new_user_info, new_user_account;
  
  if(userID && first_name) {  
    new_user_info = new UserInfo({
      userID,
      first_name,
      last_name,
      pictureUrl: ''
    });
  }
  if(email && password) {  
    new_user_account = new UserAccount({
      userID,
      email,
      password,
      email_verified: 0,
      active: 0,
      user_create_date: new Date()
    });
  }
  //handles null error 
  if(!new_user_account || !new_user_info){
      res.json({ error:true, message: 'Unable to create user!' });
  }
  else {
    UserAccount.createUserAccount(new_user_account.userAccount, function(err, result) {
    if (err)
        res.json({ error: true, message: 'Unable to create user!' });
    else if(result==='ERROR_USER_EXISTS')
        res.json({ error: true, message: 'Email already registered!' });
    else {
      const token = result;
      UserInfo.createUser(new_user_info.userInfo, function(err, result) {
        if (err)
          res.json({ error: true, message: 'Unable to create user!' });
        else {
          res.json({ error:false, message: 'User created!', token });
          //sendSignupMail(email, first_name, userID);
        }
      });
    }
  });
  }
}

exports.read_user_info = function(req, res) {
  UserInfo.getUserInfoById(req.params.userId, function(err, user) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
    res.json(user);
  });
}
exports.read_user_account = function(req, res) {
  UserAccount.getUserAccountById(req.params.userId, function(err, user) {
    if (err)
      res.json({ error: true, message: 'Unable to fetch data!' });
    res.json(user);
  });
}

exports.update_user_info = function(req, res) { 
  UserInfo.updateById(req.params.userId, req.body, function(err, user) {
    if (err)
      res.json({ error: true, message: 'Unable to update user!' });
    res.json({ error: false, message: 'User successfully updated.' });
  });
}
exports.update_user_account = function(req, res) {
  UserAccount.updateById(req.params.userId, req.body, function(err, user) {
    if (err)
      res.json({ error: true, message: 'Unable to update user!' });
    res.json({ error: false, message: 'User successfully updated.' });
  });
}

exports.delete_user_info = function(req, res) {
  UserInfo.remove( req.params.userId, function(err, user) {
    if (err)
      res.json({ error: true, message: 'Unable to delete user!' });
    res.json({ error: false, message: 'User successfully deleted' });
  });
}
exports.delete_user_account = function(req, res) {
  UserAccount.remove( req.params.userId, function(err, user) {
    if (err)
      res.json({ error: true, message: 'Unable to delete user!' });
    res.json({ error: false, message: 'User successfully deleted' });
  });
}

