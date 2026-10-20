import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Promo, promos, promoSettings } from "../../data/promos";
import { track } from "../../lib/analytics";
import Icon from "../shared/Icon";
import SmartLink from "../shared/SmartLink";

const storageKey = "forma-muebles-promo-index";

function readIndex() {
  try { return Number(sessionStorage.getItem(storageKey)) || 0; } catch { return 0; }
}
function writeIndex(value: number) {
  try { sessionStorage.setItem(storageKey, String(value)); } catch { /* modo privado */ }
}

/**
 * Alertas de oferta de lanzamiento: aparece una oferta, se oculta sola y vuelve a
 * aparecer cada `intervalMinutes` con la siguiente oferta de la lista (data/promos.ts).
 * No molesta mientras el aviso de cookies esté visible, y se detiene si el visitante
 * toca la oferta.
 */
export default function PromoAlerts() {
  const [promo, setPromo] = useState<Promo | null>(null);
  const reduce = useReducedMotion();
  const hideTimer = useRef<number | undefined>(undefined);
  const nextTimer = useRef<number | undefined>(undefined);
  const stopped = useRef(false);

  const schedule = useCallback((delayMs: number) => {
    window.clearTimeout(nextTimer.current);
    nextTimer.current = window.setTimeout(show, delayMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function show() {
    if (stopped.current || promos.length === 0) return;
    // Espera si el aviso de cookies o un cuadro de diálogo están abiertos.
    if (document.querySelector(".cookie-center-backdrop, .cookie-banner, .cookie-modal-backdrop, .modal-backdrop, .wa-card")) {
      schedule(6000);
      return;
    }
    const index = readIndex() % promos.length;
    setPromo(promos[index]);
    writeIndex(index + 1);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => close(false), promoSettings.visibleSeconds * 1000);
  }

  function close(permanent: boolean) {
    window.clearTimeout(hideTimer.current);
    setPromo(null);
    if (permanent) stopped.current = true;
    else schedule(promoSettings.intervalMinutes * 60 * 1000);
  }

  useEffect(() => {
    schedule(promoSettings.firstDelaySeconds * 1000);
    return () => {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(nextTimer.current);
    };
  }, [schedule]);

  const motionProps = reduce
    ? {}
    : { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <AnimatePresence>
      {promo && (
        <motion.aside key={promo.id} className="promo-alert" role="status" aria-live="polite" {...motionProps}>
          <button className="promo-close" onClick={() => close(false)} aria-label="Cerrar oferta"><Icon name="close" size={16} /></button>
          <span className="promo-badge">{promo.badge}</span>
          <strong>{promo.title}</strong>
          <p>{promo.text}</p>
          {promo.until && <small>{promo.until}</small>}
          <SmartLink className="button button-primary" href={`/cotizacion?oferta=${promo.id}`} onClick={() => { track("promo_click", { oferta: promo.id }); close(true); }}>
            {promo.cta} <Icon name="arrow" size={16} />
          </SmartLink>
          <div className="promo-timer" style={{ animationDuration: `${promoSettings.visibleSeconds}s` }} aria-hidden="true" />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
