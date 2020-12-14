const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {Transactions} = require('../../models/transactions');

var balikinRouter = express.Router();

balikinRouter.use(bodyParser.json());
  balikinRouter.route('/')
  .post((req, res, next) => {
    //TODO: tambahin 
    Transactions.create(req.body)
      .then((results) => {
        console.log('Balikin ', results);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
      });
  });

  module.exports = {balikinRouter,pinjamRouter};