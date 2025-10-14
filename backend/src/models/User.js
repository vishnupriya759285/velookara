import bcrypt from 'bcryptjs';
import pool from '../config/database.js';

class User {
  // Create a new user
  static async create({ name, email, password, phone, role = 'citizen' }) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await pool.query(
        `INSERT INTO users (name, email, password, phone, role) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, name, email, phone, role, created_at, updated_at`,
        [name, email.toLowerCase(), hashedPassword, phone, role]
      );

      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT id, name, email, phone, role, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Find all users with pagination
  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const result = await pool.query(
      `SELECT id, name, email, phone, role, created_at, updated_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM users');
    const total = parseInt(countResult.rows[0].count);

    return {
      users: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Update user
  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined && key !== 'password') {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING id, name, email, phone, role, created_at, updated_at`,
      values
    );

    return result.rows[0];
  }

  // Update password
  static async updatePassword(id, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, id]
    );
  }

  // Update user role
  static async updateRole(id, role) {
    const result = await pool.query(
      `UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING id, name, email, phone, role, created_at, updated_at`,
      [role, id]
    );
    return result.rows[0];
  }

  // Delete user
  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }

  // Compare password
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default User;
