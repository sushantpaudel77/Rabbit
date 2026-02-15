const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route GET api/order/my-orders
// @desc GET logged-in user's orders
// @access Private
router.get('/my-orders', protect, async (req, res) => {
  try {
    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // sort by most recent orders
    console.log(orders);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route GEt /api/orders/:id
// @desc GET order details by ID
// @access Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return the full order details
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
