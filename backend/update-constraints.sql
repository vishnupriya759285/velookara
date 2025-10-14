-- Update database constraints to match frontend values
-- Run this in Supabase SQL Editor

-- Drop old constraints
ALTER TABLE issues DROP CONSTRAINT IF EXISTS issues_category_check;
ALTER TABLE issues DROP CONSTRAINT IF EXISTS issues_priority_check;
ALTER TABLE issues DROP CONSTRAINT IF EXISTS issues_status_check;
ALTER TABLE notices DROP CONSTRAINT IF EXISTS notices_priority_check;

-- Add new constraints with correct values
ALTER TABLE issues ADD CONSTRAINT issues_category_check 
CHECK (category IN (
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
));

ALTER TABLE issues ADD CONSTRAINT issues_priority_check 
CHECK (priority IN ('low', 'medium', 'high', 'critical'));

ALTER TABLE issues ADD CONSTRAINT issues_status_check 
CHECK (status IN ('pending', 'in-progress', 'resolved', 'closed'));

ALTER TABLE notices ADD CONSTRAINT notices_priority_check 
CHECK (priority IN ('low', 'normal', 'high'));

-- Verify constraints
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'issues'::regclass
   OR conrelid = 'notices'::regclass
ORDER BY conrelid, conname;
