import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { company } from "../../data/company";
import { siteName } from "../../data/site";
import { hoursLabel } from "../../lib/contact";
import { whatsappNumber } from "../../lib/env";
import { track } from "../../lib/analytics";
import Icon from "../shared/Icon";
import SmartLink from "../shared/SmartLink";

const quickReplies = [
  ["Cocina", "Hola, quiero cotizar una cocina a medida."],
  ["Closet", "Hola, quiero cotizar un closet o vestidor a medida."],
  ["Baño", "Hola, quiero cotizar un mueble de baño a medida."],
  ["Home office", "Hola, quiero cotizar un home office a medida."],
  ["Otro mueble", "Hola, quiero consultar por un mueble personalizado."],
];

/**
 * Chat flotante de WhatsApp: tarjeta con saludo, respuestas rápidas y mensaje editable.
 * Con número configurado abre el chat real (wa.me); sin número, deriva al formulario de cotización.
 */
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState(false);
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const live = Boolean(whatsappNumber);

  useEffect(() => {
    const timer = window.setTimeout(() => setHint(true), 9000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    setHint(false);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function start(event: FormEvent) {
    event.preventDefault();
    const text = message.trim() || "Hola, quiero consultar por un mueble a medida.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    track("whatsapp_click", { origen: "chat_flotante" });
    setOpen(false);
  }

  const motionProps = reduce
    ? {}
    : { initial: { opacity: 0, y: 16, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.97 }, transition: { duration: 0.22 } };

  return (
    <div className="wa-widget">
      <AnimatePresence>
        {open && (
          <motion.section className="wa-card" role="dialog" aria-label="Chat de WhatsApp" {...motionProps}>
            <header className="wa-head">
              <span className="wa-avatar" aria-hidden="true"><i /></span>
              <div><strong>{siteName}</strong><small>{live ? "Atención por WhatsApp" : "Escríbenos"} · {hoursLabel}</small></div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar chat"><Icon name="close" size={18} /></button>
            </header>
            <div className="wa-body">
              <p className="wa-bubble">{company.chatGreeting}</p>
              <div className="wa-chips" role="group" aria-label="Respuestas rápidas">
                {quickReplies.map(([label, text]) => (
                  <button key={label} type="button" onClick={() => { setMessage(text); areaRef.current?.focus(); }}>{label}</button>
                ))}
              </div>
              {live ? (
                <form onSubmit={start}>
                  <textarea ref={areaRef} value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Escribe tu mensaje..." aria-label="Tu mensaje" />
                  <button className="wa-send" type="submit"><Icon name="whatsapp" size={18} /> Iniciar chat en WhatsApp</button>
                </form>
              ) : (
                <SmartLink className="wa-send" href="/cotizacion" onClick={() => setOpen(false)}><Icon name="arrow" size={18} /> Solicitar cotización</SmartLink>
              )}
              <small className="wa-note">Se abrirá WhatsApp con tu mensaje. Sin compromiso.</small>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <button className="floating-whatsapp wa-fab" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}>
        <Icon name={open ? "close" : "whatsapp"} size={24} /><span>¿Hablamos?</span>
        {hint && !open && <b className="wa-dot" aria-hidden="true">1</b>}
      </button>
    </div>
  );
}
