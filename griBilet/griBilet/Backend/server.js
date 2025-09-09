require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

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
  ssl: { rejectUnauthorized: false } // Railway genelde SSL istiyor
});

// Sağlık kontrolü
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ==== ÖNCE MOCK ile test (DB hazır değilse) ====
// Not: DB hazırsa bu bloğu kaldır, alttaki "Gerçek DB" bloğunu kullan.
app.get('/api/events', async (req, res, next) => {
  try {
    const {
      q = "",                 // başlık / sanatçı / mekan araması
      city = "",              // şehir
      category = "",          // 'konser' | 'tiyatro' | 'festival' | 'standup'
      minPrice = "",
      maxPrice = "",
      dateFrom = "",          // opsiyonel: YYYY-MM-DD
      dateTo = "",
      page = "1",
      limit = "24",
      sort = "date_asc",      // 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc'
    } = req.query;

    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 24));
    const offset = (p - 1) * l;

    const ALLOWED_CATS = new Set(["konser","tiyatro","festival","standup"]);
    const SORTS = {
      date_asc:  "start_datetime ASC",
      date_desc: "start_datetime DESC",
      price_asc: "price ASC",
      price_desc:"price DESC",
    };
    const orderBy = SORTS[sort] || SORTS.date_asc;

    const where = [];
    const vals  = [];

    if (q) {
      where.push("(title LIKE ? OR artist_name LIKE ? OR venue_name LIKE ?)");
      vals.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }
    if (city) {                         // case-insensitive eşleştirelim
      where.push("LOWER(city) = LOWER(?)");
      vals.push(city);
    }
    if (category && ALLOWED_CATS.has(category)) {
      where.push("category = ?");
      vals.push(category);
    }
    if (minPrice !== "") { where.push("price >= ?"); vals.push(Number(minPrice)); }
    if (maxPrice !== "") { where.push("price <= ?"); vals.push(Number(maxPrice)); }
    if (dateFrom)       { where.push("start_datetime >= ?"); vals.push(`${dateFrom} 00:00:00`); }
    if (dateTo)         { where.push("start_datetime <= ?"); vals.push(`${dateTo} 23:59:59`); }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [rows] = await pool.query(
      `SELECT
         id,
         title,
         category,
         artist_name     AS artistName,
         venue_name      AS venueName,
         city,
         start_datetime  AS startDateTime,
         price,
         image_card_url  AS coverUrl,       -- kartta kullan
         image_cover_url AS coverImageUrl   -- detay sayfada kullan
       FROM events
       ${whereSql}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [...vals, l, offset]
    );

    // toplam sayım (sayfalama için)
    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM events ${whereSql}`,
      vals
    );

    // DECIMAL string → number
    const data = rows.map(r => ({ ...r, price: Number(r.price) }));

    res.json({ data, total, page: p, pageCount: Math.ceil(total / l) });
  } catch (err) {
    next(err);
  }
});

// ==== GERÇEK DB sürümü ====
// app.get('/api/events', async (req, res, next) => {
//   try {
//     const { q = '', city = '', category = '', minPrice = '', maxPrice = '' } = req.query;
//
//     const where = [];
//     const vals  = [];
//     if (q)              { where.push('title LIKE ?');        vals.push(`%${q}%`); }
//     if (city)           { where.push('city_slug = ?');       vals.push(city); }
//     if (category)       { where.push('category_slug = ?');   vals.push(category); }
//     if (minPrice !== ''){ where.push('price >= ?');          vals.push(Number(minPrice)); }
//     if (maxPrice !== ''){ where.push('price <= ?');          vals.push(Number(maxPrice)); }
//
//     const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
//     const [rows] = await pool.query(
//       `SELECT id, title, city_slug AS city, category_slug AS category,
//               price, date, cover_url AS coverUrl
//        FROM events
//        ${whereSql}
//        ORDER BY date ASC
//        LIMIT 24`,
//       vals
//     );
//
//     res.json({ data: rows });
//   } catch (err) { next(err); }
// });

// Tek kayıt (detay sayfası için)
app.get('/api/events/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // DB yoksa mock dön:
    // return res.json({ id, title:'Mock Etkinlik', city:'istanbul', category:'concert', price:500, date:'2025-11-20T18:00:00Z', coverUrl:'https://picsum.photos/seed/x/600/400', description:'...' });

    const [rows] = await pool.query(
      `SELECT id, title, city_slug AS city, category_slug AS category,
              price, date, cover_url AS coverUrl, description
       FROM events WHERE id = ?`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

// Hata yakalayıcı
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));