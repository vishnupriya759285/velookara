import pool from '../config/database.js';

class Issue {
  // Create a new issue
  static async create({ title, description, category, location, priority = 'medium', reportedBy, imageUrl }) {
    const result = await pool.query(
      `INSERT INTO issues (title, description, category, location, priority, reported_by, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [title, description, category, location, priority, reportedBy, imageUrl]
    );
    return result.rows[0];
  }

  // Find issue by ID with user details
  static async findById(id) {
    const result = await pool.query(
      `SELECT i.*, 
              u.name as reporter_name, u.email as reporter_email,
              a.name as assigned_name, a.email as assigned_email
       FROM issues i
       LEFT JOIN users u ON i.reported_by = u.id
       LEFT JOIN users a ON i.assigned_to = a.id
       WHERE i.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Find all issues with filters and pagination
  static async findAll(filters = {}, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (filters.status) {
      conditions.push(`i.status = $${paramCount}`);
      values.push(filters.status);
      paramCount++;
    }

    if (filters.category) {
      conditions.push(`i.category = $${paramCount}`);
      values.push(filters.category);
      paramCount++;
    }

    if (filters.priority) {
      conditions.push(`i.priority = $${paramCount}`);
      values.push(filters.priority);
      paramCount++;
    }

    if (filters.reportedBy) {
      conditions.push(`i.reported_by = $${paramCount}`);
      values.push(filters.reportedBy);
      paramCount++;
    }

    if (filters.assignedTo) {
      conditions.push(`i.assigned_to = $${paramCount}`);
      values.push(filters.assignedTo);
      paramCount++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT i.*, 
             u.name as reporter_name, u.email as reporter_email,
             a.name as assigned_name, a.email as assigned_email
      FROM issues i
      LEFT JOIN users u ON i.reported_by = u.id
      LEFT JOIN users a ON i.assigned_to = a.id
      ${whereClause}
      ORDER BY i.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    values.push(limit, offset);
    const result = await pool.query(query, values);

    const countQuery = `SELECT COUNT(*) FROM issues i ${whereClause}`;
    const countResult = await pool.query(countQuery, values.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);

    return {
      issues: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Update issue
  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        fields.push(`${dbKey} = $${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE issues SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING *`,
      values
    );

    return result.rows[0];
  }

  // Delete issue
  static async delete(id) {
    await pool.query('DELETE FROM issues WHERE id = $1', [id]);
  }

  // Get statistics
  static async getStatistics() {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'in-progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'resolved') as resolved,
        COUNT(*) FILTER (WHERE status = 'rejected') as rejected,
        COUNT(*) FILTER (WHERE priority = 'high') as high_priority
      FROM issues
    `);
    return result.rows[0];
  }

  // Get issues by category
  static async getByCategory() {
    const result = await pool.query(`
      SELECT category, COUNT(*) as count
      FROM issues
      GROUP BY category
      ORDER BY count DESC
    `);
    return result.rows;
  }
}

export default Issue;
