const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cartRoutes = require('./api/v1/cart/routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://shopping-app-fe-tau.vercel.app', // ✅ Replace with your actual frontend URL
    credentials: true
}));

// MongoDB Connection (adjust URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('-------- DB connected --------'))
  .catch(err => console.log('DB connection error:', err));

// ✅ Mount routes with prefix
app.use('/v1/cart', cartRoutes);

// Optional: Default route
app.get('/', (req, res) => {
    res.send('Backend API is running ✅');
});

// Start server
const PORT = process.env.PORT || 2900;
app.listen(PORT, () => {
    console.log(`-------- Server started on port ${PORT} --------`);
});
