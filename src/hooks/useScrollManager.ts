import { useEffect } from "react";
import { useLocation } from "react-router";
import { trackPageView } from "../lib/analytics";

/**
 * Al cambiar de ruta: sube al inicio, o baja hasta el ancla si la URL trae #hash
 * (por ejemplo /#proceso desde otra página).
 */
export default function useScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => { trackPageView(pathname); }, [pathname]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);
}
