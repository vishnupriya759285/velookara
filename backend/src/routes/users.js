import express from 'express';
import User from '../models/User.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;

    const query = {};
    if (role) query.role = role;

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID (Admin only)
// @access  Private (Admin)
router.get('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/:id/role
// @desc    Update user role (Admin only)
// @access  Private (Admin)
router.put('/:id/role', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { role } = req.body;

    if (!['citizen', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/:id/status
// @desc    Activate/Deactivate user (Admin only)
// @access  Private (Admin)
router.put('/:id/status', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = isActive;
    await user.save();

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/users/stats/overview
// @desc    Get user statistics (Admin only)
// @access  Private (Admin)
router.get('/stats/overview', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const total = await User.countDocuments();
    const citizens = await User.countDocuments({ role: 'citizen' });
    const admins = await User.countDocuments({ role: 'admin' });
    const active = await User.countDocuments({ isActive: true });
    const inactive = await User.countDocuments({ isActive: false });

    res.json({
      total,
      byRole: { citizens, admins },
      byStatus: { active, inactive }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
