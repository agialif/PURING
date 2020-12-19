const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyUser = (req, res, next) => {
  const token = req.cookies.authCookie;
  try {
    if (!token) {
      return res.status(401).json("You need to login");
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_USER);
    req.user = verified;
    // next();
    User.findById(req.user.id)
      .then((user) => {
        if (user.isVerified == true) {
          next();
        } else {
          return res.status(401).json("please verify your email address");
        }
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET_SUPER_ADMIN);
      req.user = verified;
      next();
    } catch (err) {
      return res.status(500).json('Access Denied');

    }
  }
};

module.exports = verifyUser;
