#!/bin/bash

# xmarthost Deployment Script
# This script prepares your project for FTP upload

echo "🚀 Preparing Orvox AI project for deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean previous builds
echo -e "${YELLOW}Step 1: Cleaning previous builds...${NC}"
rm -rf .next
rm -rf node_modules
echo -e "${GREEN}✓ Cleaned${NC}"

# Step 2: Install dependencies
echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install --production=false
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Build project
echo -e "${YELLOW}Step 3: Building project...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi

# Step 4: Create deployment package info
echo -e "${YELLOW}Step 4: Creating deployment info...${NC}"
cat > DEPLOY_INFO.txt << EOF
========================================
Orvox AI - Deployment Information
========================================

FTP Server: ftp.orvoxai.com
FTP Username: orvoxai@orvoxai.com
Port: 21

Files to Upload:
- All files EXCEPT:
  * node_modules/ (will be installed on server)
  * .next/ (will be built on server)
  * .git/ (if exists)

After Upload:
1. SSH into server or use xmarthost control panel
2. Run: npm install
3. Run: npm run build
4. Run: npm start

Or configure in xmarthost:
- Build Command: npm install && npm run build
- Start Command: npm start
- Node Version: 20.x or 22.x

========================================
EOF

echo -e "${GREEN}✓ Deployment info created${NC}"

echo ""
echo -e "${GREEN}✅ Project is ready for deployment!${NC}"
echo ""
echo "Next steps:"
echo "1. Connect to FTP: ftp.orvoxai.com"
echo "2. Upload all files (except node_modules and .next)"
echo "3. Configure build/start commands in xmarthost panel"
echo ""
echo "See DEPLOY_INFO.txt for details"

