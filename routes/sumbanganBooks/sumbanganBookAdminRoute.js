const express = require('express');

const mongoose = require('mongoose');

const Sumbangan = require('../../models/sumbanganBook');

const sumbangAdminRouter = express.Router();

sumbangAdminRouter.get('/', (req, res, next) => {
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

sumbangAdminRouter.get('/:judul', (req, res, next) => {
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

sumbangAdminRouter.put('/:sumbanganId', (req, res, next) => {
    var sumbanganId = req.params.sumbanganId;
    Sumbangan.findByIdAndUpdate(
        sumbanganId,
        { $set : req.body},
        { new : true}
        )
        .then( (sumbang) => {
            console.log('sumbangan buku updated', sumbang);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(sumbang);
        })
        .catch((err) => {
            console.log(err)
            res.status(500);
            res.end('Error : ', err);
        })
});

sumbangAdminRouter.delete('/:sumbanganId', (req, res, next) => {
    var sumbanganId = req.params.sumbanganId;
    Sumbangan.findByIdAndRemove(sumbanganId)
    .then((resp) => {
        console.log('sumbangan removed', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
});

module.exports = sumbangAdminRouter;