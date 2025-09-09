import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import TicketInfo from "./pages/TicketInfo/TicketInfo.jsx";
import "./styles/global.scss";

function HomePageContent() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then((r) => {
        if (!r.ok) throw new Error("API error " + r.status);
        return r.json();
      })
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Yükleniyor…</div>;
  if (err)
    return <div style={{ padding: 24, color: "crimson" }}>Hata: {err}</div>;

  const th = {
    textAlign: "left",
    padding: "8px 12px",
    borderBottom: "1px solid #e5e7eb",
  };
  const td = {
    padding: "8px 12px",
    borderBottom: "1px solid #f1f5f9",
    verticalAlign: "top",
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 16 }}>Etkinlikler</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Başlık</th>
            <th style={th}>Tür</th>
            <th style={th}>Sanatçı</th>
            <th style={th}>Mekan</th>
            <th style={th}>Şehir</th>
            <th style={th}>Tarih/Saat</th>
            <th style={th}>Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td style={td}>{e.id}</td>
              <td style={td}>{e.title}</td>
              <td style={td}>{e.category}</td>
              <td style={td}>{e.artist_name}</td>
              <td style={td}>{e.venue_name}</td>
              <td style={td}>{e.city}</td>
              <td style={td}>{e.date_label ?? e.start_datetime}</td>
              <td style={td}>{e.price} TL</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul
        style={{
          marginTop: 24,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {events.map((e) => (
          <li
            key={e.id}
            style={{
              listStyle: "none",
              border: "1px solid #eee",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <img
              src={e.image_card_url}
              alt={e.title}
              style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{e.title}</div>
              <div style={{ fontSize: 12, color: "#666" }}>
                {e.artist_name} • {e.city}
              </div>
              <div style={{ marginTop: 6, fontSize: 12 }}>
                {e.date_label ?? e.start_datetime}
              </div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{e.price} TL</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePageContent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/ticketinfo" element={<TicketInfo />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
