import { isRouteErrorResponse, useRouteError } from "react-router";

/** Pantalla de respaldo si una página falla al cargar (red caída, archivo no disponible). */
export default function ErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="route-fallback" role="alert">
      <div className="route-fallback-mark" />
      <h1 style={{ font: "500 26px/1.2 var(--display)", color: "var(--ink)", margin: 0 }}>{notFound ? "Página no encontrada" : "Algo no salió bien"}</h1>
      <span>Recarga la página o vuelve al inicio</span>
      <p style={{ display: "flex", gap: 10, margin: 0 }}>
        <button className="button button-primary" onClick={() => window.location.reload()}>Recargar</button>
        <a className="button button-outline" href="/">Ir al inicio</a>
      </p>
    </main>
  );
}
