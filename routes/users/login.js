const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models/user');

const { registerValidation, loginValidation } = require('../../validation');

var loginRouter = express.Router();

loginRouter.use(bodyParser.json());
//validation

loginRouter.route('/')
.post(async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).json({error: error.details[0].messages});

    const user =  await User.findOne({username: req.body.username});

    if (!user) return res.status(400).json({error: "Username is wrong"});

    

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({error: "Password is wrong"});

    const token = jwt.sign(
        {
            name: user.name,
            id: user._id
        },
        process.env.TOKEN_SECRET_USER,
        {
            expiresIn: '24h'
        }
    );
    //cookies
    
    res.cookie('authCookie', token,{maxAge:900000, htpOnly:true}).json({
        error: null,
        id: user.id,
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
});

//register rout


module.exports = loginRouter;