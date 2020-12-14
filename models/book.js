const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const categorySchema = require('./category');

var bookSchema = new Schema({
    judul : {
        type : String,
        required : true
    },
    tahun : {
        type : Number,
        required : true
    },
    penulis : {
        type : String,
        required : true
    },
    penerbit : {
        type : String,
        required : true
    },
    jumlahHalaman : {
        type : Number,
        required : true
    },
    sinopsis : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    listKategori : [Schema.Types.ObjectId]
    ,
    stokTersedia : {
        type : Number,
        required : true
    }
});

var Books = mongoose.model('Book', bookSchema)

module.exports = Books;