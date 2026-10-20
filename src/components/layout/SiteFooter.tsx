import { Link } from "react-router";
import { siteName } from "../../data/site";
import Brand from "../shared/Brand";
import { emailHref, facebookHref, instagramHref } from "../../lib/contact";
import { whatsappHref } from "../../lib/leads";
import Icon from "../shared/Icon";
import SmartLink from "../shared/SmartLink";

/** Pie de página. variant "landing" conserva los enlaces ancla del diseño original. */
export default function SiteFooter({ variant = "inner" }: { variant?: "landing" | "inner" }) {
  const bottom = (
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {siteName}. Todos los derechos reservados.</span><span><Link to="/politica-de-privacidad">Privacidad</Link> · <Link to="/politica-de-cookies">Cookies</Link></span></div>
  );

  if (variant === "landing") {
    return (
      <footer className="footer">
        <div className="container footer-main">
          <div><Brand /><p>Mobiliario a medida para espacios residenciales y comerciales.</p></div>
          <div><h3>Navegación</h3><a href="#inicio">Inicio</a><a href="#nosotros">Nosotros</a><a href="#servicios">Servicios</a><a href="#proyectos">Proyectos</a></div>
          <div><h3>Servicios</h3><a href="#servicios">Cocinas</a><a href="#servicios">Closets</a><a href="#servicios">Muebles de baño</a><a href="#servicios">Mobiliario</a></div>
          <div><h3>Contacto</h3><a href="#contacto">WhatsApp</a><a href="#contacto">Correo electrónico</a><a href="#contacto">Ubicación</a></div>
        </div>
        {bottom}
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div><Brand /><p>Mobiliario a medida para espacios residenciales y comerciales.</p></div>
        <div><h3>Navegación</h3><SmartLink href="/nosotros">Nosotros</SmartLink><SmartLink href="/servicios">Servicios</SmartLink><SmartLink href="/taller">Taller</SmartLink><SmartLink href="/proyectos">Proyectos</SmartLink><SmartLink href="/catalogo">Catálogo</SmartLink><SmartLink href="/guias">Guías</SmartLink></div>
        <div><h3>Ayuda</h3><SmartLink href="/cotizacion">Solicitar cotización</SmartLink><SmartLink href="/contacto">Contacto</SmartLink><SmartLink href="/#proceso">Proceso</SmartLink><SmartLink href="/#faq">Preguntas frecuentes</SmartLink></div>
        <div><h3>Contacto</h3><SmartLink href={whatsappHref()}>WhatsApp</SmartLink><SmartLink href={emailHref}>Correo electrónico</SmartLink><SmartLink href="/contacto#mapa">Ubicación</SmartLink><div className="footer-socials"><SmartLink href={instagramHref} aria-label="Instagram"><Icon name="instagram" /></SmartLink><SmartLink href={facebookHref} aria-label="Facebook"><Icon name="facebook" /></SmartLink></div></div>
      </div>
      {bottom}
    </footer>
  );
}
