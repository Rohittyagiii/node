const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/project-1')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Mongo Error", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// =========================
// HTML Route
// =========================

// Server
app.listen(4000, () => {
    console.log('Server Started on Port 4000');
});
