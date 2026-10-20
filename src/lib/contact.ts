import { company } from "../data/company";
import { contactEmail, formEndpoint, whatsappNumber } from "./env";

// Textos de contacto: muestran los datos reales cuando están configurados
// (data/company.ts o .env) y los marcadores editables originales mientras no.
export const whatsappLabel = whatsappNumber ? `+${whatsappNumber}` : "Número de contacto";
export const emailLabel = contactEmail || "correo@empresa.com";
export const emailHref = contactEmail ? `mailto:${contactEmail}` : "/contacto";

export const phoneLabel = company.phone || "Número de teléfono";
export const phoneHref = company.phone ? `tel:${company.phone.replace(/[^\d+]/g, "")}` : "/contacto";

const addressParts = [company.address.street, company.address.city, company.address.region, company.address.country].filter(Boolean);
export const addressLabel = addressParts.length ? addressParts.join(", ") : "Ciudad, País";

export const hoursLabel = company.hours || "Horario de atención";

export const instagramHref = company.instagram || "/contacto";
export const facebookHref = company.facebook || "/contacto";

/** Mapa de Google con la dirección real; si no hay dirección, el mapa de ejemplo. */
export const mapSrc = company.mapQuery
  ? `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`
  : "https://www.openstreetmap.org/export/embed.html?bbox=-81.9%2C-55.9%2C-34.7%2C12.9&layer=mapnik";
export const hasRealMap = Boolean(company.mapQuery);

/** Hay un endpoint real configurado: los mensajes de éxito dejan de decir "demostración". */
export const formsAreLive = Boolean(formEndpoint);
