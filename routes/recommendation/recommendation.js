const express = require('express');

const mongoose = require('mongoose');

const Books = require('../../models/book');
const Transactions = require('../../models/transactions');

const recomRouter = express.Router();

recomRouter.get('/', (req, res, next) => {
    // ngeliat dari 10 transaksi terakhir user, cari kategori yang paling banyak dibaca, lalu berikan rekomendasi dari kategori tersebut

    const userId = req.user.id;
    
    Transactions.find({ idUser: req.user.id} ).limit(10)
    .then((transactions) => {
        if (transactions.length == 0) {
            return res.end('You have no recommendation');
        } else {
            // bikin request ke semua idbuku
            // dapetin kategori buku
            // cari kategori yang paling banyak
            // rekomen random pada kategori
            var promises = [];
            
            transactions.forEach((transaction) => {
                const id = transaction.idBuku;
                promises.push( Books.findById(id) );
            })

            Promise.all(promises).then((books) => {
                var dict_category = {};
                books.forEach((book) => {
                    var category = book.listKategori[0];
                    if (category in dict_category) {
                        dict_category[category] += 1;
                    } else {
                        dict_category[category] = 1;
                    }
                })

                // sort dict_category
                var items = Object.keys(dict_category)
                .map((key) => {
                    return [key, dict_category[key]]
                })

                items.sort( (key, value)  => {
                    return value[1] - key[1]
                })

                const recommend_category = items[0][0]; // kategori rekomendasi
                
                // kasih 5 buku random dari kateogiri rekomendasi
                Books.aggregate([
                    { $match: { listKategori: [recommend_category] } },
                    { $sample: { size: 5 } },
                    { $project: {judul:1, _id:0} }
                ])
                .then((result) => {
                    res.status(200);
                    res.setHeader('Content-Type', 'application/json');
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500);
                    res.end('Error : ', err)
                })
            })

            
        }

    })
})

module.exports = recomRouter;