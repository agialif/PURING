const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../../models/user');

var profileRouter = express.Router();

profileRouter.use(bodyParser.json());

profileRouter.route('/:userId')
.put((req, res, next) => {
  User.findByIdAndUpdate(req.params.userId,
    {$set: req.body},
    {new: true})
    .then((user) => {
      console.log('Profile updated', user);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    })
})
.get((req, res, next) => {
  User.findById(req.params.userId, {"password": 0})
  .then((user) => {
    res.status(200);
    res.setHeader('Content-Type','application/json');
    res.json(user);
  })
});

module.exports = profileRouter;
