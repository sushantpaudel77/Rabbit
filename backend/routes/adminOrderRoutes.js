const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all order (Admin only)
// @access Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const allowedStatus = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (req.body.status && !allowedStatus.includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    if (req.body.status) order.status = req.body.status;

    if (req.body.status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    if (!mongoose.Types.objectId.isValid(req.params.id))
      return res.status(400).json({ message: 'Invalid order ID' });

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order removed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
