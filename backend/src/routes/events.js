import express from 'express';
import { body, validationResult } from 'express-validator';
import Event from '../models/Event.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/events
// @desc    Create a new event (any logged-in user)
// @access  Private
router.post('/', authenticate, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('event_date').notEmpty().withMessage('Event date is required'),
  body('venue').trim().notEmpty().withMessage('Venue is required'),
  body('district').trim().notEmpty().withMessage('District is required'),
  body('panchayat').trim().notEmpty().withMessage('Panchayat is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const event = await Event.create({
      ...req.body,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/events
// @desc    Get all events (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { district, panchayat, page, limit } = req.query;
    const result = await Event.findAll({
      district,
      panchayat,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event (admin only)
// @access  Private/Admin
router.put('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const event = await Event.update(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, message: 'Event updated', event });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event (admin only)
// @access  Private/Admin
router.delete('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const event = await Event.delete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event (public - no auth needed)
// @access  Public
router.post('/:id/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const registration = await Event.register(req.params.id, req.body);

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      registration
    });
  } catch (error) {
    console.error('Event registration error:', error);
    if (error.code === '23505') {
      return res.status(400).json({ success: false, message: 'This phone number is already registered for this event' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/events/:id/registrations
// @desc    Get registrations for an event (event creator or admin)
// @access  Private
router.get('/:id/registrations', authenticate, async (req, res) => {
  try {
    const registrations = await Event.getRegistrations(req.params.id);
    const count = await Event.getRegistrationCount(req.params.id);

    res.json({
      success: true,
      registrations,
      stats: count
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
