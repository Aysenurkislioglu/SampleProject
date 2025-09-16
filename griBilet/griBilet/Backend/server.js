require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

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

// Sağlık kontrolü
app.get("/api/health", (req, res) => res.json({ ok: true }));

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
