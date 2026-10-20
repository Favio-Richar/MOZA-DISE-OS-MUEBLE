import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CookieConsent from "../components/CookieConsent";
import Lightbox from "../components/effects/Lightbox";
import Marquee from "../components/effects/Marquee";
import StatsStrip from "../components/effects/StatsStrip";
import Reveal from "../components/effects/Reveal";
import ScrollProgress from "../components/effects/ScrollProgress";
import FloatingWhatsApp from "../components/layout/FloatingWhatsApp";
import PromoAlerts from "../components/layout/PromoAlerts";
import Seo from "../components/layout/Seo";
import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import Honeypot from "../components/shared/Honeypot";
import Button from "../components/shared/Button";
import Icon from "../components/shared/Icon";
import SectionHeading from "../components/shared/SectionHeading";
import SmartLink from "../components/shared/SmartLink";
import PerspectiveTunnelHero from "../components/ui/perspective-tunnel-hero";
import { faqs } from "../data/faqs";
import { guides } from "../data/guides";
import { homeJsonLd } from "../data/jsonld";
import { images } from "../data/images";
import { processSteps, services, values } from "../data/services";
import { testimonials } from "../data/testimonials";
import useLeadForm from "../hooks/useLeadForm";
import useScrollManager from "../hooks/useScrollManager";
import { addressLabel, emailHref, emailLabel, facebookHref, formsAreLive, hoursLabel, instagramHref, phoneHref, phoneLabel, whatsappLabel } from "../lib/contact";
import { whatsappHref } from "../lib/leads";
import { siteUrl } from "../lib/env";

const marqueeItems = ["Cocinas a medida", "Closets y vestidores", "Muebles de baño", "Home office", "Mobiliario personalizado", "Diseño · Fabricación · Instalación"];

const galleryImages = [
  { src: images.darkKitchen, alt: "Referencia visual de mobiliario 1" },
  { src: images.officeAlt, alt: "Referencia visual de mobiliario 2" },
  { src: images.bath, alt: "Referencia visual de mobiliario 3" },
  { src: images.closet, alt: "Referencia visual de mobiliario 4" },
  { src: images.kitchenAlt, alt: "Referencia visual de mobiliario 5" },
];

const tunnelImages = [
  { src: images.kitchen, title: "Cocinas", alt: "Referencia de cocina a medida" },
  { src: images.closet, title: "Closets", alt: "Referencia de vestidor con almacenamiento a medida" },
  { src: images.bath, title: "Baños", alt: "Referencia de mueble de baño contemporáneo" },
  { src: images.office, title: "Home office", alt: "Referencia de espacio de trabajo personalizado" },
  { src: images.detail, title: "Detalles", alt: "Detalle de mobiliario curvo en madera" },
  { src: images.kitchenAlt, title: "Cocina cálida", alt: "Referencia de cocina cálida con mobiliario en madera" },
  { src: images.darkKitchen, title: "Cocina oscura", alt: "Referencia de cocina con mobiliario oscuro" },
  { src: images.officeAlt, title: "Estudio", alt: "Referencia de estudio doméstico" },
  { src: images.pantry, title: "Despensa", alt: "Referencia de despensa con almacenamiento integrado" },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { status, onSubmit, loading } = useLeadForm("landing");
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useScrollManager();

  // Parallax suave del texto del hero al hacer scroll.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div className="site-shell">
      <Seo
        title="Muebles a medida | Forma Muebles"
        rawTitle
        description="Diseño, fabricación e instalación de cocinas, closets, muebles de baño, home office y mobiliario personalizado."
        jsonLd={homeJsonLd(siteUrl)}
      />
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <ScrollProgress />
      <SiteHeader variant="landing" />

      <main id="contenido">
        <section className="hero" id="inicio" ref={heroRef}>
          <img src={images.hero} alt="Cocina contemporánea en madera hecha a medida" fetchPriority="high" />
          <div className="hero-overlay" />
          <motion.div className="container hero-content" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.span className="hero-kicker" {...rise(0.1)}>Diseño · Fabricación · Instalación</motion.span>
            <motion.h1 {...rise(0.2)}>Muebles a medida<br />para espacios <em>únicos.</em></motion.h1>
            <motion.p {...rise(0.35)}>Transformamos tus ideas en mobiliario funcional, elegante y creado especialmente para tu espacio.</motion.p>
            <motion.div className="hero-actions" {...rise(0.5)}>
              <Button href="#contacto" variant="light" icon="arrow">Solicitar cotización</Button>
              <Button href="#contacto" variant="secondary" icon="whatsapp">Hablar por WhatsApp</Button>
            </motion.div>
          </motion.div>
          <a className="hero-scroll" href="#servicios"><span>Descubre más</span><span className="scroll-line" /></a>
          <div className="hero-index">01 <span /> 05</div>
        </section>

        <Marquee items={marqueeItems} />

        <section className="intro section" id="nosotros">
          <Reveal className="container intro-grid">
            <div>
              <span className="eyebrow">Mobiliario que se adapta a ti</span>
              <h2>Diseñamos espacios que se sienten tuyos.</h2>
            </div>
            <div className="intro-copy">
              <p>En <strong>Forma Muebles</strong> creamos soluciones personalizadas que integran estética, orden y funcionalidad. Cada proyecto comienza escuchando cómo vives y qué necesitas.</p>
              <a className="text-link" href="#proceso">Conoce nuestro proceso <Icon name="arrow" size={17} /></a>
            </div>
          </Reveal>
        </section>

        <StatsStrip />

        <section className="services section" id="servicios">
          <div className="container">
            <Reveal className="heading-row">
              <SectionHeading eyebrow="Lo que hacemos" title="Soluciones para cada espacio" copy="Diseñamos mobiliario que responde a tu estilo, espacio y forma de vivir." />
              <span className="section-number">02</span>
            </Reveal>
            <Reveal>
              <div className="service-grid">
                {services.map((service, index) => (
                  <article className={`service-card service-${index + 1}`} key={service.title}>
                    <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
                    <div className="service-shade" />
                    <span className="service-number">{service.n}</span>
                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                      <a href="#contacto" aria-label={`Consultar sobre ${service.title}`}><Icon name="arrow" /></a>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="projects section" id="proyectos">
          <div className="container">
            <Reveal className="heading-row">
              <SectionHeading eyebrow="Inspiración para tu proyecto" title="Proyectos destacados" copy="Una muestra visual del tipo de espacios que podemos crear contigo. Imágenes de referencia editables." />
              <Button href="#galeria" variant="outline" icon="arrow">Ver galería</Button>
            </Reveal>
            <Reveal>
              <div className="project-grid">
                <article className="project project-main">
                  <img src={images.kitchenAlt} alt="Referencia de cocina cálida con mobiliario en madera" loading="lazy" decoding="async" />
                  <div className="project-info"><span>Cocinas</span><h3>Proyecto de referencia 01</h3><p>Distribución, acabados y detalles a definir con el cliente.</p></div>
                </article>
                <article className="project">
                  <img src={images.closet} alt="Referencia de vestidor con almacenamiento a medida" loading="lazy" decoding="async" />
                  <div className="project-info"><span>Closets</span><h3>Proyecto de referencia 02</h3><p>Configuración interior personalizada según el espacio.</p></div>
                </article>
                <article className="project">
                  <img src={images.bath} alt="Referencia de mueble de baño contemporáneo" loading="lazy" decoding="async" />
                  <div className="project-info"><span>Baños</span><h3>Proyecto de referencia 03</h3><p>Mueble suspendido y selección de acabado por definir.</p></div>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <div id="recorrido">
          <PerspectiveTunnelHero
            images={tunnelImages}
            eyebrow="Recorrido visual"
            title={<>RECORRE<br />NUESTROS<br />ESPACIOS.</>}
            description="Desliza para avanzar por un pasillo de referencias de cocinas, closets, baños y más."
            hint="Desliza para explorar"
          />
        </div>

        <section className="value-section section">
          <Reveal className="container value-grid">
            <div className="value-image">
              <img src={images.detail} alt="Detalle de mobiliario curvo en madera" loading="lazy" decoding="async" />
              <div className="value-tag"><Icon name="ruler" /><span>Hecho para<br />tu espacio</span></div>
            </div>
            <div className="value-content">
              <SectionHeading eyebrow="Nuestra forma de trabajar" title="De la idea al espacio terminado" copy="Un servicio integral, con decisiones claras y acompañamiento en cada etapa." />
              <div className="value-list">
                {values.map(([title, text], index) => (
                  <div className="value-item" key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                    <Icon name="check" size={18} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="process section" id="proceso">
          <Reveal className="container">
            <SectionHeading eyebrow="Simple y transparente" title="Así creamos tu proyecto" copy="Cinco pasos para convertir una necesidad en una solución hecha a medida." light />
            <div className="process-line">
              {processSteps.map(([step, text], index) => (
                <div className="process-step" key={step}>
                  <span className="step-dot">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="workshop-teaser section" id="taller">
          <Reveal className="container teaser-grid">
            <div className="teaser-image"><img src={images.darkKitchen} alt="Mobiliario a medida en proceso de fabricación en nuestro taller" loading="lazy" decoding="async" /></div>
            <div className="teaser-copy">
              <span className="eyebrow" style={{ color: "#d8b49d" }}>Fabricación propia</span>
              <h2>Conoce nuestro taller y cómo fabricamos.</h2>
              <p>Cada mueble pasa por etapas controladas: planos, corte, acabados, armado e instalación. Mira cómo trabajamos y las áreas donde se hace realidad tu proyecto.</p>
              <ul>{["Planos técnicos antes de producir", "Revisión de calidad en cada etapa", "Instalación coordinada en tu espacio"].map((item) => <li key={item}><Icon name="check" size={18} />{item}</li>)}</ul>
              <Button href="/taller" variant="light" icon="arrow">Ver el taller</Button>
            </div>
          </Reveal>
        </section>

        <section className="catalog section" id="catalogo">
          <div className="container">
            <Reveal className="heading-row">
              <SectionHeading eyebrow="Explora posibilidades" title="Catálogo por ambientes" copy="Encuentra una categoría y consúltanos para personalizarla según tus medidas." />
              <Button variant="outline" icon="arrow">Solicitar catálogo</Button>
            </Reveal>
            <Reveal>
              <div className="catalog-grid">
                {[
                  ["Cocinas", "Islas, columnas, alacenas y módulos personalizados.", images.kitchen],
                  ["Closets y vestidores", "Interiores configurables para organizar mejor tu espacio.", images.closet],
                  ["Baños", "Vanitorios y muebles auxiliares adaptados a cada ambiente.", images.bath],
                  ["Home office", "Escritorios, bibliotecas y almacenamiento integrado.", images.office],
                ].map(([title, text, image]) => (
                  <article className="catalog-item" key={title}>
                    <div className="catalog-image"><img src={image} alt={title} loading="lazy" decoding="async" /><span>Consultar</span></div>
                    <h3>{title}</h3><p>{text}</p>
                    <a className="text-link" href="#contacto">Quiero más información <Icon name="arrow" size={16} /></a>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="gallery section" id="galeria">
          <div className="container">
            <Reveal><SectionHeading eyebrow="Detalles que inspiran" title="Galería de proyectos" copy="Referencias visuales para reemplazar con fotografías reales de trabajos realizados." /></Reveal>
            <Reveal>
              <div className="gallery-grid">
                {galleryImages.map((image, index) => (
                  <figure key={image.src} className={`gallery-${index + 1} zoomable`} role="button" tabIndex={0} aria-label={`Ampliar imagen ${index + 1}`} onClick={() => setLightbox(index)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightbox(index)}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" /></figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="testimonials section">
          <div className="container">
            <Reveal className="heading-row">
              <SectionHeading eyebrow="La experiencia del cliente" title="Opiniones que construyen confianza" copy="Sección preparada para incorporar testimonios reales y verificables." />
              <div className="quote-mark">“</div>
            </Reveal>
            <Reveal>
              <div className="testimonial-grid">
                {testimonials.map((item, n) => (
                  <article className="testimonial" key={n}>
                    {item.rating > 0
                      ? <span className="stars stars-filled" role="img" aria-label={`${item.rating} de 5 estrellas`}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</span>
                      : <span className="stars" aria-label="Calificación pendiente">— — — — —</span>}
                    <blockquote>“{item.text}”</blockquote>
                    <div><span className="avatar">{(n + 1).toString().padStart(2, "0")}</span><p><strong>{item.name}</strong><small>{item.project} · {item.city}</small></p></div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="guides-teaser section">
          <div className="container">
            <Reveal className="heading-row">
              <SectionHeading eyebrow="Aprende antes de decidir" title="Guías y consejos" copy="Cómo medir, qué material elegir y cómo planificar tu mueble a medida." />
              <Button href="/guias" variant="outline" icon="arrow">Ver todas las guías</Button>
            </Reveal>
            <Reveal>
              <div className="guide-grid">{guides.map((guide) => (
                <SmartLink href={`/guias/${guide.slug}`} className="guide-card" key={guide.slug}>
                  <div><img src={guide.image} alt={guide.title} loading="lazy" decoding="async" /></div>
                  <span>{guide.category} · {guide.readMinutes} min de lectura</span><h2>{guide.title}</h2><p>{guide.summary}</p><em>Leer guía <Icon name="arrow" size={16} /></em>
                </SmartLink>
              ))}</div>
            </Reveal>
          </div>
        </section>

        <section className="faq section" id="faq">
          <Reveal className="container faq-grid">
            <div>
              <SectionHeading eyebrow="Antes de comenzar" title="Preguntas frecuentes" copy="Información general para ayudarte a dar el primer paso." />
              <p className="faq-help">¿Tienes otra consulta?</p>
              <Button href="#contacto" variant="outline" icon="whatsapp">Escríbenos por WhatsApp</Button>
            </div>
            <div className="accordion">
              {faqs.map(([question, answer], index) => (
                <div className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}>
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                    <span>{question}</span><Icon name="chevron" />
                  </button>
                  <div className="faq-answer"><p>{answer}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="final-cta">
          <img src={images.hero} alt="" loading="lazy" decoding="async" />
          <div className="final-overlay" />
          <Reveal className="container final-content">
            <span className="eyebrow">Tu espacio puede ser el próximo</span>
            <h2>Cotiza tu proyecto a medida</h2>
            <p>Cuéntanos qué tienes en mente. Te ayudamos a convertirlo en una propuesta pensada para ti.</p>
            <div><Button href="#contacto" variant="light" icon="arrow">Solicitar cotización</Button><Button href="#contacto" variant="secondary" icon="whatsapp">WhatsApp</Button></div>
          </Reveal>
        </section>

        <section className="social section">
          <div className="container social-row">
            <div><span className="eyebrow">Síguenos e inspírate</span><h2>Más ideas. Más espacios. Más detalles.</h2></div>
            <div className="social-links">
              <SmartLink href={instagramHref} aria-label="Instagram"><Icon name="instagram" /> Instagram</SmartLink>
              <SmartLink href={facebookHref} aria-label="Facebook"><Icon name="facebook" /> Facebook</SmartLink>
            </div>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <Reveal className="container contact-grid">
            <div className="contact-copy">
              <SectionHeading eyebrow="Hablemos de tu proyecto" title="Demos forma a tu idea" copy="Completa el formulario con información inicial. Los datos de contacto son editables y deben reemplazarse antes de publicar." />
              <div className="contact-list">
                <SmartLink href={whatsappHref()}><Icon name="whatsapp" /><span><small>WhatsApp</small>{whatsappLabel}</span></SmartLink>
                <SmartLink href={phoneHref}><Icon name="phone" /><span><small>Teléfono</small>{phoneLabel}</span></SmartLink>
                <SmartLink href={emailHref}><Icon name="mail" /><span><small>Correo</small>{emailLabel}</span></SmartLink>
                <SmartLink href="/contacto#mapa"><Icon name="map" /><span><small>Ubicación</small>{addressLabel}</span></SmartLink>
                <div><Icon name="clock" /><span><small>Horario</small>{hoursLabel}</span></div>
              </div>
            </div>
            <form className="contact-form" onSubmit={onSubmit}>
              <div className="form-row">
                <label>Nombre completo<input required name="name" placeholder="Escribe tu nombre" autoComplete="name" /></label>
                <label>Teléfono / WhatsApp<input required name="phone" type="tel" placeholder="Tu número de contacto" autoComplete="tel" /></label>
              </div>
              <div className="form-row">
                <label>Correo electrónico<input required type="email" name="email" placeholder="tu@correo.com" autoComplete="email" /></label>
                <label>Tipo de proyecto<select name="project" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Cocina</option><option>Closet</option><option>Mueble de baño</option><option>Home office</option><option>Otro mobiliario</option></select></label>
              </div>
              <label>Cuéntanos sobre tu proyecto<textarea name="message" rows={5} placeholder="Espacio, medidas aproximadas, ubicación y lo que tienes en mente..." /></label>
              <Honeypot />
              <div className="form-footer">
                <p>Al enviar, aceptas ser contactado para responder tu solicitud.</p>
                <button className="button button-primary" type="submit" disabled={loading}>{loading ? <><span className="spinner" /> Enviando...</> : <>Enviar solicitud <Icon name="arrow" size={18} /></>}</button>
              </div>
              {status === "success" && <p className="form-success" role="status"><Icon name="check" /> {formsAreLive ? "Gracias. Recibimos tu solicitud y te contactaremos pronto." : "Gracias. La demostración del formulario se envió correctamente."}</p>}
              {status === "error" && <p className="form-error" role="alert">No pudimos enviar tu solicitud. Inténtalo nuevamente en unos minutos.</p>}
            </form>
          </Reveal>
        </section>
      </main>

      <Lightbox images={galleryImages} index={lightbox} onChange={setLightbox} />
      <SiteFooter variant="landing" />
      <PromoAlerts />
      <FloatingWhatsApp />
      <CookieConsent />
    </div>
  );
}
