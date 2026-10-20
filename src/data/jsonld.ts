// Datos estructurados (schema.org) reutilizables, tanto en el navegador como en el build.
import { company } from "./company";
import { faqs } from "./faqs";
import { ogImage } from "./images";
import { services } from "./services";
import { siteName } from "./site";

export type JsonLd = Record<string, unknown>;

export function homeJsonLd(siteUrl: string): JsonLd[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      name: siteName,
      url: siteUrl,
      image: ogImage,
      description: "Diseño, fabricación e instalación de cocinas, closets, muebles de baño, home office y mobiliario personalizado.",
      ...(company.phone && { telephone: company.phone }),
      ...(company.email && { email: company.email }),
      ...(company.address.street && {
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          postalCode: company.address.postalCode,
          addressCountry: company.address.country,
        },
      }),
      ...([company.instagram, company.facebook].some(Boolean) && { sameAs: [company.instagram, company.facebook].filter(Boolean) }),
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.text },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      inLanguage: "es",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];
}

export function breadcrumbJsonLd(siteUrl: string, crumbs: [string, string][]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Inicio", "/"], ...crumbs].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${siteUrl}${path}`,
    })),
  };
}
