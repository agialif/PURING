const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username:  {
        type: String,
        required: true
    },
    raw_password: {
        type: String
        
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Admin = mongoose.model('Admin', adminSchema);
 
module.exports = Admin;