// ============================================================================
//  TALLER Y FABRICACIÓN — contenido de la página /taller. Edita textos y fotos aquí.
//  Las descripciones son generales: ajústalas a tu forma real de trabajar y a tus equipos.
// ============================================================================
import { images } from "./images";

/** Etapas del proceso de fabricación, de la idea a la instalación. */
export const fabricationSteps = [
  { title: "Diseño y planos técnicos", text: "Convertimos las medidas y referencias del cliente en planos con distribución, módulos y cortes. Aquí se definen proporciones, herrajes y acabados antes de producir.", image: images.officeAlt },
  { title: "Selección de materiales", text: "Elegimos tableros, maderas, laminados y herrajes según el uso del mueble, el ambiente y el acabado aprobado. Cada lote se revisa al recibirlo.", image: images.detail },
  { title: "Corte y optimización", text: "Las piezas se cortan según el plano, optimizando el aprovechamiento del material para lograr medidas precisas y menos desperdicio.", image: images.pantry },
  { title: "Canteado y mecanizado", text: "Se aplican cantos, perforaciones y rebajes para herrajes, correderas y uniones, cuidando que cada pieza encaje con exactitud.", image: images.console },
  { title: "Acabados", text: "Aplicamos el acabado definido con el cliente: laminado, chapa, pintura o barniz, con control de color y textura entre piezas.", image: images.darkKitchen },
  { title: "Armado y control de calidad", text: "Se pre-arma el mueble, se revisan medidas, alineación, movimiento de puertas y cajones, y se corrigen detalles antes de la entrega.", image: images.mediaUnit },
  { title: "Entrega e instalación", text: "Protegemos, trasladamos e instalamos en el espacio, nivelando y ajustando para que el mueble quede integrado y funcionando.", image: images.kitchen },
];

/** Áreas del taller (galería con ampliación). Cambia título, descripción y foto por las reales. */
export const workshopAreas = [
  { title: "Sala de diseño", text: "Donde se desarrollan planos y propuestas.", image: images.officeAlt },
  { title: "Almacén de materiales", text: "Tableros y materiales organizados y protegidos.", image: images.pantry },
  { title: "Área de corte", text: "Cortes precisos según el plano aprobado.", image: images.detail },
  { title: "Zona de armado", text: "Pre-armado y revisión de cada mueble.", image: images.console },
  { title: "Zona de acabados", text: "Aplicación y control del acabado final.", image: images.darkKitchen },
  { title: "Despacho e instalación", text: "Embalaje y salida a obra del proyecto terminado.", image: images.mediaUnit },
];

/** Materiales y acabados que se pueden proponer según el proyecto. */
export const materials = [
  ["Tableros melamínicos", "Resistentes y versátiles; gran variedad de colores y texturas para cocinas, closets y oficinas."],
  ["MDF lacado o enchapado", "Superficies lisas y fino acabado para frentes, puertas y piezas de diseño."],
  ["Maderas macizas y chapas", "Calidez y carácter natural para piezas destacadas, con acabados que realzan la veta."],
  ["Laminados de alta presión", "Superficies de alto tránsito y fácil limpieza para cubiertas y zonas exigentes."],
  ["Herrajes y correderas", "Bisagras, correderas y sistemas de apertura pensados para uso diario prolongado."],
  ["Iluminación y accesorios", "Luz integrada, organizadores y detalles que completan la función del mueble."],
];

/** Compromisos de calidad (mostrados en la página). */
export const commitments = [
  ["01", "Medidas verificadas", "Partimos de medidas confirmadas para que el mueble encaje en el espacio real."],
  ["02", "Revisión en cada etapa", "Controlamos materiales, cortes, acabados y armado antes de avanzar a la siguiente fase."],
  ["03", "Comunicación clara", "Alcance, plazos y condiciones quedan definidos en la cotización antes de producir."],
  ["04", "Instalación coordinada", "Planificamos el montaje contigo para minimizar molestias y completar cada ambiente."],
];
