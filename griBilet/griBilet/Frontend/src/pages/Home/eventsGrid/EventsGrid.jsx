import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFilters from "../hooks/UseFilters";

const slugify = (s) => s.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]/g,"");

export default function EventsGrid() {
  const { filters } = useFilters();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // URL değişince API'den veri çek
  useEffect(() => {
    const qs = new URLSearchParams();
    if (filters.q) qs.set("q", filters.q);
    if (filters.city) qs.set("city", filters.city);
    if (filters.category) qs.set("category", filters.category);
    if (filters.minPrice) qs.set("minPrice", filters.minPrice);
    if (filters.maxPrice) qs.set("maxPrice", filters.maxPrice);

    setLoading(true);
    fetch(`/api/events${qs.toString() ? `?${qs}` : ""}`)
      .then(r => r.json())
      .then(d => setRows(d.data || d)) // backend'in döndürdüğü yapıya göre
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  if (loading) return <div>Yükleniyor…</div>;

  return (
    <div className="events">
      {rows.map(ev => (
        <Link
          key={ev.id}
          to={`/events/${ev.id}-${slugify(ev.title)}`} // kartın tamamı link
          className="event-card"
        >
          <img src={ev.coverUrl} alt={ev.title} />
          <div className="meta">
            <h4>{ev.title}</h4>
            <small>{ev.city} • {new Date(ev.date).toLocaleDateString()}</small>
            <div className="price">{ev.price} TL</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
