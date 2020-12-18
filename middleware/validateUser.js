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
                try {
                    const verified = jwt.verify(token, process.env.TOKEN_SECRET_SUPER_ADMIN);
                    req.user = verified;
                    next();
                }
                catch(err){
                    return res.status(500).json(err);
                }

            }
        }
    })
};

module.exports = verifyUser;