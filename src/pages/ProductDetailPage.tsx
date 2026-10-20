import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ConversionBand from "../components/layout/ConversionBand";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Button from "../components/shared/Button";
import Icon from "../components/shared/Icon";
import SectionHeading from "../components/shared/SectionHeading";
import SmartLink from "../components/shared/SmartLink";
import { catalogItems } from "../data/catalog";
import { siteName } from "../data/site";
import { siteUrl } from "../lib/env";
import NotFoundPage from "./NotFoundPage";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const item = catalogItems.find((product) => product.slug === slug);
  const [activeImage, setActiveImage] = useState(item?.image ?? "");
  useEffect(() => { if (item) setActiveImage(item.image); }, [item]);

  // Un slug inexistente muestra el 404 en lugar de repetir la primera categoría.
  if (!item) return <NotFoundPage />;

  const structuredData = [{
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${item.title} a medida`,
    description: item.copy,
    image: item.image,
    provider: { "@type": "Organization", name: siteName, url: siteUrl },
  }];

  return (
    <PageShell>
      <Seo
        title={item.title}
        description={`${item.copy} Descubre opciones para configurar un proyecto de ${item.title.toLowerCase()} a medida.`}
        image={item.image}
        breadcrumbs={[["Catálogo", "/catalogo"], [item.title, `/catalogo/${item.slug}`]]}
        jsonLd={structuredData}
      />
      <section className="product-detail section"><div className="container">
        <Breadcrumbs items={["Catálogo", item.title]} />
        <div className="product-detail-grid">
          <div className="product-gallery"><img className="product-main-image" src={activeImage} alt={`Imagen principal de referencia para ${item.title}`} fetchPriority="high" /><div>{item.gallery.map((image, i) => <button key={image} className={activeImage === image ? "thumb-active" : ""} onClick={() => setActiveImage(image)} aria-label={`Ver imagen ${i + 1}`}><img src={image} alt="" loading="lazy" decoding="async" /></button>)}</div></div>
          <div className="product-copy"><span className="eyebrow">Mobiliario a medida</span><h1>{item.title}</h1><p>{item.copy} La configuración final se define según el espacio y las necesidades de cada proyecto.</p><div className="feature-box"><h2>Qué podemos configurar</h2><ul>{item.types.map((type) => <li key={type}>{type}</li>)}</ul></div><Button href="/cotizacion" variant="primary" icon="arrow">Solicitar cotización</Button><SmartLink className="text-link product-contact" href="/contacto">Hacer una consulta <Icon name="whatsapp" size={17} /></SmartLink></div>
        </div>
      </div></section>
      <section className="section configure-section"><div className="container"><SectionHeading eyebrow="Diseñado para ti" title="Las decisiones que hacen único cada mueble" copy="La combinación final se prepara de acuerdo con el uso, el ambiente y el alcance aprobado." /><div className="configure-grid">{[["01", "Distribución", "Definimos módulos, proporciones y zonas de uso."], ["02", "Materialidad", "Seleccionamos superficies, tonos y texturas compatibles."], ["03", "Equipamiento", "Evaluamos herrajes, accesorios y soluciones interiores."], ["04", "Detalles", "Resolvemos tiradores, encuentros e integración con el espacio."]].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="catalog-related section"><div className="container"><SectionHeading eyebrow="Sigue explorando" title="Otras categorías" /><div className="related-grid">{catalogItems.filter((product) => product.slug !== item.slug).slice(0, 3).map((product) => <Link to={`/catalogo/${product.slug}`} key={product.slug}><img src={product.image} alt={product.title} loading="lazy" decoding="async" /><span>{product.title}<Icon name="arrow" /></span></Link>)}</div></div></section>
      <ConversionBand />
    </PageShell>
  );
}
