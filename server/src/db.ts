import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'tasks.db');

import fs from 'fs';
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL DEFAULT '',
    description TEXT,
    completed   INTEGER NOT NULL DEFAULT 0,
    timeframe   TEXT NOT NULL CHECK(timeframe IN ('daily','monthly','yearly')),
    due_date    TEXT NOT NULL,
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_timeframe ON tasks(timeframe);
  CREATE INDEX IF NOT EXISTS idx_tasks_due_date  ON tasks(due_date);
  CREATE INDEX IF NOT EXISTS idx_tasks_timeframe_date ON tasks(timeframe, due_date);
`);

export default db;
