# Smart Rural Issue Management System - Project Structure

## 📁 Root Directory

```
Smart Rural Issue Management/
├── .env                    # Frontend environment variables
├── .env.example           # Example environment configuration
├── .gitignore             # Git ignore rules
├── index.html             # Main HTML template
├── package.json           # Frontend dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── README.md              # Project documentation
├── TESTING_GUIDE.md       # Testing instructions
├── backend/               # Backend API server
└── src/                   # Frontend React application
```

## 🔧 Backend Structure

```
backend/
├── .env                   # Backend environment variables (Supabase connection)
├── .env.example          # Example backend configuration
├── package.json          # Backend dependencies
├── make-admin.sql        # SQL script to create admin users
├── test-data.sql         # Sample data for testing
├── update-constraints.sql # Database constraint updates
├── postman_collection.json # API testing collection
└── src/
    ├── server.js         # Express server entry point
    ├── config/
    │   ├── database.js   # Supabase PostgreSQL connection
    │   ├── initDatabase.js # Database initialization
    │   └── schema.sql    # Database schema definition
    ├── models/           # Database models
    │   ├── User.js       # User model
    │   ├── Issue.js      # Issue model
    │   ├── Comment.js    # Comment model
    │   └── Notice.js     # Notice model
    ├── routes/           # API routes
    │   ├── auth.js       # Authentication routes
    │   ├── users.js      # User management routes
    │   ├── issues.js     # Issue management routes
    │   └── notices.js    # Notice board routes
    ├── middleware/       # Express middleware
    │   └── auth.js       # JWT authentication middleware
    └── controllers/      # (Empty - logic in routes)
```

## 🎨 Frontend Structure

```
src/
├── main.tsx              # React entry point
├── App.tsx               # Main app component with routing
├── index.css             # Global styles
├── components/           # Reusable UI components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer component
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ... (other UI components)
│   └── figma/
│       └── ImageWithFallback.tsx
├── lib/                  # Utilities and context
│   ├── api.ts           # Axios API service
│   └── AuthContext.tsx  # Authentication context
├── pages/               # Application pages
│   ├── Home.tsx         # Landing page / Citizen dashboard
│   ├── Login.tsx        # Login page
│   ├── Register.tsx     # Registration page
│   ├── PostIssue.tsx    # Issue submission form
│   ├── MyIssues.tsx     # User's issues list
│   ├── NoticeBoard.tsx  # Public notices
│   ├── AdminDashboard.tsx # Admin console
│   ├── StrayDogReport.tsx # Stray dog reporting
│   └── NotFound.tsx     # 404 page
└── styles/
    └── globals.css      # Additional global styles
```

## 🗄️ Database Schema

### Tables:
1. **users** - User accounts (citizens and admins)
2. **issues** - Citizen-reported issues
3. **comments** - Comments on issues
4. **notices** - Public announcements

### Key Constraints:
- Category: infrastructure, water, electricity, road, sanitation, healthcare, education, agriculture, environment, other
- Status: pending, in-progress, resolved, closed
- Priority: low, medium, high, critical
- User Role: citizen, admin

## 🚀 Running the Application

### Backend:
```bash
cd backend
npm install
npm run dev  # Runs on port 5000
```

### Frontend:
```bash
npm install
npm run dev  # Runs on port 3000
```

## 🔑 Key Features

- ✅ JWT Authentication
- ✅ Role-based access control (Citizen/Admin)
- ✅ Issue submission with categories and priorities
- ✅ Real-time status tracking
- ✅ Admin dashboard for issue management
- ✅ Public notice board
- ✅ Responsive design with Tailwind CSS
- ✅ PostgreSQL via Supabase
- ✅ RESTful API architecture

## 📚 Technology Stack

**Frontend:**
- React 18 + TypeScript
- Vite 6.3.6
- Tailwind CSS v4
- shadcn/ui components
- React Router v7
- Axios

**Backend:**
- Node.js + Express.js
- Supabase PostgreSQL
- JWT authentication
- bcrypt password hashing

## 🔒 Environment Variables

### Frontend (.env):
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env):
```
PORT=5000
SUPABASE_HOST=your-project.pooler.supabase.com
SUPABASE_PORT=6543
SUPABASE_DATABASE=postgres
SUPABASE_USER=postgres.your-project
SUPABASE_PASSWORD=your-password
JWT_SECRET=your-secret-key
```

## 📝 Notes

- All status values are lowercase with hyphens (e.g., 'in-progress')
- Database categories are lowercase (e.g., 'water', 'road')
- Admin users must be created via SQL (see make-admin.sql)
- Frontend runs on port 3000, backend on port 5000
