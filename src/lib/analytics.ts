// Google Analytics 4 con consentimiento: no se carga nada hasta que el visitante
// acepta la categoría "Analítica" en el aviso de cookies. Se activa con VITE_GA_ID.

const gaId = ((import.meta.env.VITE_GA_ID as string | undefined) ?? "").replace(/[^A-Za-z0-9-]/g, "");
const consentKey = "forma-muebles-cookie-consent";
let loaded = false;
let consentGiven = false;

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function hasConsent() {
  try {
    return Boolean(JSON.parse(localStorage.getItem(consentKey) ?? "null")?.analytics);
  } catch {
    return false;
  }
}

function load() {
  if (loaded || !gaId) return;
  loaded = true;
  consentGiven = true;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() { w.dataLayer!.push(arguments); };
  w.gtag("js", new Date());
  w.gtag("consent", "update", { analytics_storage: "granted" });
  w.gtag("config", gaId, { anonymize_ip: true });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (!gaId) return;
  if (hasConsent()) load();
  window.addEventListener("cookie-consent-updated", (event) => {
    const allowed = Boolean((event as CustomEvent<{ analytics: boolean }>).detail?.analytics);
    if (allowed) {
      load();
    } else if (loaded) {
      consentGiven = false;
      (window as GtagWindow).gtag?.("consent", "update", { analytics_storage: "denied" });
    }
  });
}

/** Registra una conversión/evento (clic en WhatsApp, formulario enviado, oferta...). No hace nada sin consentimiento. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (!loaded || !consentGiven || !hasConsent()) return;
  (window as GtagWindow).gtag?.("event", event, params);
}

/** Vista de página para navegación interna (SPA). */
export function trackPageView(path: string) {
  track("page_view", { page_path: path });
}
