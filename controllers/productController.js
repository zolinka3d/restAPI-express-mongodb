const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req, res) => {
    // try {
    //     const products = await Product.find({});
    //     res.status(200).json(products);
    // } catch (error) {
    //     res.status(500).json({message: error.message});
    // }

    res.status(200).json({message:"get products"});
})

const setProducts = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('No text');
    }
    res.status(200).json({message:"set products"});
}
)
const updateProducts = asyncHandler(async (req, res) => {
    res.status(200).json({message:`update goal ${req.params.id}`});
})

const deleteProducts = asyncHandler(async (req, res) => {
    res.status(200).json({message:`Delete goal ${req.params.id}`});
}
)

module.exports = {getProducts, setProducts, updateProducts, deleteProducts}