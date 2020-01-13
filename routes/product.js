const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Product.find({})
            .then((products) => {
                res.json(products);
            })
            .catch(next);
    })
    .post((req, res, next) => {
        Product.create(req.body)
            .then((Product) => {
                res.statusCode = 201;
                res.json(Product);
            })
            .catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    

// router.route('/:id')
//     .get((req, res, next) => {
//         Product.findById(req.params.id)
//             .populate({
//                 path: 'tasks',
//                 select: 'name'
//             })
//             .then((Product) => {
//                 res.json(Product);
//             }).catch(next);
//     })
//     .post()
//     .put()
//     .delete();

    router.route('/trending')
    .get((req, res, next) => {
        Product.find({popular:true})
            .then((products) => {
                res.json(products);
            })
            .catch(next);
    })

module.exports = router;