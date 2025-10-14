-- Make a user an admin
-- Replace 'your-email@example.com' with your actual email address

-- Option 1: Update by email
UPDATE users 
SET role = 'admin' 
WHERE email = 'noelbiju2552@gmail.com';

-- Option 2: Update by name (if you don't remember exact email)
-- UPDATE users 
-- SET role = 'admin' 
-- WHERE name ILIKE '%Noel%';

-- Verify the change
SELECT id, name, email, role, created_at 
FROM users 
WHERE role = 'admin';

-- To see all users and their roles
SELECT id, name, email, role, created_at 
FROM users 
ORDER BY created_at DESC;
