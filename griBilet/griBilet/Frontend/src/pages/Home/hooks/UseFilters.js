import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";



export default function useFilters() {
  const [params, setParams] = useSearchParams(); // linkteki paramları tuttuk

  const filters = useMemo(() => ({
    q: params.get("q") || "",
    city: params.get("city") || "",
    category: params.get("category") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || ""
  }), [params])


  const update = (patch, { replace = true } = {}) => {
    const nextParams = new URLSearchParams(params); //kopya üzerinde çalış

    for (const [key, value] of Object.entries(patch)) {
      if (value == null || value == "") {
        nextParams.delete(key); //update fonkuna girilen ikililer şeklindeki parametrelerden valuesu null ya da boş olanlar urlden silinir
      } else {
        nextParams.set(key, String(value)); // parametere olarak girilen ikililerden valueları null olmayanlar urlde değişir ya da yoksa eklenir
      }

      setParams(nextParams, { replace }); // yeni urleyi ata

    }

  }

  const reset = () => setParams(new URLSearchParams(), { replace: true });

  return { filters, update, reset };
  // filter obje içinde bilgiler bulunur update ve reset function

}