import ConversionBand from "../components/layout/ConversionBand";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Reveal from "../components/effects/Reveal";
import StatsStrip from "../components/effects/StatsStrip";
import SectionHeading from "../components/shared/SectionHeading";
import { images } from "../data/images";
import { team } from "../data/team";

export default function AboutPage() {
  return (
    <PageShell>
      <Seo title="Nosotros" description="Conoce nuestro enfoque de diseño, fabricación e instalación de muebles a medida para espacios residenciales y comerciales." breadcrumbs={[["Nosotros", "/nosotros"]]} />
      <PageHero eyebrow="Nosotros" title="Diseño funcional, fabricación cuidadosa." copy="Creamos mobiliario a medida a partir de cada espacio, necesidad y forma de vivir." image={images.detail} imageAlt="Detalle de mobiliario a medida en madera" />
      <section className="section"><Reveal className="container editorial-grid">
        <div><span className="eyebrow">Nuestra manera de trabajar</span><h2>Cada proyecto comienza con una buena conversación.</h2></div>
        <div><p>Escuchamos, medimos y diseñamos soluciones que buscan integrar el mobiliario naturalmente en cada ambiente. La información institucional de la empresa puede incorporarse aquí sin alterar la estructura visual.</p><p>Este espacio está preparado para comunicar trayectoria, enfoque, equipo y capacidades reales cuando esa información esté disponible.</p></div>
      </Reveal></section>
      <StatsStrip dark />
      <section className="section principles"><Reveal className="container">
        <SectionHeading eyebrow="Principios" title="Lo que guía cada decisión" />
        <div className="principle-grid">{[
          ["01", "Escucha", "Entender el uso real del espacio antes de proponer."],
          ["02", "Claridad", "Comunicar alcance, decisiones y próximos pasos."],
          ["03", "Coherencia", "Equilibrar estética, función y contexto."],
          ["04", "Acompañamiento", "Mantener una atención cercana durante el proceso."],
        ].map(([n, t, c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div>
      </Reveal></section>
      <section className="section about-capabilities"><Reveal className="container editorial-grid">
        <div className="about-image-stack about-showroom-gallery"><img src={images.aboutScene} alt="Visualización panorámica de un espacio de exhibición de mobiliario con iluminación cálida y el nombre MOZA DISEÑOS integrado en el muro" loading="lazy" decoding="async" /><img src={images.aboutSceneDetail} alt="Vista cercana de un muro oscuro con elementos tridimensionales y el nombre MOZA DISEÑOS en un ambiente conceptual" loading="lazy" decoding="async" /></div>
        <div><span className="eyebrow">Capacidad integral</span><h2>Un mismo criterio, de la primera idea al montaje.</h2><p>La propuesta reúne las decisiones de distribución, apariencia y uso para que el resultado se sienta coherente con el ambiente.</p><div className="capability-list">{["Levantamiento y comprensión del espacio", "Propuesta de distribución y acabados", "Fabricación conforme al diseño aprobado", "Coordinación de entrega e instalación"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div></div>
      </Reveal></section>
      <section className="section team"><Reveal className="container">
        <SectionHeading eyebrow="Las personas detrás" title="Un equipo comprometido con tu proyecto" copy="Diseño, taller y atención trabajando juntos desde la primera consulta hasta la instalación." />
        <div className="team-grid">{team.map((member, index) => <article className="team-card" key={index}>
          <div className="team-photo">{member.photo ? <img src={member.photo} alt={`Retrato de ${member.name}`} loading="lazy" decoding="async" /> : <span aria-hidden="true">{member.name.charAt(0)}</span>}</div>
          <small>{member.role}</small><h3>{member.name}</h3><p>{member.bio}</p>
        </article>)}</div>
      </Reveal></section>
      <ConversionBand />
    </PageShell>
  );
}
