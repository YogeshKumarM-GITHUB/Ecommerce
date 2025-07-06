const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: String,
  price: Number,
  quantity: Number,
  total: Number,
  size:String
});

const PlacedOrderItemsSchema = new mongoose.Schema({
    FirstName:{type:"String",required:true},
    LastName:{type:"String",required:true},
    EmailAddress:{type:"String",required:true},
    Street:{type:"String",required:true},
    City:{type:"String",required:true},
    State:{type:"String",required:true},
    Zipcode:{type:"String",required:true},
    Country:{type:"String",required:true},
    Phone:{type:"Number",required:true},
    Subtotal:{type:"Number",required:true},
    ShippingFee:{type:"Number",required:true},
    Total:{type:"Number",required:true},
    PaymentMethod:{type:"String",required:true},
    CartItem:[CartItemSchema],
    UserId:{type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true}
})

module.exports = mongoose.model("PlacedOrderItems", PlacedOrderItemsSchema);