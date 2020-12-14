const express = require('express');

const mongoose = require('mongoose');

const Books = require('../../models/book');
// const Categories = require('../../models/category');

const bookAdminRouter = express.Router();

// Route '/admin/buku'

bookAdminRouter.post('/', (req, res, next) => {
    Books.create(req.body)
    .then((book) => {
        console.log('Book created', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book)
    })
    .catch((err) => {
        console.log(err)
        res.status(500);
        res.end('Error : ', err);
    })
})

bookAdminRouter.put('/:bookId', (req, res, next) => {
    var bookId = req.params.bookId;
    Books.findByIdAndUpdate(
        bookId,
        { $set : req.body},
        { new : true}
        )
        .then( (book) => {
            console.log('Book updated', book);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(book);
        })
        .catch((err) => {
            console.log(err)
            res.status(500);
            res.end('Error : ', err);
        })
})

bookAdminRouter.delete('/:bookId', (req, res, next) => {
    var bookId = req.params.bookId;
    Books.findByIdAndRemove(bookId)
    .then((resp) => {
        console.log('Dish removed', resp);
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

module.exports = bookAdminRouter;