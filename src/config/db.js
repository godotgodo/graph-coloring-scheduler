const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI
//.env.local oluştuurlacak içine MONGO_URI=.... verilecek.

const connectDB = async () => {

    if(mongoose.connections[0].readyState) return;

    const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDB;