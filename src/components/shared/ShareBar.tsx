import { useState } from "react";
import { track } from "../../lib/analytics";
import Icon from "./Icon";
import SmartLink from "./SmartLink";

/** Compartir una página: WhatsApp, Facebook y copiar enlace (con Web Share en móviles). */
export default function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? "" : window.location.href;

  async function copy() {
    track("share", { method: "copy_link" });
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch { /* cancelado: usamos copiar */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch { /* sin permiso de portapapeles */ }
  }

  return (
    <div className="share-bar">
      <SmartLink href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} aria-label="Compartir por WhatsApp" onClick={() => track("share", { method: "whatsapp" })}><Icon name="whatsapp" /></SmartLink>
      <SmartLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} aria-label="Compartir en Facebook" onClick={() => track("share", { method: "facebook" })}><Icon name="facebook" /></SmartLink>
      <button type="button" onClick={copy} aria-label="Copiar enlace"><Icon name={copied ? "check" : "link"} /></button>
      {copied && <small role="status">¡Enlace copiado!</small>}
    </div>
  );
}
