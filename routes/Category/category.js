const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Categories = require('../../models/category');

var KatRouter = express.Router();

KatRouter.use(bodyParser.json());

KatRouter.route('/')
.get((req,res,next) => {
    Categories.find({})
    .then((kategori) => {
        res.statusCode = 200,
        res.setHeader('Content-Type','application/json');
        res.json(kategori);
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err)
    })
    

});

KatRouter.route('/:nama').get((req, res, next) => {
    var nama = req.params.nama
    Categories.findOne({nama : nama})
    .then((kategori)=>{
        res.statusCode = 200,
        res.setHeader('Content-Type','application/json');
        res.json(kategori);
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err)
    })
});



module.exports =  KatRouter;
