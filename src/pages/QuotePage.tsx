import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router";
import { promos } from "../data/promos";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import Button from "../components/shared/Button";
import Honeypot from "../components/shared/Honeypot";
import Icon from "../components/shared/Icon";
import { images } from "../data/images";
import { serviceDetails } from "../data/services";
import useLeadForm from "../hooks/useLeadForm";
import { formsAreLive } from "../lib/contact";

export default function QuotePage() {
  const { status, setStatus, onSubmit, loading } = useLeadForm("cotizacion");
  const [files, setFiles] = useState<File[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  // Si el visitante llega desde una alerta de oferta (?oferta=id), la oferta viaja con la solicitud.
  const [params] = useSearchParams();
  const offer = promos.find((promo) => promo.id === params.get("oferta"));

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []));
  }

  if (status === "success") return (
    <PageShell><Seo title="Solicitud recibida" description="Confirmación de solicitud de cotización." noindex /><section className="form-result"><div><span className="result-icon"><Icon name="check" size={30} /></span><span className="eyebrow">Solicitud recibida</span><h1>Gracias por compartir tu proyecto.</h1><p>{formsAreLive ? "Revisaremos la información y te responderemos por el medio de contacto que indicaste." : "Este es el estado de confirmación. En la implementación real, aquí se informará el siguiente paso y el canal de respuesta."}</p><Button href="/" variant="primary" icon="arrow">Volver al inicio</Button></div></section></PageShell>
  );

  return (
    <PageShell>
      <Seo title="Solicitar cotización" description="Comparte la información de tu proyecto de muebles a medida para recibir una orientación personalizada." breadcrumbs={[["Cotización", "/cotizacion"]]} />
      <PageHero eyebrow="Cotización" title="Cuéntanos sobre tu proyecto." copy="Comparte información inicial para preparar una respuesta más clara. Los campos marcados son obligatorios." image={images.studio} imageAlt="Espacio de trabajo contemporáneo con mobiliario personalizado" />
      <section className="quote-section section"><div className="container quote-layout">
        <aside><span className="eyebrow">Antes de enviar</span><h2>La información útil nos ayuda a comprender mejor tu idea.</h2><ol><li><span>01</span>Describe el espacio y el mueble</li><li><span>02</span>Incluye medidas aproximadas</li><li><span>03</span>Adjunta referencias si las tienes</li></ol><button className="help-link" onClick={() => setShowHelp(true)}>¿Qué archivos puedo adjuntar?</button></aside>
        <form className="quote-form" onSubmit={onSubmit}>
          <div className="form-section-title"><span>01</span><div><h2>Datos de contacto</h2><p>Información para responder a tu solicitud.</p></div></div>
          <div className="form-row"><label>Nombre completo <b>*</b><input required name="name" placeholder="Escribe tu nombre" autoComplete="name" /></label><label>Teléfono / WhatsApp <b>*</b><input required name="phone" type="tel" placeholder="Tu número de contacto" autoComplete="tel" /></label></div>
          <div className="form-row"><label>Correo electrónico <b>*</b><input required name="email" type="email" placeholder="tu@correo.com" autoComplete="email" /></label><label>Comuna / ubicación <b>*</b><input required name="location" placeholder="Escribe tu ubicación" /></label></div>
          <div className="form-section-title"><span>02</span><div><h2>Sobre el proyecto</h2><p>Puedes completar con información aproximada.</p></div></div>
          <div className="form-row"><label>Tipo de proyecto <b>*</b><select required name="type" defaultValue=""><option value="" disabled>Selecciona una categoría</option>{serviceDetails.map(([title]) => <option key={title}>{title}</option>)}</select></label><label>Medidas aproximadas<input name="measurements" placeholder="Ej: ancho × alto × profundidad" /></label></div>
          <div className="form-row"><label>Plazo deseado<select name="timeline" defaultValue=""><option value="">Sin definir</option><option>Lo antes posible</option><option>En 1 a 2 meses</option><option>En 3 meses o más</option><option>Solo estoy explorando</option></select></label><label>Presupuesto referencial<select name="budget" defaultValue=""><option value="">Prefiero conversarlo</option><option>Aún no lo defino</option><option>Rango básico</option><option>Rango intermedio</option><option>Rango alto</option></select></label></div>
          <label>Descripción del proyecto <b>*</b><textarea required name="description" rows={5} placeholder="Cuéntanos qué necesitas, cómo usas el espacio y qué estilo tienes en mente..." /></label>
          <div className="form-row"><label>¿Cómo nos conociste?<select name="source" defaultValue=""><option value="">Selecciona una opción</option><option>Google</option><option>Instagram o Facebook</option><option>Recomendación</option><option>Vi un trabajo realizado</option><option>Otro</option></select></label><span /></div>
          <fieldset><legend>Medio de contacto preferido</legend><div className="radio-group">{["WhatsApp", "Teléfono", "Correo electrónico"].map((medium) => <label key={medium}><input required type="radio" name="preferred" value={medium} /><span>{medium}</span></label>)}</div></fieldset>
          <div className="upload-field"><input id="reference-files" name="files" type="file" multiple accept="image/*,.pdf" onChange={handleFiles} /><label htmlFor="reference-files"><span className="upload-icon">+</span><strong>{files.length ? `${files.length} archivo(s) seleccionado(s)` : "Agregar fotografías o referencias"}</strong><small>Imágenes o PDF. Contenido opcional.</small></label></div>
          {files.length > 0 && <div className="file-list">{files.map((file) => <span key={file.name}>{file.name}<Icon name="check" size={14} /></span>)}</div>}
          <Honeypot />
          {offer && <><input type="hidden" name="oferta" value={offer.title} /><p className="offer-note"><Icon name="check" size={16} /> Oferta seleccionada: <strong>{offer.title}</strong></p></>}
          {status === "error" && <p className="form-error" role="alert">No pudimos enviar tu solicitud. Revisa los campos e inténtalo nuevamente.</p>}
          <div className="quote-submit"><p>Al enviar, aceptas ser contactado para responder esta solicitud.</p><button className="button button-primary" disabled={loading} type="submit">{loading ? <><span className="spinner" /> Enviando...</> : <>Enviar solicitud <Icon name="arrow" size={18} /></>}</button></div>
          {/* Vista previa del estado de error: solo en desarrollo, no se muestra a los visitantes. */}
          {import.meta.env.DEV && <button className="error-preview" type="button" onClick={() => setStatus("error")}>Previsualizar estado de error</button>}
        </form>
      </div></section>
      {showHelp && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowHelp(false)}><div className="info-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowHelp(false)} aria-label="Cerrar"><Icon name="close" /></button><span className="eyebrow">Archivos de referencia</span><h2 id="modal-title">¿Qué puedes adjuntar?</h2><p>Fotografías actuales del espacio, croquis, referencias visuales o un documento PDF. No es obligatorio tener archivos para solicitar una cotización.</p><button className="button button-primary" onClick={() => setShowHelp(false)}>Entendido</button></div></div>}
    </PageShell>
  );
}
