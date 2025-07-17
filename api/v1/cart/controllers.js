const { Cart } = require('./model');
const { getUserIdFromToken } = require('../../../utils/jwtHelpers')

// ✅ Add Item to Cart
const addToCart = async (req, res) => {
    try {
        const token = req.cookies.authorization;
        const userId = getUserIdFromToken(token);
        const { item } = req.body;

        item.userId = userId;  // Hardcoded for now (use real auth in future)

        const savedItem = await Cart.create(item);

        res.json({ success: true, item: savedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add item.", error: error.message });
    }
};

// ✅ Get All Cart Items
const getCartItems = async (req, res) => {
    try {
        const token = req.cookies.authorization;
        const userId = getUserIdFromToken(token);
        const items = await Cart.find({ userId: userId });
        res.json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch items.", error: error.message });
    }
};

// ✅ Remove Item from Cart
// const removeFromCart = async (req, res) => {
//     try {
//         const { productId } = req.params;

//         const result = await Cart.findOneAndDelete({
//             productId,
//             userId: "demoUser"
//         });

//         if (result) {
//             res.json({ success: true, message: "Item removed." });
//         } else {
//             res.status(404).json({ success: false, message: "Item not found." });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to remove item.", error: error.message });
//     }
// };

const removeFromCart = async (req, res) => {
    try {
        const token = req.cookies.authorization;
        const userId = getUserIdFromToken(token);  // ✅ Extract actual userId

        const { productId } = req.params;

        const result = await Cart.findOneAndDelete({
            productId,
            userId: userId   // ✅ Use correct userId
        });

        if (result) {
            res.json({ success: true, message: "Item removed." });
        } else {
            res.status(404).json({ success: false, message: "Item not found." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to remove item.", error: error.message });
    }
};


module.exports = {
    addToCart,
    getCartItems,
    removeFromCart
};
