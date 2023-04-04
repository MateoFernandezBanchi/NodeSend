const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const connectDB = async () => {
try {
    await mongoose.connect( process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('DB connected');
} catch (error){
    console.log('hubo un error', error);
    process.exit(1); // Stop the app
}    
}

module.exports = connectDB;