/**
 * cPanel — single domain (no api subdomain).
 * Serves static site from /out and API from NestJS on the same host.
 *
 * Application root:  .../OrvoxAI
 * Startup file:       server.js
 *
 * Before start:
 *   npm run build:cpanel          (from repo root; NEXT_PUBLIC_API_URL empty)
 *   cd backend && npm install && npm run build && npx prisma migrate deploy
 */
const path = require('path');

process.env.STATIC_ROOT =
  process.env.STATIC_ROOT || path.join(__dirname, 'out');

require(path.join(__dirname, 'backend', 'dist', 'main'));
