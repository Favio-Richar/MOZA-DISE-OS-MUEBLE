import { useNavigate } from "react-router";
import SmartLink from "../components/shared/SmartLink";
import PageShell from "../components/layout/PageShell";
import Seo from "../components/layout/Seo";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <PageShell>
      <Seo title="Página no encontrada" description="La página solicitada no está disponible." noindex />
      <section className="form-result"><div><span className="eyebrow">Error 404</span><h1>Esta página no está disponible.</h1><p>La dirección puede haber cambiado o el contenido aún no existe.</p><button className="button button-primary" onClick={() => navigate(-1)}>Regresar</button><nav className="quick-links" aria-label="Páginas principales"><SmartLink href="/">Inicio</SmartLink><SmartLink href="/servicios">Servicios</SmartLink><SmartLink href="/proyectos">Proyectos</SmartLink><SmartLink href="/catalogo">Catálogo</SmartLink><SmartLink href="/cotizacion">Cotizar</SmartLink></nav></div></section>
    </PageShell>
  );
}
