const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
  createNewUser
} = require("../controllers/user");

const router = express.Router();

// GET ALL & CREATE
router.route("/")
  .get(getAllUsers)
  .post(createNewUser);

// GET, UPDATE, DELETE by ID
router.route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUser);

module.exports = router;