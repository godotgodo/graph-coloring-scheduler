const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

console.log("ÖNEMLİ ", MONGO_URI);

const connectDB = async () => {
    const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDB;