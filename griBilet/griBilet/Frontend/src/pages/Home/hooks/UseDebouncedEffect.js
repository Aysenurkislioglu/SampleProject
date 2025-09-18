import { useEffect, useRef } from "react";

// fn function , deps dependencies
export default function useDebouncedEffect(fn, deps, delay = 400) {
  const first = useRef(true);

  useEffect(() => {
    if (first.current == true) {
      first.current = false;
      return;
    }
    const id = setTimeout(fn, delay);
    return () => clearTimeout(id);
  }, deps);
}
