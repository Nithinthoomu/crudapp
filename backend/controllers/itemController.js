const mongoose = require("mongoose");
const Item = require("../models/Item");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("userId", "username email"); // Optional: Populate user details
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Validate inputs
    if (!title || !description || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert userId to ObjectId if valid
    const validUserId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;

    if (!validUserId) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Create new item
    const newItem = new Item({ title, description, userId: validUserId });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error" });
  }
};
