import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/** URL'deki ?q=&city=&... gibi filtre paramlarını okur/yazar. */
export default function useFilters() {
  const [params, setParams] = useSearchParams();

  // URL → oku
  const filters = useMemo(() => ({
    q:        params.get("q") || "",
    city:     params.get("city") || "",
    category: params.get("category") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
  }), [params]);

  // URL → yaz
  const update = (patch, { replace = true } = {}) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v === "" || v == null) next.delete(k);
      else next.set(k, String(v));
    }
    setParams(next, { replace }); // geçmişi şişirmemek için
  };

  const reset = () => setParams(new URLSearchParams(), { replace: true });

  return { filters, update, reset };
}
