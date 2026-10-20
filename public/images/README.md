# Recursos visuales del sitio

Guarda aquí las fotografías y piezas de marca aprobadas por el cliente. Mantén los nombres de archivo en minúsculas, sin espacios ni tildes, y usa guiones para separar palabras.

## Carpetas

| Carpeta | Contenido |
| --- | --- |
| `brand/` | Logotipo final, versiones de marca y recursos gráficos autorizados. |
| `home/` | Portada y secciones de Inicio. |
| `about/` | Fotografías ambientales, espacios de trabajo e información de empresa. |
| `services/` | Cocinas, closets, baños y otros servicios. |
| `workshop/` | Taller, fabricación, materiales y proceso. |
| `projects/` | Trabajos reales; crea una subcarpeta por proyecto. |
| `catalog/` | Productos y categorías; crea subcarpetas si hay galerías. |
| `guides/` | Portadas e ilustraciones de artículos. |
| `shared/` | Recursos que se usan en más de una página. |

Ejemplo de galería:

```text
projects/
└── cocina-las-condes/
    ├── cocina-las-condes-01.webp
    ├── cocina-las-condes-02.webp
    └── cocina-las-condes-03.webp
```

## Cómo usarlas en la web

Los archivos de `public/` se solicitan desde una ruta que comienza en `/`. Por ejemplo, el archivo `public/images/home/cocina-principal.webp` se referencia como `/images/home/cocina-principal.webp`.

Centraliza las rutas reutilizables en `src/data/images.ts`. Para proyectos, categorías, equipo y artículos, actualiza también sus archivos de contenido correspondientes en `src/data/`.

Antes de publicar una imagen, confirma que la empresa tenga autorización para usarla y agrega un texto alternativo que describa lo que aparece. Evita usar imágenes de referencia como si fueran trabajos realizados por la empresa.

## Imagen de referencia actual

`about/moza-disenos-ambiente-01.jpg` y `about/moza-disenos-ambiente-02.jpg` son visualizaciones ambientales que aparecen en Nosotros. Muestran el nombre MOZA DISEÑOS integrado en escenas de exhibición; no son archivos de logotipo.
