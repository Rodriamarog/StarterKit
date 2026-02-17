import Database from 'better-sqlite3';
import { join } from 'path';

// Initialize SQLite database
const db = new Database(join(process.cwd(), 'database.db'));

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email_verified INTEGER DEFAULT 0,
    verification_token TEXT,
    reset_token TEXT,
    reset_token_expiry DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
  CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
`);

// Add password reset columns if they don't exist (migration)
try {
  db.exec(`ALTER TABLE users ADD COLUMN reset_token TEXT`);
} catch (e) {
  // Column already exists
}
try {
  db.exec(`ALTER TABLE users ADD COLUMN reset_token_expiry DATETIME`);
} catch (e) {
  // Column already exists
}

// Add subscription columns if they don't exist (migration)
try {
  db.exec(`ALTER TABLE users ADD COLUMN subscription_tier TEXT DEFAULT 'free'`);
} catch (e) {
  // Column already exists
}
try {
  db.exec(`ALTER TABLE users ADD COLUMN stripe_customer_id TEXT`);
} catch (e) {
  // Column already exists
}
try {
  db.exec(`ALTER TABLE users ADD COLUMN stripe_subscription_id TEXT`);
} catch (e) {
  // Column already exists
}
try {
  db.exec(`ALTER TABLE users ADD COLUMN subscription_status TEXT`);
} catch (e) {
  // Column already exists
}
try {
  db.exec(`ALTER TABLE users ADD COLUMN subscription_updated_at DATETIME`);
} catch (e) {
  // Column already exists
}

export default db;
