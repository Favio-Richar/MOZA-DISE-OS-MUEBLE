import { ReactNode } from "react";
import useScrollManager from "../../hooks/useScrollManager";
import CookieConsent from "../CookieConsent";
import ScrollProgress from "../effects/ScrollProgress";
import Icon from "../shared/Icon";
import SmartLink from "../shared/SmartLink";
import { facebookHref, instagramHref } from "../../lib/contact";
import FloatingWhatsApp from "./FloatingWhatsApp";
import PromoAlerts from "./PromoAlerts";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/** Estructura común de las páginas internas: cabecera, contenido, pie y elementos flotantes. */
export default function PageShell({ children }: { children: ReactNode }) {
  useScrollManager();
  return (
    <div className="site-shell inner-site">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <ScrollProgress />
      <SiteHeader />
      <main id="contenido">{children}</main>
      <SiteFooter />
      <div className="social-dock" aria-label="Redes sociales">
        <SmartLink href={instagramHref} aria-label="Instagram"><Icon name="instagram" size={17} /></SmartLink>
        <SmartLink href={facebookHref} aria-label="Facebook"><Icon name="facebook" size={17} /></SmartLink>
      </div>
      <PromoAlerts />
      <FloatingWhatsApp />
      <CookieConsent />
    </div>
  );
}
