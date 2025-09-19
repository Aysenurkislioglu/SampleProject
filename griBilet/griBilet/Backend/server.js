require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Railway MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false },
});

// Utility: generate JWT
function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET || "dev-secret-change-me";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// Sağlık kontrolü
app.get("/api/health", (req, res) => res.json({ ok: true }));

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body || {};

    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ success: false, error: "Email ve şifre gerekli" });
    }

    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email ve şifre gerekli" });
    }

    const [rows] = await pool.query(
      `SELECT idusers AS id, name, email, password
       FROM users
       WHERE LOWER(email) = ?
       LIMIT 1`,
      [email]
    );

    if (!rows.length) {
      return res
        .status(401)
        .json({ success: false, error: "Geçersiz e-posta veya şifre" });
    }

    const user = rows[0];

    const stored = user.password || "";
    let passwordOk = false;
    if (
      stored.startsWith("$2a$") ||
      stored.startsWith("$2b$") ||
      stored.startsWith("$2y$")
    ) {
      try {
        passwordOk = await bcrypt.compare(password, stored);
      } catch (e) {
        console.error("Bcrypt compare error", e);
        return res
          .status(500)
          .json({ success: false, error: "Şifre doğrulama hatası" });
      }
    } else {
      passwordOk = stored === password;
    }

    if (!passwordOk) {
      return res
        .status(401)
        .json({ success: false, error: "Geçersiz e-posta veya şifre" });
    }

    const token = generateToken({ id: user.id, email: user.email });

    return res.json({
      success: true,
      message: "Giriş başarılı",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Login route error", error);
    return res.status(500).json({ success: false, error: "Sunucu hatası" });
  }
});

app.get("/api/events", async (req, res, next) => {
  try {
    const {
      q = "",
      city = "",
      minPrice = "",
      maxPrice = "",
      category = "",
    } = req.query;

    const allowedCategories = new Set([
      "konser",
      "tiyatro",
      "festival",
      "standup",
    ]);

    const where = [];
    const values = [];

    if (q) {
      where.push("(title LIKE ? OR artist_name LIKE ? OR venue_name LIKE ?)");
      values.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }
    if (city) {
      where.push("LOWER(city)=LOWER(?)");
      values.push(city);
    }
    if (category && allowedCategories.has(category)) {
      where.push("category=?");
      values.push(category);
    }

    if (minPrice !== "") {
      where.push("price >= ?");
      values.push(Number(minPrice));
    }
    if (maxPrice !== "") {
      where.push("price <= ?");
      values.push(Number(maxPrice));
    }

    const whereSQL = where.length ? `WHERE ${where.join(" AND ")} ` : "";

    const [rows] = await pool.query(
      `SELECT
          id,
          title,
          category,
          artist_name     AS artistName,
          venue_name      AS venueName,
          city,
          UNIX_TIMESTAMP(start_datetime) * 1000 AS startTs,
          price,
          image_card_url  AS coverUrl,       -- kartta kullan
          image_cover_url AS coverImageUrl   -- detay sayfada kullan
        FROM events
        ${whereSQL}
        `,
      values
    );

    const data = rows.map((r) => ({
      ...r,
      price: Number(r.price),
      startTs: Number(r.startTs),
    }));
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

// Hata yakalayıcı
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
