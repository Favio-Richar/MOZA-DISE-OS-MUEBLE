import Breadcrumbs from "./Breadcrumbs";

export default function PageHero({ eyebrow, title, copy, image, imageAlt = "" }: { eyebrow: string; title: string; copy: string; image?: string; imageAlt?: string }) {
  return (
    <section className={`page-hero ${image ? "page-hero-image" : ""}`}>
      {image && <><img src={image} alt={imageAlt} fetchPriority="high" /><div className="page-hero-overlay" /></>}
      <div className="container page-hero-content">
        <Breadcrumbs items={[eyebrow]} />
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {image && <div className="container page-hero-foot"><span>Diseño</span><i /><span>Fabricación</span><i /><span>Instalación</span></div>}
    </section>
  );
}
