const express = require('express');

const mongoose = require('mongoose');

const Books = require('../../models/book');
// const Categories = require('../../models/category');

const bookRouter = express.Router();

// route '/buku'

bookRouter.get('/', (req, res, next) => {
    Books.find({})
    .then((books) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(books);
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err)
    })
});

bookRouter.get('/:judul', (req, res, next) => {
    var judul = req.params.judul
    Books.findOne({judul : judul})
    .then((book) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(book)
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
})

module.exports = bookRouter;