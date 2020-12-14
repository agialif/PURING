const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {Transactions} = require('../../models/transactions');

var pinjamRouter = express.Router();

pinjamRouter.use(bodyParser.json());


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
      .then((results) => {
        console.log('Pinjaman created', results);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
      });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported');
  })

  module.exports = pinjamRouter;