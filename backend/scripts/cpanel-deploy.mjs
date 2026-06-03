#!/usr/bin/env node
/**
 * cPanel Node venv installs packages outside backend/. Symlink so nest/tsc resolve modules.
 */
import { execSync } from 'child_process';
import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const backendRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const venvModules = join(dirname(process.execPath), '..', 'lib', 'node_modules');
const linkPath = join(backendRoot, 'node_modules');

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: backendRoot, env: process.env });
}

function linkNodeModules() {
  if (!existsSync(venvModules)) {
    console.error(`Venv node_modules not found: ${venvModules}`);
    console.error('Activate the cPanel Node app venv first.');
    process.exit(1);
  }

  if (existsSync(linkPath)) {
    const stat = lstatSync(linkPath);
    if (stat.isSymbolicLink()) {
      rmSync(linkPath);
    } else if (stat.isDirectory()) {
      rmSync(linkPath, { recursive: true, force: true });
    } else {
      rmSync(linkPath, { force: true });
    }
  }

  symlinkSync(venvModules, linkPath, 'dir');
  console.log(`Linked ${linkPath} -> ${venvModules}`);
}

process.chdir(backendRoot);
process.env.NODE_PATH = venvModules;

run('npm install --include=dev --legacy-peer-deps');
linkNodeModules();
run('npx prisma generate');
run('npx --yes @nestjs/cli build');
run('npx prisma migrate deploy');
run('npx --yes ts-node scripts/seed.ts');

console.log('\n✅ Backend deploy complete. RESTART the Node app in cPanel.');
