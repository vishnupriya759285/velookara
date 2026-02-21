import pg from 'pg';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// Supabase direct connections may only have IPv6 addresses
// Use verbatim DNS order so Node.js uses IPv6 when available
dns.setDefaultResultOrder('verbatim');

const { Pool } = pg;

// Create a connection pool with Supabase pooler configuration
// Supports both DATABASE_URL and individual DB_* env vars
let poolConfig;

if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD) {
  // Prefer individual vars (avoids shell interpretation issues)
  console.log('🔧 Using individual DB_* env vars');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   User: ${process.env.DB_USER}`);
  console.log(`   Database: ${process.env.DB_NAME || 'postgres'}`);
  poolConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
} else if (process.env.DATABASE_URL) {
  console.log('🔧 Using DATABASE_URL connection string');
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
  };
} else {
  console.error('❌ No database configuration found! Set DB_HOST/DB_USER/DB_PASSWORD or DATABASE_URL');
  process.exit(1);
}

const pool = new Pool({
  ...poolConfig,
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  },
  min: parseInt(process.env.DB_POOL_MIN) || 2,
  max: parseInt(process.env.DB_POOL_MAX) || 14,
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT) || 30000,
  connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT) || 10000
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to Supabase PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

// Helper function to execute queries
export const query = (text, params) => pool.query(text, params);

// Helper function to get a client from the pool
export const getClient = () => pool.connect();

export default pool;
