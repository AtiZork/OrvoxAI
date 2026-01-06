# Quick Start for xmarthost Deployment

## What's Ready

✅ **`production-deploy` branch** on GitHub contains:
- Pre-built Next.js frontend (`.next/`)
- Compiled NestJS backend (`backend/dist/`)
- Generated Prisma Client (`backend/node_modules/.prisma/client/`)
- Database file with schema (`backend/dev.db`)

## On xmarthost Terminal - Run These Commands:

### 1. Clone the ready-to-deploy branch
```bash
cd ~/public_html
git clone -b production-deploy https://github.com/muhammadhamx/OrvoxAi.git
cd OrvoxAi
```

### 2. Install dependencies (ONLY - no build needed!)
```bash
npm install --production --legacy-peer-deps
cd backend
npm install --production --legacy-peer-deps
cd ..
```

### 3. Create backend .env file
```bash
cd backend
cat > .env << 'EOF'
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-this-to-a-secure-random-string"
PORT=3001
NODE_ENV=production
FRONTEND_URL="https://yourdomain.com"
EOF
cd ..
```

### 4. Create frontend .env.local file
```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL="https://yourdomain.com"
EOF
```

### 5. Initialize database
```bash
cd backend
npx prisma db push
npm run seed-full
cd ..
```

### 6. Install PM2 and start apps
```bash
npm install pm2
npx pm2 start backend/dist/src/main.js --name backend -- 
npx pm2 start node_modules/next/dist/bin/next --name frontend -- start -p 3000
npx pm2 save
npx pm2 logs
```

## Admin Login
- Email: `admin@orvoxai.com`
- Password: `admin123`

## That's it!
No building, no Prisma generate, no memory errors!

See `DEPLOYMENT_GUIDE_XMARTHOST.md` for detailed instructions.

