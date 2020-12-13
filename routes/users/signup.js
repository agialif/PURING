const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

const { registerValidation, loginValidation } = require("../../validation");

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

     const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        address: req.body.address,
        city: req.body.city,
        password,
    });
    try {
        const savedUser = await user.save();
        res.json({error: null, message: 'signup succes', data: { Userid: savedUser._id}})
    }catch (error) {
        res.status(400).json({error});
    }
});

module.exports = signupRouter;

