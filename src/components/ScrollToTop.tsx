import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restaura o scroll ao topo a cada mudança de rota.
 * Se houver hash (#ancora), rola até o elemento correspondente.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
