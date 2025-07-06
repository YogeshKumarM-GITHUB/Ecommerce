const OrderItems = require('../Model/PlaceOrder.js');

const PlaceOrder = async (req, res) => {
    try {

        const { FirstName,
            LastName,
            EmailAddress,
            Street,
            City,
            State,
            Zipcode,
            Country,
            Phone,
            Subtotal,
            ShippingFee,
            Total,
            PaymentMethod,
            CartItem,
            UserId
        } = req.body;

        if (!Array.isArray(CartItem) || CartItem.length === 0) {
            return res.status(400).json({
                success: false,
                message: "CartItem must be a non-empty array.",
            });
        }



        const newcartitems = new OrderItems({
            FirstName,
            LastName,
            EmailAddress,
            Street,
            City,
            State,
            Zipcode,
            Country,
            Phone,
            Subtotal,
            ShippingFee,
            Total,
            PaymentMethod,
            CartItem,
            UserId
        });

        await newcartitems.save();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: newcartitems
        })


    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { PlaceOrder }