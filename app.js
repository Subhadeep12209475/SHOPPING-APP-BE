const dotEnv = require("dotenv");
dotEnv.config();

require("./config/db");
require("./utils/emailHelpers");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const { apiRouter } = require("./api/v1/routes");
const cartRoutes = require("./api/v1/cart/routes");
const orderRoutes = require("./api/v1/order/routes"); 

const app = express();

// Global Middleware
app.use(morgan("dev"));

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// Route Registrations
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);  

app.use("/api/v1", apiRouter);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`-------- Server started on port ${process.env.PORT} --------`);
});
