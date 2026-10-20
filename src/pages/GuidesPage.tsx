import ConversionBand from "../components/layout/ConversionBand";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Icon from "../components/shared/Icon";
import SmartLink from "../components/shared/SmartLink";
import { guides } from "../data/guides";
import { images } from "../data/images";

export default function GuidesPage() {
  return (
    <PageShell>
      <Seo title="Guías y consejos para muebles a medida" description="Guías prácticas para medir tu espacio, elegir materiales y planificar cocinas, closets y muebles a medida con criterio." breadcrumbs={[["Guías", "/guias"]]} />
      <PageHero eyebrow="Guías" title="Consejos para decidir mejor." copy="Información práctica para planificar tu proyecto de muebles a medida con confianza." image={images.office} imageAlt="Espacio de trabajo con mobiliario a medida" />
      <section className="section"><div className="container guide-grid">
        {guides.map((guide) => (
          <SmartLink href={`/guias/${guide.slug}`} className="guide-card" key={guide.slug}>
            <div><img src={guide.image} alt={guide.title} loading="lazy" decoding="async" /></div>
            <span>{guide.category} · {guide.readMinutes} min de lectura</span>
            <h2>{guide.title}</h2>
            <p>{guide.summary}</p>
            <em>Leer guía <Icon name="arrow" size={16} /></em>
          </SmartLink>
        ))}
      </div></section>
      <ConversionBand />
    </PageShell>
  );
}
