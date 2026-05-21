import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export function getUploadRoot(): string {
  return process.env.UPLOAD_ROOT || join(process.cwd(), 'uploads');
}

export function uploadSubdir(...segments: string[]): string {
  const dir = join(getUploadRoot(), ...segments);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
}

export function resolveDatabasePath(): string {
  const raw = process.env.DATABASE_URL?.replace(/^file:/, '') || 'data/orvox.db';
  if (raw.startsWith('/')) {
    return raw;
  }
  return join(process.cwd(), raw);
}
