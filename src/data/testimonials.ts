// Testimonios. Reemplaza estos marcadores por opiniones REALES y verificables de tus clientes.
// rating: 1 a 5 (0 = sin calificación, se muestran guiones).

export type Testimonial = {
  name: string;
  project: string;
  city: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  { name: "Nombre del cliente", project: "Tipo de proyecto", city: "Ciudad", rating: 0, text: "Espacio reservado para una opinión real sobre la atención, el proceso y el resultado del proyecto." },
  { name: "Nombre del cliente", project: "Tipo de proyecto", city: "Ciudad", rating: 0, text: "Espacio reservado para una opinión real sobre la atención, el proceso y el resultado del proyecto." },
  { name: "Nombre del cliente", project: "Tipo de proyecto", city: "Ciudad", rating: 0, text: "Espacio reservado para una opinión real sobre la atención, el proceso y el resultado del proyecto." },
];
