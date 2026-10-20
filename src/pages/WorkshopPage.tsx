import { useState } from "react";
import Lightbox from "../components/effects/Lightbox";
import Reveal from "../components/effects/Reveal";
import StatsStrip from "../components/effects/StatsStrip";
import VideoEmbed from "../components/effects/VideoEmbed";
import ConversionBand from "../components/layout/ConversionBand";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import SectionHeading from "../components/shared/SectionHeading";
import { company } from "../data/company";
import { images } from "../data/images";
import { commitments, fabricationSteps, materials, workshopAreas } from "../data/workshop";

export default function WorkshopPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <PageShell>
      <Seo title="Taller y proceso de fabricación" description="Conoce nuestro taller, las áreas de producción y cada etapa de fabricación de muebles a medida: del diseño y corte al acabado e instalación." breadcrumbs={[["Taller", "/taller"]]} />
      <PageHero eyebrow="Taller" title="Donde tu idea se convierte en mueble." copy="Un recorrido por nuestro taller y por cada etapa del proceso: diseño, corte, acabados, armado e instalación." image={images.darkKitchen} imageAlt="Mobiliario a medida en proceso de fabricación" />

      <section className="section"><Reveal className="container editorial-grid">
        <div><span className="eyebrow">Fabricación propia</span><h2>Control de principio a fin.</h2></div>
        <div><p>Fabricar en un taller propio permite cuidar cada detalle: la calidad de los materiales, la precisión de los cortes, la uniformidad de los acabados y el cumplimiento de lo aprobado en el diseño.</p><p>Aquí presentamos nuestro espacio de trabajo y las etapas por las que pasa cada proyecto antes de llegar a tu casa u oficina.</p></div>
      </Reveal></section>

      <StatsStrip dark />

      <section className="section fab-section" id="proceso-fabricacion"><div className="container">
        <Reveal><SectionHeading eyebrow="Proceso de fabricación" title="De los planos al mueble instalado" copy="Siete etapas con controles de calidad para que el resultado sea el que aprobaste." /></Reveal>
        <div className="fab-steps">
          {fabricationSteps.map((step, index) => (
            <article className="fab-step" key={step.title}>
              <div className="fab-step-image"><img src={step.image} alt={`Etapa: ${step.title}`} loading="lazy" decoding="async" /></div>
              <div className="fab-step-copy"><span className="fab-number">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></div>
            </article>
          ))}
        </div>
      </div></section>

      {company.workshopVideoId && (
        <section className="section video-section"><Reveal className="container">
          <SectionHeading eyebrow="En movimiento" title="Mira cómo trabajamos" />
          <VideoEmbed videoId={company.workshopVideoId} title="Recorrido por nuestro taller" poster={images.darkKitchen} />
        </Reveal></section>
      )}

      <section className="section workshop-gallery"><div className="container">
        <Reveal><SectionHeading eyebrow="Nuestras instalaciones" title="Conoce las áreas del taller" copy="Toca una imagen para verla en grande." /></Reveal>
        <div className="area-grid">
          {workshopAreas.map((area, index) => (
            <figure className="area-card zoomable" key={area.title} role="button" tabIndex={0} aria-label={`Ampliar: ${area.title}`} onClick={() => setLightbox(index)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightbox(index)}>
              <img src={area.image} alt={area.title} loading="lazy" decoding="async" />
              <figcaption><strong>{area.title}</strong><span>{area.text}</span></figcaption>
            </figure>
          ))}
        </div>
      </div></section>

      <section className="section service-method"><Reveal className="container">
        <SectionHeading eyebrow="Materiales y acabados" title="Opciones para cada proyecto" copy="Te orientamos en la elección según el uso, el ambiente y el presupuesto." />
        <div className="material-grid">{materials.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </Reveal></section>

      <section className="section principles"><Reveal className="container">
        <SectionHeading eyebrow="Nuestro compromiso" title="Calidad que se ve y se siente" />
        <div className="principle-grid">{commitments.map(([n, t, c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div>
      </Reveal></section>

      <Lightbox images={workshopAreas.map((area) => ({ src: area.image, alt: area.title }))} index={lightbox} onChange={setLightbox} />
      <ConversionBand />
    </PageShell>
  );
}
