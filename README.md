# Orvox AI - Full Stack Application

A modern, scalable full-stack application built with Next.js frontend and NestJS backend.

## Features

- **Frontend**: Next.js 16 with TypeScript, Tailwind CSS, GSAP animations
- **Backend**: NestJS with PostgreSQL database
- **Admin Panel**: Complete admin interface for managing all content
- **Scalable Architecture**: Ready for future features (chat, contracts, etc.)

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```bash
createdb orvox_db
```

Or using psql:
```sql
CREATE DATABASE orvox_db;
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and set your DATABASE_URL:
# DATABASE_URL="postgresql://user:password@localhost:5432/orvox_db?schema=public"
# JWT_SECRET="your-super-secret-jwt-key"
# PORT=3001

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database
npm run seed

# Start the backend server
npm run start:dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
# From the root directory
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Admin Panel

Access the admin panel at: `http://localhost:3000/admin`

**Default Credentials:**
- Email: `admin@orvox.ai`
- Password: `admin123`

⚠️ **Important**: Change the default password after first login!

## Project Structure

```
OrvoxAi/
├── app/                    # Next.js app directory
│   ├── admin/              # Admin panel (hidden from public)
│   └── ...                 # Other pages
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── admin/          # Admin module
│   │   ├── teams/          # Teams API
│   │   ├── projects/       # Projects API
│   │   ├── services/       # Services API
│   │   ├── pricing/        # Pricing API
│   │   ├── stats/          # Stats API
│   │   ├── testimonials/   # Testimonials API
│   │   └── about/          # About API
│   ├── prisma/             # Prisma schema
│   └── uploads/            # Uploaded files
├── components/             # React components
├── lib/                    # Utilities and API client
└── public/                 # Static assets
```

## API Endpoints

All API endpoints are prefixed with `/api/`:

- `GET /api/teams/groups` - Get all team groups
- `GET /api/teams/members` - Get all team members
- `GET /api/projects` - Get all projects
- `GET /api/services` - Get all services
- `GET /api/pricing` - Get all pricing plans
- `GET /api/stats` - Get all stats
- `GET /api/testimonials` - Get all testimonials
- `GET /api/about` - Get about content

Admin endpoints require JWT authentication (Bearer token).

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/orvox_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Database Schema

The database includes models for:
- Admin users
- Team groups and members
- Projects (with member relationships)
- Services
- Pricing plans
- Stats
- Testimonials
- About content
- Contact messages (for future use)
- Chat messages (for future use)
- Contracts (for future use)

## Development

### Backend
```bash
cd backend
npm run start:dev    # Development with hot reload
npm run build        # Build for production
npm run start:prod   # Run production build
```

### Frontend
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
```

## Deployment

### cPanel (shared hosting)

See **[DEPLOY_CPANEL.md](./DEPLOY_CPANEL.md)** — static site in `public_html` + NestJS API on a Node.js subdomain.

### VPS / Docker

1. Set up PostgreSQL database on your hosting provider
2. Update environment variables
3. Build and deploy backend
4. Build and deploy frontend
5. Ensure uploads directory is writable

## Security Notes

- Change default admin credentials immediately
- Use strong JWT_SECRET in production
- Enable HTTPS in production
- Configure CORS properly for production
- Set up proper file upload limits
- Regular database backups

## Future Enhancements

The architecture is designed to support:
- Real-time chat functionality
- Contract management system
- User authentication
- Payment integration
- Analytics dashboard

## License

Private - All rights reserved
