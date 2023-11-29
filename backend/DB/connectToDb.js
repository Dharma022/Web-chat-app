const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to db successfully");
    } catch (error) {
        console.log("Error Connecting to Database", error.message);
    }
}

module.exports = {
    connectToDb
}