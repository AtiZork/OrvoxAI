# Orvox AI Backend

NestJS backend API for Orvox AI website.

## Quick Start

1. Install dependencies: `npm install`
2. Set up `.env` file (copy from `.env.example`)
3. Run migrations: `npm run prisma:migrate`
4. Seed database: `npm run seed`
5. Start server: `npm run start:dev`

## Default Admin

- Email: `admin@orvox.ai`
- Password: `admin123`

**Change this immediately in production!**

## API Documentation

### Public Endpoints

All `/api/*` endpoints are public (read-only).

### Admin Endpoints

All admin endpoints require JWT authentication:
1. Login at `/auth/login` to get token
2. Include token in header: `Authorization: Bearer <token>`

## File Uploads

Uploaded files are stored in `./uploads/` directory:
- Team images: `./uploads/team/`
- Project images: `./uploads/projects/`
- Testimonial images: `./uploads/testimonials/`

Files are served statically at `/uploads/*`








