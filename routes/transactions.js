const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {Transactions} = require('../models/transactions');

var pinjamRouter = express.Router();
var balikinRouter = experss.Router();

pinjamRouter.use(bodyParser.json());
balikinRouter.user(bodyParser.json());


pinjamRouter.route('/')
  .get((req, res, next) => {
    //TODO: Check user from bearer token
    Transactions.find({})
      .then((results) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
      });
  })
  .post((req, res, next) => {
    Transactions.create(req.body)
      .then((dish) => {
        console.log('Pinjaman created', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported');
  })


  balikinRouter.route('/')
  .post((req, res, next) => {
    //TODO: tambahin 
    Transactions.create(req.body)
      .then((dish) => {
        console.log('Pinjaman created', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      });
  });

module.exports = dishRouter;