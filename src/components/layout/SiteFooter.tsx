import { Link } from "react-router";
import {
  emailHref,
  emailLabel,
  facebookHref,
  instagramHref,
  phoneHref,
  phoneLabel,
  whatsappLabel,
} from "../../lib/contact";
import { whatsappHref } from "../../lib/leads";
import Brand from "../shared/Brand";
import Icon from "../shared/Icon";
import SmartLink from "../shared/SmartLink";

type FooterVariant = "landing" | "inner";

const footerLinks = (variant: FooterVariant, href: string, label: string) =>
  variant === "landing" && href.startsWith("#") ? (
    <a href={href} key={label}>{label}</a>
  ) : (
    <SmartLink href={href} key={label}>{label}</SmartLink>
  );

export default function SiteFooter({ variant = "inner" }: { variant?: FooterVariant }) {
  const navigation = variant === "landing"
    ? [["Inicio", "#inicio"], ["Nosotros", "#nosotros"], ["Servicios", "#servicios"], ["Proyectos", "#proyectos"]]
    : [["Inicio", "/"], ["Nosotros", "/nosotros"], ["Servicios", "/servicios"], ["Taller", "/taller"], ["Proyectos", "/proyectos"], ["Catálogo", "/catalogo"], ["Guías", "/guias"]];
  const services = variant === "landing"
    ? [["Cocinas", "#servicios"], ["Closets", "#servicios"], ["Muebles de baño", "#servicios"], ["Mobiliario", "#servicios"]]
    : [["Cocinas", "/servicios"], ["Closets", "/servicios"], ["Muebles de baño", "/servicios"], ["Mobiliario", "/servicios"]];

  return (
    <footer className={`footer ${variant === "landing" ? "footer-landing" : ""}`}>
      <div className="container footer-main">
        <div className="footer-brand-column">
          <Brand tone="dark" />
          <p className="footer-brand-copy">Diseño, fabricación e instalación de muebles a medida.</p>
          <SmartLink className="footer-quote-button" href={variant === "landing" ? "#contacto" : "/cotizacion"}>
            Solicitar cotización <Icon name="arrow" size={17} />
          </SmartLink>
          <span className="footer-social-label">Síguenos</span>
          <div className="footer-socials">
            <SmartLink href={instagramHref} aria-label="Instagram"><Icon name="instagram" size={19} /></SmartLink>
            <SmartLink href={facebookHref} aria-label="Facebook"><Icon name="facebook" size={19} /></SmartLink>
          </div>
        </div>

        <nav className="footer-column" aria-label="Navegación del pie de página">
          <h3>Navegación</h3>
          {navigation.map(([label, href]) => footerLinks(variant, href, label))}
        </nav>

        <nav className="footer-column" aria-label="Servicios del pie de página">
          <h3>Servicios</h3>
          {services.map(([label, href]) => footerLinks(variant, href, label))}
          {variant === "inner" && <SmartLink href="/cotizacion">Solicitar cotización</SmartLink>}
        </nav>

        <div className="footer-column footer-contact-column">
          <h3>Hablemos de tu proyecto</h3>
          <SmartLink className="footer-contact-link" href={whatsappHref()}>
            <span className="footer-contact-icon footer-contact-icon--whatsapp"><Icon name="whatsapp" size={19} /></span>
            <span><small>WhatsApp</small><strong>{whatsappLabel}</strong></span>
          </SmartLink>
          <SmartLink className="footer-contact-link" href={phoneHref}>
            <span className="footer-contact-icon footer-contact-icon--phone"><Icon name="phone" size={18} /></span>
            <span><small>Teléfono</small><strong>{phoneLabel}</strong></span>
          </SmartLink>
          <SmartLink className="footer-contact-link" href={emailHref}>
            <span className="footer-contact-icon footer-contact-icon--gmail"><Icon name="gmail" size={20} /></span>
            <span><small>Correo electrónico</small><strong>{emailLabel}</strong></span>
          </SmartLink>
          <SmartLink className="footer-contact-link" href={variant === "landing" ? "#contacto" : "/contacto#mapa"}>
            <span className="footer-contact-icon footer-contact-icon--location"><Icon name="map" size={18} /></span>
            <span><small>Ubicación</small><strong>Ver cobertura y mapa</strong></span>
          </SmartLink>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MOZA Diseños. Todos los derechos reservados.</span>
        <nav aria-label="Enlaces legales"><Link to="/politica-de-privacidad">Privacidad</Link><span aria-hidden="true">·</span><Link to="/politica-de-cookies">Cookies</Link></nav>
      </div>
    </footer>
  );
}
