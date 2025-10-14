# 🧪 Complete Testing Guide - Smart Rural Issue Management

## 📋 What's Working Right Now

### ✅ Backend API (Port 5000)
- **Status**: ✅ Running and connected to Supabase PostgreSQL
- **Database**: ✅ All 4 tables created (users, issues, comments, notices)
- **Routes**: ✅ All converted to PostgreSQL
- **Security**: ✅ JWT auth, bcrypt, CORS, rate limiting

### ✅ Frontend (Port 3002)
- **API Service**: ✅ Created with axios and interceptors
- **Environment**: ✅ .env configured with backend URL
- **UI Components**: ✅ All pages ready

### ⏳ Integration Status
- **AuthContext**: Needs to be connected to backend API
- **End-to-End**: Ready to test after AuthContext update

---

## 🚀 Step-by-Step Testing Instructions

### **Step 1: Start Backend Server**

```bash
# Terminal 1 - Backend
cd "/home/kailas/Downloads/Smart Rural Issue Management (1)/backend"
npm run dev
```

**Expected Output:**
```
✅ Connected to Supabase PostgreSQL database
✅ Database schema already initialized!
🎉 Backend is ready to accept requests!
🚀 Server is running on port 5000
```

**Verify it's working:**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Smart Rural Issue Management API is running",
  "timestamp": "2025-10-12T..."
}
```

---

### **Step 2: Start Frontend**

```bash
# Terminal 2 - Frontend
cd "/home/kailas/Downloads/Smart Rural Issue Management (1)"
npm run dev
```

**Frontend will open at:** http://localhost:3002

---

### **Step 3: Test Backend API Endpoints**

#### 🔐 **A. Test User Registration**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "name": "Test User",
    "email": "test@example.com",
    "role": "citizen"
  }
}
```

**Save the token** - you'll need it for authenticated requests!

---

#### 🔐 **B. Test User Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "name": "Test User",
    "email": "test@example.com",
    "role": "citizen"
  }
}
```

---

#### 📋 **C. Test Get Profile (Authenticated)**

```bash
# Replace YOUR_TOKEN with the token from login/register
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "role": "citizen"
  }
}
```

---

#### 🐛 **D. Test Create Issue (Authenticated)**

```bash
# Replace YOUR_TOKEN with your actual token
curl -X POST http://localhost:5000/api/issues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Broken Street Light",
    "description": "The street light on Main Road has been broken for 3 days",
    "category": "Infrastructure",
    "location": "Main Road, Near Park",
    "priority": "high"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Issue created successfully",
  "issue": {
    "id": "uuid-here",
    "title": "Broken Street Light",
    "description": "The street light on Main Road has been broken for 3 days",
    "category": "Infrastructure",
    "location": "Main Road, Near Park",
    "status": "pending",
    "priority": "high",
    "reported_by": "your-user-id",
    "created_at": "2025-10-12T..."
  }
}
```

---

#### 📋 **E. Test Get All Issues (Public)**

```bash
curl http://localhost:5000/api/issues
```

**Expected Response:**
```json
{
  "success": true,
  "issues": [
    {
      "id": "uuid-here",
      "title": "Broken Street Light",
      "status": "pending",
      "reporter_name": "Test User",
      ...
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalIssues": 1,
    "limit": 10
  }
}
```

---

#### 📋 **F. Test Get My Issues (Authenticated)**

```bash
curl http://localhost:5000/api/issues/my-issues \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

#### 💬 **G. Test Add Comment (Authenticated)**

```bash
# Replace ISSUE_ID with actual issue ID
curl -X POST http://localhost:5000/api/issues/ISSUE_ID/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "text": "I also noticed this issue yesterday"
  }'
```

---

#### 📢 **H. Test Get All Notices (Public)**

```bash
curl http://localhost:5000/api/notices
```

---

### **Step 4: Test Frontend Integration**

#### **Option A: Using Browser (Recommended)**

1. **Start Frontend** (if not already running):
   ```bash
   cd "/home/kailas/Downloads/Smart Rural Issue Management (1)"
   npm run dev
   ```

2. **Open Browser**: http://localhost:3002

3. **Test Registration**:
   - Click "Register" or "Sign Up"
   - Fill in: Name, Email, Password, Phone
   - Click "Register"
   - **Check**: Should redirect to dashboard or login

4. **Test Login**:
   - Go to login page
   - Enter email and password
   - **Check**: Should get JWT token and redirect

5. **Test Create Issue**:
   - Go to "Post Issue" page
   - Fill in issue details
   - **Check**: Should create issue and show in list

6. **Check Browser Console**:
   - Press `F12` → Console tab
   - Look for API calls and responses
   - Check Network tab for actual requests

#### **Option B: Using Frontend API Service in Console**

Open browser console (`F12`) and run:

```javascript
// Test registration
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Browser Test',
    email: 'browser@test.com',
    password: 'test123',
    phone: '9876543210'
  })
});
const data = await response.json();
console.log(data);

// Save token
localStorage.setItem('token', data.token);

// Test getting profile
const profile = await fetch('http://localhost:5000/api/auth/me', {
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  }
});
console.log(await profile.json());
```

---

## 🎯 What Features to Test

### **1. Authentication Features**
- ✅ User Registration
- ✅ User Login
- ✅ Get Profile
- ✅ Update Profile
- ✅ Token validation
- ✅ Auto-logout on 401 error

### **2. Issue Management Features**
- ✅ Create issue (authenticated)
- ✅ View all issues (public)
- ✅ View my issues (authenticated)
- ✅ View single issue details
- ✅ Update my issue (owner only)
- ✅ Delete my issue (owner only)
- ✅ Add comment to issue
- ✅ View comments

### **3. Admin Features** (Need admin user)
- ✅ Update issue status
- ✅ Assign issue to user
- ✅ View statistics
- ✅ Manage users
- ✅ Create/edit/delete notices

### **4. Notice Board Features**
- ✅ View all notices (public)
- ✅ Create notice (admin only)
- ✅ Update notice (admin only)
- ✅ Delete notice (admin only)

---

## 🔍 How to Check if Things Are Working

### **✅ Backend is Working When:**
- Server starts without errors
- Health endpoint returns 200 OK
- Can register new users
- Can login with correct credentials
- Issues are created in database
- Supabase dashboard shows data

### **✅ Frontend is Working When:**
- App loads at http://localhost:3002
- No console errors in browser
- Can navigate between pages
- Forms are visible and interactive

### **✅ Integration is Working When:**
- Registration creates user in database
- Login returns JWT token
- Token is stored in localStorage
- Protected routes require authentication
- API calls show in Network tab
- Data from backend displays in UI

---

## 🐛 Common Issues and Solutions

### **Issue 1: Backend won't start**
**Error**: `Cannot find module 'issues.js'`
**Solution**: Make sure all route files exist (auth.js, issues.js, notices.js, users.js)

### **Issue 2: CORS errors in browser**
**Error**: `Access-Control-Allow-Origin`
**Solution**: Check `FRONTEND_URL` in backend/.env is set to `http://localhost:3002`

### **Issue 3: 401 Unauthorized**
**Error**: `No authentication token`
**Solution**: 
- Make sure you're logged in
- Check token exists in localStorage
- Token might be expired (re-login)

### **Issue 4: Database connection failed**
**Error**: `Connection refused`
**Solution**: 
- Check Supabase credentials in backend/.env
- Verify DATABASE_URL is correct
- Check network connectivity

### **Issue 5: Frontend can't reach backend**
**Error**: `Network Error` or `Failed to fetch`
**Solution**:
- Make sure backend is running on port 5000
- Check `.env` has `VITE_API_URL=http://localhost:5000/api`
- Restart frontend after changing .env

---

## 📊 Database Verification

### **Check in Supabase Dashboard**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to "Table Editor"
4. Check these tables:

**Users Table:**
- Should have users you registered
- Passwords should be hashed
- Role should be 'citizen' or 'admin'

**Issues Table:**
- Should have issues you created
- reported_by should match user ID
- status should be 'pending' by default

**Comments Table:**
- Should have comments you added
- issue_id should link to actual issue
- user_id should match commenter

**Notices Table:**
- Empty unless admin created notices

### **Run SQL Query**

Go to SQL Editor in Supabase and run:

```sql
-- Check total users
SELECT COUNT(*) as total_users FROM users;

-- Check total issues
SELECT COUNT(*) as total_issues FROM issues;

-- Check recent issues with reporter names
SELECT 
  i.title, 
  i.status, 
  u.name as reporter_name,
  i.created_at
FROM issues i
JOIN users u ON i.reported_by = u.id
ORDER BY i.created_at DESC
LIMIT 5;

-- Check comments count
SELECT COUNT(*) as total_comments FROM comments;
```

---

## 🎯 Quick Test Checklist

### Backend Tests
- [ ] Health endpoint responds
- [ ] Can register new user
- [ ] Can login with user
- [ ] Can get profile with token
- [ ] Can create issue
- [ ] Can view all issues
- [ ] Can add comment
- [ ] Can view notices

### Frontend Tests
- [ ] App loads without errors
- [ ] Can navigate to all pages
- [ ] Register form is visible
- [ ] Login form is visible
- [ ] Issue creation form works
- [ ] Issues display in list

### Integration Tests
- [ ] Frontend can reach backend API
- [ ] Registration creates user in DB
- [ ] Login returns valid token
- [ ] Token is used in API calls
- [ ] Protected routes require auth
- [ ] Data flows from backend to frontend

---

## 🚀 Next Steps After Testing

1. **Create Admin User**:
   ```sql
   UPDATE users 
   SET role = 'admin' 
   WHERE email = 'your-email@example.com';
   ```

2. **Update AuthContext**: Connect frontend authentication to backend API

3. **Test All Pages**: Go through each page and verify functionality

4. **Deploy to Production**: Use READY_FOR_PRODUCTION.md guide

---

## 📞 Testing Commands Reference

### Start Both Servers
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### Quick Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Full Flow
```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","phone":"1234567890"}'

# 2. Login (save the token from response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'

# 3. Create Issue (use token from step 2)
curl -X POST http://localhost:5000/api/issues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Issue","description":"Test","category":"Other","location":"Test Location"}'

# 4. Get All Issues
curl http://localhost:5000/api/issues
```

---

**Ready to Test?** Start with Step 1 and work your way through! 🎉
