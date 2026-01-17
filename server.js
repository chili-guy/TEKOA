const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("passport-apple");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { insertUser, findUserByEmail, findUserById } = require("./db");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5174);

const hasGoogleConfig =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL;

const hasAppleConfig =
  process.env.APPLE_CLIENT_ID &&
  process.env.APPLE_TEAM_ID &&
  process.env.APPLE_KEY_ID &&
  process.env.APPLE_PRIVATE_KEY &&
  process.env.APPLE_CALLBACK_URL;

app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

if (hasGoogleConfig) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, {
          provider: "google",
          id: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
        });
      }
    )
  );
}

if (hasAppleConfig) {
  passport.use(
    new AppleStrategy(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        callbackURL: process.env.APPLE_CALLBACK_URL,
        scope: ["name", "email"],
      },
      (accessToken, refreshToken, idToken, profile, done) => {
        done(null, {
          provider: "apple",
          id: profile?.id || idToken?.sub,
          name: profile?.name
            ? `${profile.name.firstName || ""} ${profile.name.lastName || ""}`.trim()
            : undefined,
          email: profile?.email,
        });
      }
    )
  );
}

app.get("/auth/google", (req, res, next) => {
  if (!hasGoogleConfig) {
    return res
      .status(501)
      .send("Google OAuth não configurado. Preencha env.example.");
  }
  return passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

app.get("/auth/google/callback", (req, res, next) => {
  if (!hasGoogleConfig) {
    return res
      .status(501)
      .send("Google OAuth não configurado. Preencha env.example.");
  }
  return passport.authenticate("google", {
    failureRedirect: "/entrada.html?login=erro",
  })(req, res, () => res.redirect("/entrada.html?login=google"));
});

const handleAppleCallback = (req, res, next) => {
  if (!hasAppleConfig) {
    return res
      .status(501)
      .send("Apple OAuth não configurado. Preencha env.example.");
  }
  return passport.authenticate("apple", {
    failureRedirect: "/entrada.html?login=erro",
  })(req, res, () => res.redirect("/entrada.html?login=apple"));
};

app.get("/auth/apple", (req, res, next) => {
  if (!hasAppleConfig) {
    return res
      .status(501)
      .send("Apple OAuth não configurado. Preencha env.example.");
  }
  return passport.authenticate("apple")(req, res, next);
});

app.post("/auth/apple/callback", handleAppleCallback);
app.get("/auth/apple/callback", handleAppleCallback);

app.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ authenticated: false });
  }
  return res.json({ authenticated: true, user: req.user });
});

app.get("/api/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ authenticated: false });
  }
  const user = findUserById.get(req.session.userId);
  if (!user) {
    return res.status(401).json({ authenticated: false });
  }
  return res.json({
    authenticated: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

app.post("/api/register", (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    country,
    passport,
    age,
    gender,
  } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Preencha nome, e-mail e senha." });
  }

  const existing = findUserByEmail.get(email);
  if (existing) {
    return res.status(409).json({ error: "E-mail já cadastrado." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const info = insertUser.run({
    name,
    email,
    password_hash: passwordHash,
    phone: phone || null,
    country: country || null,
    passport: passport || null,
    age: age || null,
    gender: gender || null,
    created_at: new Date().toISOString(),
  });

  req.session.userId = info.lastInsertRowid;

  return res.json({ ok: true, userId: info.lastInsertRowid });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Informe e-mail e senha." });
  }
  const user = findUserByEmail.get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }

  req.session.userId = user.id;
  return res.json({ ok: true, userId: user.id });
});

app.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

