import { useEffect, useRef, useState } from "react";

const storageKey = "forma-muebles-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  external: boolean;
  updatedAt: string;
};

function saveConsent(analytics: boolean, external: boolean) {
  const consent: Consent = { necessary: true, analytics, external, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(storageKey, JSON.stringify(consent));
  } catch {
    // Si el navegador bloquea el almacenamiento, el aviso queda disponible para volver a decidir.
    return false;
  }
  window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: consent }));
  return true;
}

export default function CookieConsent() {
  const analyticsConfigured = Boolean(import.meta.env.VITE_GA_ID);
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [external, setExternal] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const consent = JSON.parse(raw) as Partial<Consent>;
        setAnalytics(Boolean(consent.analytics) && analyticsConfigured);
        setExternal(Boolean(consent.external));
      } else if (!sessionStorage.getItem(`${storageKey}-dismissed`)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }

    const openSettings = () => {
      sessionStorage.removeItem(`${storageKey}-dismissed`);
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null") as Partial<Consent> | null;
        setAnalytics(Boolean(saved?.analytics) && analyticsConfigured);
        setExternal(Boolean(saved?.external));
      } catch {
        setAnalytics(false);
        setExternal(false);
      }
      setVisible(true);
      setSettingsOpen(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, [analyticsConfigured]);

  useEffect(() => {
    if (!visible) return;
    dialogRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (settingsOpen) setSettingsOpen(false);
        else dismissWithoutChoice();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [visible, settingsOpen]);

  function confirm(value: boolean, externalValue = external) {
    const saved = saveConsent(value && analyticsConfigured, externalValue);
    setSaveError(!saved);
    if (!saved) return;
    setAnalytics(value && analyticsConfigured);
    setVisible(false);
    setSettingsOpen(false);
  }

  function dismissWithoutChoice() {
    try {
      sessionStorage.setItem(`${storageKey}-dismissed`, "1");
    } catch {
      // El aviso se cierra durante esta carga, sin registrar una autorización.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-center-backdrop">
      <section className="cookie-center" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description" tabIndex={-1} ref={dialogRef}>
        <header className="cookie-center-header">
          <div className="cookie-center-brand">
            <span className="cookie-shield" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 19 6v5.3c0 4.3-2.9 7.5-7 9.2-4.1-1.7-7-4.9-7-9.2V6l7-2.5Z"/><path d="m9 12 2 2 4-4"/></svg></span>
            <span>FORMA MUEBLES <i>·</i> PRIVACIDAD</span>
          </div>
          <span className="cookie-step">PREFERENCIAS <b>01</b></span>
          <button className="cookie-close" onClick={dismissWithoutChoice} aria-label="Cerrar aviso sin aceptar; las opciones opcionales seguirán apagadas">×</button>
        </header>

        <div className="cookie-center-content">
          <div className="cookie-center-intro">
            <span className="eyebrow">Tu privacidad, a tu manera</span>
            <h2 id="cookie-title">Tú decides qué se guarda.</h2>
          <p id="cookie-description">Usamos almacenamiento necesario para recordar tu elección. La analítica y los mapas integrados son opcionales y permanecen apagados hasta que los autorices.</p>
            <a className="cookie-policy-link" href="/politica-de-cookies">Leer política de cookies <span aria-hidden="true">↗</span></a>
          </div>

          <div className="cookie-preferences" aria-label="Categorías de cookies">
            <div className="cookie-preference-row">
              <div className="cookie-preference-icon" aria-hidden="true">✓</div>
              <div className="cookie-preference-copy"><strong>Necesarias</strong><p>Recuerdan tus preferencias y hacen funcionar este panel.</p></div>
              <span className="cookie-required">Siempre activas</span>
            </div>
            <div className={`cookie-preference-row ${!settingsOpen ? "cookie-preference-locked" : ""}`}>
              <div className="cookie-preference-icon cookie-analytics-icon" aria-hidden="true">↗</div>
              <div className="cookie-preference-copy"><strong>Analítica</strong><p>{analyticsConfigured ? "Google Analytics nos ayuda a entender el uso del sitio. Solo se activa con tu permiso." : "No está habilitada en este sitio. Si se incorpora, te pediremos autorización antes de activarla."}</p></div>
              <label className="cookie-switch">
                <input type="checkbox" checked={analytics} disabled={!settingsOpen || !analyticsConfigured} onChange={(event) => setAnalytics(event.target.checked)} aria-label="Permitir analítica" />
                <span aria-hidden="true" />
                <b>{!analyticsConfigured ? "No habilitada" : analytics ? "Permitida" : "Desactivada"}</b>
              </label>
            </div>
            <div className={`cookie-preference-row ${!settingsOpen ? "cookie-preference-locked" : ""}`}>
              <div className="cookie-preference-icon cookie-map-icon" aria-hidden="true">⌖</div>
              <div className="cookie-preference-copy"><strong>Mapa integrado</strong><p>Conecta con OpenStreetMap (o Google Maps, si se configura) para mostrar el mapa en Contacto. El proveedor recibe datos técnicos como tu dirección IP.</p></div>
              <label className="cookie-switch">
                <input type="checkbox" checked={external} disabled={!settingsOpen} onChange={(event) => setExternal(event.target.checked)} aria-label="Permitir mapa de terceros" />
                <span aria-hidden="true" />
                <b>{external ? "Permitido" : "Desactivado"}</b>
              </label>
            </div>
            {settingsOpen && <p className="cookie-settings-note">Puedes cambiar o retirar tu decisión en cualquier momento desde el enlace de cookies al pie del sitio.</p>}
          </div>
        </div>

        {saveError && <p className="cookie-save-error" role="alert">No pudimos guardar tu elección en este navegador. Revisa su configuración e inténtalo otra vez.</p>}
        <footer className="cookie-center-footer">
          <div className="cookie-footer-links"><a href="/politica-de-privacidad">Privacidad</a><span>·</span><a href="/politica-de-cookies">Más información</a></div>
          <div className="cookie-center-actions">
            {settingsOpen ? (
              <>
                <button className="cookie-choice-secondary" onClick={() => confirm(false, false)}>Solo necesarias</button>
                <button className="cookie-choice-primary" onClick={() => confirm(analytics)}>Guardar elección</button>
              </>
            ) : (
              <>
                <button className="cookie-choice-secondary" onClick={() => confirm(false, false)}>Solo necesarias</button>
                <button className="cookie-choice-primary" onClick={() => confirm(analyticsConfigured, true)}>Aceptar todas</button>
              </>
            )}
          </div>
          {!settingsOpen && <button className="cookie-customize" onClick={() => setSettingsOpen(true)}>Personalizar <span aria-hidden="true">＋</span></button>}
          {settingsOpen && <button className="cookie-customize" onClick={() => setSettingsOpen(false)}>Volver</button>}
        </footer>
      </section>
    </div>
  );
}
