import express from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import Issue from '../models/Issue.js';
import Comment from '../models/Comment.js';

const router = express.Router();

// @route   POST /api/issues
// @desc    Create a new issue
// @access  Private
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, category, location, priority, image_url } = req.body;

    console.log('📝 Creating issue with user:', {
      userId: req.user?.id,
      userName: req.user?.name,
      userRole: req.user?.role
    });

    // Validate required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, category, location'
      });
    }

    // Validate user ID
    if (!req.user || !req.user.id) {
      console.error('❌ No user ID found in request');
      return res.status(401).json({
        success: false,
        message: 'User authentication failed'
      });
    }

    // Create issue (Note: Issue.create expects camelCase params)
    const issue = await Issue.create({
      title,
      description,
      category,
      location,
      priority: priority || 'medium',
      reportedBy: req.user.id,  // camelCase for Issue.create method
      imageUrl: image_url
    });

    res.status(201).json({
      success: true,
      message: 'Issue created successfully',
      issue
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create issue',
      error: error.message
    });
  }
});

// @route   GET /api/issues
// @desc    Get all issues with filters and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, category, priority, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (category) filters.category = category;
    if (priority) filters.priority = priority;

    const issues = await Issue.findAll(filters, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      ...issues
    });
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issues',
      error: error.message
    });
  }
});

// @route   GET /api/issues/my-issues
// @desc    Get issues reported by logged-in user
// @access  Private
router.get('/my-issues', authenticate, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filters = { reported_by: req.user.id };
    if (status) filters.status = status;

    const issues = await Issue.findAll(filters, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      ...issues
    });
  } catch (error) {
    console.error('Get my issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your issues',
      error: error.message
    });
  }
});

// @route   GET /api/issues/stats/overview
// @desc    Get issue statistics (Admin only)
// @access  Private (Admin)
router.get('/stats/overview', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const stats = await Issue.getStatistics();

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

// @route   GET /api/issues/:id
// @desc    Get single issue by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.json({
      success: true,
      issue
    });
  } catch (error) {
    console.error('Get issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issue',
      error: error.message
    });
  }
});

// @route   PUT /api/issues/:id
// @desc    Update an issue
// @access  Private (Owner or Admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check if user is owner or admin
    if (issue.reported_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this issue'
      });
    }

    const { title, description, category, location, priority, image_url } = req.body;

    const updatedIssue = await Issue.update(req.params.id, {
      title,
      description,
      category,
      location,
      priority,
      image_url
    });

    res.json({
      success: true,
      message: 'Issue updated successfully',
      issue: updatedIssue
    });
  } catch (error) {
    console.error('Update issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update issue',
      error: error.message
    });
  }
});

// @route   DELETE /api/issues/:id
// @desc    Delete an issue
// @access  Private (Owner or Admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check if user is owner or admin
    if (issue.reported_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this issue'
      });
    }

    await Issue.delete(req.params.id);

    res.json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    console.error('Delete issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete issue',
      error: error.message
    });
  }
});

// @route   PUT /api/issues/:id/status
// @desc    Update issue status (Admin only)
// @access  Private (Admin)
router.put('/:id/status', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['pending', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    const updatedIssue = await Issue.update(req.params.id, { status });

    res.json({
      success: true,
      message: 'Issue status updated successfully',
      issue: updatedIssue
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update issue status',
      error: error.message
    });
  }
});

// @route   PUT /api/issues/:id/assign
// @desc    Assign issue to user (Admin only)
// @access  Private (Admin)
router.put('/:id/assign', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    const updatedIssue = await Issue.update(req.params.id, {
      assigned_to: assignedTo || null
    });

    res.json({
      success: true,
      message: assignedTo ? 'Issue assigned successfully' : 'Issue unassigned successfully',
      issue: updatedIssue
    });
  } catch (error) {
    console.error('Assign issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign issue',
      error: error.message
    });
  }
});

// @route   POST /api/issues/:id/comments
// @desc    Add comment to issue
// @access  Private
router.post('/:id/comments', authenticate, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    const comment = await Comment.create({
      issue_id: req.params.id,
      user_id: req.user.id,
      text: text.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add comment',
      error: error.message
    });
  }
});

// @route   GET /api/issues/:id/comments
// @desc    Get all comments for an issue
// @access  Public
router.get('/:id/comments', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    const comments = await Comment.findByIssueId(req.params.id);

    res.json({
      success: true,
      comments
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch comments',
      error: error.message
    });
  }
});

export default router;
