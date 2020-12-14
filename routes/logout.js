const express = require('express')
const jwt = require('jsonwebtoken');
const logoutRouter = express.Router();

logoutRouter.route('/')
.get((req, res, next) => {
    res.clearCookie('authCookie');
    res.redirect('/');
})

module.exports = logoutRouter;