# 🏘️ Smart Rural Issue Management System

A comprehensive full-stack web application for managing civic issues, events, public notices, and government welfare schemes in rural panchayats across Kerala, India. Citizens can report infrastructure problems, register for events via QR codes, and access information about government pension/welfare schemes — all from a single platform.

> **Live Demo:** [https://velookara-w1vg.vercel.app](https://velookara-w1vg.vercel.app)  
> **Backend API:** [https://velookara-ktoc.vercel.app/api](https://velookara-ktoc.vercel.app/api/health)  
> **Demo Video:** [Watch on YouTube](https://youtu.be/your-demo-video-link)

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
- [AI Tools Used](#-ai-tools-used)
- [License](#-license)

---

## 📖 Project Description

Rural panchayats in Kerala face challenges in managing civic complaints, organizing community events, and disseminating public information efficiently. This system digitizes the entire workflow:

- **Citizens** register and report issues (road damage, water supply, sanitation, etc.) with location details
- **Panchayat officials (Admins)** manage issues, publish notices, and organize events
- **Events** support QR-code-based public registration and WhatsApp sharing — no login needed to register
- **Government schemes** information (pensions, welfare programs) is accessible to all users
- **Dynamic panchayat selector** covers all 14 districts of Kerala with local body lookup

The platform is mobile-responsive, supports role-based access control, and is deployed on Vercel with a Supabase PostgreSQL backend.

### Problem Statement

Kerala has 941 grama panchayats, each handling thousands of civic complaints manually. Paper-based tracking leads to delayed resolution, lack of transparency, and poor citizen engagement. This platform solves these problems by providing a digital-first approach to rural governance.

### Key Objectives

1. Enable citizens to report and track civic issues digitally
2. Provide officials with real-time dashboards for issue management
3. Simplify event organization with QR-code registration
4. Centralize access to government welfare scheme information
5. Support offline-friendly, mobile-first design for rural users

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library with functional components & hooks |
| **TypeScript** | Static type checking |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **shadcn/ui (Radix UI)** | 34+ accessible UI components |
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

1. **Issue Reporting & Tracking** — Citizens report civic issues with category, priority, and location (district/panchayat/ward). Track status from pending → in-progress → resolved.

2. **Admin Dashboard** — Comprehensive dashboard with issue statistics, charts (Recharts), user management, and status update controls.

3. **Event Management with QR Codes** — Create events, generate registration QR codes, share via WhatsApp. Supports categories (health, education, sports, cultural, etc.) with participant tracking.

4. **Public Notice Board** — Publish official notices and announcements viewable by all citizens, with category and priority filters.

5. **Dynamic Kerala Panchayat Selector** — All 14 districts of Kerala with full panchayat/municipality lookup for location-specific issue and event filtering.

6. **Government Welfare Schemes** — Information pages for 7 schemes: Agriculture Pension, Old Age Pension, Widow Pension, Disability Pension, Unmarried Women Pension, Snehasparsham, and Vayomithram.

7. **Role-Based Access Control** — Two roles: `citizen` (report issues, register events) and `admin` (full management access).

8. **JWT Authentication** — Secure token-based login/register with bcrypt password hashing and protected API routes.

9. **WhatsApp Event Sharing** — Share event details and QR registration links directly via WhatsApp to ward groups.

10. **Stray Dog Reporting** — Dedicated reporting module for stray dog sightings with location tracking.

11. **Responsive Design** — Fully mobile-responsive UI with modern glassmorphism effects and smooth animations. Works on all screen sizes.

12. **Event Registration (No Login)** — Anyone can register for events via a public link or QR code — no account creation needed.

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
│       └──────────────┼────────────┘                │           │
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

> See also: [docs/architecture.md](docs/architecture.md) for detailed architecture notes.

---

## 📸 Screenshots

### 1. Home Page
![Home Page](docs/screenshots/home.png)
> The landing page with issue statistics, category cards, recent notices, and a community overview.

### 2. Issue Reporting Form
![Post Issue](docs/screenshots/post-issue.png)
> Citizens can report issues by selecting category, priority, district, panchayat, and ward.

### 3. Events & Programs with QR Code
![Events](docs/screenshots/events.png)
> Browse upcoming events, register via QR codes, copy links, and share on WhatsApp.

### 4. Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
> Officials can manage all issues with status updates, priority changes, and statistics charts.

### 5. Notice Board
![Notice Board](docs/screenshots/notice-board.png)
> Public announcements and official notices from panchayat officials.

### 6. Government Welfare Schemes
![Schemes](docs/screenshots/schemes.png)
> Information hub for pension schemes — Old Age, Widow, Agriculture, Disability, and more.

> **💡 Note:** To add your own screenshots, capture them from the [live demo](https://velookara-w1vg.vercel.app) and place the images in the `docs/screenshots/` folder.

---

## ⚙️ Installation

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL** database (or use [Supabase](https://supabase.com/) free tier)

### 1. Clone the Repository

```bash
git clone https://github.com/vishnupriya759285/velookara.git
cd velookara
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

Create `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database - Supabase PostgreSQL
DATABASE_URL=postgresql://your_user:your_password@your_host:5432/postgres

# JWT Secret
JWT_SECRET=your_secret_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 5. Initialize Database

The database tables are auto-created when the backend starts for the first time. Alternatively:

```bash
cd backend
node src/config/initDatabase.js
```

This creates all required tables: `users`, `issues`, `comments`, `notices`, `events`, `event_registrations`.

---

## ▶️ Run Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (http://localhost:3000) |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run TypeScript type checking |
| `cd backend && npm start` | Start backend server (http://localhost:5000) |

### Quick Start (Both Servers)

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

### Production Build

```bash
npm run build
# Output in dist/ folder
```

---

## 📡 API Documentation

**Base URL:** `https://velookara-ktoc.vercel.app/api`

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and receive JWT | Public |
| `GET` | `/api/auth/me` | Get current user profile | Bearer Token |
| `PUT` | `/api/auth/profile` | Update user profile | Bearer Token |

### Issues

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/issues` | Create a new issue | Bearer Token |
| `GET` | `/api/issues` | List all issues (filterable) | Public |
| `GET` | `/api/issues/my-issues` | Get user's own issues | Bearer Token |
| `GET` | `/api/issues/stats/overview` | Get issue statistics | Admin |
| `GET` | `/api/issues/:id` | Get issue by ID | Public |
| `PUT` | `/api/issues/:id` | Update an issue | Owner/Admin |
| `DELETE` | `/api/issues/:id` | Delete an issue | Owner/Admin |
| `PUT` | `/api/issues/:id/status` | Update issue status | Admin |
| `POST` | `/api/issues/:id/comments` | Add comment to issue | Bearer Token |
| `GET` | `/api/issues/:id/comments` | Get issue comments | Public |

### Notices

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/notices` | Create a notice | Admin |
| `GET` | `/api/notices` | List all notices | Public |
| `GET` | `/api/notices/:id` | Get notice by ID | Public |
| `PUT` | `/api/notices/:id` | Update a notice | Admin |
| `DELETE` | `/api/notices/:id` | Delete a notice | Admin |

### Events

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/events` | Create an event | Bearer Token |
| `GET` | `/api/events` | List all events | Public |
| `GET` | `/api/events/:id` | Get event by ID | Public |
| `PUT` | `/api/events/:id` | Update an event | Admin |
| `DELETE` | `/api/events/:id` | Delete an event | Admin |
| `POST` | `/api/events/:id/register` | Register for event | Public |
| `GET` | `/api/events/:id/registrations` | Get registrations | Bearer Token |

### Users (Admin)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/users` | List all users | Admin |
| `GET` | `/api/users/stats/overview` | User statistics | Admin |
| `PUT` | `/api/users/:id/role` | Update user role | Admin |

### Authentication Header

```
Authorization: Bearer <jwt_token>
```

### Example Request

```bash
# Register
curl -X POST https://velookara-ktoc.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "password": "pass123"}'

# Login
curl -X POST https://velookara-ktoc.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "pass123"}'
```

---

## 🗄️ Database Schema

```sql
-- 6 Tables in PostgreSQL (Supabase)

users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'citizen',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'pending',
  district VARCHAR(100),
  panchayat VARCHAR(100),
  ward VARCHAR(50),
  reporter_id UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)

notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  priority VARCHAR(20) DEFAULT 'normal',
  author_id UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP NOT NULL,
  event_end_date TIMESTAMP,
  venue VARCHAR(200) NOT NULL,
  district VARCHAR(100) NOT NULL,
  panchayat VARCHAR(100) NOT NULL,
  ward VARCHAR(50),
  category VARCHAR(50) DEFAULT 'general',
  max_participants INTEGER,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(100),
  created_by UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
)

event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  ward VARCHAR(50),
  num_attendees INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(event_id, phone)
)
```

### Entity Relationship

```
users ──────┬── issues ──── comments
            ├── notices
            └── events ──── event_registrations
```

---

## 📁 Folder Structure

```
smart-rural-issue-management/
├── README.md                      # Project documentation (this file)
├── LICENSE                        # MIT License
├── .gitignore                     # Git ignore rules
├── package.json                   # Frontend dependencies & scripts
├── vite.config.ts                 # Vite build configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── postcss.config.js              # PostCSS configuration
├── index.html                     # HTML entry point
│
├── src/                           # Frontend source code
│   ├── App.tsx                    # Main app with route definitions
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles
│   │
│   ├── components/                # Reusable UI components
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   ├── Footer.tsx             # Site footer
│   │   ├── EventNavBar.tsx        # Event section sub-navigation
│   │   ├── PanchayatSelector.tsx  # District/Panchayat picker
│   │   ├── CertificateTemplate.tsx# Event certificate generator
│   │   └── ui/                    # shadcn/ui components (34 components)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── select.tsx
│   │       └── ... (30+ more)
│   │
│   ├── lib/                       # Utilities & context providers
│   │   ├── api.ts                 # Axios API client & endpoint definitions
│   │   ├── AuthContext.tsx         # JWT auth context provider
│   │   ├── PanchayatContext.tsx    # Panchayat selection context
│   │   └── keralaData.ts          # Kerala districts & panchayats dataset
│   │
│   ├── pages/                     # Page-level components (routes)
│   │   ├── Home.tsx               # Landing page with stats
│   │   ├── Login.tsx              # User login
│   │   ├── Register.tsx           # User registration
│   │   ├── PostIssue.tsx          # Issue submission form
│   │   ├── MyIssues.tsx           # User's reported issues list
│   │   ├── AdminDashboard.tsx     # Admin management panel
│   │   ├── NoticeBoard.tsx        # Public notices listing
│   │   ├── EventsList.tsx         # Events browsing with QR/share
│   │   ├── EventRegistration.tsx  # Public event registration form
│   │   ├── EventManagement.tsx    # Event CRUD management
│   │   ├── StrayDogReport.tsx     # Stray dog reporting module
│   │   ├── OldAgePension.tsx      # Old age pension scheme info
│   │   ├── WidowPension.tsx       # Widow pension scheme info
│   │   ├── DisabilityPension.tsx  # Disability pension info
│   │   ├── AgriculturePension.tsx # Agriculture pension info
│   │   ├── UnmarriedWomenPension.tsx # Unmarried women pension
│   │   ├── Vayomithram.tsx        # Vayomithram scheme info
│   │   ├── Snehasparsham.tsx      # Snehasparsham scheme info
│   │   └── NotFound.tsx           # 404 page
│   │
│   └── styles/
│       └── globals.css            # Global CSS with Tailwind directives
│
├── backend/                       # Backend API
│   ├── package.json               # Backend dependencies
│   ├── vercel.json                # Vercel serverless configuration
│   ├── api/
│   │   └── index.js               # Vercel serverless entry point
│   └── src/
│       ├── server.js              # Express app setup & middleware
│       ├── config/
│       │   ├── database.js        # PostgreSQL connection pool
│       │   ├── initDatabase.js    # Auto-create tables on startup
│       │   └── schema.sql         # SQL table definitions
│       ├── middleware/
│       │   └── auth.js            # JWT auth & role authorization middleware
│       ├── models/                # Database query layer (ORM-like)
│       │   ├── User.js            # User CRUD operations
│       │   ├── Issue.js           # Issue CRUD + comments
│       │   ├── Notice.js          # Notice CRUD operations
│       │   ├── Event.js           # Event CRUD + registrations
│       │   └── Comment.js         # Comment operations
│       └── routes/                # Express route handlers
│           ├── auth.js            # Authentication endpoints
│           ├── issues.js          # Issue management endpoints
│           ├── notices.js         # Notice management endpoints
│           ├── events.js          # Event + registration endpoints
│           └── users.js           # User management endpoints
│
├── docs/                          # Documentation
│   ├── architecture.md            # Detailed architecture notes
│   └── screenshots/               # Application screenshots
│       ├── home.png
│       ├── post-issue.png
│       ├── events.png
│       ├── admin-dashboard.png
│       ├── notice-board.png
│       └── schemes.png
│
├── public/                        # Static assets (served by Vite)
└── build/                         # Legacy build output
```

---

## 🚀 Deployment

### Live URLs

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [https://velookara-w1vg.vercel.app](https://velookara-w1vg.vercel.app) | ✅ Live |
| **Backend API** | [https://velookara-ktoc.vercel.app/api](https://velookara-ktoc.vercel.app/api/health) | ✅ Live |
| **Protocol** | HTTPS (TLS 1.3 via Vercel) | ✅ Secure |

### Frontend (Vercel)

- **Build Command:** `tsc && vite build`
- **Output Directory:** `dist`
- **Framework Preset:** Vite

### Backend (Vercel Serverless)

- **Root Directory:** `backend`
- **Runtime:** Node.js (Vercel Serverless Functions)
- **Entry Point:** `api/index.js`

### Database (Supabase)

- **Provider:** Supabase (managed PostgreSQL)
- **Region:** ap-southeast-2 (Sydney)
- **Connection:** Session Pooler (IPv4/IPv6 compatible)

### Deploy Your Own

1. Fork this repository
2. Create a [Supabase](https://supabase.com/) project and get the database URL
3. Import the backend to Vercel with the environment variables from `.env`
4. Import the frontend to Vercel (auto-detects Vite)
5. Update `src/lib/api.ts` with your backend URL

---

## 🎥 Demo Video

> 📹 **[Watch the Full Demo on YouTube](https://youtu.be/your-demo-video-link)**
>
> The demo covers:
> - User registration and login flow
> - Posting and tracking civic issues
> - Admin dashboard with charts and management
> - Event creation with QR code generation
> - WhatsApp sharing of event registration links
> - Government welfare scheme information pages
> - Mobile responsive design showcase

_Replace the YouTube link above with your actual demo video URL._

---

## 👥 Team Members

| Name | Role | GitHub | Contribution |
|------|------|--------|-------------|
| **Vishnu Priya M.V** | Full-Stack Developer (Lead) | [@vishnupriya759285](https://github.com/vishnupriya759285) | Architecture, frontend, backend, deployment |

---

## 🤖 AI Tools Used

| Tool | Usage |
|------|-------|
| **GitHub Copilot (Claude)** | Code generation assistance, debugging, component scaffolding, deployment configuration |

> AI tools were used to accelerate development. All code was reviewed and validated by the developer.

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Vishnu Priya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

See the full [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/) — Database hosting
- [Vercel](https://vercel.com/) — Frontend & backend deployment
- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Tailwind CSS](https://tailwindcss.com/) — CSS framework
- [Radix UI](https://www.radix-ui.com/) — Accessible primitives
- [Lucide Icons](https://lucide.dev/) — Icon library
- Kerala Government — Welfare scheme information & data

---

<div align="center">

**Built with ❤️ for the rural communities of Kerala**

[Live Demo](https://velookara-w1vg.vercel.app) · [Report Bug](https://github.com/vishnupriya759285/velookara/issues) · [Request Feature](https://github.com/vishnupriya759285/velookara/issues)

</div>
