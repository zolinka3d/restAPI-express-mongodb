const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel');


const getProducts = asyncHandler(async (req, res) => {
    let searchQuery = {};
    let sortQuery = {};

    if(req.query.name) {
        searchQuery = {name: {$regex: req.query.name, $options: 'i'}}
    }
    if (req.query.sort) {
        if (req.query.sort === 'price') {
            sortQuery = {price: 1}
        } else if (req.query.sort === '-price') {
            sortQuery = {price: -1}
        } else if (req.query.sort === 'name') { 
            sortQuery = {name: 1}
        } else if (req.query.sort === '-name') {
            sortQuery = {name: -1}
        } else if (req.query.sort === 'amount') {
            sortQuery = {amount: 1}
        } else if (req.query.sort === '-amount') {
            sortQuery = {amount: -1}
        } else if (req.query.sort === 'description') {
            sortQuery = {description: 1}
        } else if (req.query.sort === '-description') {
            sortQuery = {description: -1}
        } else {
            sortQuery = {name: 1}
        }       




    }
    const products = await Product.find(searchQuery).sort(sortQuery)

    res.status(200).json(products);
})

const setProducts = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.price || !req.body.description || !req.body.amount){
        res.status(400)
        throw new Error('No text');
    }
    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        amount: req.body.amount
    });

    res.status(200).json(product);
}
)
const updateProducts = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404);
        throw new Error('Product not found');
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedProduct);
})

const deleteProducts = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error('Product not found');
    }
    await product.remove();

    res.status(200).json({message:`Delete product ${req.params.id}`});
}
)

module.exports = {getProducts, setProducts, updateProducts, deleteProducts}