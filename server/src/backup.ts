import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'tasks.db');
const BACKUP_DIR = process.env.BACKUP_DIR || path.join(__dirname, '..', 'backups');

function backup() {
  if (!fs.existsSync(DB_PATH)) {
    console.error(`Database not found at ${DB_PATH}`);
    process.exit(1);
  }

  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dest = path.join(BACKUP_DIR, `tasks-${timestamp}.db`);

  fs.copyFileSync(DB_PATH, dest);
  console.log(`Backup created: ${dest}`);
}

backup();
