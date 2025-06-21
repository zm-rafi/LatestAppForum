const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST: Create a user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST: Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    // For now, assume password is stored in plain text (not recommended in real apps!)
    if (user.password !== password)
      return res.status(401).json({ error: 'Incorrect password' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        studentId: user.studentId,
        image: user.image,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;