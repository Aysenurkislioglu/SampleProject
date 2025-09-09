import { useEffect, useRef } from "react";

/** deps değişince 'delay' ms bekler, sonra fn'i çalıştırır. */
export default function useDebouncedEffect(fn, deps, delay = 400) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const id = setTimeout(fn, delay);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
