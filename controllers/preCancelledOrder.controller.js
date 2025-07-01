const PreCancelled = require("../models/preCancelled.modal");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const addToPreCancelledOrders = async (req, res, next) => {
  try {
    const {
      order_id,
      styleNumber,
      size,
      quantity,
      order_date,
      shipping_method,
      order_status,
      contact_number,
      payment_status,
    } = req.body;

    if(
        [order_id,styleNumber,size,quantity,order_date,shipping_method,order_status,contact_number,payment_status].some(field => !field)
    ){
        return next(new ApiError(400,'All fields are required'));
    }

    const insertedPreCancelledOrders = await PreCancelled.create({
        order_id,styleNumber,size,quantity,order_date,shipping_method,order_status,contact_number,payment_status 
    });

     res.status(201).json(new ApiResponse(201,"Pre cancelled order inseted into pre cancelled orders.",insertedPreCancelledOrders));

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