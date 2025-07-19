const express = require('express');
const router = express.Router();
const cartRoutes = require('../cart/routes');  // Adjust if your folder structure differs

// Mount cart routes
router.use('/cart', cartRoutes);

module.exports = { apiRouter: router };
