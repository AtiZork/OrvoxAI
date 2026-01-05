# Setup Guide

## Quick Setup

### 1. Database Setup

First, create a PostgreSQL database:

```bash
# Using psql
psql -U postgres
CREATE DATABASE orvox_db;
\q

# Or using createdb command
createdb orvox_db
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL="postgresql://postgres:password@localhost:5432/orvox_db?schema=public"
JWT_SECRET="change-this-to-a-random-secret-key-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
EOF

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with initial data
npm run seed

# Start backend server
npm run start:dev
```

Backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
# From root directory
cd ..

# Install dependencies (if not already done)
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Admin Panel Access

Navigate to: **http://localhost:3000/admin**

**Default Login:**
- Email: `admin@orvox.ai`
- Password: `admin123`

⚠️ **IMPORTANT**: Change the password immediately after first login!

## What's Included

### Backend Features
- ✅ NestJS REST API
- ✅ PostgreSQL database with Prisma ORM
- ✅ JWT authentication
- ✅ File upload support
- ✅ CRUD operations for all entities
- ✅ Scalable architecture for future features

### Frontend Features
- ✅ Next.js 16 with TypeScript
- ✅ All components fetch from backend API
- ✅ Admin panel (hidden, accessible only via direct URL)
- ✅ Responsive design
- ✅ GSAP animations

### Database Models
- Admin users
- Team groups and members
- Projects (with member relationships)
- Services
- Pricing plans
- Stats
- Testimonials
- About content
- Contact messages (ready for future use)
- Chat messages (ready for future use)
- Contracts (ready for future use)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists: `psql -l | grep orvox_db`

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Change port: `npm run dev -- -p 3001`

### Prisma Issues
```bash
cd backend
npx prisma generate
npx prisma migrate reset  # WARNING: This deletes all data
```

### CORS Issues
- Ensure FRONTEND_URL in backend/.env matches your frontend URL

## Next Steps

1. **Change Admin Password**: Login and update credentials
2. **Add Team Members**: Use admin panel to add your team
3. **Add Projects**: Link projects to team members
4. **Customize Content**: Update services, pricing, testimonials
5. **Upload Images**: Use admin panel to upload profile pictures

## Production Deployment

1. Set strong JWT_SECRET
2. Use environment-specific DATABASE_URL
3. Enable HTTPS
4. Configure proper CORS
5. Set up file storage (S3, etc.)
6. Regular database backups
7. Monitor logs and errors







