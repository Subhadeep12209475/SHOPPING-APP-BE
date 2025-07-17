const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
