<div align="center">
  <h1>MOZA DISEÑOS Â· Mobiliario a medida</h1>
  <p><strong>Experiencia web para presentar diseño, fabricación e instalación de muebles personalizados.</strong></p>
  <p>
    <a href="https://github.com/Favio-Richar/MOZA-DISE-OS-MUEBLE"><img src="https://img.shields.io/badge/GitHub-Repositorio-181717?logo=github" alt="Repositorio en GitHub"></a>
    <img src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" alt="React 19">
    <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" alt="Vite 8">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
    <img src="https://img.shields.io/badge/Preview-Vercel-000000?logo=vercel&logoColor=white" alt="Preview en Vercel">
  </p>
</div>

<p align="center"><img src="./public/images/about/moza-disenos-ambiente-01.jpg" alt="Visualización panorámica de un ambiente de exhibición de mobiliario" width="49%"> <img src="./public/images/about/moza-disenos-ambiente-02.jpg" alt="Vista cercana de un ambiente interior con muro oscuro y detalles de madera" width="49%"></p>
<p align="center"><em>Visualizaciones ambientales para la sección Nosotros; no son capturas de la interfaz ni archivos de logotipo.</em></p>

---

## Descripción

Sitio web de presentación para una empresa de mobiliario a medida. Reúne servicios, catálogo, proyectos de referencia, guías y vías de contacto en una experiencia adaptable a escritorio y móvil.

**Estado:** prototipo funcional en preparación para revisión del cliente. La identidad, los datos de contacto, las fotografías, los testimonios, las promociones y el destino de los formularios se deben confirmar antes de publicar el sitio definitivo.

> La foto muestra un ambiente de exhibición con el nombre MOZA DISEÑOS integrado en el muro; se usa como fotografía ambiental en Nosotros, no como logotipo. La identidad final se incorporará cuando esté lista.

## Funcionalidades

- Inicio con presentación de servicios, galería, preguntas frecuentes y llamadas a la acción.
- Páginas de empresa, servicios y proceso de taller.
- Catálogo por categorías y páginas de detalle.
- Proyectos de referencia con galerías.
- Guías informativas y páginas de artículos.
- Formularios de contacto y solicitud de cotización.
- Enlaces configurables a WhatsApp.
- Centro de preferencias para analítica y contenido externo.
- Metadatos por ruta, datos estructurados y prerender para buscadores.
- Diseño responsive y navegación móvil.

## Tecnologías

| Área | Tecnología |
| --- | --- |
| Interfaz | React 19, TypeScript |
| Desarrollo y compilación | Vite 8 |
| Estilos | Tailwind CSS 4 y CSS del proyecto |
| Animación | Framer Motion |
| Rutas | React Router 7 |
| Gestor de paquetes | pnpm |
| Publicación prevista | Vercel |

## Rutas

| Página | URL |
| --- | --- |
| Inicio | / |
| Nosotros | /nosotros |
| Servicios | /servicios |
| Taller | /taller |
| Proyectos y detalle | /proyectos Â· /proyectos/:slug |
| Catálogo y categorías | /catalogo Â· /catalogo/:slug |
| Guías y artículos | /guias Â· /guias/:slug |
| Contacto | /contacto |
| Cotización | /cotizacion |
| Políticas | /politica-de-privacidad Â· /politica-de-cookies |

## Requisitos

- Node.js 22
- pnpm 10

Las versiones de desarrollo están indicadas en el archivo .mise.toml.

## Inicio local

Desde la carpeta raíz del proyecto:

~~~bash
pnpm install
pnpm dev
~~~

Vite mostrará en la terminal la dirección local para abrir el sitio.

### Configuración

Crea .env.local a partir de .env.example y completa los valores cuando estén disponibles:

~~~text
VITE_SITE_URL=https://dominio-del-sitio.cl
VITE_WHATSAPP_NUMBER=
VITE_CONTACT_EMAIL=
VITE_FORM_ENDPOINT=
VITE_GA_ID=
~~~

| Variable | Uso |
| --- | --- |
| VITE_SITE_URL | Dominio público, URL canónica y sitemap. |
| VITE_WHATSAPP_NUMBER | Número internacional, solo dígitos, para WhatsApp. |
| VITE_CONTACT_EMAIL | Correo público de contacto. |
| VITE_FORM_ENDPOINT | Servicio que recibe los formularios. |
| VITE_GA_ID | Google Analytics opcional, sujeto al consentimiento. |

Las variables VITE_ se incluyen en el código del navegador. No guardes contraseñas, tokens privados ni claves secretas en ellas.

### Formularios

Los formularios tienen campos, validación del navegador y estados de respuesta. Si VITE_FORM_ENDPOINT está vacío, el envío se simula para revisar la interfaz y los datos no llegan a la empresa. Para recibir solicitudes reales se debe configurar el destino y comprobar la recepción. La cotización permite adjuntar imágenes y PDF; el proveedor elegido debe admitir archivos.

## Comandos

~~~bash
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
pnpm check
~~~

pnpm check ejecuta revisión de tipos y compilación. pnpm preview sirve localmente la carpeta generada después de compilar.

## Organización de imágenes

Las imágenes del sitio se alojan en public/images y se separan por sección:

~~~text
public/images/
â”œâ”€â”€ brand/       Logotipo e identidad aprobados
â”œâ”€â”€ home/        Portada e imágenes de Inicio
â”œâ”€â”€ about/       Empresa y equipo
â”œâ”€â”€ services/    Servicios
â”œâ”€â”€ workshop/    Taller y fabricación
â”œâ”€â”€ projects/    Proyectos reales y sus galerías
â”œâ”€â”€ catalog/     Categorías y productos
â”œâ”€â”€ guides/      Imágenes de artículos
â””â”€â”€ shared/      Recursos usados en varias páginas
~~~

Las dos visualizaciones ambientales se utilizan en Nosotros y están guardadas en public/images/about/moza-disenos-ambiente-01.jpg y public/images/about/moza-disenos-ambiente-02.jpg. El archivo original que ya estaba en public/img se conserva sin cambios. Las demás carpetas incluyen marcadores hasta recibir los recursos del cliente.

Para incorporar imágenes del cliente:

1. Guarda cada imagen en la carpeta correspondiente.
2. Usa nombres descriptivos, minúsculos, sin espacios ni tildes; por ejemplo cocina-las-condes-01.webp.
3. Agrupa las galerías bajo la carpeta del proyecto o categoría correspondiente.
4. Actualiza las referencias en src/data/images.ts y el contenido relacionado en src/data/projects.ts, src/data/catalog.ts, src/data/team.ts u otros archivos de datos.
5. Confirma que las imágenes estén autorizadas para publicarse y agrega texto alternativo descriptivo.

Consulta public/images/README.md para la convención completa.

## Estructura

~~~text
src/
â”œâ”€â”€ app/           Rutas de la aplicación
â”œâ”€â”€ components/    Componentes de diseño, contenido y efectos
â”œâ”€â”€ data/          Contenido editable e imágenes
â”œâ”€â”€ hooks/         Lógica reutilizable
â”œâ”€â”€ lib/           Formularios, analítica y configuración
â”œâ”€â”€ pages/         Páginas y vistas de detalle
â””â”€â”€ styles/        Estilos del sitio

public/images/     Recursos visuales por sección
vite-plugins/      Prerender y recursos SEO
~~~

## Preview en Vercel

1. Importa el repositorio desde GitHub.
2. Si el repositorio contiene solo esta aplicación, usa la raíz del repositorio como Root Directory. Si incluye carpetas adicionales, selecciona Landing Page Empresa de Muebles.
3. Comando de instalación: pnpm install --frozen-lockfile.
4. Comando de compilación: pnpm build.
5. Directorio de salida: dist.
6. Comparte la URL de Preview para revisar el avance. Reserva el dominio y las variables de producción hasta confirmar la información del cliente.

El archivo vercel.json contiene reglas de rutas y cabeceras para Vercel.

## Lista previa a producción

- [ ] Confirmar identidad, logotipo y textos oficiales.
- [ ] Completar datos de contacto, dirección, horario y redes.
- [ ] Sustituir imágenes de referencia por fotografías autorizadas de trabajos reales.
- [ ] Verificar testimonios, promociones, condiciones y vigencia.
- [ ] Configurar y probar el destino de los formularios y sus adjuntos.
- [ ] Completar y revisar las políticas de privacidad y cookies.
- [ ] Configurar el dominio y revisar URLs canónicas y metadatos.
- [ ] Revisar las páginas en escritorio y móvil.
- [ ] Confirmar una compilación limpia y probar los enlaces del sitio.

---

<div align="center"><sub>React Â· TypeScript Â· Vite Â· Vercel</sub></div>

