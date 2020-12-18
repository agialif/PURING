const express = require('express');
const bodyParser = require('body-parser');
const Super_Admin = require('../../models/superAdmin')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

var loginSuperAdmin = express.Router();
loginSuperAdmin.use(bodyParser.json());

//LOGIN
loginSuperAdmin.route('/')
.post((req, res, next) => {
    const user = Super_Admin.findOne(req.body.username);
    const password = Super_Admin.findOne(req.body.password)
    const validPassword = bcrypt.compare(req.body.password, user.password);

    if (!user) {
        return res.status(400).json({error: "Username is wrong"});
    } else if  (!validPassword){
        return res.status(400).json({error: "Password is wrong"});
    } else {
        const token = jwt.sign(
            {
                name: user.name,
                id: user._id
            },
            process.env.TOKEN_SECRET_SUPER_ADMIN,
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
    }
    
});

module.exports = loginSuperAdmin;