const User = require('../models/user')

async function getAllUsers(req,res){
     const users = await User.find({});
    return res.json(users);
};

async function getUserById(req,res){
     const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
}

async function updateUserById(req,res){
     const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    return res.json(updatedUser);
};

async function deleteUser(req,res){
     await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "User deleted successfully" });
};

async function createNewUser(req, res) {
  try {
    const body = req.body;

    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: result,
      id: result._id,
    });

  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser,
    createNewUser
};