import pool from '../config/database.js';

class Event {
  // Create a new event
  static async create({ title, description, event_date, event_end_date, venue, district, panchayat, ward, category, max_participants, contact_phone, contact_email, created_by }) {
    const result = await pool.query(
      `INSERT INTO events (title, description, event_date, event_end_date, venue, district, panchayat, ward, category, max_participants, contact_phone, contact_email, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [title, description, event_date, event_end_date || null, venue, district, panchayat, ward || null, category || 'general', max_participants || null, contact_phone || null, contact_email || null, created_by]
    );
    return result.rows[0];
  }

  // Get all events with optional filters
  static async findAll({ district, panchayat, page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    let query = `
      SELECT e.*, u.name as creator_name,
        (SELECT COUNT(*) FROM event_registrations er WHERE er.event_id = e.id) as registration_count,
        (SELECT COALESCE(SUM(er.num_attendees), 0) FROM event_registrations er WHERE er.event_id = e.id) as total_attendees
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.is_active = true
    `;
    const params = [];
    let paramCount = 1;

    if (district) {
      query += ` AND e.district = $${paramCount}`;
      params.push(district);
      paramCount++;
    }
    if (panchayat) {
      query += ` AND e.panchayat = $${paramCount}`;
      params.push(panchayat);
      paramCount++;
    }

    query += ` ORDER BY e.event_date ASC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Count total
    let countQuery = 'SELECT COUNT(*) FROM events WHERE is_active = true';
    const countParams = [];
    let countParamNum = 1;
    if (district) {
      countQuery += ` AND district = $${countParamNum}`;
      countParams.push(district);
      countParamNum++;
    }
    if (panchayat) {
      countQuery += ` AND panchayat = $${countParamNum}`;
      countParams.push(panchayat);
      countParamNum++;
    }
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    return {
      events: result.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  // Get event by ID (public - no auth needed)
  static async findById(id) {
    const result = await pool.query(
      `SELECT e.*, u.name as creator_name,
        (SELECT COUNT(*) FROM event_registrations er WHERE er.event_id = e.id) as registration_count,
        (SELECT COALESCE(SUM(er.num_attendees), 0) FROM event_registrations er WHERE er.event_id = e.id) as total_attendees
       FROM events e
       LEFT JOIN users u ON e.created_by = u.id
       WHERE e.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Update event
  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    const allowedFields = ['title', 'description', 'event_date', 'event_end_date', 'venue', 'district', 'panchayat', 'ward', 'category', 'max_participants', 'contact_phone', 'contact_email', 'is_active'];
    
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key) && updates[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) throw new Error('No fields to update');

    values.push(id);
    const result = await pool.query(
      `UPDATE events SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  }

  // Delete event
  static async delete(id) {
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }

  // Register for an event (public - no auth needed)
  static async register(eventId, { name, email, phone, ward, num_attendees }) {
    // Check if event exists and is active
    const event = await this.findById(eventId);
    if (!event) throw new Error('Event not found');
    if (!event.is_active) throw new Error('Event is no longer active');

    // Check max participants
    if (event.max_participants) {
      const totalAttendees = parseInt(event.total_attendees) || 0;
      const newAttendees = num_attendees || 1;
      if (totalAttendees + newAttendees > event.max_participants) {
        throw new Error('Event is full. Maximum participants reached.');
      }
    }

    const result = await pool.query(
      `INSERT INTO event_registrations (event_id, name, email, phone, ward, num_attendees)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [eventId, name, email || null, phone, ward || null, num_attendees || 1]
    );
    return result.rows[0];
  }

  // Get registrations for an event
  static async getRegistrations(eventId) {
    const result = await pool.query(
      `SELECT * FROM event_registrations WHERE event_id = $1 ORDER BY registered_at DESC`,
      [eventId]
    );
    return result.rows;
  }

  // Get registration count
  static async getRegistrationCount(eventId) {
    const result = await pool.query(
      `SELECT COUNT(*) as count, COALESCE(SUM(num_attendees), 0) as total_attendees 
       FROM event_registrations WHERE event_id = $1`,
      [eventId]
    );
    return result.rows[0];
  }
}

export default Event;
