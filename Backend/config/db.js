require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoURL);
        console.log("connected to DB");
    } catch (err) {
        console.error(" DB connection error:", err.message);
        process.exit(1); // stop app if DB fails
    }
};

module.exports = {
    connectDB
};