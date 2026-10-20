import ConversionBand from "../components/layout/ConversionBand";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Reveal from "../components/effects/Reveal";
import Button from "../components/shared/Button";
import SectionHeading from "../components/shared/SectionHeading";
import { images } from "../data/images";
import { serviceDetails } from "../data/services";
import { siteName } from "../data/site";
import { siteUrl } from "../lib/env";

const structuredData = [{
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Servicios de ${siteName}`,
  itemListElement: serviceDetails.map(([title, copy], index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: { "@type": "Service", name: title, description: copy, provider: { "@type": "Organization", name: siteName, url: siteUrl } },
  })),
}];

export default function ServicesPage() {
  return (
    <PageShell>
      <Seo title="Servicios de muebles a medida" description="Diseño, fabricación e instalación de cocinas, closets, muebles de baño, home office y mobiliario personalizado." breadcrumbs={[["Servicios", "/servicios"]]} jsonLd={structuredData} />
      <PageHero eyebrow="Servicios" title="Mobiliario pensado para tu espacio." copy="Diseño, fabricación e instalación reunidos en un proceso claro y personalizado." image={images.darkKitchen} imageAlt="Cocina contemporánea con mobiliario oscuro a medida" />
      <section className="section"><Reveal className="container service-list">
        {serviceDetails.map(([title, copy, image], index) => <article key={title}>
          <div className="service-list-image"><img src={image} alt={`Referencia de ${title}`} loading="lazy" decoding="async" /></div>
          <div><span className="eyebrow">{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{copy}</p><ul><li>Distribución adaptada al uso del ambiente</li><li>Selección guiada de materiales y acabados</li><li>Alcance e instalación definidos en la cotización</li></ul><Button href="/cotizacion" variant="outline" icon="arrow">Consultar servicio</Button></div>
        </article>)}
      </Reveal></section>
      <section className="section service-method"><Reveal className="container"><SectionHeading eyebrow="Qué puedes esperar" title="Decisiones claras en cada etapa" copy="Antes de fabricar, dejamos definido el alcance visual y funcional de cada solución." /><div className="method-grid">{[["01", "Diagnóstico", "Revisamos el espacio, las prioridades y las referencias que compartas."], ["02", "Propuesta", "Organizamos distribución, funcionalidad, materiales y acabados."], ["03", "Validación", "Confirmamos el alcance y las condiciones antes de producir."], ["04", "Ejecución", "Fabricamos y coordinamos la instalación de acuerdo con lo aprobado."]].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></Reveal></section>
      <ConversionBand />
    </PageShell>
  );
}
