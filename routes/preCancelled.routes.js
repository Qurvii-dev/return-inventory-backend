const express = require("express");
const { addToPreCancelledOrders, getPreCancelledOrders } = require("../controllers/preCancelledOrder.controller");
const router = express.Router();

router.route("/pre-cancelled").post(addToPreCancelledOrders);
router.route("/pre-cancelled").get(getPreCancelledOrders);


module.exports = router;