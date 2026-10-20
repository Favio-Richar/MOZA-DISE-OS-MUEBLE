import { company } from "../data/company";
import { defaultSiteUrl } from "../data/site";

const env = import.meta.env;

/** URL pública del sitio, sin barra final. Se configura con VITE_SITE_URL. */
export const siteUrl = ((env.VITE_SITE_URL as string | undefined) || defaultSiteUrl).replace(/\/+$/, "");

/** Número de WhatsApp en formato internacional sin "+" (.env tiene prioridad sobre data/company.ts). */
export const whatsappNumber = (((env.VITE_WHATSAPP_NUMBER as string | undefined) || company.whatsapp) ?? "").replace(/\D/g, "");

export const contactEmail = (env.VITE_CONTACT_EMAIL as string | undefined) || company.email;

/** Endpoint que recibe los formularios (Formspree, Web3Forms, API propia...). */
export const formEndpoint = (env.VITE_FORM_ENDPOINT as string | undefined) ?? "";
