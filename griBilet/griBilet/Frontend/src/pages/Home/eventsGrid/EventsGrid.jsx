import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFilters from "../hooks/UseFilters";


import "../eventsGrid/EventsGrid.scss"




const slugify = (s) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

export default function EventsGrid() {

  const [events, setEvents] = useState([]);
  const { filters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const copyParams = new URLSearchParams();

    if (filters.q) {
      copyParams.set("q", filters.q);
    }
    if (filters.city) {
      copyParams.set("city", filters.city);
    }
    if (filters.category) {
      copyParams.set("category", filters.category);
    }
    if (filters.minPrice && filters.minPrice != null) {
      copyParams.set("minPrice", filters.minPrice);
    }
    if (filters.maxPrice && filters.maxPrice != null) {
      copyParams.set("maxPrice", filters.maxPrice);
    }

    setLoading(true);

    fetch(`/api/events${copyParams.toString() ? `?${copyParams}` : ""}`).then(r => r.json()).then(d => setEvents(d.data || d)).catch(console.error).finally(() => setLoading(false));


    if (loading) return <div>Yükleniyor…</div>;

  }, [filters]);

  return (
    <div className="eventsGrid" id="events">
      {events.map(e => (

        <Link
          key={e.id}
          className="event-card"
          to={`/events/${e.id}-${slugify(e.title)}`}
        >
          <div className="event-card__top">
            <img src={e.coverUrl} alt={e.title} />
          </div>

          <div className="event-card__bottom">
            <h3>{e.title}</h3>

            <p>
              {e.city} •{" "}
              {e.startTs
                ? new Date(e.startTs).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })
                : "-"}
            </p>


            <p>{e.price} TL</p>
          </div>
        </Link>


      ))}
    </div>
  );


}

