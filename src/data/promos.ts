// ============================================================================
//  OFERTAS DE LANZAMIENTO — se muestran una a una, rotando, cada cierto tiempo.
//  Los textos son EJEMPLOS: reemplázalos por tus condiciones reales antes de publicar.
// ============================================================================

export type Promo = {
  id: string;
  badge: string;
  title: string;
  text: string;
  cta: string;
  /** Texto opcional de vigencia. Ej: "Hasta el 30 de noviembre". */
  until?: string;
};

export const promoSettings = {
  /** Segundos hasta mostrar la primera oferta. */
  firstDelaySeconds: 25,
  /** Minutos entre una oferta y la siguiente. */
  intervalMinutes: 3,
  /** Segundos que permanece visible cada oferta si el visitante no interactúa. */
  visibleSeconds: 16,
};

export const promos: Promo[] = [
  { id: "asesoria", badge: "Oferta de lanzamiento", title: "Asesoría y diseño inicial sin costo", text: "Agenda tu consulta y recibe una primera propuesta de distribución para tu espacio.", cta: "Quiero mi asesoría" },
  { id: "cocinas", badge: "Lanzamiento · Cocinas", title: "Beneficio especial en cocinas a medida", text: "Consulta por las condiciones de lanzamiento para tu proyecto de cocina.", cta: "Cotizar mi cocina" },
  { id: "closets", badge: "Lanzamiento · Closets", title: "Closets y vestidores con beneficio de estreno", text: "Organiza cada centímetro con un diseño personalizado. Pregunta por la promoción vigente.", cta: "Cotizar mi closet" },
  { id: "proyecto-completo", badge: "Proyecto completo", title: "¿Varios ambientes? Pide tu paquete", text: "Si amoblas más de un espacio, te preparamos una propuesta integral con condiciones preferentes.", cta: "Pedir mi propuesta" },
];
