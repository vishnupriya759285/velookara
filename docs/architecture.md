# Architecture Overview

## System Architecture

The Smart Rural Issue Management System follows a **three-tier architecture**:

### 1. Presentation Layer (Frontend)
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **State Management:** React Context API (AuthContext, PanchayatContext)
- **Routing:** React Router DOM (SPA)
- **HTTP Client:** Axios with JWT interceptors

### 2. Application Layer (Backend API)
- **Runtime:** Node.js
- **Framework:** Express.js 4 (ES Modules)
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **Security:** Helmet, CORS, express-rate-limit
- **Validation:** express-validator
- **Deployment:** Vercel Serverless Functions

### 3. Data Layer (Database)
- **Database:** PostgreSQL 15 (Supabase managed)
- **Connection:** Session Pooler (IPv4) via `pg` library
- **Schema:** 6 tables with UUID primary keys and foreign key relationships
- **Region:** ap-southeast-2 (Sydney)

## Data Flow

```
User Action → React Component → Axios API Call → Express Route
    → Middleware (Auth/Validation) → Controller → Model (SQL Query)
    → PostgreSQL → Response → React State Update → UI Re-render
```

## Authentication Flow

```
Register: User → POST /auth/register → Hash Password → Store in DB → JWT Token
Login:    User → POST /auth/login → Verify Password → JWT Token
Request:  User → API Call + Bearer Token → Verify JWT → Authorized Response
```

## Deployment Architecture

```
GitHub Repository (master branch)
    ├── Frontend Deploy → Vercel (Static Build)
    │   └── velookara-w1vg.vercel.app
    ├── Backend Deploy → Vercel (Serverless)
    │   └── velookara-ktoc.vercel.app
    └── Database → Supabase PostgreSQL
        └── Connection Pooler (ap-southeast-2)
```
