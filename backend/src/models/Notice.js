import pool from '../config/database.js';

class Notice {
  // Create a new notice
  static async create({ title, content, priority = 'normal', createdBy, expiresAt }) {
    const result = await pool.query(
      `INSERT INTO notices (title, content, priority, created_by, expires_at) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [title, content, priority, createdBy, expiresAt]
    );
    return result.rows[0];
  }

  // Find notice by ID
  static async findById(id) {
    const result = await pool.query(
      `SELECT n.*, u.name as created_by_name, u.email as created_by_email
       FROM notices n
       LEFT JOIN users u ON n.created_by = u.id
       WHERE n.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Find all notices with pagination
  static async findAll(page = 1, limit = 10, activeOnly = false) {
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    if (activeOnly) {
      whereClause = 'WHERE (n.expires_at IS NULL OR n.expires_at > CURRENT_TIMESTAMP)';
    }

    const query = `
      SELECT n.*, u.name as created_by_name, u.email as created_by_email
      FROM notices n
      LEFT JOIN users u ON n.created_by = u.id
      ${whereClause}
      ORDER BY n.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const result = await pool.query(query, [limit, offset]);

    const countQuery = `SELECT COUNT(*) FROM notices n ${whereClause}`;
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    return {
      notices: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Update notice
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
      `UPDATE notices SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING *`,
      values
    );

    return result.rows[0];
  }

  // Delete notice
  static async delete(id) {
    await pool.query('DELETE FROM notices WHERE id = $1', [id]);
  }
}

export default Notice;
