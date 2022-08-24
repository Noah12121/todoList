const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    }
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);
//module.exports = mongoose.model('TodoTask',todoTaskSchema,'todotasks');