import { useParams } from "react-router";
import ConversionBand from "../components/layout/ConversionBand";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Button from "../components/shared/Button";
import Icon from "../components/shared/Icon";
import ShareBar from "../components/shared/ShareBar";
import SmartLink from "../components/shared/SmartLink";
import { guides } from "../data/guides";
import { siteName } from "../data/site";
import { siteUrl } from "../lib/env";
import NotFoundPage from "./NotFoundPage";

export default function GuideDetailPage() {
  const { slug } = useParams();
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return <NotFoundPage />;

  const others = guides.filter((item) => item.slug !== guide.slug).slice(0, 2);
  const structuredData = [{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    image: guide.image,
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: "es",
    mainEntityOfPage: `${siteUrl}/guias/${guide.slug}`,
    author: { "@type": "Organization", name: siteName },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
  }];

  return (
    <PageShell>
      <Seo title={guide.title} description={guide.summary} image={guide.image} breadcrumbs={[["Guías", "/guias"], [guide.title, `/guias/${guide.slug}`]]} jsonLd={structuredData} />
      <section className="detail-hero"><img src={guide.image} alt="" fetchPriority="high" /><div className="detail-overlay" /><div className="container detail-heading"><Breadcrumbs items={["Guías", guide.category]} /><span className="eyebrow">{guide.readMinutes} min de lectura</span><h1>{guide.title}</h1></div></section>
      <article className="section article"><div className="container article-body">
        <p className="article-lead">{guide.summary}</p>
        {guide.body.map((block, index) => (
          <div key={index}>
            {block.h && <h2>{block.h}</h2>}
            {block.p && <p>{block.p}</p>}
            {block.list && <ul>{block.list.map((item) => <li key={item}>{item}</li>)}</ul>}
          </div>
        ))}
        <div className="article-cta">
          <h2>¿Listo para empezar tu proyecto?</h2>
          <p>Cuéntanos tu idea y medidas aproximadas. Te orientamos sin compromiso.</p>
          <Button href="/cotizacion" variant="primary" icon="arrow">Solicitar cotización</Button>
        </div>
        <div className="article-share"><span>Compartir esta guía</span><ShareBar title={guide.title} /></div>
      </div></article>
      <section className="section related-guides"><div className="container">
        <h2 className="related-title">Sigue leyendo</h2>
        <div className="guide-grid">{others.map((item) => (
          <SmartLink href={`/guias/${item.slug}`} className="guide-card" key={item.slug}>
            <div><img src={item.image} alt={item.title} loading="lazy" decoding="async" /></div>
            <span>{item.category} · {item.readMinutes} min de lectura</span><h2>{item.title}</h2><p>{item.summary}</p><em>Leer guía <Icon name="arrow" size={16} /></em>
          </SmartLink>
        ))}</div>
      </div></section>
      <ConversionBand />
    </PageShell>
  );
}
