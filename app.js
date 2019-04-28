// Libraries
const express = require('express');
const app = express();

// Config to read from env file
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Routes
app.use(require('./routes/index'));

module.exports = app;
