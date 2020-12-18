const express = require("express");
const bodyParser = require("body-parser");
const verifyToken = require("../../models/verifyToken");
const User = require("../../models/user");
const { token } = require("morgan");

var confirmEmail = express.Router();
confirmEmail.use(bodyParser.json());

confirmEmail.route("/:email/:token")
.get((req, res, next) => {
    verifyToken.findOne({
        token: req.params.token
    })
    if (!token){
        return res.status(400).json({error: 'Your account has not been activated' });
    }
    else {
        User.findOne({
            //_id: token.userId,
            email: req.params.email
        }, function (error, user) {
            if(!user) {
                res.status(401).json({error: 'User not found. Please signup first'});
            }
            else if (user.isVerified) {
                return res.status(200).json('Your account has been already registered');
            }
            else {
                user.isVerified = true;
                user.save(function (error) {
                    if (error){
                        return res.status(500).send({error: error.message});
                    }
                    else {
                        return res.status(200).json('Your account successfully registerd');
                    }
                });
            }
        });
    }
});

module.exports = confirmEmail;