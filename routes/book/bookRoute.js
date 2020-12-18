const express = require('express');

const mongoose = require('mongoose');

const Books = require('../../models/book');
// const Categories = require('../../models/category');

const bookRouter = express.Router();

// route '/buku'

bookRouter.get('/', (req, res, next) => {
    var page = req.query.page || 0;
    var numResults = req.query.numResults || 10;

    console.log(req.query)

    Books.find({}).limit(numResults).skip(page*10)
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

bookRouter.get('/judul/:judul', (req, res, next) => {
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


bookRouter.get('/search', (req, res, next) => {
    var s = req.query.s;
    var afterYear = req.query.afterYear || 1990;
    var beforeYear = req.query.beforeYear || 2021;
    var category = req.query.category || '' ;
    var page = parseInt(req.query.page) || 0;
    var numResults = parseInt(req.query.numResults) || 10;

    if (category) {
        Books.find( {
            $text : {$search : s},
            listKategori : category,
            tahun : {$gte:afterYear, $lte:beforeYear}
        } )
        .limit(numResults).skip(page*10)
        .then((books) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            return res.json(books);
        })
        .catch((err) => {
            console.log(err)
            res.status(500);
            return res.end('Error : ', err)
        })
    }

    else {
        Books.find( {
            $text : {$search : s},
            tahun : {$gte:afterYear, $lte:beforeYear}
        } )
        .limit(numResults).skip(page*10)
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
    }

})

// bookRouter.post('/setIndex', (req, res, next) => {
//     Books.index( { judul:"text", penulis:"text", penerbit:"text", sinopsis:"text" } )
//     .then((result) => {
//         res.status(200);
//         res.end("Result :",result);
//     })
//     .catch((err) => {
//         console.log(err);
//         res.status(500);
//         res.end('Error :', err);
//     })
// })

module.exports = bookRouter;