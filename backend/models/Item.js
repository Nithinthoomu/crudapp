const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's a 'User' model
    default: null
  },
});

module.exports = mongoose.model("Item", itemSchema);
