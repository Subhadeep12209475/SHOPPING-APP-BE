const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('./controllers');

router.post('/add', addToCart);        // POST /api/v1/cart/add
router.get('/item', getCartItems);     // GET /api/v1/cart/item
router.delete('/remove/:productId', removeFromCart);  // DELETE /api/v1/cart/remove/:id

module.exports = router;
