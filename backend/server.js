const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// middlewere
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB connected Successfully!"))
    .catch((err)=> console.log("MongoDB connection Error"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});