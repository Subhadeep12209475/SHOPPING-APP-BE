const dotenv = require("dotenv");
dotenv.config();

require("./config/db");
require("./utils/emailHelpers");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const { apiRouter } = require("./api/v1/routes");
const cartRoutes = require("./api/v1/cart/routes");  // ✅ Consistent and clean naming

const app = express();

// ✅ Middlewares
app.use(morgan("dev"));

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/v1", apiRouter);           // Main API routes (auth, products, etc.)
app.use("/api/v1/cart", cartRoutes);     // Cart API routes

// ✅ Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`-------- Server started on port ${PORT} --------`);
});
