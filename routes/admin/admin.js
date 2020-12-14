const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Admin = require('../../models/admin');
const { adminValidation } = require('../../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var adminRouter = express.Router();

adminRouter.use(bodyParser.json());

adminRouter.route('/')
.get((req, res, next) => {
    Admin.find({}, {"_id": 0, "password": 0})
    .then((admin)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(admin);
    })
})
.post( async (req, res) => {
    const { error } = adminValidation(req.body);

    if (error) return res.status(400).json({error: error.details[0].messages});

    const user =  await Admin.findOne({username: req.body.username});

    if (!user) return res.status(400).json({error: "Username is wrong"});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({error: "Password is wrong"});
    
    const token = jwt.sign(
        {
            name: user.name,
            id: user._id
        },
        process.env.TOKEN_SECRET_ADMIN,
        {
            expiresIn: '24h'
        }
    );
    // //cookies

    res.cookie('authCookie', token,{maxAge:900000, htpOnly:true}).json({
        error: null,
        data: {
            token,
        }
    });

    // res.header("auth-token", token).json({
    //     error: null,
    //     data: {
    //         token,
    //     },
    // });
})
adminRouter.route('/edit/:adminId')
.put((req, res, next) => {
    Admin.findByIdandUpdate(req.params.adminId,
        {$set: req.body},
        {new: true})
    .then((admin)=>{ 
        console.log('Updated', admin);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(admin);
    });
});


module.exports = adminRouter;

