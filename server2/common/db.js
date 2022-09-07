const mongoose = require('mongoose')
const initDB = async () => {
    await mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true})        
    console.log("Connected to db!");
}

module.exports = { initDB }