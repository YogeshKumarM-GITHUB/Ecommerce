const product = require('../Model/Product')

const AddProduct = async (req, res) => {
    try {

        const Product = new product(req.body);
        await Product.save();
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: Product
        })

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const GetAllProducts = async (req, res) => {
    try {
        const AllProducts = await product.find({});
        if (AllProducts) {
            res.status(200).json({
                success: true,
                message: "Products fetched sucessfully",
                data: AllProducts
            })
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { AddProduct, GetAllProducts };