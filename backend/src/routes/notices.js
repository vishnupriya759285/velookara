import express from 'express';
import Notice from '../models/Notice.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/notices
// @desc    Create a new notice (Admin only)
// @access  Private (Admin)
router.post('/', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { title, content, priority, expires_at } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const notice = await Notice.create({
      title,
      content,
      priority: priority || 'normal',
      createdBy: req.user.id,
      expiresAt: expires_at || null
    });

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      notice
    });
  } catch (error) {
    console.error('Create notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notice',
      error: error.message
    });
  }
});

// @route   GET /api/notices
// @desc    Get all active notices
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await Notice.findAll(
      parseInt(page),
      parseInt(limit),
      true // activeOnly = true
    );

    res.json({
      success: true,
      notices: result.notices,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get notices error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notices',
      error: error.message
    });
  }
});

// @route   GET /api/notices/:id
// @desc    Get single notice by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      notice
    });
  } catch (error) {
    console.error('Get notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notice',
      error: error.message
    });
  }
});

// @route   PUT /api/notices/:id
// @desc    Update notice (Admin only)
// @access  Private (Admin)
router.put('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { title, content, priority, expires_at } = req.body;

    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    const updatedNotice = await Notice.update(req.params.id, {
      title,
      content,
      priority,
      expiresAt: expires_at
    });

    res.json({
      success: true,
      message: 'Notice updated successfully',
      notice: updatedNotice
    });
  } catch (error) {
    console.error('Update notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notice',
      error: error.message
    });
  }
});

// @route   DELETE /api/notices/:id
// @desc    Delete notice (Admin only)
// @access  Private (Admin)
router.delete('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    await Notice.delete(req.params.id);

    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    console.error('Delete notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notice',
      error: error.message
    });
  }
});

export default router;
