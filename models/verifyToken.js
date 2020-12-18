const { required } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user');

var verifyTokenSchema = new mongoose.Schema ({
    _userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: User
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 86400000
        }
    }
});

var verifyToken = mongoose.model('verifyToken', verifyTokenSchema);

module.exports = verifyToken;