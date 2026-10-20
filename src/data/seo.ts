// Metadatos SEO por ruta. Los usan tanto el componente <Seo /> (en el navegador)
// como el plugin de prerender (en el build) para que ambos coincidan.
import { catalogItems } from "./catalog";
import { guides } from "./guides";
import { projectList } from "./projects";

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  h1: string;
  /** Frases objetivo editoriales; orientan contenido y enlaces internos, no se publican como meta keywords. */
  focusTerms?: string[];
  priority?: number;
  changefreq?: string;
};

export const routeSeo: RouteSeo[] = [
  {
    path: "/",
    title: "Muebles a medida | MOZA Diseños",
    description: "Diseño, fabricación e instalación de cocinas, closets, muebles de baño, home office y mobiliario personalizado.",
    h1: "Muebles a medida para espacios únicos",
    focusTerms: ["muebles a medida", "muebles personalizados", "diseño de muebles"],
    priority: 1,
    changefreq: "weekly",
  },
  { path: "/nosotros", title: "Nosotros", description: "Conoce nuestro enfoque de diseño, fabricación e instalación de muebles a medida para espacios residenciales y comerciales.", h1: "Diseño funcional, fabricación cuidadosa", focusTerms: ["fabricación de muebles a medida", "diseño de mobiliario", "muebles residenciales y comerciales"], priority: 0.7, changefreq: "monthly" },
  { path: "/servicios", title: "Servicios de muebles a medida", description: "Diseño, fabricación e instalación de cocinas, closets, muebles de baño, home office y mobiliario personalizado.", h1: "Mobiliario pensado para tu espacio", focusTerms: ["cocinas a medida", "closets a medida", "muebles de baño a medida", "home office a medida"], priority: 0.9, changefreq: "monthly" },
  { path: "/taller", title: "Taller y proceso de fabricación", description: "Conoce nuestro taller, las áreas de producción y cada etapa de fabricación de muebles a medida: del diseño y corte al acabado e instalación.", h1: "Donde tu idea se convierte en mueble", focusTerms: ["fabricación de muebles", "taller de muebles", "instalación de muebles a medida"], priority: 0.8, changefreq: "monthly" },
  { path: "/guias", title: "Guías y consejos para muebles a medida", description: "Guías prácticas para medir tu espacio, elegir materiales y planificar cocinas, closets y muebles a medida con criterio.", h1: "Consejos para decidir mejor", focusTerms: ["cómo medir una cocina", "cómo planificar un closet", "materiales para muebles a medida"], priority: 0.8, changefreq: "weekly" },
  { path: "/proyectos", title: "Proyectos de referencia", description: "Explora cocinas, closets, baños, home office y mobiliario personalizado como inspiración para tu proyecto a medida.", h1: "Ideas convertidas en espacios", focusTerms: ["proyectos de muebles a medida", "inspiración de cocinas", "proyectos de closets"], priority: 0.8, changefreq: "weekly" },
  { path: "/catalogo", title: "Catálogo de muebles a medida", description: "Explora categorías de cocinas, closets, baños, home office, centros de entretenimiento y mobiliario personalizado.", h1: "Una categoría. Infinitas posibilidades", focusTerms: ["catálogo de muebles a medida", "muebles de cocina", "closets y vestidores", "centros de entretenimiento"], priority: 0.8, changefreq: "weekly" },
  { path: "/contacto", title: "Contacto", description: "Contacta a MOZA Diseños para conversar sobre cocinas, closets, muebles de baño, home office y mobiliario a medida.", h1: "Estamos para orientarte", focusTerms: ["contacto MOZA Diseños", "cotizar muebles a medida"], priority: 0.8, changefreq: "monthly" },
  { path: "/cotizacion", title: "Solicitar cotización", description: "Comparte la información de tu proyecto de muebles a medida para recibir una orientación personalizada.", h1: "Cuéntanos sobre tu proyecto", focusTerms: ["cotización de muebles a medida", "presupuesto de cocina a medida", "cotizar closet a medida"], priority: 0.9, changefreq: "monthly" },
  { path: "/politica-de-privacidad", title: "Política de privacidad", description: "Información sobre cómo MOZA Diseños recopila, utiliza y protege los datos enviados a través de este sitio web.", h1: "Política de privacidad", priority: 0.3, changefreq: "yearly" },
  { path: "/politica-de-cookies", title: "Política de cookies", description: "Consulta qué tecnologías de almacenamiento utiliza este sitio y administra tus preferencias de privacidad.", h1: "Política de cookies", priority: 0.3, changefreq: "yearly" },
  ...projectList.map<RouteSeo>((project) => ({
    path: `/proyectos/${project.slug}`,
    title: project.title,
    description: `${project.intro} Proyecto de referencia de ${project.category.toLowerCase()} a medida.`,
    h1: project.title,
    focusTerms: [project.title.toLowerCase(), `${project.category.toLowerCase()} a medida`, `proyecto de ${project.category.toLowerCase()}`],
    priority: 0.6,
    changefreq: "monthly",
  })),
  ...guides.map<RouteSeo>((guide) => ({
    path: `/guias/${guide.slug}`,
    title: guide.title,
    description: guide.summary,
    h1: guide.title,
    focusTerms: [guide.title.toLowerCase(), "consejos para muebles a medida"],
    priority: 0.7,
    changefreq: "monthly",
  })),
  ...catalogItems.map<RouteSeo>((item) => ({
    path: `/catalogo/${item.slug}`,
    title: item.title,
    description: `${item.copy} Descubre opciones para configurar un proyecto de ${item.title.toLowerCase()} a medida.`,
    h1: item.title,
    focusTerms: [`${item.title.toLowerCase()} a medida`, item.title.toLowerCase()],
    priority: 0.7,
    changefreq: "monthly",
  })),
];
