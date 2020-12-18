const express = require('express');

const mongoose = require('mongoose');

const SumbanganCD = require('../../models/sumbangCD');

const sumbangCDAdminRouter = express.Router();

sumbangCDAdminRouter.get('/', (req, res, next) => {
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

sumbangCDAdminRouter.get('/:judul', (req, res, next) => {
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

sumbangCDAdminRouter.put('/:sumbanganId', (req, res, next) => {
    var sumbanganCDId = req.params.sumbanganCDId;
    SumbanganCD.findByIdAndUpdate(
        sumbanganId,
        { $set : req.body},
        { new : true}
        )
        .then( (sumbangCD) => {
            console.log('sumbangan buku updated', sumbang);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(sumbangCD);
        })
        .catch((err) => {
            console.log(err)
            res.status(500);
            res.end('Error : ', err);
        })
});

sumbangCDAdminRouter.delete('/:sumbanganId', (req, res, next) => {
    var sumbanganCDId = req.params.sumbanganCDId;
    SumbanganCD.findByIdAndRemove(sumbanganCDId)
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

module.exports = sumbangCDAdminRouter;