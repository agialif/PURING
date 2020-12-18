const express = require('express');

const mongoose = require('mongoose');

const Sumbangan = require('../../models/sumbanganBook');

const sumbangRouter = express.Router();

//route /sumbangan

sumbangRouter.get('/', (req, res, next) => {
    Sumbangan.find({})
    .then((sumbang) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(sumbang);
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err)
    })
});

sumbangRouter.get('/:judul', (req, res, next) => {
    var judul = req.params.judul
    Sumbangan.findOne({judul : judul})
    .then((sumbang) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(sumbang)
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
});

sumbangRouter.post('/', (req, res, next) => {
    Sumbangan.create(req.body)
    .then((sumbang) => {
        console.log('Sumbangan Buku created', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sumbang)
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
});

module.exports = sumbangRouter;

