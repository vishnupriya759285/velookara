# 🏘️ Smart Rural Issue Management System

A comprehensive full-stack web application for managing civic issues, events, public notices, and government welfare schemes in rural panchayats across Kerala, India. Citizens can report infrastructure problems, register for events via QR codes, and access information about government pension/welfare schemes — all from a single platform.

> **Live Demo:** [https://velookara-w1vg.vercel.app](https://velookara-w1vg.vercel.app)  
> **Backend API:** [https://velookara-ktoc.vercel.app/api](https://velookara-ktoc.vercel.app/api/health)

---

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture Diagram](#-architecture-diagram)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Run Commands](#-run-commands)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Folder Structure](#-folder-structure)
- [Deployment](#-deployment)
- [Demo Video](#-demo-video)
- [Team Members](#-team-members)
- [License](#-license)

---

## 📖 Project Description

Rural panchayats in Kerala face challenges in managing civic complaints, organizing community events, and disseminating public information efficiently. This system digitizes the entire workflow:

- **Citizens** register and report issues (road damage, water supply, sanitation, etc.) with location details
- **Admins** (panchayat officials) manage issues, publish notices, and organize events
- **Events** support QR-code-based registration and WhatsApp sharing
- **Government schemes** information (pensions, welfare programs) is accessible to all users
- **Dynamic panchayat selector** covers all 14 districts of Kerala with local body lookup

The platform is mobile-responsive, supports role-based access control, and is deployed on Vercel with a Supabase PostgreSQL backend.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library with functional components & hooks |
| **TypeScript** | Static type checking |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **shadcn/ui (Radix UI)** | Accessible UI component library |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Recharts** | Charts & data visualization |
| **qrcode.react** | QR code generation for events |
| **Sonner** | Toast notifications |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js 4** | REST API framework |
| **PostgreSQL** | Relational database (via Supabase) |
| **pg (node-postgres)** | PostgreSQL client for Node.js |
| **JWT (jsonwebtoken)** | Token-based authentication |
| **bcryptjs** | Password hashing |
| **Helmet** | HTTP security headers |
| **CORS** | Cross-origin resource sharing |
| **express-rate-limit** | API rate limiting |
| **express-validator** | Input validation |

### DevOps & Deployment
| Technology | Purpose |
|---|---|
| **Vercel** | Frontend & backend hosting (serverless) |
| **Supabase** | Managed PostgreSQL database |
| **GitHub** | Source code repository |
| **Git** | Version control |

---

## ✨ Features

1. **Issue Reporting & Tracking** — Citizens report civic issues with category, priority, location (district/panchayat/ward). Track status from pending → in-progress → resolved.

2. **Admin Dashboard** — Comprehensive dashboard with issue statistics, charts, user management, and status update controls.

3. **Event Management with QR Codes** — Admins create events; citizens register via QR codes. Supports categories (health, education, sports, cultural, etc.) with participant tracking.

4. **Public Notice Board** — Admins publish official notices and announcements viewable by all citizens.

5. **Dynamic Kerala Panchayat Selector** — All 14 districts of Kerala with full panchayat/municipality lookup for location-specific issue and event filtering.

6. **Government Welfare Schemes** — Information pages for Agriculture Pension, Old Age Pension, Widow Pension, Disability Pension, Unmarried Women Pension, Snehasparsham, and Vayomithram.

7. **Role-Based Access Control** — Two roles: `citizen` (report issues, register events) and `admin` (full management access).

8. **JWT Authentication** — Secure token-based login/register with password hashing and protected API routes.

9. **WhatsApp Event Sharing** — Share event details and registration links directly via WhatsApp.

10. **Responsive Design** — Fully mobile-responsive UI with modern glassmorphism effects and smooth animations.

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  React 18 +  │  │  React Router│  │   shadcn/ui + Radix   │ │
│  │  TypeScript  │  │  (SPA Routes)│  │   Tailwind CSS v4     │ │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬───────────┘ │
│         └─────────────────┼──────────────────────┘             │
│                           │ Axios HTTP                          │
└───────────────────────────┼─────────────────────────────────────┘
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Express.js)                      │
│                   Vercel Serverless Functions                    │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐ │
│  │  Auth     │  │  Issues  │  │  Notices │  │    Events      │ │
│  │  Routes   │  │  Routes  │  │  Routes  │  │    Routes      │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬─────────┘ │
│       └──────────────┼───────────┘                 │           │
│                      ▼                             │           │
│  ┌──────────────────────────────────┐              │           │
│  │     Middleware Layer              │              │           │
│  │  • JWT Auth   • Rate Limiting    │◄─────────────┘           │
│  │  • Helmet     • CORS             │                          │
│  │  • Validation • Error Handling   │                          │
│  └──────────────────┬───────────────┘                          │
└─────────────────────┼───────────────────────────────────────────┘
                      │ SSL/TLS
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│               SUPABASE PostgreSQL DATABASE                      │
│            (Connection Pooler - ap-southeast-2)                 │
│                                                                 │
│  ┌────────┐ ┌────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐ │
│  │ users  │ │ issues │ │comments │ │ notices │ │  events   │ │
│  └────────┘ └────────┘ └─────────┘ └─────────┘ └───────────┘ │
│                                                 ┌───────────┐ │
│                                                 │event_reg. │ │
│                                                 └───────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📸 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Issue Reporting
![Post Issue](docs/screenshots/post-issue.png)

### Events Listing with QR Registration
![Events](docs/screenshots/events.png)

### Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)

### Notice Board
![Notice Board](docs/screenshots/notice-board.png)

### Government Schemes
![Schemes](docs/screenshots/schemes.png)

> _Add your own screenshots to the `docs/screenshots/` folder._

---

## ⚙️ Installation

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL** database (or use [Supabase](https://supabase.com/) free tier)

### Clone the Repository

```bash
git clone https://github.com/vishnupriya759285/velookara.git
cd velookara
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://your_user:your_password@your_host:5432/postgres
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
```

### Initialize Database

```bash
cd backend
npm run init-db
```

This creates all required tables (users, issues, comments, notices, events, event_registrations).

---

## ▶️ Run Commands

### Start Backend Server

```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Start Frontend Dev Server

```bash
# From project root
npm run dev
# App runs on http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Type Check

```bash
npm run lint
```

---

## 📡 API Documentation

**Base URL:** `https://velookara-ktoc.vercel.app/api`

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |
| GET | `/api/auth/me` | Get current user profile | Bearer Token |
| PUT | `/api/auth/profile` | Update user profile | Bearer Token |

### Issues

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/issues` | Create a new issue | Bearer Token |
| GET | `/api/issues` | List all issues (filterable, paginated) | No |
| GET | `/api/issues/my-issues` | Get logged-in user's issues | Bearer Token |
| GET | `/api/issues/stats/overview` | Get issue statistics | Admin |
| GET | `/api/issues/:id` | Get issue by ID | No |
| PUT | `/api/issues/:id` | Update an issue | Owner/Admin |
| DELETE | `/api/issues/:id` | Delete an issue | Owner/Admin |
| PUT | `/api/issues/:id/status` | Update issue status | Admin |
| PUT | `/api/issues/:id/assign` | Assign issue to user | Admin |
| POST | `/api/issues/:id/comments` | Add comment to issue | Bearer Token |
| GET | `/api/issues/:id/comments` | Get issue comments | No |

### Notices

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/notices` | Create a notice | Admin |
| GET | `/api/notices` | List all notices (paginated) | No |
| GET | `/api/notices/:id` | Get notice by ID | No |
| PUT | `/api/notices/:id` | Update a notice | Admin |
| DELETE | `/api/notices/:id` | Delete a notice | Admin |

### Users (Admin)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | List all users | Admin |
| GET | `/api/users/stats/overview` | Get user statistics | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id/role` | Update user role | Admin |
| PUT | `/api/users/:id/status` | Activate/deactivate user | Admin |

### Events

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/events` | Create an event | Admin |
| GET | `/api/events` | List all events (filterable) | No |
| GET | `/api/events/:id` | Get event by ID | No |
| PUT | `/api/events/:id` | Update an event | Admin |
| DELETE | `/api/events/:id` | Delete an event | Admin |
| POST | `/api/events/:id/register` | Register for event | No |
| GET | `/api/events/:id/registrations` | Get event registrations | Admin |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API status check |

### Authentication Header

```
Authorization: Bearer <jwt_token>
```

---

## 🗄️ Database Schema

```sql
-- 6 Tables in PostgreSQL (Supabase)

users (id UUID PK, name, email UNIQUE, password, phone, role, created_at, updated_at)
  ↓
issues (id UUID PK, title, description, category, priority, status, district,
        panchayat, ward, reporter_id FK→users, assigned_to, created_at, updated_at)
  ↓
comments (id UUID PK, issue_id FK→issues, user_id FK→users, text, created_at)

notices (id UUID PK, title, content, category, priority, author_id FK→users,
         is_active, created_at, updated_at)

events (id UUID PK, title, description, event_date, event_end_date, venue,
        district, panchayat, ward, category, max_participants, contact_phone,
        contact_email, created_by FK→users, is_active, created_at)
  ↓
event_registrations (id UUID PK, event_id FK→events, name, phone, email, ward,
                     num_attendees, created_at)
```

---

## 📁 Folder Structure

```
velookara/
├── README.md                  # Project documentation
├── LICENSE                    # MIT License
├── package.json               # Frontend dependencies
├── vite.config.ts             # Vite build configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── index.html                 # HTML entry point
│
├── src/                       # Frontend source code
│   ├── App.tsx                # Main app with routes
│   ├── main.tsx               # React entry point
│   ├── index.css              # Global styles
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Footer.tsx         # Footer component
│   │   ├── PanchayatSelector.tsx  # District/Panchayat picker
│   │   └── ui/               # shadcn/ui component library (34 components)
│   ├── lib/
│   │   ├── api.ts             # Axios API client & endpoints
│   │   ├── AuthContext.tsx     # JWT auth context provider
│   │   ├── PanchayatContext.tsx# Panchayat selection context
│   │   └── keralaData.ts      # Kerala districts & panchayats data
│   └── pages/
│       ├── Home.tsx           # Landing page
│       ├── Login.tsx          # Login page
│       ├── Register.tsx       # Registration page
│       ├── PostIssue.tsx      # Issue submission form
│       ├── MyIssues.tsx       # User's reported issues
│       ├── AdminDashboard.tsx # Admin panel
│       ├── NoticeBoard.tsx    # Public notices
│       ├── EventsList.tsx     # Community events listing
│       ├── EventRegistration.tsx  # Event registration + QR
│       ├── EventManagement.tsx    # Admin event CRUD
│       └── ...                # Welfare scheme pages
│
├── backend/                   # Backend API
│   ├── package.json           # Backend dependencies
│   ├── vercel.json            # Vercel serverless config
│   ├── api/
│   │   └── index.js           # Vercel serverless entry
│   └── src/
│       ├── server.js          # Express app setup
│       ├── config/
│       │   ├── database.js    # PostgreSQL pool config
│       │   ├── initDatabase.js# Schema initialization
│       │   └── schema.sql     # SQL table definitions
│       ├── middleware/
│       │   └── auth.js        # JWT authentication middleware
│       ├── models/            # Database query layer
│       └── routes/            # API route handlers
│
└── docs/                      # Documentation & diagrams
    ├── architecture.md        # Architecture overview
    └── screenshots/           # App screenshots
```

---

## 🚀 Deployment

### Frontend (Vercel)

The frontend is deployed as a static Vite build on Vercel.

- **Live URL:** [https://velookara-w1vg.vercel.app](https://velookara-w1vg.vercel.app)
- **Build Command:** `tsc && vite build`
- **Output Directory:** `dist`

### Backend (Vercel Serverless)

The Express.js backend runs as a Vercel serverless function.

- **API URL:** [https://velookara-ktoc.vercel.app/api](https://velookara-ktoc.vercel.app/api/health)
- **Root Directory:** `backend`
- **Runtime:** Node.js (Vercel Serverless Functions)

### Database (Supabase)

- **Provider:** Supabase (managed PostgreSQL)
- **Region:** ap-southeast-2 (Sydney)
- **Connection:** Session Pooler (IPv4 compatible)

---

## 🎥 Demo Video

> 📹 [Watch the demo video on YouTube](#)
> 
> _Replace the link above with your actual demo video URL._

---

## 👥 Team Members

| Name | Role | GitHub |
|------|------|--------|
| Vishnu Priya | Full-Stack Developer | [@vishnupriya759285](https://github.com/vishnupriya759285) |

---

## 🤖 AI Tools Used

- **GitHub Copilot** — Used for code generation assistance, debugging, and deployment configuration

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/) — Database hosting
- [Vercel](https://vercel.com/) — Frontend & backend deployment
- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Tailwind CSS](https://tailwindcss.com/) — CSS framework
- Kerala Government — Welfare scheme information
