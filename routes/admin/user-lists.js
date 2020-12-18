const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../../models/user');

var userRouter = express.Router();

userRouter.use(bodyParser.json());

//GET all users data
userRouter.route('/')
.get((req, res, next)=>{
  User.find({}, {"password": 0, "raw_password": 0})
  .then((user)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
  });
});

  module.exports = userRouter;