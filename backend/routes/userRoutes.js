const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access public

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save(); // password will hash in pre-save hook

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// @route POST /api/users/login
// @des Authenticate User
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Credentials' });

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
      (err, token) => {
        if (err) throw err;

        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// @route GET /api/users/profile
// @desc Get logged-in users' profile (Protected Route)
// @access Private
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
