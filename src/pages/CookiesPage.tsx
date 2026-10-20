import { Link } from "react-router";
import PageHero from "../components/layout/PageHero";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";
import LegalSection from "../components/shared/LegalSection";
import { images } from "../data/images";
import { legalUpdated } from "../data/site";

export default function CookiesPage() {
  function openPreferences() {
    window.dispatchEvent(new Event("open-cookie-settings"));
  }

  return (
    <PageShell>
      <Seo title="Política de cookies" description="Conoce el almacenamiento que utiliza MOZA Diseños y administra tus preferencias de privacidad." breadcrumbs={[["Política de cookies", "/politica-de-cookies"]]} />
      <PageHero eyebrow="Información legal" title="Política de cookies" copy="Explicamos qué se guarda en tu navegador, para qué se utiliza y cómo puedes decidir sobre las tecnologías opcionales." image={images.pantry} imageAlt="Mobiliario de almacenamiento integrado en un interior moderno" />
      <div className="legal-meta"><div className="container"><span>Última actualización</span><strong>{legalUpdated}</strong><button className="button button-primary" onClick={openPreferences}>Administrar preferencias</button></div></div>
      <div className="legal-content"><div className="container legal-layout">
        <aside className="legal-index"><span className="eyebrow">Contenido</span>{["Qué son", "Qué utilizamos", "Detalle técnico", "Servicios externos", "Tus preferencias", "Cambios y contacto"].map((item, index) => <a key={item} href={`#cookies-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{item}</a>)}</aside>
        <article className="legal-document">
          <p className="legal-lead">Esta política informa sobre el uso actual de cookies y tecnologías similares en este sitio. No utilizamos herramientas de publicidad ni seguimiento entre sitios.</p>
          <div id="cookies-1"><LegalSection number="01" title="Cookies y almacenamiento local"><p>Las cookies son pequeños archivos que un sitio puede guardar en el navegador. El almacenamiento local guarda información en el dispositivo y no la envía automáticamente con cada solicitud. Ambos pueden utilizarse para recordar preferencias.</p></LegalSection></div>
          <div id="cookies-2"><LegalSection number="02" title="Qué utiliza este sitio"><p>Usamos almacenamiento local para recordar tu elección sobre las preferencias. La categoría necesaria permite guardar esa decisión y evitar que el aviso aparezca en cada visita. La analítica es opcional: Google Analytics solo se carga si está configurado en el sitio y autorizas esa categoría. El mapa de la página de contacto también es opcional y solo se solicita al proveedor cuando autorizas el contenido integrado.</p><p>Si la analítica no está configurada, la opción aparece deshabilitada y Google Analytics no se carga, incluso si eliges aceptar todas. Si retiras el permiso para el mapa, dejamos de mostrar el mapa integrado.</p></LegalSection></div>
          <div id="cookies-3"><LegalSection number="03" title="Detalle técnico"><div className="cookie-table-wrap"><table className="cookie-table"><thead><tr><th>Nombre</th><th>Tipo</th><th>Finalidad</th><th>Conservación</th></tr></thead><tbody><tr><td><code>forma-muebles-cookie-consent</code></td><td>Almacenamiento local · necesario</td><td>Recordar las categorías elegidas y la fecha de actualización.</td><td>Hasta que borres los datos del navegador.</td></tr><tr><td>OpenStreetMap o Google Maps</td><td>Mapa integrado · opcional</td><td>Mostrar el mapa en la página de contacto. Se solicita solo con tu autorización.</td><td>Según el proveedor y la configuración de su servicio.</td></tr></tbody></table></div><p>Google Analytics, si se configura y autorizas su uso, puede utilizar cookies propias para generar mediciones. Antes de habilitarlo se debe publicar aquí el detalle y la duración de esas cookies.</p></LegalSection></div>
          <div id="cookies-4"><LegalSection number="04" title="Recursos y servicios externos"><p>El sitio solicita imágenes a Unsplash y tipografías a Google Fonts. Esos recursos pueden comunicar datos técnicos, como la dirección IP, a sus proveedores cuando se carga la página. El mapa de OpenStreetMap (o Google Maps, si se configura) permanece bloqueado hasta que autorizas la categoría «Mapa integrado»; puedes retirarla después desde este centro.</p><p>Consulta también nuestra <Link to="/politica-de-privacidad">Política de privacidad</Link> y las políticas de cada proveedor.</p></LegalSection></div>
          <div id="cookies-5"><LegalSection number="05" title="Tus preferencias y cómo cambiarlas"><p>Al entrar por primera vez puedes aceptar todas las categorías disponibles, permitir solo las necesarias o personalizar tu elección. Las categorías opcionales permanecen apagadas hasta que las autorices. Puedes cambiar o retirar tu decisión desde este centro de preferencias.</p><button className="button button-outline" onClick={openPreferences}>Abrir centro de preferencias</button></LegalSection></div>
          <div id="cookies-6"><LegalSection number="06" title="Cambios y contacto"><p>Actualizaremos esta política si cambian las tecnologías utilizadas o sus finalidades. Cualquier nueva categoría opcional deberá explicarse antes de solicitar tu autorización. Para consultas, utiliza nuestra <Link to="/contacto">página de contacto</Link>.</p></LegalSection></div>
        </article>
      </div></div>
    </PageShell>
  );
}
