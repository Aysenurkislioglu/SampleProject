import { useEffect, useState } from "react";
import useFilters from "../hooks/UseFilters";
import useDebouncedEffect from "../hooks/UseDebouncedEffect";

export default function FilterSidebar() {
  const { filters, update, reset } = useFilters();
  const [q, setQ] = useState(filters.q);
  const [minP, setMinP] = useState(filters.minPrice);
  const [maxP, setMaxP] = useState(filters.maxPrice);

  // URL dışarıdan değişirse inputları senkronla
  useEffect(() => setQ(filters.q), [filters.q]);
  useEffect(() => setMinP(filters.minPrice), [filters.minPrice]);
  useEffect(() => setMaxP(filters.maxPrice), [filters.maxPrice]);

  // Yazarken 400ms sonra URL’i güncelle (debounce)
  useDebouncedEffect(() => update({ q }), [q]);
  useDebouncedEffect(() => update({ minPrice: minP }), [minP]);
  useDebouncedEffect(() => update({ maxPrice: maxP }), [maxP]);

  return (
    <div className="filter">
      <label>Etkinlik ara</label>
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Konser, tiyatro..." />

      <label>Şehir</label>
      <select value={filters.city} onChange={(e)=>update({ city: e.target.value })}>
        <option value="">Hepsi</option>
        <option value="istanbul">İstanbul</option>
        <option value="ankara">Ankara</option>
        <option value="izmir">İzmir</option>
      </select>

      <div className="grid-2">
        <div>
          <label>Min TL</label>
          <input type="number" value={minP} onChange={(e)=>setMinP(e.target.value)} />
        </div>
        <div>
          <label>Max TL</label>
          <input type="number" value={maxP} onChange={(e)=>setMaxP(e.target.value)} />
        </div>
      </div>

      <button type="button" className="reset" onClick={reset}>Filtreleri sıfırla</button>
    </div>
  );
}
