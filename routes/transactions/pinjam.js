const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Transactions = require("../../models/transactions");
const Books = require("../../models/book");

var pinjamRouter = express.Router();
var pinjamAdminRouter = express.Router();

pinjamRouter.use(bodyParser.json());
pinjamAdminRouter.use(bodyParser.json());

pinjamRouter
  .route("/")
  .get((req, res, next) => {
    Transactions.find({ idUser: req.user.id }).then((results) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    });
  })
  .post((req, res, next) => {
    if (!("idUser" in req.body)) {
      req.body["idUser"] = req.user.id;
    }
    // check if book not empty
    Books.findById(req.body.idBuku)
      .then((results) => {
        if (results.stokTersedia > 0) {
          // update the stok value
          return Books.findByIdAndUpdate(req.body.idBuku, {
            $inc: { stokTersedia: -1 },
          });
        } else {
          return false;
        }
      })
      .then((available) => {
        if (available) {
          Transactions.create(req.body)
            .then((results) => {
              console.log("Pinjaman created");
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(results);
            })
            .catch((err) => {
              console.log(err);
              res.status(500);
              res.end("Error : ", err);
            });
        } else {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Stok tidak tersedia" });
        }
      });
  });

//Udpate status peminjamannya jadi diterima
pinjamAdminRouter.route("/:id").put((req, res, next) => {
  Transactions.findOneAndUpdate(
    { _id: req.params.id },
    { status: "Sedang Dipinjam" }
  ).then((results) => {
    console.log("Pinjaman updated");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(results);
  });
});

module.exports = { pinjamRouter, pinjamAdminRouter };
