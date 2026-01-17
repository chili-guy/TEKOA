const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATA_PATH = "/tmp/teleconsulta-users.json";
const COOKIE_NAME = "tc_auth";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
const TOKEN_SECRET = process.env.TOKEN_SECRET || "change-me";

function readUsers() {
  if (!fs.existsSync(DATA_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const test = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
}

function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString(
    "base64url"
  );
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const data = `${header}.${body}`;
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

function verifyToken(token) {
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;
  const data = `${header}.${body}`;
  const expected = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(data)
    .digest("base64url");
  if (expected !== signature) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
  } catch {
    return null;
  }
}

function getAuthToken(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

function setAuthCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
  );
}

function clearAuthCookie(res) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`);
}

app.get("/api/me", (req, res) => {
  const token = getAuthToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload?.userId) {
    return res.status(401).json({ authenticated: false });
  }
  const users = readUsers();
  const user = users.find((u) => u.id === payload.userId);
  if (!user) {
    return res.status(401).json({ authenticated: false });
  }
  return res.json({
    authenticated: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

app.post("/api/register", (req, res) => {
  const { name, email, password, phone, country, passport, age, gender } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Preencha nome, e-mail e senha." });
  }
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ error: "E-mail já cadastrado." });
  }
  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hashPassword(password),
    phone: phone || null,
    country: country || null,
    passport: passport || null,
    age: age || null,
    gender: gender || null,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsers(users);
  const token = signToken({ userId: newUser.id });
  setAuthCookie(res, token);
  return res.json({ ok: true, userId: newUser.id });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Informe e-mail e senha." });
  }
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }
  const token = signToken({ userId: user.id });
  setAuthCookie(res, token);
  return res.json({ ok: true, userId: user.id });
});

app.post("/api/logout", (req, res) => {
  clearAuthCookie(res);
  return res.json({ ok: true });
});

module.exports = app;

