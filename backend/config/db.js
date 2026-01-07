
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error("Please ensure MongoDB is running (start MongoDB Compass)!");
        // process.exit(1); // Keep server alive for diagnosis
    }
};

module.exports = connectDB;
