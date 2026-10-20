import { images } from "./images";

/** Tarjetas de servicios de la landing. */
export const services = [
  { n: "01", title: "Cocinas a medida", text: "Diseño funcional adaptado a tu espacio, estilo y necesidades cotidianas.", image: images.kitchen },
  { n: "02", title: "Closets", text: "Soluciones de almacenamiento que aprovechan cada centímetro disponible.", image: images.closet },
  { n: "03", title: "Muebles de baño", text: "Mobiliario pensado para combinar orden, resistencia y una estética cuidada.", image: images.bath },
  { n: "04", title: "Home office", text: "Espacios de trabajo personalizados, cómodos y visualmente integrados.", image: images.office },
  { n: "05", title: "Mobiliario personalizado", text: "Piezas únicas para ambientes residenciales y proyectos comerciales.", image: images.detail },
];

/** Servicios detallados (página /servicios y selector del formulario de cotización). */
export const serviceDetails = [
  ["Cocinas a medida", "Distribuciones, módulos y soluciones de almacenamiento adaptadas al espacio.", images.kitchen],
  ["Closets y vestidores", "Configuraciones interiores pensadas según tus hábitos y necesidades.", images.closet],
  ["Muebles de baño", "Muebles y vanitorios dimensionados para cada ambiente.", images.bath],
  ["Home office", "Superficies de trabajo, bibliotecas y almacenamiento integrado.", images.office],
  ["Mobiliario personalizado", "Soluciones especiales para espacios residenciales o comerciales.", images.detail],
];

export const values = [
  ["Diseño a medida", "Cada propuesta parte de tus medidas, necesidades y referencias."],
  ["Fabricación", "Desarrollamos cada pieza conforme al diseño previamente aprobado."],
  ["Materiales", "Te orientamos en la elección de acabados y materiales para tu proyecto."],
  ["Instalación", "Coordinamos el montaje para completar correctamente cada ambiente."],
  ["Atención personalizada", "Un acompañamiento claro desde la primera consulta hasta la entrega."],
];

export const processSteps = [
  ["Consulta", "Cuéntanos qué espacio quieres transformar."],
  ["Diseño", "Definimos distribución, estilo y acabados."],
  ["Cotización", "Recibes el alcance y condiciones del proyecto."],
  ["Fabricación", "Producimos conforme al diseño aprobado."],
  ["Instalación", "Coordinamos el montaje en tu espacio."],
];
