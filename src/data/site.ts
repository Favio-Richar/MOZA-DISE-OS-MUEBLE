// Datos globales del sitio. Archivo sin dependencias de Vite/React para que
// también pueda usarlo vite.config.ts al generar sitemap y prerender SEO.

export const siteName = "MOZA Diseños";
export const siteTagline = "Muebles a medida";
export const siteLocale = "es-CL";

/** Dominio por defecto. Reemplázalo con VITE_SITE_URL (ver .env.example). */
export const defaultSiteUrl = "https://tu-dominio.com";

export const navItems: [string, string][] = [
  ["Inicio", "/"],
  ["Nosotros", "/nosotros"],
  ["Servicios", "/servicios"],
  ["Taller", "/taller"],
  ["Proyectos", "/proyectos"],
  ["Catálogo", "/catalogo"],
  ["Guías", "/guias"],
  ["Contacto", "/contacto"],
];

/** Fecha de revisión de las políticas legales. */
export const legalUpdated = "21 de febrero de 2025";
