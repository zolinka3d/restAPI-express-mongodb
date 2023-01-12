const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

//mongoose agregate 
// get a raport about every products
router.get('/', asyncHandler(async (req, res) => {
    const raport = await Product.aggregate([
        {
            $project: {
                _id: 0,
                name: 1,
                price: 1,
                description: 1,
                amount: 1,
                total: {$multiply: ["$price", "$amount"]},
                isExpensive: { $cond: { if: { $gt: [ "$price", 1000 ] }, then: "Yes", else: "No" } }
            }
        }
    ])
    res.status(200).json(raport);
}))

module.exports = router;