const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    address: { type: String, required: true },
    paymentMode: { type: String, required: true },
    grandTotal: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
