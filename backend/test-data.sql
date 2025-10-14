-- Test Data for Smart Rural Issue Management System
-- Run this in Supabase SQL Editor after users have registered via the API

-- Note: Users must be created via the API (with password hashing)
-- This script only creates issues, comments, and notices for existing users

-- Step 1: Check if we have users (run this first to get user IDs)
SELECT id, name, email, role FROM users ORDER BY created_at;

-- Step 2: Update a user to admin role
-- Replace 'your-email@example.com' with actual email
UPDATE users SET role = 'admin' WHERE email = '00kailas000@gmai.com';

-- Step 3: Get user IDs for creating issues
-- Copy the IDs from Step 1 results and use them below

-- Example: If your user IDs are:
-- User 1 (Admin): a1b2c3d4-...
-- User 2 (Citizen): e5f6g7h8-...
-- User 3 (Citizen): i9j0k1l2-...

-- Replace these with your actual user IDs from Step 1:
DO $$
DECLARE
    admin_id UUID;
    citizen1_id UUID;
    citizen2_id UUID;
    issue1_id UUID;
    issue2_id UUID;
    issue3_id UUID;
BEGIN
    -- Get user IDs (update emails if different)
    SELECT id INTO admin_id FROM users WHERE email = 'admin@velookara.gov' LIMIT 1;
    SELECT id INTO citizen1_id FROM users WHERE email = 'ramesh@example.com' LIMIT 1;
    SELECT id INTO citizen2_id FROM users WHERE email = 'priya@example.com' LIMIT 1;

    -- Only proceed if we have users
    IF admin_id IS NULL THEN
        RAISE NOTICE 'Admin user not found. Please register admin@velookara.gov first.';
        RETURN;
    END IF;

    IF citizen1_id IS NULL THEN
        RAISE NOTICE 'Citizen1 not found. Please register ramesh@example.com first.';
        RETURN;
    END IF;

    -- Create Issue 1: Street Light
    INSERT INTO issues (title, description, category, location, status, priority, reported_by)
    VALUES (
        'Street Light Not Working',
        'The street light near temple junction has not been working for the past week. This is causing safety concerns for evening commuters and residents.',
        'Infrastructure',
        'Temple Junction, Ward 3',
        'pending',
        'high',
        citizen1_id
    ) RETURNING id INTO issue1_id;
    RAISE NOTICE 'Created issue 1: Street Light';

    -- Create Issue 2: Water Supply
    INSERT INTO issues (title, description, category, location, status, priority, reported_by)
    VALUES (
        'Water Supply Interruption',
        'No water supply in ward 5 for the last 3 days. Many families are facing difficulties. The water tank seems to be empty.',
        'Water Supply',
        'Ward 5, Near School',
        'pending',
        'critical',
        COALESCE(citizen2_id, citizen1_id)
    ) RETURNING id INTO issue2_id;
    RAISE NOTICE 'Created issue 2: Water Supply';

    -- Create Issue 3: Road Repair
    INSERT INTO issues (title, description, category, location, status, priority, reported_by)
    VALUES (
        'Road Repair Needed',
        'Main road near school has multiple potholes. Dangerous for vehicles and pedestrians, especially during rainy season.',
        'Roads',
        'Main Road, Near Government School',
        'in-progress',
        'high',
        citizen1_id
    ) RETURNING id INTO issue3_id;
    RAISE NOTICE 'Created issue 3: Road Repair';

    -- Create Issue 4: Garbage Collection
    INSERT INTO issues (title, description, category, location, status, priority, reported_by)
    VALUES (
        'Garbage Collection Delay',
        'Garbage has not been collected for the past 4 days in our area. This is creating hygiene problems.',
        'Waste Management',
        'Ward 2, Housing Colony',
        'pending',
        'medium',
        citizen1_id
    );
    RAISE NOTICE 'Created issue 4: Garbage Collection';

    -- Create Issue 5: Stray Dogs
    INSERT INTO issues (title, description, category, location, status, priority, reported_by)
    VALUES (
        'Stray Dog Menace',
        'Increasing number of stray dogs in the area. They are aggressive and creating problems for children and elderly.',
        'Public Safety',
        'Market Area, Ward 4',
        'pending',
        'medium',
        COALESCE(citizen2_id, citizen1_id)
    );
    RAISE NOTICE 'Created issue 5: Stray Dogs';

    -- Create Comments on Issue 3 (Road Repair)
    IF issue3_id IS NOT NULL THEN
        INSERT INTO comments (issue_id, user_id, text)
        VALUES (
            issue3_id,
            citizen1_id,
            'I also noticed this issue. The potholes are getting worse every day.'
        );
        RAISE NOTICE 'Created comment 1 on Road Repair issue';

        IF citizen2_id IS NOT NULL THEN
            INSERT INTO comments (issue_id, user_id, text)
            VALUES (
                issue3_id,
                citizen2_id,
                'My two-wheeler had a breakdown because of these potholes. Please fix urgently!'
            );
            RAISE NOTICE 'Created comment 2 on Road Repair issue';
        END IF;
    END IF;

    -- Create Notices (Admin only)
    IF admin_id IS NOT NULL THEN
        -- Notice 1: Health Camp
        INSERT INTO notices (title, content, priority, created_by, expires_at)
        VALUES (
            'Free Health Camp - October 15th',
            'A free health camp will be organized at Velookara Panchayat Office on October 15th, 2025 from 9 AM to 5 PM. General checkup, diabetes screening, and blood pressure monitoring will be available. All citizens are requested to participate.',
            'high',
            admin_id,
            '2025-10-15 17:00:00'
        );
        RAISE NOTICE 'Created notice 1: Health Camp';

        -- Notice 2: Water Maintenance
        INSERT INTO notices (title, content, priority, created_by, expires_at)
        VALUES (
            'Water Supply Maintenance - October 18th',
            'Water supply will be interrupted on October 18th from 10 AM to 2 PM for maintenance work in all wards. Please store water in advance. We apologize for the inconvenience.',
            'high',
            admin_id,
            '2025-10-18 14:00:00'
        );
        RAISE NOTICE 'Created notice 2: Water Maintenance';

        -- Notice 3: Panchayat Meeting
        INSERT INTO notices (title, content, priority, created_by)
        VALUES (
            'Panchayat Meeting - October 20th',
            'Monthly Panchayat meeting will be held on October 20th at 10 AM in the Panchayat Office. All ward members are requested to attend. Citizens are welcome to observe.',
            'normal',
            admin_id
        );
        RAISE NOTICE 'Created notice 3: Panchayat Meeting';
    END IF;

    RAISE NOTICE '✅ Test data creation complete!';
END $$;

-- Step 4: Verify the data was created
SELECT 'Issues' as table_name, COUNT(*) as count FROM issues
UNION ALL
SELECT 'Comments' as table_name, COUNT(*) as count FROM comments
UNION ALL
SELECT 'Notices' as table_name, COUNT(*) as count FROM notices;

-- Step 5: View created issues
SELECT 
    i.title,
    i.status,
    i.priority,
    u.name as reported_by,
    i.created_at
FROM issues i
JOIN users u ON i.reported_by = u.id
ORDER BY i.created_at DESC;

-- Step 6: View created notices
SELECT 
    n.title,
    n.priority,
    u.name as created_by,
    n.created_at
FROM notices n
JOIN users u ON n.created_by = u.id
ORDER BY n.created_at DESC;

-- Step 7: View comments with issue details
SELECT 
    i.title as issue_title,
    c.text as comment,
    u.name as commenter,
    c.created_at
FROM comments c
JOIN issues i ON c.issue_id = i.id
JOIN users u ON c.user_id = u.id
ORDER BY c.created_at DESC;
