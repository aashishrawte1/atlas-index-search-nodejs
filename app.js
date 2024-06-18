require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search'); // Import the search router

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/search', searchRoutes); // Use the search router

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.error(err));
