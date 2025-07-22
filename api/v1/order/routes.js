const express = require('express');
const Order = require('./Order');
const { sendOrderConfirmationEmail } = require('../../../utils/emailHelpers');

const router = express.Router();

router.post('/place-order', async (req, res) => {
    try {
        const { address, paymentMode, grandTotal, email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "❌ Email is required to place the order."
            });
        }

        // Save Order
        const newOrder = new Order({
            address,
            paymentMode,
            grandTotal
        });

        await newOrder.save();

        // Send Confirmation Email
        await sendOrderConfirmationEmail(email, {
            address,
            paymentMode,
            grandTotal
        });

        res.status(201).json({
            success: true,
            message: '✅ Order placed and confirmation email sent!',
            order: newOrder
        });

    } catch (error) {
        console.error('❌ Error placing order:', error.message);
        res.status(500).json({
            success: false,
            message: '❌ Failed to place order. Please try again.'
        });
    }
});

module.exports = router;
