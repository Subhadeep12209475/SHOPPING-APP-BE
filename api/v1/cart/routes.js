const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('./controllers');

// Routes
router.post('/add', addToCart);
router.get('/item', getCartItems);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;
