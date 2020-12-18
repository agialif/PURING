const express = require('express');

const mongoose = require('mongoose');

const SumbanganCD = require('../../models/sumbangCD');

const sumbangCDRouter = express.Router();

//route /sumbangan

sumbangCDRouter.get('/', (req, res, next) => {
    SumbanganCD.find({})
    .then((sumbangCD) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(sumbangCD);
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err)
    })
});

sumbangCDRouter.get('/:judul', (req, res, next) => {
    var judul = req.params.judul
    SumbanganCD.findOne({judul : judul})
    .then((sumbangCD) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(sumbangCD)
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
});

sumbangCDRouter.post('/', (req, res, next) => {
    SumbanganCD.create(req.body)
    .then((sumbangCD) => {
        console.log('Sumbangan Buku created', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sumbangCD)
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
});

module.exports = sumbangCDRouter;

