const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {

    const token = req.cookies.authCookie;

    try {
        if(!token || token == 'null') {
            return res.status(401).json('You need to login')
        } 

        const verified = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN);
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
            return res.status(500).json('Access Denied');
        }
    }
};

module.exports = verifyAdmin;