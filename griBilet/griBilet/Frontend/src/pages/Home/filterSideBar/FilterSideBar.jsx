import { useEffect, useState } from "react";
import useFilters from "../hooks/UseFilters";
import useDebouncedEffect from "../hooks/UseDebouncedEffect";

import "../filterSideBar/FilterSideBar.scss"



export default function FilterSideBar() {
  const { filters, update, reset } = useFilters();

  const [q, setQ] = useState(filters.q);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);


  useEffect(() => { setQ(filters.q) }, [filters.q])
  useEffect(() => { setMinPrice(filters.minPrice) }, [filters.minPrice])
  useEffect(() => { setMaxPrice(filters.maxPrice) }, [filters.maxPrice])
  useEffect(() => {
    if (minPrice !== "" && maxPrice !== "" && minPrice > maxPrice) {

      setError("Min fiyat Max fiyattan büyük olamaz.");
      return;

    }

  }, [minPrice, maxPrice])


  useDebouncedEffect(() => { update({ q }) }, [q])
  useDebouncedEffect(() => { update({ minPrice }) }, [minPrice])
  useDebouncedEffect(() => { update({ maxPrice }) }, [maxPrice])

  return (
    <div className="filterSideBar">

      <div className="search">
        <label >Etkinlik Ara</label>
        <input value={q} type="text" placeholder="Konser, tiyatro..." onChange={(e) => setQ(e.target.value)} />

      </div>

      <div className="price">

        <div className="price__min">
          <label > Min TL</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder=" 0TL" />
        </div>

        <div className="price__max">
          <label > Max TL</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder=" 50000TL" />
        </div>
      </div>

      <div className="city">
        <label >Şehir</label>
        <select value={filters.city} onChange={(e) => update({ city: e.target.value })}>
          <option value="">Hepsi</option>
          <option value="istanbul">İstanbul</option>
          <option value="ankara">Ankara</option>
          <option value="izmir">İzmir</option>
          <option value="çanakkale">Çanakkale</option>
        </select>
      </div>

      <div className="reset">
        <button type="button" onClick={reset}> Filtreleri Sıfırla </button>
      </div>

    </div>
  );

}; 