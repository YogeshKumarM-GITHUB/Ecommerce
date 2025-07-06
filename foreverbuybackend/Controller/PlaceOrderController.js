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
            UserId,
            Status,
            OrderDate
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
            UserId,
            Status,
            OrderDate
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


const FetchOrderedItemsUserWise = async (req, res) => {
    try {
        const ordereditems = await OrderItems.find({ UserId: req.params.UserId });
        if (!ordereditems) {
            res.status(400).json({
                success: false,
                message: "Order Items not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Ordered Items fetched successfully.",
            data: ordereditems
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


const FecchAllOrdersforadmin = async (req, res) => {
    try {

        const orderdetails = await OrderItems.find({});
        //console.log(orderdetails);
        if (orderdetails) {
            return res.status(200).json({
                success: true,
                message: "FetchOrdersSuccessfully",
                data: orderdetails
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "something missing"
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
const UpdateOrderStatusByAdmin = async (req, res) => {
    try {
        const { OrderId, Status } = req.params;
        //console.log(req.params);
        const UpdatedData = await OrderItems.findByIdAndUpdate(OrderId,
            { Status: Status }, // or { $set: { Status } }
            { new: true });
        if (UpdatedData) {
            return res.status(200).json({
                success: true,
                message: "Order Updated Successfully.",
                data:UpdatedData
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to update"
            })
        }

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { PlaceOrder, FetchOrderedItemsUserWise, FecchAllOrdersforadmin, UpdateOrderStatusByAdmin }