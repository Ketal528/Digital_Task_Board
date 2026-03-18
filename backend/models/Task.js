const mongoose = require('mongoose');

// bluprint for a task card

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Please add a title"]
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['todo', 'doing', 'done'],
        default: 'todo'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);