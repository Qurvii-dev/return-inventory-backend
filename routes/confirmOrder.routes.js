const express = require("express");
const { getConfirmOrders, addToShip } = require("../controllers/confirmOrder.controller");
const router = express.Router();

router.route("/confirm-orders").get(getConfirmOrders);
router.route("/add-to-ship").post(addToShip);
router.route("/shipped-orders").post(getShippedOrders);



module.exports = router;
