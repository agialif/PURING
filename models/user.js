const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var addressSchema = new Schema({
    province:  {
        type: String,
        required: true
    },
    city:  {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    address:[addressSchema]
}, {
    timestamps: true
});

var User = mongoose.model('User', userSchema);
 
module.exports = User;