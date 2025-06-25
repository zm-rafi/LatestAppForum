const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
