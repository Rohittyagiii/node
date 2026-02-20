const express = require("express");

const router = express.Router()

router.get('/users', async (req, res) => {
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
router.get('/api/users', async (req, res) => {
    const users = await User.find({});
    return res.json(users);
});

// GET, UPDATE, DELETE by ID
router.route("/api/users/:id")

// GET SINGLE USER
router.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
})

// UPDATE USER
router.patch(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    return res.json(updatedUser);
})

// DELETE USER
router.delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "User deleted successfully" });
});


// CREATE USER
router.post('/api/users', async (req, res) => {
    const body = req.body;

    if (!body.firstName || !body.email) {
        return res.status(400).json({ msg: "FirstName and Email are required" });
    }

    const result = await User.create(body);

    return res.status(201).json(result);
});

module.exports = router;

