import { useState } from "react";
import ConversionBand from "../components/layout/ConversionBand";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Icon from "../components/shared/Icon";
import SmartLink from "../components/shared/SmartLink";
import { catalogItems } from "../data/catalog";
import { images } from "../data/images";

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const visible = term ? catalogItems.filter((item) => [item.title, item.copy, ...item.types].some((text) => text.toLowerCase().includes(term))) : catalogItems;
  return (
    <PageShell>
      <Seo title="Catálogo de muebles a medida" description="Explora categorías de cocinas, closets, baños, home office, centros de entretenimiento y mobiliario personalizado." breadcrumbs={[["Catálogo", "/catalogo"]]} />
      <PageHero eyebrow="Catálogo" title="Una categoría. Infinitas posibilidades." copy="Explora tipos de mobiliario y consulta por una solución adaptada a tus medidas." image={images.pantry} imageAlt="Despensa moderna con almacenamiento integrado" />
      <section className="catalog-intro"><div className="container"><span>Todos nuestros muebles se configuran para cada espacio.</span><p>Este catálogo organiza posibilidades; no representa productos estandarizados ni precios cerrados.</p></div></section>
      <section className="section"><div className="container">
        <div className="catalog-search"><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busca por ambiente o tipo: cocina en L, vestidor, escritorio..." aria-label="Buscar en el catálogo" /><span role="status">{visible.length} {visible.length === 1 ? "categoría" : "categorías"}</span></div>
        {visible.length === 0 && <p className="empty-state">No encontramos resultados para “{query}”. Prueba con otra palabra o <SmartLink href="/cotizacion">cuéntanos lo que necesitas</SmartLink>.</p>}
      </div><div className="container catalog-page-grid">
        {visible.map((item) => <SmartLink href={`/catalogo/${item.slug}`} className="catalog-page-card" key={item.slug}><div><img src={item.image} alt={`Referencia de ${item.title}`} loading="lazy" decoding="async" /><span>Explorar <Icon name="arrow" size={16} /></span></div><small>Categoría</small><h2>{item.title}</h2><p>{item.copy}</p></SmartLink>)}
      </div></section>
      <ConversionBand />
    </PageShell>
  );
}
