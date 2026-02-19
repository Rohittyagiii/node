const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/project-1')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// =========================
// HTML Route
// =========================
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});

    const html = `
    <ul> 
        ${allDbUsers.map(user => 
            `<li>${user.firstName} - ${user.email}</li>`
        ).join("")}
    </ul>`;

    res.send(html);
});


// =========================
// REST API
// =========================

// GET ALL USERS
app.get('/api/users', async (req, res) => {
    const users = await User.find({});
    return res.json(users);
});

// GET, UPDATE, DELETE by ID
app.route("/api/users/:id")

// GET SINGLE USER
.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
})

// UPDATE USER
.patch(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    return res.json(updatedUser);
})

// DELETE USER
.delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "User deleted successfully" });
});


// CREATE USER
app.post('/api/users', async (req, res) => {
    const body = req.body;

    if (!body.firstName || !body.email) {
        return res.status(400).json({ msg: "FirstName and Email are required" });
    }

    const result = await User.create(body);

    return res.status(201).json(result);
});


// Server
app.listen(4000, () => {
    console.log('Server Started on Port 4000');
});
