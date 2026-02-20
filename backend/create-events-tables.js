import pool from './src/config/database.js';

const sql = `
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP NOT NULL,
    event_end_date TIMESTAMP,
    venue VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    panchayat VARCHAR(100) NOT NULL,
    ward VARCHAR(100),
    category VARCHAR(50) DEFAULT 'general' CHECK (category IN (
        'general','health','education','agriculture','sports','cultural','meeting','workshop','awareness','other'
    )),
    max_participants INTEGER,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    ward VARCHAR(100),
    num_attendees INTEGER DEFAULT 1,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, phone)
);

CREATE INDEX IF NOT EXISTS idx_events_district ON events(district);
CREATE INDEX IF NOT EXISTS idx_events_panchayat ON events(panchayat);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
`;

try {
    await pool.query(sql);
    console.log('✅ Events tables created successfully!');
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' ORDER BY table_name");
    console.log('📊 Tables:', res.rows.map(r => r.table_name).join(', '));
    process.exit(0);
} catch(e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
}
