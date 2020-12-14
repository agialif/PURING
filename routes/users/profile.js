const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../../models/user');

var profileRouter = express.Router();

profileRouter.use(bodyParser.json());

profileRouter.route('/')
.get((req, res, next) => {
var user_name = new User.findOne({username: req.body.username});
console.log(user_name);
  user_name.user = req.user.email;
})

module.exports = profileRouter;
