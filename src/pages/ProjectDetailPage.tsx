import { useState } from "react";
import { Link, useParams } from "react-router";
import Lightbox from "../components/effects/Lightbox";
import ShareBar from "../components/shared/ShareBar";
import SectionHeading from "../components/shared/SectionHeading";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Icon from "../components/shared/Icon";
import SmartLink from "../components/shared/SmartLink";
import { projectList } from "../data/projects";
import NotFoundPage from "./NotFoundPage";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const project = projectList.find((item) => item.slug === slug);
  // Un slug inexistente muestra el 404 en lugar de repetir el primer proyecto.
  if (!project) return <NotFoundPage />;

  const related = projectList.filter((item) => item.slug !== project.slug && item.category === project.category).slice(0, 3);
  const currentIndex = projectList.findIndex((item) => item.slug === project.slug);
  const nextProject = projectList[(currentIndex + 1) % projectList.length];
  return (
    <PageShell>
      <Seo
        title={project.title}
        description={`${project.intro} Proyecto de referencia de ${project.category.toLowerCase()} a medida.`}
        image={project.image}
        breadcrumbs={[["Proyectos", "/proyectos"], [project.title, `/proyectos/${project.slug}`]]}
      />
      <section className="detail-hero"><img src={project.image} alt={`Fotografía principal de ${project.title}`} fetchPriority="high" /><div className="detail-overlay" /><div className="container detail-heading"><Breadcrumbs items={["Proyectos", project.title]} /><span className="eyebrow">{project.category}</span><h1>{project.title}</h1></div></section>
      <section className="section detail-intro"><div className="container detail-intro-grid">
        <div><span className="eyebrow">Visión del proyecto</span><h2>Función y estética en una misma solución.</h2></div>
        <div><p>{project.intro}</p><p className="content-note">Las imágenes y datos de esta ficha son referencias editables. Sustitúyelos por documentación real antes de publicar el proyecto.</p><dl><div><dt>Ubicación</dt><dd>Dato por completar</dd></div><div><dt>Tipo de proyecto</dt><dd>{project.category}</dd></div><div><dt>Materiales</dt><dd>Selección por documentar</dd></div><div><dt>Alcance</dt><dd>Detalle por completar</dd></div></dl></div>
      </div></section>
      <section className="detail-gallery container">
        {project.gallery.map((image, i) => <figure key={`${image}-${i}`} className="zoomable" role="button" tabIndex={0} aria-label={`Ampliar imagen ${i + 1}`} onClick={() => setLightbox(i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightbox(i)}><img src={image} alt={`Detalle de referencia de ${project.title}, imagen ${i + 1}`} loading="lazy" decoding="async" /></figure>)}
      </section>
      <section className="section project-story"><div className="container story-grid">
        <div><span className="eyebrow">El punto de partida</span><h2>El reto</h2><p>{project.focus}</p></div>
        <div><span className="eyebrow">Criterio de diseño</span><h2>La solución</h2><p>La propuesta organiza cada función en módulos proporcionados, define una paleta material coherente y cuida los encuentros para lograr una integración visual precisa.</p></div>
        <aside><span className="eyebrow">Aspectos a documentar</span><ul><li>Necesidad inicial del cliente</li><li>Distribución y capacidad</li><li>Materiales y herrajes elegidos</li><li>Resultado final instalado</li></ul></aside>
      </div></section>
      <section className="project-share"><div className="container"><span>Comparte esta inspiración</span><ShareBar title={project.title} /></div></section>
      {related.length > 0 && <section className="section related-projects"><div className="container"><SectionHeading eyebrow="Más inspiración" title={`Otros proyectos de ${project.category.toLowerCase()}`} /><div className="project-list-grid" style={{ marginTop: 48 }}>{related.map((item) => <SmartLink href={`/proyectos/${item.slug}`} className="project-tile" key={item.slug}><div><img src={item.image} alt={`Imagen de referencia para ${item.title}`} loading="lazy" decoding="async" /><span className="project-action">Ver proyecto <Icon name="arrow" size={17} /></span></div><span>{item.category}</span><h2>{item.title}</h2><p>{item.intro}</p></SmartLink>)}</div></div></section>}
      <Lightbox images={project.gallery.map((src, i) => ({ src, alt: `Detalle de referencia de ${project.title}, imagen ${i + 1}` }))} index={lightbox} onChange={setLightbox} />
      <section className="next-project"><Link to={`/proyectos/${nextProject.slug}`}><img src={nextProject.image} alt="" loading="lazy" decoding="async" /><span className="detail-overlay" /><div className="container"><span className="eyebrow">Siguiente proyecto</span><h2>{nextProject.title}</h2><span className="next-link">Explorar proyecto <Icon name="arrow" /></span></div></Link></section>
    </PageShell>
  );
}
