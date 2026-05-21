# Deploy OrvoxAI on cPanel

Choose **one** setup:

| Setup | Best when |
|-------|-----------|
| **[A) Same domain — no subdomain](#a-same-domain-no-subdomain)** | One Node app on `orvoxai.com` (simplest for your cPanel screen) |
| **[B) Subdomain for API](#b-api-on-a-subdomain-optional)** | Static site in `public_html`, API on `api.yourdomain.com` |

---

## A) Same domain (no subdomain)

Everything runs on **`orvoxai.com`** via one Node.js app and root **`server.js`**.

### cPanel — Setup Node.js App

| Field | Value |
|-------|--------|
| Node.js version | **20** (or 18+) |
| Application mode | **Production** |
| Application root | `/home2/orvoxaic/public_html/OrvoxAi` **or** `repositories/OrvoxAI` (must match Git/deploy path) |
| Application URL | **`orvoxai.com`** |
| Application startup file | **`server.js`** |

### Environment variables (ADD VARIABLE)

| Name | Value |
|------|--------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `file:/home2/orvoxaic/orvox/data/orvox.db` |
| `FRONTEND_URL` | `https://orvoxai.com` |
| `JWT_SECRET` | long random string |
| `UPLOAD_ROOT` | `/home2/orvoxaic/orvox/uploads` |

(`STATIC_ROOT` is set automatically by `server.js` → `out/`)

### Build on the server (SSH)

```bash
cd /home2/orvoxaic/repositories/OrvoxAI

# Frontend (same domain — API calls use /api/...)
npm install
npm run build:cpanel:same-domain

# Backend
cd backend
npm install
npm run build
npx prisma migrate deploy
npm run seed
cd ..
```

Or use cPanel **Run NPM Install** on the repo root, then SSH for `build:cpanel:same-domain` and backend build.

### Finish

1. **SAVE** → **RESTART** the Node app  
2. Open `https://orvoxai.com` — site + API on one host  
3. Admin: `https://orvoxai.com/admin/`  
4. Test API: `https://orvoxai.com/api/stats`

You do **not** upload `out/` to `public_html` separately — Node serves the `out/` folder.

---

## B) API on a subdomain (optional)

Static site in `public_html` and API on `api.yourdomain.com`.

### Architecture

| Part | Where on cPanel | Technology |
|------|-----------------|------------|
| Website | `public_html` | Static export from Next.js (`out/`) |
| API | Subdomain + **Setup Node.js App** | NestJS + SQLite |
| Admin | `https://yourdomain.com/admin/` | Static page → calls API |

## One-command deploy (no typing many commands)

All build steps are in **`package.json`** as:

```bash
npm run deploy:cpanel          # backend only on server (recommended)
npm run deploy:cpanel:full     # frontend + backend (needs lots of RAM)
```

On **shared cPanel**, `next build` often fails with **Out of memory / WebAssembly** — build the frontend on your laptop (see below).

### cPanel — Run JS script

1. **Run NPM Install** (first time or after dependency changes)
2. **Run JS script** → choose **`deploy:cpanel`** (backend only) → Run
3. Upload **`out/`** from your laptop if not built on server (see below)
4. **RESTART** the Node app

### Out of memory during `build:cpanel` on server

Your host limits RAM. **Do not build Next.js on cPanel.**

**On your laptop** (in the project folder):

```bash
npm install
npm run build:cpanel:same-domain
```

**Upload** the entire **`out/`** folder to `/home2/orvoxaic/repositories/OrvoxAI/out/` via File Manager (merge/overwrite).

Then on cPanel only run **`deploy:cpanel`** (backend). Optional: try **`build:cpanel:same-domain`** again after we added `--webpack` (uses less memory than Turbopack) — may still fail on small plans.

### Git — automatic on deploy

After you push `.cpanel.yml`, **Deploy HEAD Commit** runs `npm run deploy:cpanel` for you.

> Builds can take several minutes and may **timeout** on small hosting plans. If it fails, run **`build:cpanel:same-domain`** only, then ask support or use SSH when enabled.

---

## Git pull error: `server.js would be overwritten`

This happens when **`server.js` was created manually on the server** but GitHub also has `server.js` in the repo.

**Fix (SSH or Terminal in cPanel):**

```bash
cd /home2/orvoxaic/repositories/OrvoxAI
rm -f server.js
git pull origin main
```

Then in cPanel → **Git Version Control** → **Pull or Deploy** → **Update from Remote**.

`server.js` will come from Git (correct version). Do **not** upload `server.js` by hand again.

---

## Git deploy: missing `.cpanel.yml`

cPanel **Deploy** requires a `.cpanel.yml` file in the repo root (now included).

1. Push latest code from your PC: `git push origin main`
2. **Pull** on server (see above)
3. **Pull or Deploy** tab → **Deploy HEAD Commit**

Edit `.cpanel.yml` if your Node **Application root** is not `public_html/OrvoxAi` — change the `DEST=` path to match cPanel exactly.

If Node runs directly from the repo (no copy), set:

```yaml
deployment:
  tasks:
    - /bin/echo "Pull complete — click RESTART in Setup Node.js App"
```

---

## Prerequisites

- cPanel with **Setup Node.js App** (Node 18+)
- SSH or File Manager access
- SSL on main domain (and API subdomain if using B)

---

## Step 1 — Deploy the API (backend) — option B only

### 1.1 Create folders (SSH)

```bash
mkdir -p ~/orvox/data ~/orvox/uploads
```

### 1.2 Upload backend

Upload the entire `backend/` folder to e.g. `~/orvox/api/` (not inside `public_html`).

### 1.3 Environment variables

In cPanel → **Setup Node.js App** → your API app → **Environment Variables**, copy from `backend/.env.cpanel.example` and set real paths and secrets.

Important:

- `DATABASE_URL` — absolute SQLite path, e.g. `file:/home/user/orvox/data/orvox.db`
- `FRONTEND_URL` — your live site URL(s), comma-separated
- `JWT_SECRET` — long random string

### 1.4 Node.js application settings

| Setting | Value |
|---------|--------|
| Application root | `/home/user/orvox/api` |
| Application URL | `api.yourdomain.com` |
| Application startup file | `server.js` or `dist/main.js` |
| Node.js version | 18 or 20 |

> cPanel often defaults to `server.js` — use the `server.js` included in `backend/` (it loads `dist/main.js` after build).

Run once (SSH in application root):

```bash
cd ~/orvox/api
npm install
npm run build
npx prisma migrate deploy
npm run seed
```

In cPanel, click **Restart** on the Node.js app.

Verify: `https://api.yourdomain.com/api/stats` should return JSON.

### 1.5 Subdomain

Create subdomain `api` pointing to the Node app directory (or follow your host’s Node.js wizard).

---

## Step 2 — Build the frontend — option B only

```bash
cd /path/to/OrvoxAI
cp .env.cpanel.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL=https://api.yourdomain.com

npm install
npm run build:cpanel
```

This creates `out/` with static HTML and copies `.htaccess` for Apache.

---

## Step 3 — Upload frontend to public_html — option B only

1. **Backup** existing `public_html` if needed.
2. Upload **all contents** of `out/` into `public_html/` (including `.htaccess`).
3. Ensure `public_html/.htaccess` exists (show hidden files in File Manager).

Your site should load at `https://yourdomain.com`.

Admin: `https://yourdomain.com/admin/`

Default login (change after first login): `admin@orvox.ai` / `admin123`

---

## Step 4 — After content changes

| Change | Action |
|--------|--------|
| Text/data via admin | No frontend rebuild — refresh browser |
| New team member slug | Re-run `npm run build:cpanel` and re-upload `out/` (or rely on `/portfolio/default/` + `.htaccess` rewrite) |
| Backend code | Rebuild on server: `npm run build` → Restart Node app |

---

## Local vs cPanel builds

| Command | Output |
|---------|--------|
| `npm run dev` | Normal Next.js dev server |
| `npm run build` | Standalone Node build (VPS/Docker) |
| `npm run build:cpanel` | Static `out/` for `public_html` |
| `npm run build:cpanel:same-domain` | Static `out/` + empty API URL (one domain) |

---

## Troubleshooting

**CORS errors** — `FRONTEND_URL` must exactly match the browser URL (with `https://`, no trailing slash).

**API 502 / not running** — Check Node app logs in cPanel; confirm `dist/main.js` exists after `npm run build`.

**Images broken** — Uploads are served from the API; `NEXT_PUBLIC_API_URL` must be correct at build time.

**Portfolio member 404** — Confirm `public_html/.htaccess` is present and `portfolio/default/index.html` exists in `out/`.

**Database not writable** — `data/` folder must be outside `public_html` with write permission for the Node user.

---

## Security checklist

- [ ] Change admin password
- [ ] Strong `JWT_SECRET`
- [ ] HTTPS on both domains
- [ ] Do not put `.env` or `*.db` inside `public_html`
