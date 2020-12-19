const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

var profileRouter = express.Router();

profileRouter.use(bodyParser.json());

profileRouter.route('/password/:userId')//change password
.put(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  User.findByIdAndUpdate(req.params.userId,
    {password: hashedPassword},
    {new: true})
    .then((user) => {
      console.log('Password updated', user);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
  });
});

profileRouter.route('/:userId')
.put(async (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId,
    {$set: req.body},
            {new: true})
    .then((user) => {
      console.log('Profile updated', user);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
  });
})
.get((req, res, next) => {
  User.findById(req.params.userId, {"password": 0})
  .then((user) => {
    res.status(200);
    res.setHeader('Content-Type','application/json');
    res.json(user);
  })
  .catch((err) => {
    res.status(500).json({error: err.message})
  });
})
.post((req, res, next) => {
  res.status(403);
  res.setHeader('Content-Type','application/json');
})
.delete((req, res, next) => {
  res.status(403);
  res.setHeader('Content-Type','application/json');
});

module.exports = profileRouter;
