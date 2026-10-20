// ============================================================================
//  DATOS REALES DE LA EMPRESA — edita SOLO este archivo (o el .env) para publicar.
//  Todo lo que dejes vacío ("") mantiene el marcador editable o el formulario.
// ============================================================================

export const company = {
  /** WhatsApp en formato internacional, solo dígitos. Ej: "51987654321". Activa el chat real. */
  whatsapp: "",
  /** Teléfono para llamadas, con código de país. Ej: "+51 1 234 5678". */
  phone: "",
  email: "",
  /** Dirección que se muestra y se publica en los datos estructurados de Google. */
  address: { street: "", city: "", region: "", postalCode: "", country: "" },
  /** Texto de horario. Ej: "Lunes a viernes 9:00–18:00 · Sábados 9:00–13:00". */
  hours: "",
  /** Búsqueda para el mapa. Ej: "Av. Principal 123, Lima, Perú". Vacío = mapa de ejemplo. */
  mapQuery: "",
  /** URLs completas de redes sociales. Ej: "https://instagram.com/formamuebles". */
  instagram: "",
  facebook: "",
  /** Cifras de confianza (franja de la landing y de Nosotros). Ej: { value: 12, suffix: "+", label: "Años de experiencia" }. value 0 = se muestra "00" atenuado como marcador. */
  stats: [
    { value: 0, suffix: "+", label: "Años de experiencia" },
    { value: 0, suffix: "+", label: "Proyectos entregados" },
    { value: 0, suffix: "%", label: "Clientes que nos recomiendan" },
    { value: 0, suffix: "", label: "Ciudades atendidas" },
  ],
  /** ID de un video de YouTube del taller (la parte final de la URL). Vacío = la sección de video no se muestra. */
  workshopVideoId: "",
  /** Mensaje de saludo del chat de WhatsApp. */
  chatGreeting: "¡Hola! 👋 Cuéntanos qué espacio quieres transformar y te orientamos.",
};
