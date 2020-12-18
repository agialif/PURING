const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sumbanganCDSchema = new Schema ({
    judul : {
        type : String,
        required : true

    },
    tahun : {
        type : Number,
        required : true

    },Penerbit : {
        type : String,
        required : true

    },

    
    
})
var SumbangCD = mongoose.model('sumbangCD', sumbanganCDSchema)

module.exports = SumbangCD;