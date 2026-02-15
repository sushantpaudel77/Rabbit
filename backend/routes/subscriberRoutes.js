const express = require('express');
const Subscriber = require('../models/Subscriber');

const router = express.Router();
// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public
router.post('/subscribe', async (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  email = email.toLowerCase().trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if the email is already subscribed
    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: 'Email is already subscribed.' });
    }

    // Create a new subscriber
    const subscriber = new Subscriber({ email });

    await subscriber.save();

    res
      .status(201)
      .json({ message: 'Successfully subscribed to the newsletter!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
