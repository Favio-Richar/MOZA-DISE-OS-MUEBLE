import { useEffect, useState } from "react";
import ConversionBand from "../components/layout/ConversionBand";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Honeypot from "../components/shared/Honeypot";
import Icon, { IconName } from "../components/shared/Icon";
import SectionHeading from "../components/shared/SectionHeading";
import SmartLink from "../components/shared/SmartLink";
import { images } from "../data/images";
import { siteName } from "../data/site";
import useLeadForm from "../hooks/useLeadForm";
import { addressLabel, emailHref, emailLabel, formsAreLive, hasRealMap, hoursLabel, mapSrc, phoneHref, phoneLabel, whatsappLabel } from "../lib/contact";
import { siteUrl } from "../lib/env";
import { whatsappHref } from "../lib/leads";

const structuredData = [{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contacto | ${siteName}`,
  url: `${siteUrl}/contacto`,
}];

const consentStorageKey = "forma-muebles-cookie-consent";

export default function ContactPage() {
  const { status, onSubmit, loading } = useLeadForm("contacto");
  const [mapAllowed, setMapAllowed] = useState(false);

  useEffect(() => {
    const readMapPermission = () => {
      try {
        const consent = JSON.parse(localStorage.getItem(consentStorageKey) ?? "null") as { external?: boolean } | null;
        setMapAllowed(Boolean(consent?.external));
      } catch {
        setMapAllowed(false);
      }
    };
    readMapPermission();
    window.addEventListener("cookie-consent-updated", readMapPermission);
    return () => window.removeEventListener("cookie-consent-updated", readMapPermission);
  }, []);

  function openCookiePreferences() {
    window.dispatchEvent(new Event("open-cookie-settings"));
  }
  const channels: [IconName, string, string, string][] = [
    ["whatsapp", "WhatsApp", whatsappLabel, whatsappHref("Hola, quiero hacer una consulta.")],
    ["phone", "Teléfono", phoneLabel, phoneHref],
    ["mail", "Correo", emailLabel, emailHref],
    ["map", "Ubicación", addressLabel, "#mapa"],
    ["clock", "Horario", hoursLabel, "/contacto"],
  ];

  return (
    <PageShell>
      <Seo title="Contacto" description="Contacta a Forma Muebles para conversar sobre cocinas, closets, muebles de baño, home office y mobiliario a medida." breadcrumbs={[["Contacto", "/contacto"]]} jsonLd={structuredData} />
      <PageHero eyebrow="Contacto" title="Estamos para orientarte." copy="Elige el canal que prefieras o completa el formulario para iniciar una conversación." image={images.console} imageAlt="Recibidor contemporáneo con consola de madera" />
      <section className="contact-page section"><div className="container contact-page-grid">
        <div><SectionHeading eyebrow="Canales de atención" title="Hablemos de tu espacio" copy="Reemplaza estos contenidos editables por la información real antes de publicar." /><div className="contact-cards">{channels.map(([icon, title, copy, href]) => <SmartLink href={href} key={title}><Icon name={icon} /><span><small>{title}</small>{copy}</span></SmartLink>)}</div></div>
        <form className="contact-form" onSubmit={onSubmit}><h2>Envía una consulta</h2><label>Nombre completo <b>*</b><input required name="name" placeholder="Escribe tu nombre" autoComplete="name" /></label><label>Correo electrónico <b>*</b><input required type="email" name="email" placeholder="tu@correo.com" autoComplete="email" /></label><label>Mensaje <b>*</b><textarea required name="message" rows={6} placeholder="¿En qué podemos ayudarte?" /></label><Honeypot /><button className="button button-primary" type="submit" disabled={loading}>{loading ? <><span className="spinner" /> Enviando...</> : <>Enviar consulta <Icon name="arrow" size={18} /></>}</button>{status === "success" && <p className="form-success" role="status"><Icon name="check" /> {formsAreLive ? "Consulta enviada. Te responderemos pronto." : "Consulta enviada. Estado de confirmación."}</p>}{status === "error" && <p className="form-error" role="alert">No pudimos enviar tu consulta. Inténtalo nuevamente en unos minutos.</p>}</form>
      </div></section>
      <section className="map-section" id="mapa"><div className="map-frame">
        {mapAllowed ? <iframe title="Mapa de ubicación configurable" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div className="map-consent-placeholder"><span className="eyebrow">Contenido externo</span><h2>El mapa está desactivado</h2><p>Al activarlo, el proveedor del mapa recibirá datos técnicos como tu dirección IP.</p><button className="button button-outline" onClick={openCookiePreferences}>Revisar preferencias</button></div>}
        <div className="map-card"><span className="eyebrow">Visítanos</span><h2>{hasRealMap ? "Nuestra ubicación" : "Ubicación por configurar"}</h2><p>{hasRealMap ? addressLabel : "Reemplaza el mapa y este contenido con la dirección real del showroom, taller u oficina."}</p>{hasRealMap ? <SmartLink className="button button-primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLabel)}`}><Icon name="map" /> Cómo llegar</SmartLink> : <SmartLink className="button button-primary" href="/contacto"><Icon name="map" /> Agregar ubicación real</SmartLink>}</div>
      </div></section>
      <section className="section contact-steps"><div className="container"><SectionHeading eyebrow="Después de contactarnos" title="Un comienzo simple y claro" /><div className="method-grid">{[["01", "Recibimos tu consulta", "Revisamos el tipo de mueble, ubicación y referencias."], ["02", "Aclaramos el alcance", "Te contactamos por el medio que hayas indicado."], ["03", "Definimos el siguiente paso", "Coordinamos la información necesaria para preparar la propuesta."]].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <ConversionBand />
    </PageShell>
  );
}
