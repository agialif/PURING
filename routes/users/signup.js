const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { registerValidation, loginValidation } = require("../../validation");
const { required } = require('@hapi/joi');
const { token } = require('morgan');
const verifyToken = require('../../models/verifyToken');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

var signupRouter = express.Router();

signupRouter.use(bodyParser.json());

signupRouter.route('/')
.get((req, res, next) => {
    res.send('Welcome to Signup page');
})
.post(async (req,res) =>{
    const { error } = registerValidation(req.body);

    if(error) return res.status(400).json({error: error.details[0].message});

    const isEmailExist = await User.findOne({email: req.body.email});

    if(isEmailExist) return res.status(400).json({error: "Email already Exists"});

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

   // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

     const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        address: req.body.address,
        city: req.body.city,
        password,
        phone: req.body.phone,
        raw_password: req.body.password
    });

    user.save(function (error) {
        if (error) {
            return res.status(500).json({error: error.message});
        }

        var token = new verifyToken({
            _userId: user._id,
            token: crypto.randomBytes(10).toString('hex')
        });
       
        token.save(function (error){
            if (error) {
                return res.status(500).json({error: error.message});
            }
           // return res.json('Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation/account\/' + user.email + '\/' +token.token );
           const oauth2Client = new OAuth2(
               '707025075356-urv00v2mpg9vevfvpl3j2373bk4c8j0q.apps.googleusercontent.com',
               '3Z3ZjLAdUNY1n1dd5KfBEEq6',
               'https://developers.google.com/oauthplayground'
           ) 

        //    oauth2Client.setCredentials({
        //        refresh_token: '1//04SSRiNCDM3TJCgYIARAAGAQSNwF-L9Ir0o0xthhUcOQqEsQDKr-a4ueNpT3AR6YTU-LccaF7MDPfNYSAvqnkPSnSXJpZVco9WJU'
        //    });

           const accessToken = oauth2Client.getAccessToken();

           var transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                auth: {
                    type: 'OAuth2',
                    user: process.env.GMAIL_USERNAME,
                    clientId: process.env.client_Id,
                    clientSecret: process.env.clientSecret,
                    refreshToken: process.env.refreshToken,
                    accessToken: accessToken
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            var mailOptions = {
                from: 'puring@example.com',
                to: user.email,
                subject: 'Acount Verification',
                text: 'Hello ' +req.body.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' +token.token + '\n\nThank you'
            };
            transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    return res.status(500).json({error: error.message})
                }
                return res.status(200).json('A verification email has been send to ' + user.email)
            });
        })
        
    });
});

module.exports = signupRouter;

