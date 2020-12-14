const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var transactionSchema = new Schema({
  idUser: {
    type: String,
    required: true,
  },
  idBuku: {
    type: String,
    required: true,
  },
  tanggalPinjam: {
    type: Date,
    default: Date.now,
  },
  tanggalBalikin: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    default: "requested",
  },
});

var Transactions = mongoose.model("Transactions", transactionSchema);
module.exports = Transactions;
