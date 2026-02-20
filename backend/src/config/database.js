import pg from 'pg';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// Supabase direct connections may only have IPv6 addresses
// Use verbatim DNS order so Node.js uses IPv6 when available
dns.setDefaultResultOrder('verbatim');

const { Pool } = pg;

// Create a connection pool with Supabase pooler configuration
// Pool Size: 14 (max per user+db combination)
// Max Client Connections: 200 (concurrent connections)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  },
  // Connection pool settings optimized for Supabase
  min: parseInt(process.env.DB_POOL_MIN) || 2,        // Minimum connections to keep open
  max: parseInt(process.env.DB_POOL_MAX) || 14,       // Maximum connections (matches Supabase pool size)
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT) || 30000, // 30 seconds
  connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT) || 10000 // 10 seconds
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
