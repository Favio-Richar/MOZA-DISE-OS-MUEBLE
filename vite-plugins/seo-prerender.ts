import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'
import { catalogItems } from '../src/data/catalog'
import { faqs } from '../src/data/faqs'
import { guides } from '../src/data/guides'
import { ogImage } from '../src/data/images'
import { breadcrumbJsonLd, homeJsonLd } from '../src/data/jsonld'
import { routeSeo, type RouteSeo } from '../src/data/seo'
import { services } from '../src/data/services'
import { defaultSiteUrl, navItems, siteLocale, siteName } from '../src/data/site'

/**
 * SEO en el build (la web es una SPA, así que sin esto Google y las IA que no ejecutan JavaScript
 * solo verían una página vacía):
 *  1. Genera un index.html por ruta (/nosotros/index.html, ...) con title, description, canonical,
 *     Open Graph, Twitter, JSON-LD y un resumen del contenido dentro de <noscript>.
 *  2. Genera sitemap.xml con todas las rutas indexables.
 *  3. Sustituye el dominio de ejemplo por VITE_SITE_URL en robots.txt, llms.txt, etc.
 */
export function seoPrerender(options: { siteUrl: string }): Plugin {
  const siteUrl = options.siteUrl.replace(/\/+$/, '')
  let config: ResolvedConfig

  const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const fullTitle = (route: RouteSeo) => (route.path === '/' ? route.title : `${route.title} | ${siteName}`)
  const urlOf = (route: RouteSeo) => (route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`)

  const crumbName = (routePath: string) => navItems.find(([, to]) => to === routePath)?.[0] ?? routeSeo.find((item) => item.path === routePath)?.title ?? routePath

  function jsonLdFor(route: RouteSeo) {
    if (route.path === '/') return homeJsonLd(siteUrl)
    const segments = route.path.split('/').filter(Boolean)
    const crumbs: [string, string][] =
      segments.length > 1
        ? [[crumbName(`/${segments[0]}`), `/${segments[0]}`], [route.h1, route.path]]
        : [[crumbName(route.path), route.path]]
    return [breadcrumbJsonLd(siteUrl, crumbs)]
  }

  function headTags(route: RouteSeo) {
    const title = esc(fullTitle(route))
    const description = esc(route.description)
    const url = esc(urlOf(route))
    return [
      `<title>${title}</title>`,
      `<meta name="description" content="${description}" />`,
      `<meta name="robots" content="index, follow, max-image-preview:large" />`,
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:site_name" content="${esc(siteName)}" />`,
      `<meta property="og:locale" content="es_ES" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${esc(ogImage)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      `<meta name="twitter:image" content="${esc(ogImage)}" />`,
      ...jsonLdFor(route).map((item) => `<script type="application/ld+json" data-prerender>${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`),
    ].join('\n    ')
  }

  /** Resumen en HTML plano para clientes sin JavaScript (buscadores simples, IA, lectores). */
  function noscriptBody(route: RouteSeo) {
    const links = navItems.map(([label, to]) => `<li><a href="${to}">${esc(label)}</a></li>`).join('')
    const extra =
      route.path === '/'
        ? `<h2>Servicios</h2><ul>${services.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.text)}</li>`).join('')}</ul>` +
          `<h2>Catálogo por ambientes</h2><ul>${catalogItems.map((c) => `<li><a href="/catalogo/${c.slug}">${esc(c.title)}</a>: ${esc(c.copy)}</li>`).join('')}</ul>` +
          `<h2>Guías y consejos</h2><ul>${guides.map((g) => `<li><a href="/guias/${g.slug}">${esc(g.title)}</a>: ${esc(g.summary)}</li>`).join('')}</ul>` +
          `<h2>Preguntas frecuentes</h2>${faqs.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}`
        : ''
    return `<noscript>
      <header><nav aria-label="Navegación principal"><ul>${links}</ul></nav></header>
      <main><h1>${esc(route.h1)}</h1><p>${esc(route.description)}</p>${extra}</main>
      <footer><p>${esc(siteName)} · <a href="/cotizacion">Solicitar cotización</a> · <a href="/contacto">Contacto</a></p></footer>
    </noscript>`
  }

  function render(baseHtml: string, route: RouteSeo) {
    const stripped = baseHtml
      .replace(/<title>[\s\S]*?<\/title>/i, '')
      .replace(/<meta\b[^>]*\b(?:name|property)="(?:description|robots|og:[^"]*|twitter:[^"]*)"[^>]*>\s*/gi, '')
      .replace(/<html\b([^>]*)>/i, (_, attrs: string) => (/\blang=/.test(attrs) ? `<html${attrs}>` : `<html lang="${siteLocale}"${attrs}>`))
    return stripped.replace('</head>', `  ${headTags(route)}\n  </head>`).replace('</body>', `  ${noscriptBody(route)}\n  </body>`)
  }

  function sitemap() {
    const today = new Date().toISOString().slice(0, 10)
    const entries = routeSeo
      .map(
        (route) =>
          `  <url>\n    <loc>${esc(urlOf(route))}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq ?? 'monthly'}</changefreq>\n    <priority>${(route.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`,
      )
      .join('\n')
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
  }

  return {
    name: 'seo-prerender',
    apply: 'build',
    enforce: 'post',
    configResolved(resolved) {
      config = resolved
    },
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') return
      const baseHtml = String(index.source)

      for (const route of routeSeo) {
        const html = render(baseHtml, route)
        if (route.path === '/') {
          index.source = html
        } else {
          this.emitFile({ type: 'asset', fileName: `${route.path.slice(1)}/index.html`, source: html })
        }
      }
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
    },
    closeBundle() {
      // Sustituye el dominio de ejemplo en los archivos de /public ya copiados al build.
      if (siteUrl === defaultSiteUrl) return
      const outDir = path.resolve(config.root, config.build.outDir)
      for (const file of ['robots.txt', 'llms.txt', 'llms-full.txt', 'humans.txt', '.well-known/security.txt']) {
        const target = path.join(outDir, file)
        if (!fs.existsSync(target)) continue
        fs.writeFileSync(target, fs.readFileSync(target, 'utf8').split(defaultSiteUrl).join(siteUrl))
      }
    },
  }
}
