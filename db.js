const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "app.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    passport TEXT,
    age TEXT,
    gender TEXT,
    created_at TEXT NOT NULL
  );
`);

const insertUser = db.prepare(`
  INSERT INTO users (name, email, password_hash, phone, country, passport, age, gender, created_at)
  VALUES (@name, @email, @password_hash, @phone, @country, @passport, @age, @gender, @created_at)
`);

const findUserByEmail = db.prepare(`SELECT * FROM users WHERE email = ?`);
const findUserById = db.prepare(`SELECT * FROM users WHERE id = ?`);

module.exports = {
  insertUser,
  findUserByEmail,
  findUserById,
};


