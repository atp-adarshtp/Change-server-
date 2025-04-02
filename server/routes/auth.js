const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Server error.');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Server error.');
  }
});

module.exports = router;