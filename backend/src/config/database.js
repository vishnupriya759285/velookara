import pg from 'pg';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// Supabase direct connections may only have IPv6 addresses
// Use verbatim DNS order so Node.js uses IPv6 when available
dns.setDefaultResultOrder('verbatim');

const { Pool } = pg;

// Hardcoded Supabase pooler connection
const DATABASE_URL = 'postgresql://postgres.xslittswdimlzzmheady:vishnupriya1234@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres';

const poolConfig = {
  connectionString: process.env.DATABASE_URL || DATABASE_URL,
};

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
