# OrvoxAi Deployment Guide for xmarthost

## Overview
This guide will help you deploy the OrvoxAi application on xmarthost shared hosting using the pre-built `production-deploy` branch.

## Prerequisites
- SSH/Terminal access to xmarthost
- Domain configured on xmarthost
- Node.js installed on the server (we'll install if not available)

---

## Step 1: Install Node.js (if not already installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install Node.js (version 18 recommended)
# Contact xmarthost support to install Node.js 18.x or use their control panel
```

For xmarthost, you may need to use their control panel to enable Node.js. Common paths:
- cPanel > Software > Setup Node.js App
- Or contact support to enable Node.js

---

## Step 2: Clone the Production-Ready Branch

```bash
# Navigate to your web root (usually ~/public_html or ~/www)
cd ~/public_html

# If you already cloned the repo, remove it first
rm -rf OrvoxAi

# Clone the production-deploy branch
git clone -b production-deploy https://github.com/muhammadhamx/OrvoxAi.git
cd OrvoxAi
```

---

## Step 3: Install Only Production Dependencies

```bash
# Install root dependencies (Next.js and frontend)
npm install --production --legacy-peer-deps

# Install backend dependencies
cd backend
npm install --production --legacy-peer-deps
cd ..
```

**Note:** The `production-deploy` branch already includes:
- ✅ `.next/` (frontend build)
- ✅ `backend/dist/` (backend compiled files)
- ✅ `backend/node_modules/.prisma/client/` (Prisma client - NO need to run `prisma generate`)

---

## Step 4: Set Up Environment Variables

### Backend Environment (.env in backend folder)

```bash
cd ~/public_html/OrvoxAi/backend
nano .env
```

Add the following:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (change this to a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-this"

# API Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (replace with your actual domain)
FRONTEND_URL="https://yourdomain.com"
```

Save and exit (Ctrl+X, then Y, then Enter)

### Frontend Environment (.env.local in root folder)

```bash
cd ~/public_html/OrvoxAi
nano .env.local
```

Add the following:

```env
# API URL (replace with your actual domain)
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

Save and exit.

---

## Step 5: Initialize and Seed the Database

```bash
cd ~/public_html/OrvoxAi/backend

# Create database schema
npx prisma db push

# Seed the database with initial data
npm run seed-full
```

---

## Step 6: Install and Configure PM2 (Process Manager)

```bash
# Install PM2 globally (or locally if you don't have global permissions)
npm install -g pm2
# OR if global install fails:
npm install pm2

# If installed locally, use npx pm2 instead of pm2 in commands below
```

### Create PM2 Ecosystem File

```bash
cd ~/public_html/OrvoxAi
nano ecosystem.config.js
```

Add the following:

```javascript
module.exports = {
  apps: [
    {
      name: 'orvoxai-backend',
      cwd: './backend',
      script: 'dist/src/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'orvoxai-frontend',
      cwd: './',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
```

Save and exit.

### Create logs directory

```bash
cd ~/public_html/OrvoxAi
mkdir -p logs
mkdir -p backend/logs
```

### Start Applications with PM2

```bash
cd ~/public_html/OrvoxAi

# Start both applications
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Save PM2 process list
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
# Follow the instructions printed by the command above
```

---

## Step 7: Configure Reverse Proxy (.htaccess)

xmarthost typically uses Apache with cPanel. Create an `.htaccess` file in your domain's root:

```bash
cd ~/public_html  # or wherever your domain points to
nano .htaccess
```

Add the following:

```apache
RewriteEngine On

# Force HTTPS (optional but recommended)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Backend API proxy
RewriteCond %{REQUEST_URI} ^/api/ [OR]
RewriteCond %{REQUEST_URI} ^/admin/
RewriteRule ^(.*)$ http://localhost:3001/$1 [P,L]

# Frontend proxy (Next.js)
RewriteCond %{REQUEST_URI} !^/api/
RewriteCond %{REQUEST_URI} !^/admin/
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Enable proxy
ProxyPreserveHost On
ProxyPass /api http://localhost:3001/api
ProxyPassReverse /api http://localhost:3001/api
ProxyPass /admin http://localhost:3001/admin
ProxyPassReverse /admin http://localhost:3001/admin
ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
```

**Note:** If you installed OrvoxAi in a subdirectory like `~/public_html/OrvoxAi`, you may need to adjust paths or use cPanel's "Setup Node.js App" to point your domain to it.

---

## Step 8: Upload Images and Assets

```bash
# Upload team images
cd ~/public_html/OrvoxAi/backend/uploads
mkdir -p team projects testimonials

# Use FTP or cPanel File Manager to upload images to:
# - backend/uploads/team/
# - backend/uploads/projects/
# - backend/uploads/testimonials/
```

---

## Step 9: Verify Deployment

### Check if applications are running:

```bash
pm2 status
```

You should see both `orvoxai-backend` and `orvoxai-frontend` with status "online".

### Test backend API:

```bash
curl http://localhost:3001/api/teams/groups
```

### Test frontend:

```bash
curl http://localhost:3000
```

### Access from browser:

- Frontend: `https://yourdomain.com`
- Backend API: `https://yourdomain.com/api/teams/groups`
- Admin Panel: `https://yourdomain.com/admin`

---

## Step 10: Admin Login Credentials

```
Email: admin@orvoxai.com
Password: admin123
```

**IMPORTANT:** Change the admin password immediately after first login!

---

## Useful PM2 Commands

```bash
# View logs
pm2 logs

# Restart applications
pm2 restart all

# Stop applications
pm2 stop all

# View detailed info
pm2 show orvoxai-backend
pm2 show orvoxai-frontend

# Monitor resources
pm2 monit
```

---

## Troubleshooting

### Issue: "Cannot find module '@prisma/client'"

**Solution:** The Prisma client is already included in the `production-deploy` branch. If you see this error:

```bash
cd ~/public_html/OrvoxAi/backend
ls -la node_modules/.prisma/client/  # Verify files exist
```

If the directory is empty or missing, contact support - the branch may not have been cloned properly.

### Issue: "Port already in use"

**Solution:** Check if processes are already running:

```bash
pm2 list
# OR
lsof -i :3000
lsof -i :3001
```

Kill existing processes or change ports in `ecosystem.config.js`.

### Issue: Database errors

**Solution:** Reinitialize database:

```bash
cd ~/public_html/OrvoxAi/backend
rm dev.db
npx prisma db push
npm run seed-full
pm2 restart orvoxai-backend
```

### Issue: Images not loading

**Solution:** Check file permissions:

```bash
cd ~/public_html/OrvoxAi/backend
chmod -R 755 uploads/
```

---

## Updating the Application

To update from GitHub:

```bash
cd ~/public_html/OrvoxAi
git pull origin production-deploy
pm2 restart all
```

---

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Check Apache error logs: Usually in `~/logs/` or ask xmarthost support
3. Verify Node.js version: `node --version` (should be 18.x)
4. Check file permissions: `ls -la`

---

## Summary

You have successfully deployed OrvoxAi on xmarthost with:
- ✅ Pre-built frontend and backend (no build process needed on server)
- ✅ Prisma client pre-generated (no memory issues)
- ✅ PM2 process management
- ✅ Database seeded with initial data
- ✅ Reverse proxy configured
- ✅ Production-ready setup

Your application should now be live at your domain!

