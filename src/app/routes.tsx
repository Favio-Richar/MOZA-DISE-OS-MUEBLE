import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import LandingPage from "../pages/LandingPage";

// Cada página vive en su propio archivo y se carga bajo demanda (code splitting).
function HydrationFallback() {
  return (
    <main className="route-fallback" aria-busy="true" aria-label="Cargando página">
      <div className="route-fallback-mark" />
      <span>Cargando experiencia</span>
    </main>
  );
}

const page = (load: () => Promise<{ default: ComponentType }>) => ({
  HydrateFallback: HydrationFallback,
  ErrorBoundary: ErrorPage,
  lazy: async () => ({ Component: (await load()).default }),
});

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage, HydrateFallback: HydrationFallback, ErrorBoundary: ErrorPage },
  { path: "/nosotros", ...page(() => import("../pages/AboutPage")) },
  { path: "/servicios", ...page(() => import("../pages/ServicesPage")) },
  { path: "/taller", ...page(() => import("../pages/WorkshopPage")) },
  { path: "/guias", ...page(() => import("../pages/GuidesPage")) },
  { path: "/guias/:slug", ...page(() => import("../pages/GuideDetailPage")) },
  { path: "/proyectos", ...page(() => import("../pages/ProjectsPage")) },
  { path: "/proyectos/:slug", ...page(() => import("../pages/ProjectDetailPage")) },
  { path: "/catalogo", ...page(() => import("../pages/CatalogPage")) },
  { path: "/catalogo/:slug", ...page(() => import("../pages/ProductDetailPage")) },
  { path: "/contacto", ...page(() => import("../pages/ContactPage")) },
  { path: "/cotizacion", ...page(() => import("../pages/QuotePage")) },
  { path: "/politica-de-privacidad", ...page(() => import("../pages/PrivacyPage")) },
  { path: "/politica-de-cookies", ...page(() => import("../pages/CookiesPage")) },
  { path: "*", ...page(() => import("../pages/NotFoundPage")) },
]);
