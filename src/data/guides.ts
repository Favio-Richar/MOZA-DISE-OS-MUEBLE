// ============================================================================
//  GUÍAS Y CONSEJOS — artículos de la sección /guias. Sirven para que Google traiga
//  a personas que buscan estos temas. Puedes editarlos o agregar más (copia un bloque).
// ============================================================================
import { images } from "./images";

export type GuideBlock = { h?: string; p?: string; list?: string[] };

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  /** Fecha ISO de publicación (se usa en los datos estructurados). */
  date: string;
  readMinutes: number;
  body: GuideBlock[];
};

export const guides: Guide[] = [
  {
    slug: "como-medir-tu-cocina-para-un-mueble-a-medida",
    title: "Cómo medir tu cocina para un mueble a medida",
    summary: "Guía paso a paso para tomar medidas correctas y evitar errores antes de pedir tu cocina.",
    category: "Cocinas",
    image: images.kitchen,
    date: "2026-10-20",
    readMinutes: 5,
    body: [
      { p: "Un buen mueble a medida empieza con buenas medidas. Si vas a cotizar una cocina, estos pasos te ayudarán a reunir información útil. La medición definitiva la confirma siempre el taller en el lugar, pero llegar con datos claros agiliza la propuesta." },
      { h: "1. Prepara las herramientas", list: ["Cinta métrica metálica de al menos 5 metros", "Papel cuadriculado o una libreta para hacer un croquis", "Lápiz, y un teléfono para tomar fotos de cada pared"] },
      { h: "2. Mide el ancho de cada pared en tres alturas", p: "Las paredes rara vez están perfectamente rectas. Mide el ancho cerca del piso, a la altura de la encimera (unos 90 cm) y cerca del techo. Anota la medida más pequeña: será la que condicione el mueble." },
      { h: "3. Mide la altura del piso al techo", p: "Hazlo en varios puntos, ya que el piso o el techo pueden tener desniveles. Si piensas llegar con muebles altos hasta el techo, este dato es clave." },
      { h: "4. Marca puertas, ventanas, tomas e instalaciones", list: ["Distancia desde la esquina hasta cada puerta y ventana, y su ancho y alto", "Posición de tomacorrientes, interruptores y salidas de gas", "Ubicación de las tuberías de agua y desagüe", "Zonas de campana extractora, ductos o columnas"] },
      { h: "5. Dibuja un croquis y toma fotos", p: "No necesita ser perfecto: un dibujo con las medidas escritas y fotografías de cada pared evita malentendidos. Indica también hacia dónde abren las puertas." },
      { h: "6. Piensa en cómo usas tu cocina", p: "Cuántas personas cocinan, qué electrodomésticos tienes (o piensas comprar) y cuánto almacenamiento necesitas influyen tanto como las medidas. Comparte esa información al cotizar." },
      { p: "¿Prefieres que lo hagamos por ti? Solicita tu cotización y coordinamos el levantamiento de medidas según tu ubicación." },
    ],
  },
  {
    slug: "melamina-mdf-o-madera-maciza-como-elegir",
    title: "Melamina, MDF o madera maciza: cómo elegir el material de tus muebles",
    summary: "Diferencias, ventajas y usos recomendados de los materiales más comunes en muebles a medida.",
    category: "Materiales",
    image: images.detail,
    date: "2026-10-20",
    readMinutes: 6,
    body: [
      { p: "Elegir el material correcto afecta el precio, la durabilidad y el aspecto de tus muebles. Estas son las opciones más habituales y cuándo conviene cada una." },
      { h: "Melamina (tableros melamínicos)", p: "Es un tablero de aglomerado o MDF recubierto con una lámina melamínica. Ofrece muchos colores y texturas, es resistente al uso diario y suele ser la opción más económica." },
      { list: ["Ideal para: closets, cocinas, oficinas y muebles de uso intensivo", "A tener en cuenta: los cantos son sensibles a la humedad si no se sellan bien"] },
      { h: "MDF lacado o enchapado", p: "El MDF es un tablero de fibras de superficie muy uniforme. Se puede pintar o lacar con acabados lisos y elegantes, o enchapar con láminas de madera natural." },
      { list: ["Ideal para: frentes de cocina, puertas y piezas de diseño", "A tener en cuenta: necesita acabado protegido contra humedad en zonas húmedas"] },
      { h: "Madera maciza", p: "Aporta calidez, veta natural y larga vida útil, y puede repararse o renovarse. Es la opción más costosa y, al ser un material vivo, se mueve ligeramente con los cambios de humedad." },
      { list: ["Ideal para: mesas, repisas, piezas destacadas y detalles", "A tener en cuenta: requiere diseño que permita su movimiento natural"] },
      { h: "Laminados de alta presión (HPL)", p: "Superficies muy resistentes a golpes, rayones y humedad, de fácil limpieza. Se usan sobre todo en cubiertas, zonas de alto tránsito y mobiliario comercial." },
      { h: "¿Cuál me conviene?", p: "Depende del uso, del ambiente y del presupuesto. Muchos proyectos combinan materiales: por ejemplo, estructura en melamina con frentes en MDF lacado y detalles en madera. Cuéntanos tu proyecto y te orientamos." },
    ],
  },
  {
    slug: "como-planificar-un-closet-a-medida",
    title: "Cómo planificar un closet a medida que realmente te sirva",
    summary: "Consejos para distribuir colgadores, cajones y repisas según tu ropa y tu espacio.",
    category: "Closets",
    image: images.closet,
    date: "2026-10-20",
    readMinutes: 5,
    body: [
      { p: "Un closet a medida bien planificado aprovecha cada centímetro y hace más fácil mantener el orden. Antes de diseñarlo conviene responder algunas preguntas." },
      { h: "1. Haz un inventario de lo que guardas", list: ["Prendas largas (abrigos, vestidos) y cortas (camisas, blusas)", "Dobladas (jerseys, jeans) y calzado", "Accesorios: cinturones, corbatas, bolsos, joyas", "Equipaje y ropa de cambio de temporada"] },
      { h: "2. Define las alturas de colgado", p: "Como referencia, una zona de ropa corta necesita unos 90 a 100 cm de altura libre, y una zona de ropa larga entre 150 y 170 cm. Combinar ambas permite aprovechar mejor el espacio." },
      { h: "3. Combina colgadores, cajones y repisas", p: "Los cajones mantienen visibles prendas pequeñas, las repisas sirven para prendas dobladas y los zapateros evitan acumular calzado. Una buena proporción evita que un tipo de almacenamiento sobre y otro falte." },
      { h: "4. Elige el tipo de puertas", list: ["Abatibles: dan acceso total pero necesitan espacio libre para abrir", "Correderas: ahorran espacio, ideales en habitaciones pequeñas", "Vestidor abierto: máxima visibilidad, requiere más orden"] },
      { h: "5. No olvides la iluminación y los detalles", p: "Una luz integrada, espejos, tiradores cómodos y la ventilación hacen la diferencia en el uso diario." },
      { p: "Si nos compartes las medidas aproximadas y fotos de tu espacio, te ayudamos a plantear la mejor distribución para tu closet." },
    ],
  },
];
