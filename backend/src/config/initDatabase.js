import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    console.log('🔄 Checking Supabase PostgreSQL database schema...');

    // Read the schema SQL file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema (IF NOT EXISTS will prevent errors if tables exist)
    await pool.query(schema);

    // Verify tables exist
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const tables = result.rows.map(row => row.table_name);
    
    if (tables.length > 0) {
      console.log('✅ Database schema verified successfully!');
      console.log('📊 Tables found:', tables.join(', '));
    } else {
      console.log('✅ Database schema created successfully!');
    }
    
    return true;
  } catch (error) {
    // Ignore "already exists" errors - tables are set up
    if (error.message.includes('already exists')) {
      console.log('✅ Database schema already initialized!');
      return true;
    }
    console.error('❌ Error initializing database:', error.message);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Database initialization complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database initialization failed:', error);
      process.exit(1);
    });
}

export default initializeDatabase;
