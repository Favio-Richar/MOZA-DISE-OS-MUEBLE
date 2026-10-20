import { useState } from "react";
import ConversionBand from "../components/layout/ConversionBand";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Icon from "../components/shared/Icon";
import SmartLink from "../components/shared/SmartLink";
import { images } from "../data/images";
import { projectFilters, projectList } from "../data/projects";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("Todos");
  const visible = filter === "Todos" ? projectList : projectList.filter((project) => project.category === filter);
  return (
    <PageShell>
      <Seo title="Proyectos de referencia" description="Explora cocinas, closets, baños, home office y mobiliario personalizado como inspiración para tu proyecto a medida." breadcrumbs={[["Proyectos", "/proyectos"]]} />
      <PageHero eyebrow="Proyectos" title="Ideas convertidas en espacios." copy="Galería preparada para documentar proyectos reales, categorías y decisiones de diseño." image={images.kitchenAlt} imageAlt="Cocina cálida de líneas contemporáneas" />
      <section className="section"><div className="container">
        <div className="filter-bar" role="group" aria-label="Filtrar proyectos">
          {projectFilters.map((item) => <button key={item} className={filter === item ? "filter-active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="project-list-grid">{visible.map((project) => <SmartLink href={`/proyectos/${project.slug}`} className="project-tile" key={project.slug}>
          <div><img src={project.image} alt={`Imagen de referencia para ${project.title}`} loading="lazy" decoding="async" /><span className="project-action">Ver proyecto <Icon name="arrow" size={17} /></span></div>
          <span>{project.category}</span><h2>{project.title}</h2><p>{project.intro}</p>
        </SmartLink>)}</div>
      </div></section>
      <ConversionBand />
    </PageShell>
  );
}
