# Backend API - Smart Rural Issue Management

RESTful API for the Smart Rural Issue Management System.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start MongoDB (make sure MongoDB is running)
# On Linux: sudo systemctl start mongod
# On Mac: brew services start mongodb-community

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Issues
- `GET /api/issues` - Get all issues (with filters)
- `GET /api/issues/my-issues` - Get current user's issues
- `GET /api/issues/:id` - Get single issue
- `POST /api/issues` - Create new issue
- `PUT /api/issues/:id` - Update issue (Admin)
- `DELETE /api/issues/:id` - Delete issue
- `POST /api/issues/:id/comments` - Add comment to issue
- `GET /api/issues/stats/overview` - Get issue statistics

### Notices
- `GET /api/notices` - Get all active notices
- `GET /api/notices/:id` - Get single notice
- `POST /api/notices` - Create notice (Admin)
- `PUT /api/notices/:id` - Update notice (Admin)
- `DELETE /api/notices/:id` - Delete notice (Admin)

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/:id/role` - Update user role (Admin)
- `PUT /api/users/:id/status` - Activate/Deactivate user (Admin)
- `GET /api/users/stats/overview` - Get user statistics (Admin)

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-rural-db
JWT_SECRET=your-super-secret-key
FRONTEND_URL=http://localhost:3000
```

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

## Project Structure

```
backend/
├── src/
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Issue.js
│   │   └── Notice.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── issues.js
│   │   ├── notices.js
│   │   └── users.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   └── server.js         # Main server file
├── .env.example          # Environment variables template
└── package.json          # Dependencies
```

## Default Admin Account

After starting the server, you can create an admin account by:
1. Register a normal user
2. Manually update the role in MongoDB to 'admin'

Or use MongoDB shell:
```javascript
use smart-rural-db
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```
