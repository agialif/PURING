const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {

    const token = req.cookies.authCookie;

    try {
        if(!token) {
            return res.status(401).json('You need to login')
        }

        const verified = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN);
        req.user = verified;
        next();
    }
    catch (err) {
        return res.status(500).json(err.toString);
    }
};

module.exports = verifyAdmin;