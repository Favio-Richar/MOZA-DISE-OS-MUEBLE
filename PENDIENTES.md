# Pendientes para terminar y publicar — Forma Muebles

Estado: **el sistema está desarrollado y compila sin errores** (`pnpm check`).
Lo que falta es **contenido y datos reales de la empresa** (no hay nada de código por programar).

Marca cada casilla al terminarla. Orden recomendado: de arriba hacia abajo.

---

## 1. Datos de la empresa — `src/data/company.ts`
- [ ] `whatsapp` (formato internacional, solo dígitos. Ej: 51987654321) → activa el chat real y todos los botones de WhatsApp
- [ ] `phone`
- [ ] `email`
- [ ] `address` (calle, ciudad, región, código postal, país) → también la usa Google
- [ ] `hours` (horario de atención)
- [ ] `mapQuery` (dirección para el mapa de Google)
- [ ] `instagram` y `facebook` (URL completa)
- [ ] `stats` (años de experiencia, proyectos entregados, % recomendación, ciudades)
- [ ] `workshopVideoId` (opcional: ID del video de YouTube del taller)
- [ ] `chatGreeting` (saludo del chat, si quieres cambiarlo)

## 2. Configuración — archivo `.env` (copiar de `.env.example`)
- [ ] `VITE_SITE_URL` = dominio real (https://www.tu-dominio.com)
- [ ] `VITE_FORM_ENDPOINT` = destino de formularios (Formspree / Web3Forms / API propia). **Sin esto los formularios solo simulan el envío.**
- [ ] `VITE_GA_ID` = Google Analytics 4 (opcional)

## 3. Fotos — `src/data/images.ts`
(Subir archivos a `public/img/` y poner la ruta, p. ej. `"/img/cocina.jpg"`)
- [ ] Hero / portada
- [ ] Cocinas, closets, baños, home office, detalles y demás fotos de servicios
- [ ] `ogImage` (imagen para compartir en redes, 1200×630)
- [ ] Fotos del taller: `src/data/workshop.ts` (`fabricationSteps` y `workshopAreas`)
- [ ] Fotos de proyectos y su galería: `src/data/projects.ts`
- [ ] Fotos del catálogo: `src/data/catalog.ts`
- [ ] Fotos del equipo: `src/data/team.ts` (campo `photo`)
- [ ] Imágenes de las guías: `src/data/guides.ts`

## 4. Textos y contenido
- [ ] **Proyectos reales** (`projects.ts`): título, categoría, descripción, galería
- [ ] **Testimonios reales** (`testimonials.ts`): nombre, proyecto, ciudad, texto, calificación 1–5
- [ ] **Equipo** (`team.ts`): nombres, cargos, breve presentación
- [ ] **Taller** (`workshop.ts`): ajustar etapas, áreas, materiales y compromisos a la realidad de la empresa
- [ ] **Nosotros** (`src/pages/AboutPage.tsx`): historia real de la empresa (hoy texto genérico)
- [ ] **Ofertas de lanzamiento** (`promos.ts`): condiciones reales, vigencia y tiempos (`promoSettings`)
- [ ] **Preguntas frecuentes** (`faqs.ts`): revisar que coincidan con la realidad
- [ ] **Guías** (`guides.ts`): revisar las 3 guías y, si se quiere, agregar más
- [ ] Nombre de la empresa si cambia (`src/data/site.ts`, y buscar "Forma Muebles" en `public/` y `index`)

## 5. Legales
- [ ] `src/pages/PrivacyPage.tsx`: razón social, identificación fiscal, domicilio y correo de privacidad
- [ ] Quitar el párrafo que dice que los formularios son "demostración" (al conectar `VITE_FORM_ENDPOINT`)
- [ ] Si se activa Google Analytics: actualizar privacidad y `src/pages/CookiesPage.tsx` (hoy dicen que no hay analítica)
- [ ] `legalUpdated` en `src/data/site.ts` (fecha de actualización)
- [ ] `public/.well-known/security.txt`: correo y dominio reales
- [ ] `public/humans.txt`: datos reales

## 6. Verificación antes de subir
- [ ] `pnpm check` sin errores
- [ ] `pnpm preview` y revisar cada página en computador y celular
- [ ] Probar un envío real de cada formulario (inicio, contacto, cotización) y que llegue
- [ ] Probar el botón de WhatsApp (abre el chat con el número correcto)
- [ ] Revisar que ya no queden textos como "Nombre del cliente", "Ciudad, País", "Dato por completar"
- [ ] Reemplazar `tu-dominio.com` en los archivos de `public/` (se hace solo en el build si `VITE_SITE_URL` está definido; confirmar en `dist/robots.txt` y `dist/sitemap.xml`)

## 7. Después de publicar (marketing y posicionamiento)
- [ ] Verificar el sitio en **Google Search Console** y enviar `/sitemap.xml`
- [ ] Crear **Google Business Profile** (misma dirección y teléfono del sitio) y pedir reseñas a cada cliente
- [ ] Probar datos estructurados: https://search.google.com/test/rich-results
- [ ] Medir velocidad: https://pagespeed.web.dev
- [ ] Servidor: asegurar que las rutas desconocidas caigan en `index.html` (ya incluido para Vercel, Netlify y Cloudflare)
- [ ] Publicar una guía nueva al mes (`guides.ts`)
- [ ] Compartir el enlace en Instagram, Facebook y WhatsApp Business

## 8. Mejoras opcionales (siguiente fase)
- [ ] **Páginas por ciudad/zona** (SEO local): necesitan la lista de ciudades donde trabajan
- [ ] Comparador antes/después con fotos reales
- [ ] Reseñas de Google embebidas (cuando existan reseñas)
- [ ] Más guías / blog
- [ ] Idioma adicional si se quiere atender otro mercado

---

### Dónde está cada cosa
Ver `README.md` (estructura, comandos y guía de publicación). Respaldo del diseño original en `C:\Users\favio\MUEBLESMOSA\_respaldo-original`.
