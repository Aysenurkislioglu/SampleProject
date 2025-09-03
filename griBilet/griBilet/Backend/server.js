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

// Basit test route
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ ok: true, serverTime: rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB bağlantı hatası' });
  }
});

// Event listesi
app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, category, artist_name, venue_name, city,
             DATE_FORMAT(start_datetime, '%d %b %a • %H:%i') AS date_label,
             price, image_card_url , image_cover_url
      FROM events
      ORDER BY start_datetime ASC
      LIMIT 50
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Tek event detay
app.get('/api/events/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Event bulunamadı' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API çalışıyor: http://localhost:${PORT}`);
});
