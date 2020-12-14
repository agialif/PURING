const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Categories = require('../../models/category');

var KatAdmRouter = express.Router();

KatAdmRouter.use(bodyParser.json());

KatAdmRouter.route('/')
    .post((req, res, next) => {
        Categories.create(req.body)
        .then((kategori) =>{
            console.log('Category created', kategori);
            res.statusCode = 200,
            res.setHeader('Content-Type','application/json');
            res.json(kategori);
    })          
        .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
});

KatAdmRouter.route('/:judul')
    .put((req, res, next) => {
        var judul = req.params.judul;
        Categories.findOneAndUpdate(
            judul, 
            { $set : req.body},
            { new : true}
        ).then((kategori) =>{
            console.log('Category updated', kategori);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(kategori);
        })
        .catch((err) => {
            console.log(err)
            res.status(500);
            res.end('Error : ', err);
        })
});

KatAdmRouter.route('/:nama')
    .delete((req, res, next) => {
        var nama = req.params.nama;
        Categories.findOneAndDelete({nama:nama})
        .then((resp) => {
        console.log('Category removed', resp);
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

module.exports =  KatAdmRouter;
