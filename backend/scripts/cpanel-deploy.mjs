#!/usr/bin/env node
/**
 * cPanel Node venv installs packages outside backend/. Symlink so nest/tsc resolve modules.
 */
import { execSync } from 'child_process';
import { existsSync, lstatSync, rmSync, symlinkSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const backendRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const linkPath = join(backendRoot, 'node_modules');

function run(cmd, cwd = backendRoot) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd, env: process.env });
}

function resolveModulesPath() {
  if (process.env.VIRTUAL_ENV) {
    const fromVenv = join(process.env.VIRTUAL_ENV, 'lib', 'node_modules');
    if (existsSync(fromVenv)) {
      console.log(`Using VIRTUAL_ENV modules: ${fromVenv}`);
      return fromVenv;
    }
  }

  const home = process.env.HOME || '';
  const fallback = join(home, 'nodevenv/repositories/OrvoxAI/20/lib/node_modules');
  if (existsSync(fallback)) {
    console.log(`Using nodevenv modules: ${fallback}`);
    return fallback;
  }

  const fromNpm = execSync('npm root', { cwd: backendRoot, encoding: 'utf8' }).trim();
  console.log(`Using npm root: ${fromNpm}`);
  return fromNpm;
}

function linkNodeModules(modulesPath) {
  if (!existsSync(modulesPath)) {
    console.error(`node_modules not found: ${modulesPath}`);
    process.exit(1);
  }

  if (existsSync(linkPath)) {
    const stat = lstatSync(linkPath);
    if (stat.isSymbolicLink() || stat.isDirectory()) {
      rmSync(linkPath, { recursive: true, force: true });
    } else {
      rmSync(linkPath, { force: true });
    }
  }

  symlinkSync(modulesPath, linkPath, 'dir');
  console.log(`Linked ${linkPath} -> ${modulesPath}`);
}

const REQUIRED_PACKAGES = ['@nestjs/common', '@prisma/adapter-libsql', 'class-validator'];

function missingPackages(modulesPath) {
  return REQUIRED_PACKAGES.filter((pkg) => !existsSync(join(modulesPath, pkg)));
}

function ensureBackendDeps(modulesPath) {
  let missing = missingPackages(modulesPath);
  if (missing.length === 0) return;

  console.log(`Missing packages: ${missing.join(', ')}`);
  run('npm install --include=dev --legacy-peer-deps --ignore-scripts', backendRoot);

  missing = missingPackages(modulesPath);
  if (missing.length === 0) return;

  console.error(`Still missing after install: ${missing.join(', ')}`);
  console.error('Build on your laptop: cd backend && npm install && npm run build');
  console.error('Upload backend/dist/ to the server, then: SKIP_BUILD=1 npm run deploy:cpanel');
  process.exit(1);
}

process.chdir(backendRoot);

if (!process.env.VIRTUAL_ENV) {
  console.warn('Warning: VIRTUAL_ENV not set. Run: source ~/nodevenv/repositories/OrvoxAI/20/bin/activate');
}

run('npm install --include=dev --legacy-peer-deps --ignore-scripts', backendRoot);

const modulesPath = resolveModulesPath();
ensureBackendDeps(modulesPath);
linkNodeModules(modulesPath);

process.env.NODE_PATH = modulesPath;

run('npx prisma generate');

const distMain = join(backendRoot, 'dist/main.js');
if (process.env.SKIP_BUILD === '1') {
  if (!existsSync(distMain)) {
    console.error('SKIP_BUILD=1 but dist/main.js not found — upload backend/dist/ first');
    process.exit(1);
  }
  console.log('Skipping Nest build (SKIP_BUILD=1)');
} else {
  run('npx --yes @nestjs/cli build');
}

run('npx prisma migrate deploy');
run('npx --yes ts-node scripts/seed.ts');

console.log('\n✅ Backend deploy complete. RESTART the Node app in cPanel.');
