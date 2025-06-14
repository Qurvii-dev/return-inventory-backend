const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  styleNumber: String,
  size: String,
  quantity: Number,
  rackSpace: String,
  location: {
    type: String,
    required:true,
  },
  session_id: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("InventoryTable", inventorySchema);
