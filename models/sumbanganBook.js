const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sumbanganSchema = new Schema ({
    judul : {
        type : String,
        required : true

    },
    tahun : {
        type : Number,
        required : true

    },penulis : {
        type : String,
        required : true

    },
    penerbit : {
        type : String,
        required : true

    },
    jumlahHalaman : {
        type : String,
        required : true

    },
    
    listKategori : [Schema.Types.ObjectId]
    
})
var Sumbangan = mongoose.model('sumbangan', sumbanganSchema)

module.exports = Sumbangan;
