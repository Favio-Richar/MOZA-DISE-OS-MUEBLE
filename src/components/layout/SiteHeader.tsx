import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { catalogItems } from "../../data/catalog";
import { navItems } from "../../data/site";
import { hoursLabel, phoneHref, phoneLabel } from "../../lib/contact";
import { whatsappHref } from "../../lib/leads";
import Brand from "../shared/Brand";
import Button from "../shared/Button";
import Icon from "../shared/Icon";
import SmartLink from "../shared/SmartLink";

/**
 * Cabecera del sitio.
 * - variant "landing": "Inicio" ancla a #inicio y el botón dice "WhatsApp" (como en el diseño original).
 * - variant "inner": páginas internas, con enlace activo y botón "Cotizar proyecto".
 */
export default function SiteHeader({ variant = "inner" }: { variant?: "landing" | "inner" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const landing = variant === "landing";
  // Con número de WhatsApp configurado abre el chat; si no, lleva al formulario de cotización.
  const waLink = whatsappHref("Hola, quiero cotizar un mueble a medida.");
  const quoteHref = waLink.startsWith("http") ? waLink : "/cotizacion";
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta.
  useEffect(() => setOpen(false), [pathname]);

  // Menú móvil abierto: Escape lo cierra y el fondo no se desplaza.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`header ${landing ? "" : "inner-header"} ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container nav-wrap">
        <Brand />
        <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Navegación principal">
          {navItems.map(([label, to], i) => {
            const link =
              landing && to === "/" ? (
                <a href="#inicio" onClick={close}>{label}</a>
              ) : (
                <NavLink to={to} end={to === "/"} className={({ isActive }) => (isActive && !landing ? "nav-active" : "")} onClick={close}>{label}</NavLink>
              );
            if (to !== "/catalogo") return <span key={to} className="nav-item" style={{ ["--i" as string]: i }}>{link}</span>;
            return (
              <span key={to} className="nav-item nav-has-sub" style={{ ["--i" as string]: i }}>
                {link}
                <span className="nav-sub" role="group" aria-label="Categorías del catálogo">
                  {catalogItems.map((item) => (
                    <SmartLink key={item.slug} href={`/catalogo/${item.slug}`} onClick={close}>{item.title}</SmartLink>
                  ))}
                  <SmartLink href="/catalogo" className="nav-sub-all" onClick={close}>Ver todo el catálogo <Icon name="arrow" size={14} /></SmartLink>
                </span>
              </span>
            );
          })}
          <div className="nav-extra">
            <Button href={quoteHref} variant="primary" icon="whatsapp">Cotizar proyecto</Button>
            <SmartLink href={phoneHref} className="nav-extra-line" onClick={close}><Icon name="phone" size={16} />{phoneLabel}</SmartLink>
            <span className="nav-extra-line"><Icon name="clock" size={16} />{hoursLabel}</span>
          </div>
        </nav>
        <div className="header-actions">
          <Button href={quoteHref} variant="outline" icon="whatsapp">
            {landing ? "WhatsApp" : "Cotizar proyecto"}
          </Button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <button type="button" className={`nav-scrim ${open ? "nav-scrim-on" : ""}`} aria-hidden="true" tabIndex={-1} onClick={close} />
    </header>
  );
}
