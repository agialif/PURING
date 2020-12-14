const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../../models/user');

var userRouter = express.Router();

userRouter.use(bodyParser.json());

//GET all users data
userRouter.route('/')
.get((req, res, next)=>{
  User.find({})
  .then((user)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
  });
});

// userRouter.route('/edit')
// .put( async (req, res) => {
//   const username = req.cookies.userCookie;
  
//   User.findOneAndUpdate(username, 
//     {$set: req.body},
//     {new: true})
//   .then((user) => {
//     res.status(200);
//     res.json(user);
//   });

// });

  module.exports = userRouter;