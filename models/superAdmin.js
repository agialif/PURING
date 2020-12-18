const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var superAdminSchema = new Schema({
    username:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var superAdmin = mongoose.model('superAdmin', superAdminSchema);

module.exports = superAdmin;