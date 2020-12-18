const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyUser = (req, res, next) => {

    const token = req.cookies.authCookie;

    User.findOne(req.body.username)
    .then((user) => {
        if (user.isVerified = true) {
            try {
                if(!token) {
                    return res.status(401).json('You need to login')
                }
        
                const verified = jwt.verify(token, process.env.TOKEN_SECRET_USER);
                req.user = verified;
                next();
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
    })
    
    // const token = req.header('auth-token');
    // if(!token) {
    //     return res.status(401).json({
    //         error: "Access Denined"
    //     });
    // }

    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //     req.user = verified;
    //     next();
    // } catch (err) {
    //     res.status(400).json({error: "Token is not valid"});
    // }
};

module.exports = verifyUser;