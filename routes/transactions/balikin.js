const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Transactions = require("../../models/transactions");
const Books = require("../../models/book");
var balikinRouter = express.Router();

balikinRouter.use(bodyParser.json());
balikinRouter.route("/").post((req, res, next) => {
  // update the stok value
  
  for (id of req.body.buku) {
    console.log(id)
    Books.findOneAndUpdate({_id:id}, { $inc: { stokTersedia: 1 } }).then(
      () => {
        Transactions.findOneAndUpdate(
          { idBuku: id },
          {
            "status": "Selesai",
            "tanggalBalikin": Date.now(),
          },
          {new: true}
        ).then(()=>{
          console.log("Buku telah dikembalikan");
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Buku telah dikembalikan" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.end("Error : ", err);
        });
      }
    );
  }
  
});

module.exports = balikinRouter;
