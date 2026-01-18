const crypto = require("crypto");
const express = require("express");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const COOKIE_NAME = "tc_auth";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
const TOKEN_SECRET = process.env.TOKEN_SECRET || "change-me";
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
    })
  : null;

let dbReadyPromise = null;

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
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax;${secure}`
  );
}

function clearAuthCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`
  );
}

async function query(text, params = []) {
  if (!pool) {
    throw new Error("DATABASE_URL not configured");
  }
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

async function ensureSchema() {
  if (dbReadyPromise) return dbReadyPromise;
  dbReadyPromise = (async () => {
    if (!pool) return;

    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS psychologists (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT,
        price_cents INT,
        rating NUMERIC,
        bio TEXT,
        tags JSONB,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS packages (
        code TEXT PRIMARY KEY,
        sessions INT NOT NULL,
        price_cents INT NOT NULL,
        discount_cents INT DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        psychologist_id TEXT REFERENCES psychologists(id),
        scheduled_at TIMESTAMPTZ NOT NULL,
        duration_minutes INT NOT NULL,
        status TEXT NOT NULL,
        package_code TEXT REFERENCES packages(code),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        appointment_id TEXT REFERENCES appointments(id),
        user_id TEXT REFERENCES users(id),
        amount_cents INT NOT NULL,
        currency TEXT NOT NULL,
        status TEXT NOT NULL,
        provider TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS tests (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        duration_minutes INT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS test_results (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        test_id TEXT REFERENCES tests(id),
        score INT,
        result TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        summary TEXT,
        read_minutes INT,
        content TEXT,
        image_url TEXT,
        published_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS news_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        summary TEXT,
        source TEXT,
        url TEXT,
        image_url TEXT,
        published_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        duration TEXT,
        channel TEXT,
        url TEXT,
        image_url TEXT
      );
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        date_time TIMESTAMPTZ,
        image_url TEXT,
        status TEXT NOT NULL,
        is_recorded BOOLEAN DEFAULT FALSE
      );
      CREATE TABLE IF NOT EXISTS event_signups (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        event_id TEXT REFERENCES events(id),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS support_orgs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        city TEXT,
        country TEXT,
        description TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        tags JSONB,
        image_url TEXT
      );
    `);

    await seedData();
  })();
  return dbReadyPromise;
}

async function seedData() {
  const { rows: usersCount } = await query("SELECT COUNT(*)::int AS count FROM psychologists");
  if (usersCount[0].count === 0) {
    await query(
      `INSERT INTO psychologists (id, name, title, price_cents, rating, bio, tags, image_url)
       VALUES
       ($1,$2,$3,$4,$5,$6,$7,$8),
       ($9,$10,$11,$12,$13,$14,$15,$16),
       ($17,$18,$19,$20,$21,$22,$23,$24)`,
      [
        "psy-1",
        "Dra. Elena Silva",
        "Psicóloga Clínica",
        1700,
        4.9,
        "Especialista em ansiedade e adaptação cultural.",
        JSON.stringify(["Ansiedade", "Adaptação"]),
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCa6bp0vFHcHwn1shKRuQ1SXkZ7RN1lU37jAScKrDiaLII3OjC0NQM8Kgqwz-XP3ZHUNE80Rs5GgVymsGpScmAPnpF18kVAtDTo9QREaNym_SDXlFcQWqlzOttOTY318tP09JDmT68KWook4jB0LmD7jlU79g5QEb6OewyUIDn1Nmji-_0imb7PCcp43juajim6LA6vsQX3H1oGn5e2kjroaUw7KN8gKHBo16ZTYnYGsm8h53uo5VAUHsyPt2Dr1YY_pYdwhUayYEQ",
        "psy-2",
        "Dr. Carlos Mendes",
        "Psicoterapeuta",
        2000,
        5.0,
        "Foco em depressão e luto migratório.",
        JSON.stringify(["Depressão", "Luto"]),
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCoLX-a_Xn3Pvh0QKZFPv1Bbq8PaaNsQPmE1IauaZGZjLva2jutjuJsNJnX868C1yhunHI19wJCWSTBCw9_jzEbKu8eV6gDnbjyYCw8weaavpokXfiQRATyShKo1u84RI9yMzzzQVW7kp4-Udx_CyCeCLMZn-LafU2DMkiKU0-OyhM11wgnyUZ41IZg2n1TKb5o-pFRu6Ein0mi91kHe9_JbV6nE6oQqgTMZ7fN6e0RTeAHWkvgYVnW77KjLs_jJ2LGPXywYOigYQc",
        "psy-3",
        "Dr. Miguel Sousa",
        "Psicólogo",
        1700,
        4.8,
        "Especialista em carreira e ansiedade.",
        JSON.stringify(["Carreira", "Ansiedade"]),
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEtqNAZ4ZFn-gbb6GqGvtLv_go27u0oS4kbJqNEOd-SQEFqBf6BXUMVqyxTWOv_twKAAo6Z3SCir522WIbvUAdAT-FKG9PhyF-apSvPuE6BaD2twYXhWUudPyVxqLBdAQ59TbUepCZ9XbsbqkOi7QxpYK3MF-45f7oLAEKt_wCG76UlhPlTGCdwibDiDndcoObqoRZOtDbPhq714TDeJ6afkLRBtn4ZNFIJEzo9X0PHP6fNWq-DqGtIGtnICIVemyIlAZ5SIfl9A",
      ]
    );
  }

  const { rows: packageCount } = await query("SELECT COUNT(*)::int AS count FROM packages");
  if (packageCount[0].count === 0) {
    await query(
      `INSERT INTO packages (code, sessions, price_cents, discount_cents)
       VALUES ('pkg-1',1,1700,0),('pkg-2',2,3200,200),('pkg-3',3,4500,600),('pkg-4',4,5600,1200)`
    );
  }

  const { rows: testsCount } = await query("SELECT COUNT(*)::int AS count FROM tests");
  if (testsCount[0].count === 0) {
    await query(
      `INSERT INTO tests (id, name, category, duration_minutes)
       VALUES
       ('test-bai','Escala de Ansiedade de Beck (BAI)','Saúde Emocional',5),
       ('test-bdi','Inventário de Depressão de Beck (BDI)','Saúde Emocional',7),
       ('test-integracao','Nível de Integração Cultural','Integração',6),
       ('test-conhecimento','Conhecimento sobre o País','Integração',6)`
    );
  }

  const { rows: blogCount } = await query("SELECT COUNT(*)::int AS count FROM blog_posts");
  if (blogCount[0].count === 0) {
    await query(
      `INSERT INTO blog_posts (id, title, category, summary, read_minutes, content, image_url)
       VALUES
       ('blog-1','Como Lidar com a Saudade de Casa','Saúde Mental','Dicas práticas para manter sua saúde mental forte enquanto se adapta a um novo país.',5,'Conteúdo completo do artigo.','https://lh3.googleusercontent.com/aida-public/AB6AXuB7HEkATmtmvg7QmtLIP8_VMCqJUb_edsD029rSn3rOfnC2YVh8cJ9h-GVOdgKE_TUKS4ePSQ2O3ROWAtl-_T57KogNBVFN226amRJqQHyHYgJTeKG64RMBtlatc0v-AEAOtn_PxtmTDBRmCLWviQkSkeaifT-16SrpijtZNekqA-xR2FcV44xI2B6ORJwOILm0H1jV7mymVPQ0SSIK5ACx7M3DAasSbTngWCOAHdx2sFDcRIRT5wLcq9NagHiG5b3Cmr7uzCP88pA'),
       ('blog-2','Guia para Validar seu Diploma','Integração','Passo a passo simplificado para começar o processo de validação.',8,'Conteúdo completo do artigo.','https://lh3.googleusercontent.com/aida-public/AB6AXuB0YhTJ7hRktbN2NYHiJG2f47NqSSuyk7iHNSH8AhCi6JjgqYNUnrPu1lgQdiAUyjvF0bmI8bXHuxWkjAswVB-PMLIiwKIGuisaeqRhhP_rDYQKxy5s440jX_8VLQ2aVsMDXGH3bjogFUb2bBs5TTHdoFthhlOaOlizDdL_Lkc7eUOHvw90_1QoeFcXBcH0HhVqNnIU16_s3H9MtWLgtYeIBet2LYDgLqMLSaUcR-rNB6PvRn6znMvlox089k2tQU8EQYB2t9Xbni0'),
       ('blog-3','Receitas Fáceis e Saudáveis','Bem-estar','Ideias rápidas para manter uma alimentação equilibrada no dia a dia.',6,'Conteúdo completo do artigo.','https://lh3.googleusercontent.com/aida-public/AB6AXuAX8N1IBk4kEaiRo-e55cWhEzl4n79YaBYpR-fTY0Mk7fdUNd248ZatZvaiH6CwS_ZoBmFMEX_xVu_ncFktzc9J-lfu_tRNEhAzK1YB9qFtdOv_cykclsDnxUaM-6dhlpwqGJXuv5tztp1mpilqdSEhTrpkI_CLS7xK5Uqosaf16FCecrDvkIKDALhldCT9Ln5-kEMOF5MAmvPj_s2EDW7oFqEdcVwt0-M0S1JqnoZbmJsRzAxcd5J8wEdJGA_r46-L2KJcrIDwQWQ')`
    );
  }

  const { rows: newsCount } = await query("SELECT COUNT(*)::int AS count FROM news_items");
  if (newsCount[0].count === 0) {
    await query(
      `INSERT INTO news_items (id, title, summary, source, url, image_url)
       VALUES
       ('news-1','Governo anuncia novas regras de visto para trabalhadores','Entenda as mudanças que entram em vigor a partir do próximo mês e como elas podem impactar você.','Público','https://example.com','https://lh3.googleusercontent.com/aida-public/AB6AXuDJR6Hev3ybr3gaN5HHX03rcNo8UIVk6KXu1qK8rG7H0uoSz9ZJrPoVoMbq4261w0ia84i4fQF94WB38GjdA4T0D8DgXrQW8qG4bEEoqJdr7Ce0URih7Ai0g3va7lHk6OoYEdElU8J1WUkailSIe7RuaQWX69ge5LE_BBxFvBmIdhnFDjFeQflMAIxXKRGOg9fJVkY7-JfD4Em13q7f5kuweDaMhf8r7IDTsx7aQetjdMIbZ1dpv4igAWG3qpfqSQM5tkXv3WyROIE'),
       ('news-2','Novos cursos de português gratuitos abrem inscrições','Iniciativa visa facilitar a integração de recém-chegados e aprimorar a comunicação no dia a dia.','DN','https://example.com','https://lh3.googleusercontent.com/aida-public/AB6AXuCfI9rFc8-cvemZoTA1IihbkMkLM6qio0Rn6ztzMhXigtuUuzyZK22DqMgXTQ0eaGJ_0jkE4uS4sB-6cqLX0t9L2288huIPZS7z8hlhD4__xKDBhQyZGMFgOax5ar6DK0G9RA05eUnEev1yHI1Mpv_UzS_hP_etw7xYQMuVZqQ_seKrZqXCQBh4aDFlB8cObcCp-F-V5AJgksuGdml0FMAN7BAvb1DPB9PMWsgKimKfuDJbnsEXYL-K2mnlO2q3Apg30Djegu49sQ0'),
       ('news-3','Acesso à saúde: o que mudou para imigrantes em 2024','Confira o guia atualizado sobre como aceder ao Serviço Nacional de Saúde e os seus direitos.','SNS','https://example.com','https://lh3.googleusercontent.com/aida-public/AB6AXuBkbTMMfzGySiPXYACsGXOvnHf4CAM4L-0MVWLV_SVIJ1mfWYqYA0z9ovt0kScoj7R8rKWBFTReZTRVT9CPz1hIbaPd3HpztEspSDZlbS1iHwQNaLDuE-94S42hx079PA6IDR3yOrG6Tr_AAzWXmV4XfWxCABpujfo27I95sYkQ2qpgv_Gt4639-Wl6Z8I6D5_ccSmv3TPHm7-ZxFI-s0WRY0vBv0DOLAyYQkmchAcByBGYzObJHVLEtj27n0F9Dy2DuZGkSM0wlSA')`
    );
  }

  const { rows: videosCount } = await query("SELECT COUNT(*)::int AS count FROM videos");
  if (videosCount[0].count === 0) {
    await query(
      `INSERT INTO videos (id, title, category, duration, channel, url, image_url)
       VALUES
       ('video-1','Como lidar com a ansiedade da mudança','Saúde Mental','12:45','Canal Tekóa','https://youtube.com','https://lh3.googleusercontent.com/aida-public/AB6AXuCKA0PakLTrNCQ9Yx59zs-3luAPgAu2EDpesKbZUQeN8LwazTEinTUg_E6vAp8gnw8PnnbZuXQzeHrIpswq69j-OF4v6ak6LrWGwHfGQr8DYQ5dsC8KFndwZpGYk1CIGqZ-Wh___woyyS0ytfNFxOa_eJnhO3swZylVj0aY7C0IuDyFGcWGNlQS-Flm2G9lt9KMYX01YDLtJpSz6ve8pRn3W4kTdRIGfQMR1-LME8uHToWHrUa5VLR1wMQXMwQefnwsLyW5UWjdK_U'),
       ('video-2','Passo a passo: Abrindo conta bancária em Portugal','Finanças','08:30','Finanças para Todos','https://youtube.com','https://lh3.googleusercontent.com/aida-public/AB6AXuAGUt4qbcz9S8TSQszQtvVnpsFCx6TJnhdZlOa6QwQA7RVsdCPOne3Ok2dmi6sZt1-8h3B4CKZ5--PS5_srCj5XgkYXDxYAtTE5TW_79Vg1e6mXgwXzqv7rwqM0o6Fm88xvq34b5GGCX-1kjsCraXJLr8H6xPTISweYBORTQofVCaUysIQ6-h7AIrHpcXgtTnms06lyNcLmQZKEBbOsu9aWPibnX4u1xi9oKwEgCmRcagZK0GjeChn2ySs4Ju0jcqCRMfRbIql8Nq0'),
       ('video-3','Roda de conversa: Experiências de imigração','Eventos','45:00','Tekóa Ao Vivo','https://youtube.com','https://lh3.googleusercontent.com/aida-public/AB6AXuCe15zH24REZFS1RnmDP64sLJcxoHqFqEyI_6i8Cwd_3P-mpjBZFkLEFMlgWaklwtYiEOiZFXjObLzoP_7tFJYmrN7jqD3yP2hCGBaPBYHux23uKs6sf2hvsCqsw9NdOAyjNqegmQPMatxb7gHx7z1zaFCqyPWYQO02H1_xysK6fgTdT2TcEkW3j-lMIyLV1f1-IdnEdY3yy8LvrvO7wGbOcLNgllNbwowfEyu-rpKB_unHax-bybGcW7uYPOl75uho_Oc26CE_UVY')`
    );
  }

  const { rows: eventsCount } = await query("SELECT COUNT(*)::int AS count FROM events");
  if (eventsCount[0].count === 0) {
    await query(
      `INSERT INTO events (id, title, description, category, date_time, image_url, status, is_recorded)
       VALUES
       ('event-1','Cuidando da Ansiedade no Dia a Dia','Técnicas simples de respiração e mindfulness.','Próximos','2024-10-25T19:00:00Z','https://lh3.googleusercontent.com/aida-public/AB6AXuDMkb4lsUv5sIp1IXB1uhDifkSUP0SOIxmw1VYG2pnoE0laIbuEj-Q3oDwSyZGxIkwNtImvDqfulNdd8R-LDNxbI1T3-gmPBC8DmYSGgtU16_jFZutw0CCvZ2EECect1NvtPl5SDRlluP7eXSFhiOJFBXFcpZkQg0xzqvREViVfXSdPSQFbwpIIbDRSeg71O8NQO2NX-sxF7Uc02_K86IO-ZdPhFJnMq5Nt8hzB29idBdeY3jur8pmNLm3tvf7XIU3vihTasmmrReM','upcoming',false),
       ('event-2','Comunicação e Conexão','Como criar laços em um novo país.','Próximos','2024-11-10T20:00:00Z','https://lh3.googleusercontent.com/aida-public/AB6AXuAU9lCq77iwp3bJJoX16CMWQoWcHZSUGqct_LeEof5O-xbzuxtWqomIhlIBW2gp0pUimBOSjHSA-9pgvWP6QW_8bEb7ZE-dIentDCamzWAtbPM0YHIuLY3ObTheCLEotUi3Gqgnpo0U29M5It3cJSpcPPj6Cbp3E4woF-T8Unz4suPxedUHgysA6bKvgY1W096f_V0WgseJ46aPKxNoCDukIKXeu6KjVECNBhE7MPsPIMSwV_nBD86UCkhED-MEx0uZHToJN3FKm2U','upcoming',false),
       ('event-3','Lidando com a Ansiedade da Adaptação','Tema: Saúde Mental','Anteriores','2024-08-25T19:00:00Z','https://lh3.googleusercontent.com/aida-public/AB6AXuDJR6Hev3ybr3gaN5HHX03rcNo8UIVk6KXu1qK8rG7H0uoSz9ZJrPoVoMbq4261w0ia84i4fQF94WB38GjdA4T0D8DgXrQW8qG4bEEoqJdr7Ce0URih7Ai0g3va7lHk6OoYEdElU8J1WUkailSIe7RuaQWX69ge5LE_BBxFvBmIdhnFDjFeQflMAIxXKRGOg9fJVkY7-JfD4Em13q7f5kuweDaMhf8r7IDTsx7aQetjdMIbZ1dpv4igAWG3qpfqSQM5tkXv3WyROIE','past',true) `\n    );\n  }\n+\n+  const { rows: supportCount } = await query(\n+    \"SELECT COUNT(*)::int AS count FROM support_orgs\"\n+  );\n+  if (supportCount[0].count === 0) {\n+    await query(\n+      `INSERT INTO support_orgs (id, name, category, city, country, description, phone, email, website, tags, image_url)\n+       VALUES\n+       ('org-1','Alto Comissariado para as Migrações','Instituição Pública','Lisboa','Portugal','Instituição pública de apoio à integração.','+351 111 111 111','contato@acm.pt','https://example.org', '[]','https://lh3.googleusercontent.com/aida-public/AB6AXuDrA19d4PP2kNuZ9cX_R_rfxBhr3DZOFwonmqqKGsr4VjxIoru4tCLOi2UzRYcroN-MS9YHGtNFIxgip_x8VGhDtYJ94pCr-6XTiw7Z0cJABxJTS5X8w14KX7b-UG_3TtC4IEcvXzaZQJDGjA2VPghntx4PoxkAoliugWZzL0hYxWJCGfyRo8uSSSFr6_hXM4_D3Ge5ijzLuKiW-A3GgTGYaYp-As0A3fu5hA1jaN0oMUyPoyeboyMVMRhXcs7sKXjz_ksqwZYD32M'),\n+       ('org-2','Cruz Vermelha Portuguesa','ONG / Saúde','Porto','Portugal','Apoio humanitário e saúde.','+351 222 222 222','contato@cvp.pt','https://example.org','[]','https://lh3.googleusercontent.com/aida-public/AB6AXuDuAgUfudVhI4vK1bhMAXhNMHxx7HLroOdBx7bu1LKFj-XpheHxRbqooCvvDR-bSqZ8kfChZkCZZMhj0Xcv-cOJUhvGZz8qOQ-qfT_6qwclNGgVRHpXtpGfabp6kswecr694NJXPVOWMcmcGIQyPs2w3hgyLiUnsibJpIXeCe4iL8ILMV85SLVLAD5dB36Fkgu53bdzpxazizWnCZWzYQKV-OZRf5GM4c9Y2cQSIkNcN5utWG1ACUriwga5q76ZP9N-jxAVAOmHJD0'),\n+       ('org-3','IEFP - Centro de Emprego','Emprego','Faro','Portugal','Serviços de emprego e formação.','+351 333 333 333','contato@iefp.pt','https://example.org','[]','https://lh3.googleusercontent.com/aida-public/AB6AXuDqZ46SMT4Ygc-3bFte542edhCY8WP7JK6IZaMxL62_vlfFpWsaWVwsEVhfc6hlRyCepU3En_lf7Zyqo_8Lrw_KvzR8lDZEoqrNvwxMdOdGv-ydl3KT2L6lRcI9Tr8C7_u_N2odEU_mThbMvJfGPoeYhTA-IkQdMdZFEWp7teMzD3mP_C_2sCHt6mY7T6zHynHLBrS14za3VQuLdW1PD4d4bIGxMwaeOTfoK4qI1Mx11aTZV0IndmJ4dLEpSWnpMLX4hARp9Z3xUyk'),\n+       ('org-4','JRS - Serviço Jesuíta aos Refugiados','Apoio Social','Lisboa','Portugal','Apoio social e acolhimento.','+351 444 444 444','contato@jrs.pt','https://example.org','[]','https://lh3.googleusercontent.com/aida-public/AB6AXuDZgG_q2sUf_0eGS4k_UZas6Sn3cFkg6L_J9sB_LPdxWS8GPfywyVHfldvioSlC_zINHpXhYgy9IQr2Ux56vPUKxmn_iWEiyZkuL0x4VicnxStWMGXXVC1UzYp0t7tumvIav4dCIrDPbten3XRTFycO_c0p0VX1SgFcsdxyfGSS18UVl7o8vJf92Dw_GJYwes9Dbs6DYYQIHZLnXrWx8RDDRkFi5WZklx2DnJlNVraTi6nN78WBYQDSlRsNIsyNdVJLNCBBUwcGUqo')`\n+    );\n+  }\n }\n+\n+async function requireDb(req, res, next) {\n+  try {\n+    await ensureSchema();\n+    return next();\n+  } catch (err) {\n+    return res.status(500).json({ error: \"Database not configured\", details: err.message });\n+  }\n+}\n+\n+function requireAuth(req, res, next) {\n+  const token = getAuthToken(req);\n+  const payload = token ? verifyToken(token) : null;\n+  if (!payload?.userId) {\n+    return res.status(401).json({ error: \"Not authenticated\" });\n+  }\n+  req.userId = payload.userId;\n+  return next();\n+}\n+\n+function requireAdmin(req, res, next) {\n+  const token = req.headers[\"x-admin-token\"] || \"\";\n+  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {\n+    return res.status(403).json({ error: \"Admin token inválido\" });\n+  }\n+  return next();\n+}\n+\n+app.get(\"/api/health\", (req, res) => {\n+  res.json({ ok: true });\n+});\n+\n+app.get(\"/api/me\", requireDb, async (req, res) => {\n+  const token = getAuthToken(req);\n+  const payload = token ? verifyToken(token) : null;\n+  if (!payload?.userId) {\n+    return res.status(401).json({ authenticated: false });\n+  }\n+  const result = await query(\"SELECT id, name, email FROM users WHERE id = $1\", [\n+    payload.userId,\n+  ]);\n+  if (!result.rows[0]) {\n+    return res.status(401).json({ authenticated: false });\n+  }\n+  return res.json({ authenticated: true, user: result.rows[0] });\n+});\n+\n+app.post(\"/api/register\", requireDb, async (req, res) => {\n+  const { name, email, password } = req.body || {};\n+  if (!name || !email || !password) {\n+    return res.status(400).json({ error: \"Preencha nome, e-mail e senha.\" });\n+  }\n+  const existing = await query(\"SELECT id FROM users WHERE email = $1\", [email]);\n+  if (existing.rows[0]) {\n+    return res.status(409).json({ error: \"E-mail já cadastrado.\" });\n+  }\n+  const hash = await bcrypt.hash(password, 10);\n+  const id = crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO users (id, name, email, password_hash) VALUES ($1,$2,$3,$4)\",\n+    [id, name, email, hash]\n+  );\n+  const token = signToken({ userId: id });\n+  setAuthCookie(res, token);\n+  return res.json({ ok: true, userId: id });\n+});\n+\n+app.post(\"/api/login\", requireDb, async (req, res) => {\n+  const { email, password } = req.body || {};\n+  if (!email || !password) {\n+    return res.status(400).json({ error: \"Informe e-mail e senha.\" });\n+  }\n+  const result = await query(\n+    \"SELECT id, password_hash FROM users WHERE email = $1\",\n+    [email]\n+  );\n+  const user = result.rows[0];\n+  if (!user) {\n+    return res.status(401).json({ error: \"Credenciais inválidas.\" });\n+  }\n+  const ok = await bcrypt.compare(password, user.password_hash);\n+  if (!ok) {\n+    return res.status(401).json({ error: \"Credenciais inválidas.\" });\n+  }\n+  const token = signToken({ userId: user.id });\n+  setAuthCookie(res, token);\n+  return res.json({ ok: true, userId: user.id });\n+});\n+\n+app.post(\"/api/logout\", (req, res) => {\n+  clearAuthCookie(res);\n+  return res.json({ ok: true });\n+});\n+\n+app.get(\"/api/psychologists\", requireDb, async (req, res) => {\n+  const { rows } = await query(\n+    \"SELECT id, name, title, price_cents, rating, tags, image_url FROM psychologists ORDER BY created_at DESC\"\n+  );\n+  res.json(rows);\n+});\n+\n+app.get(\"/api/psychologists/:id\", requireDb, async (req, res) => {\n+  const { rows } = await query(\n+    \"SELECT * FROM psychologists WHERE id = $1\",\n+    [req.params.id]\n+  );\n+  if (!rows[0]) return res.status(404).json({ error: \"Not found\" });\n+  res.json(rows[0]);\n+});\n+\n+app.get(\"/api/packages\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM packages ORDER BY sessions ASC\");\n+  res.json(rows);\n+});\n+\n+app.post(\"/api/appointments\", requireDb, requireAuth, async (req, res) => {\n+  const { psychologistId, scheduledAt, packageCode } = req.body || {};\n+  if (!psychologistId || !scheduledAt || !packageCode) {\n+    return res.status(400).json({ error: \"Dados incompletos\" });\n+  }\n+  const id = crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO appointments (id, user_id, psychologist_id, scheduled_at, duration_minutes, status, package_code) VALUES ($1,$2,$3,$4,$5,$6,$7)\",\n+    [id, req.userId, psychologistId, scheduledAt, 50, \"scheduled\", packageCode]\n+  );\n+  res.json({ ok: true, appointmentId: id });\n+});\n+\n+app.post(\"/api/checkout\", requireDb, requireAuth, async (req, res) => {\n+  const { psychologistId, scheduledAt, packageCode, amountCents, currency } = req.body || {};\n+  if (!psychologistId || !scheduledAt || !packageCode) {\n+    return res.status(400).json({ error: \"Dados incompletos\" });\n+  }\n+  const appointmentId = crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO appointments (id, user_id, psychologist_id, scheduled_at, duration_minutes, status, package_code) VALUES ($1,$2,$3,$4,$5,$6,$7)\",\n+    [appointmentId, req.userId, psychologistId, scheduledAt, 50, \"paid\", packageCode]\n+  );\n+  const paymentId = crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO payments (id, appointment_id, user_id, amount_cents, currency, status, provider) VALUES ($1,$2,$3,$4,$5,$6,$7)\",\n+    [paymentId, appointmentId, req.userId, amountCents || 1700, currency || \"EUR\", \"paid\", \"card\"]\n+  );\n+  res.json({ ok: true, appointmentId, paymentId });\n+});\n+\n+app.get(\"/api/appointments\", requireDb, requireAuth, async (req, res) => {\n+  const { rows } = await query(\n+    \"SELECT * FROM appointments WHERE user_id = $1 ORDER BY created_at DESC\",\n+    [req.userId]\n+  );\n+  res.json(rows);\n+});\n+\n+app.get(\"/api/tests\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM tests ORDER BY category ASC\");\n+  res.json(rows);\n+});\n+\n+app.post(\"/api/test-results\", requireDb, requireAuth, async (req, res) => {\n+  const { testId, score, result } = req.body || {};\n+  if (!testId) return res.status(400).json({ error: \"Teste inválido\" });\n+  const id = crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO test_results (id, user_id, test_id, score, result) VALUES ($1,$2,$3,$4,$5)\",\n+    [id, req.userId, testId, score || null, result || null]\n+  );\n+  res.json({ ok: true, id });\n+});\n+\n+app.get(\"/api/blog\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM blog_posts ORDER BY published_at DESC\");\n+  res.json(rows);\n+});\n+\n+app.get(\"/api/blog/:id\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM blog_posts WHERE id = $1\", [req.params.id]);\n+  if (!rows[0]) return res.status(404).json({ error: \"Not found\" });\n+  res.json(rows[0]);\n+});\n+\n+app.get(\"/api/news\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM news_items ORDER BY published_at DESC\");\n+  res.json(rows);\n+});\n+\n+app.get(\"/api/videos\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM videos\");\n+  res.json(rows);\n+});\n+\n+app.get(\"/api/events\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM events ORDER BY date_time DESC\");\n+  res.json(rows);\n+});\n+\n+app.get(\"/api/events/:id\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM events WHERE id = $1\", [req.params.id]);\n+  if (!rows[0]) return res.status(404).json({ error: \"Not found\" });\n+  res.json(rows[0]);\n+});\n+\n+app.post(\"/api/events/:id/signup\", requireDb, requireAuth, async (req, res) => {\n+  const id = crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO event_signups (id, user_id, event_id) VALUES ($1,$2,$3)\",\n+    [id, req.userId, req.params.id]\n+  );\n+  res.json({ ok: true });\n+});\n+\n+app.get(\"/api/support-orgs\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM support_orgs\");\n+  res.json(rows);\n+});\n+\n+app.get(\"/api/support-orgs/:id\", requireDb, async (req, res) => {\n+  const { rows } = await query(\"SELECT * FROM support_orgs WHERE id = $1\", [req.params.id]);\n+  if (!rows[0]) return res.status(404).json({ error: \"Not found\" });\n+  res.json(rows[0]);\n+});\n+\n+// Admin endpoints\n+app.post(\"/api/admin/blog\", requireDb, requireAdmin, async (req, res) => {\n+  const { id, title, category, summary, readMinutes, content, imageUrl } = req.body || {};\n+  const postId = id || crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO blog_posts (id, title, category, summary, read_minutes, content, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7)\",\n+    [postId, title, category, summary, readMinutes, content, imageUrl]\n+  );\n+  res.json({ ok: true, id: postId });\n+});\n+\n+app.post(\"/api/admin/news\", requireDb, requireAdmin, async (req, res) => {\n+  const { id, title, summary, source, url, imageUrl } = req.body || {};\n+  const newsId = id || crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO news_items (id, title, summary, source, url, image_url) VALUES ($1,$2,$3,$4,$5,$6)\",\n+    [newsId, title, summary, source, url, imageUrl]\n+  );\n+  res.json({ ok: true, id: newsId });\n+});\n+\n+app.post(\"/api/admin/videos\", requireDb, requireAdmin, async (req, res) => {\n+  const { id, title, category, duration, channel, url, imageUrl } = req.body || {};\n+  const videoId = id || crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO videos (id, title, category, duration, channel, url, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7)\",\n+    [videoId, title, category, duration, channel, url, imageUrl]\n+  );\n+  res.json({ ok: true, id: videoId });\n+});\n+\n+app.post(\"/api/admin/events\", requireDb, requireAdmin, async (req, res) => {\n+  const { id, title, description, category, dateTime, imageUrl, status, isRecorded } =\n+    req.body || {};\n+  const eventId = id || crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO events (id, title, description, category, date_time, image_url, status, is_recorded) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)\",\n+    [eventId, title, description, category, dateTime, imageUrl, status || \"upcoming\", !!isRecorded]\n+  );\n+  res.json({ ok: true, id: eventId });\n+});\n+\n+app.post(\"/api/admin/support-orgs\", requireDb, requireAdmin, async (req, res) => {\n+  const { id, name, category, city, country, description, phone, email, website, tags, imageUrl } =\n+    req.body || {};\n+  const orgId = id || crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO support_orgs (id, name, category, city, country, description, phone, email, website, tags, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)\",\n+    [orgId, name, category, city, country, description, phone, email, website, tags || \"[]\", imageUrl]\n+  );\n+  res.json({ ok: true, id: orgId });\n+});\n+\n+app.post(\"/api/admin/tests\", requireDb, requireAdmin, async (req, res) => {\n+  const { id, name, category, durationMinutes } = req.body || {};\n+  const testId = id || crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO tests (id, name, category, duration_minutes) VALUES ($1,$2,$3,$4)\",\n+    [testId, name, category, durationMinutes]\n+  );\n+  res.json({ ok: true, id: testId });\n+});\n+\n+app.post(\"/api/admin/psychologists\", requireDb, requireAdmin, async (req, res) => {\n+  const { id, name, title, priceCents, rating, bio, tags, imageUrl } = req.body || {};\n+  const psyId = id || crypto.randomUUID();\n+  await query(\n+    \"INSERT INTO psychologists (id, name, title, price_cents, rating, bio, tags, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)\",\n+    [psyId, name, title, priceCents, rating, bio, tags || \"[]\", imageUrl]\n+  );\n+  res.json({ ok: true, id: psyId });\n+});\n+\n+module.exports = app;

