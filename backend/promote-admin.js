import pool from './src/config/database.js';

try {
  const result = await pool.query(
    "UPDATE users SET role = 'admin' WHERE email = $1 RETURNING id, name, email, role",
    ['vmv122700@gmail.com']
  );
  if (result.rows.length > 0) {
    console.log('✅ User promoted to admin:', result.rows[0]);
  } else {
    console.log('❌ No user found.');
  }
  process.exit(0);
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
