# 🏘️ Smart Rural Issue Management System

A modern, full-stack web application for transparent governance and community issue management in rural panchayats. Built for Velookara Panchayat, Kadupaserry, Thrissur.

## ✨ Features

### For Citizens
- 🔐 **Secure Authentication** - Register and login with JWT-based authentication
- 📝 **Report Issues** - Submit issues with categories, priorities, locations, and images
- 📊 **Track Progress** - Monitor your submitted issues in real-time
- 🔔 **Stay Informed** - View official notices and announcements
- 🐕 **Report Stray Dogs** - Dedicated module for stray animal reporting

### For Administrators
- 👨‍💼 **Admin Dashboard** - Comprehensive console for issue management
- ✅ **Update Status** - Change issue status (pending → in-progress → resolved → closed)
- 👥 **Assign Issues** - Assign issues to staff members
- 📢 **Create Notices** - Post system-wide announcements with priorities
- 📈 **Analytics** - View statistics and track resolution rates

### General Features
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and shadcn/ui
- 🔒 **Role-Based Access** - Separate interfaces for citizens and admins
- ⚡ **Real-time Updates** - Live data synchronization with backend
- �� **RESTful API** - Clean, documented API architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for PostgreSQL database)

### Installation

1. **Install frontend dependencies**
   ```bash
   npm install
   ```

2. **Install backend dependencies**
   ```bash
   cd backend && npm install && cd ..
   ```

3. **Configure environment variables**
   - Create `.env` in root with: `VITE_API_URL=http://localhost:5000/api`
   - Create `.env` in backend folder with Supabase credentials

4. **Initialize database**
   - Run `backend/src/config/schema.sql` in Supabase SQL Editor

5. **Start servers**
   ```bash
   # Terminal 1: Backend (port 5000)
   cd backend && npm run dev
   
   # Terminal 2: Frontend (port 3000)
   npm run dev
   ```

## 📚 Technology Stack

**Frontend:** React 18 • TypeScript • Vite • Tailwind CSS v4 • shadcn/ui  
**Backend:** Node.js • Express • PostgreSQL (Supabase) • JWT • bcrypt

## 📁 Key Files

- `backend/src/config/schema.sql` - Database schema
- `backend/make-admin.sql` - Create admin users
- `backend/update-constraints.sql` - Update DB constraints
- `TESTING_GUIDE.md` - Testing instructions
- `PROJECT_STRUCTURE.md` - Detailed project structure

## 🔑 API Endpoints

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/issues` - Get issues
- `POST /api/issues` - Create issue
- `GET /api/notices` - Get notices

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # TypeScript check
```

---

**Made with ❤️ for transparent rural governance**
