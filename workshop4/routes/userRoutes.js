// userRoutes.js
const express = require('express');
const UserModel = require('../Models/userModel');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({}, 'username age');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
