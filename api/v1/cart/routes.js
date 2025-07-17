const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('./controllers');

// No prefix here. Keep routes clean.
router.post('/add', addToCart);
router.get('/item', getCartItems);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;
