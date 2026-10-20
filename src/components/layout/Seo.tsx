import { useEffect } from "react";
import { useLocation } from "react-router";
import { ogImage } from "../../data/images";
import { breadcrumbJsonLd, JsonLd } from "../../data/jsonld";
import { siteLocale, siteName } from "../../data/site";
import { siteUrl } from "../../lib/env";

type SeoProps = {
  title: string;
  description: string;
  /** Usa `title` tal cual, sin agregar " | MOZA Diseños". */
  rawTitle?: boolean;
  image?: string;
  /** Páginas que no deben aparecer en buscadores (404, confirmaciones). */
  noindex?: boolean;
  /** Migas de pan [nombre, ruta] para datos estructurados BreadcrumbList. */
  breadcrumbs?: [string, string][];
  jsonLd?: JsonLd[];
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

/**
 * Actualiza título, descripción, canonical, Open Graph, Twitter y datos
 * estructurados (JSON-LD) según la página que se está viendo.
 */
export default function Seo({ title, description, rawTitle = false, image = ogImage, noindex = false, breadcrumbs, jsonLd = [] }: SeoProps) {
  const { pathname } = useLocation();
  const fullTitle = rawTitle ? title : `${title} | ${siteName}`;
  const url = `${siteUrl}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;
  const structured = JSON.stringify([...jsonLd, ...(breadcrumbs ? [breadcrumbJsonLd(siteUrl, breadcrumbs)] : [])]);

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = siteLocale;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    upsertCanonical(url);
    upsertMeta("property", "og:site_name", siteName);
    upsertMeta("property", "og:locale", "es_CL");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
  }, [fullTitle, description, url, image, noindex]);

  useEffect(() => {
    // Reemplaza los datos estructurados incluidos en el HTML del build por los de la página actual.
    document.head.querySelectorAll('script[data-prerender]').forEach((node) => node.remove());
    const items = JSON.parse(structured) as JsonLd[];
    const scripts = items.map((item) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "jsonld";
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
      return script;
    });
    return () => scripts.forEach((script) => script.remove());
  }, [structured]);

  return null;
}
