import pool from './src/config/database.js';

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database schema...');
    
    // Drop all tables if they exist
    await pool.query('DROP TABLE IF EXISTS comments CASCADE');
    await pool.query('DROP TABLE IF EXISTS issues CASCADE');
    await pool.query('DROP TABLE IF EXISTS notices CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    
    // Drop extensions and functions
    await pool.query('DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE');
    
    console.log('✅ Dropped existing tables');
    
    // Enable UUID extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    
    // Create users table
    await pool.query(`
      CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          role VARCHAR(20) DEFAULT 'citizen' CHECK (role IN ('citizen', 'admin')),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create issues table
    await pool.query(`
      CREATE TABLE issues (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category VARCHAR(50) NOT NULL CHECK (category IN (
              'infrastructure',
              'water',
              'electricity',
              'road',
              'sanitation',
              'healthcare',
              'education',
              'agriculture',
              'environment',
              'other'
          )),
          location VARCHAR(255) NOT NULL,
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
              'pending',
              'in-progress',
              'resolved',
              'closed'
          )),
          priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
          reported_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
          image_url TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create comments table
    await pool.query(`
      CREATE TABLE comments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          issue_id UUID NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          text TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create notices table
    await pool.query(`
      CREATE TABLE notices (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
          created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create indexes
    await pool.query('CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_issues_category ON issues(category)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_issues_reported_by ON issues(reported_by)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_issues_assigned_to ON issues(assigned_to)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_comments_issue_id ON comments(issue_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_notices_created_by ON notices(created_by)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    
    // Create function
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql'
    `);
    
    // Create triggers
    await pool.query('CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()');
    await pool.query('CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()');
    await pool.query('CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON notices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()');
    
    console.log('✅ Database schema created successfully!');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

resetDatabase()
  .then(() => {
    console.log('🎉 Database reset completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Database reset failed:', error);
    process.exit(1);
  });