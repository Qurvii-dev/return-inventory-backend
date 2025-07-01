const PreCancelled = require("../models/preCancelled.modal");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const addToPreCancelledOrders = async (req, res, next) => {
  try {
    let orders = req.body;

    // Handle case where a single object is sent instead of an array
    if (!Array.isArray(orders)) {
      orders = [orders]; // Wrap in array
    }

    if (orders.length === 0) {
      return next(new ApiError(400, 'Request body must contain at least one order'));
    }

    // Validate all fields in each order
    const invalidOrders = orders.filter(order =>
      [order.order_id, order.styleNumber, order.size, order.quantity, order.order_date, order.shipping_method, order.order_status, order.contact_number, order.payment_status]
        .some(field => field === undefined || field === null || field === '')
    );

    if (invalidOrders.length > 0) {
      return next(new ApiError(400, `Some orders are missing required fields (${invalidOrders.length} invalid)`));
    }

    // Insert orders
    const insertedOrders = await PreCancelled.insertMany(orders);

    res.status(201).json(new ApiResponse(201, 'Pre-cancelled order(s) inserted successfully.', insertedOrders));
  } catch (error) {
    next(error);
  }
};


const getPreCancelledOrders = async(req,res,next)=>{
    try {
        const preCancelledOrder = await PreCancelled.find();
        if(preCancelledOrder.length === 0){
            return res.status(200).json(new ApiResponse(200,"No pre cancelled order found"));
        }
        res.status(200).json(new ApiResponse(200,"Pre cancelled orders fetched successfully.",preCancelledOrder));
    } catch (error) {
        next(error)
    }
}


module.exports = {getPreCancelledOrders,addToPreCancelledOrders}
