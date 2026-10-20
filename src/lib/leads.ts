import { formEndpoint, whatsappNumber } from "./env";

/**
 * Envío de formularios (cotización, contacto, landing).
 *
 * - Con VITE_FORM_ENDPOINT definido, hace un POST real (Formspree, Web3Forms, API propia...).
 * - Sin endpoint, funciona en modo demostración (simula el envío), igual que antes.
 * Lanza un error si el servidor rechaza la solicitud, para mostrar el estado de error.
 */
export async function submitLead(data: FormData, source: string): Promise<void> {
  // Honeypot: si un bot rellenó el campo oculto, fingimos éxito y no enviamos nada.
  if (data.get("website")) return;

  if (!formEndpoint) {
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    return;
  }

  data.append("_origen", source);
  const response = await fetch(formEndpoint, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`El envío falló (${response.status})`);
}

/** Enlace a WhatsApp si hay número configurado; si no, la página de contacto. */
export function whatsappHref(message?: string) {
  if (!whatsappNumber) return "/contacto?canal=whatsapp";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${whatsappNumber}${text}`;
}
