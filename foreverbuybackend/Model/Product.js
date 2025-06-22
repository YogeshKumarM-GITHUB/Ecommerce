const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    FirstImage: { type: String, required: true },
    SecondImage: { type: String, required: true },
    ThirdImage: { type: String, required: true },
    FourthImage: { type: String, required: true },
    ProductName: { type: String, required: true },
    ProductDescrption: { type: String, required: true },
    ProductCategory: { type: String, required: true },
    ProductSubCategory: { type: String, required: true },
    ProductPrice: { type: Number, required: true },
    ProductSizes: { type: Array, required: true },
    Addtobestseller: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model("Product", ProductSchema);