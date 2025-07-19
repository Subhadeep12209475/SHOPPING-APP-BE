const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_DB_URI, {
        dbName: "backend-template-db",
    })
    .then(() => {
        console.log("-------- DB connected --------");
    })
    .catch((err) => {
        console.log("----- DB connection error -----");
        console.log(err.message);
        console.log("----- ----------------- -----");
    });
