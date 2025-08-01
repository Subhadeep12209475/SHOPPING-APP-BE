const mongoose = require("mongoose");

console.log(process.env.MONGO_DB_URL);

mongoose
    .connect(process.env.MONGO_DB_URL, {
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
