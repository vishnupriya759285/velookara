import pool from '../config/database.js';

class Comment {
  // Create a new comment
  static async create({ issueId, userId, text }) {
    const result = await pool.query(
      `INSERT INTO comments (issue_id, user_id, text) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [issueId, userId, text]
    );
    return result.rows[0];
  }

  // Find all comments for an issue
  static async findByIssueId(issueId) {
    const result = await pool.query(
      `SELECT c.*, u.name as user_name, u.email as user_email
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.id
       WHERE c.issue_id = $1
       ORDER BY c.created_at DESC`,
      [issueId]
    );
    return result.rows;
  }

  // Delete a comment
  static async delete(id) {
    await pool.query('DELETE FROM comments WHERE id = $1', [id]);
  }
}

export default Comment;
