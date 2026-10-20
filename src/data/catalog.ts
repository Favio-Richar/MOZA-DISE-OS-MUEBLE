import { images } from "./images";

export const catalogItems = [
  { slug: "cocinas", title: "Cocinas", copy: "Islas, columnas, alacenas y módulos personalizados.", image: images.kitchen, gallery: [images.kitchen, images.kitchenAlt, images.pantry], types: ["Cocina lineal", "Cocina en L o U", "Isla y península", "Despensa integrada"] },
  { slug: "closets-vestidores", title: "Closets y vestidores", copy: "Interiores configurables para organizar mejor tu espacio.", image: images.closet, gallery: [images.closet, images.detail, images.console], types: ["Closet empotrado", "Vestidor abierto", "Puertas abatibles", "Puertas correderas"] },
  { slug: "muebles-bano", title: "Muebles de baño", copy: "Vanitorios y muebles auxiliares adaptados a cada ambiente.", image: images.bath, gallery: [images.bath, images.detail, images.console], types: ["Vanitorio suspendido", "Mueble de piso", "Torre auxiliar", "Gabinete con espejo"] },
  { slug: "home-office", title: "Home office", copy: "Escritorios, bibliotecas y almacenamiento integrado.", image: images.office, gallery: [images.office, images.officeAlt, images.studio], types: ["Escritorio mural", "Biblioteca integrada", "Estación doble", "Mueble multifunción"] },
  { slug: "centros-entretenimiento", title: "Centros de entretenimiento", copy: "Paneles, repisas y módulos para integrar tecnología y almacenamiento.", image: images.mediaUnit, gallery: [images.mediaUnit, images.console, images.darkKitchen], types: ["Panel para TV", "Módulos suspendidos", "Vitrinas y repisas", "Muro multimedia"] },
  { slug: "mobiliario-especial", title: "Mobiliario personalizado", copy: "Recibidores, aparadores y piezas especiales creadas para cada lugar.", image: images.console, gallery: [images.console, images.detail, images.pantry], types: ["Recibidores", "Aparadores", "Muebles auxiliares", "Soluciones comerciales"] },
];
