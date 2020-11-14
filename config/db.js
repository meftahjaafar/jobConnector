const mongoose = require('mongoose')
const config = require('config')

// import DB Uri
const db = config.get('MONGO_URI')
const settings = {useUnifiedTopology: true, useNewUrlParser: true }

// Asynchronus function : Database Connect
const connectDB = async () => {
    try {
        await mongoose.connect(db, settings)
        console.log('MongoDB connected !')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB