const mongoose = require('mongoose');
const Schema = mongoose.Schema

var categorySchema = new Schema ({
    nama : {
        type : String,
        required : true
    },
    deskripsi : {
        type : String,
        required : true
    }
})

var Categories = mongoose.model('Category', categorySchema)

module.exports = Categories;