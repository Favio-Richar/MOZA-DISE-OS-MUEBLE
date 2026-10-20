import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../shared/Icon";

export type LightboxImage = { src: string; alt: string };

/**
 * Visor de imágenes a pantalla completa: flechas del teclado, Esc, botones y
 * deslizamiento táctil. `index` null = cerrado.
 */
export default function Lightbox({ images, index, onChange }: { images: LightboxImage[]; index: number | null; onChange: (index: number | null) => void }) {
  const open = index !== null;

  useEffect(() => {
    if (index === null) return;
    const total = images.length;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") onChange((index + 1) % total);
      if (event.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [index, images.length, onChange]);

  const go = (step: number) => index !== null && onChange((index + step + images.length) % images.length);
  let touchX = 0;

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => onChange(null)}
          onTouchStart={(e) => { touchX = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1); }}
        >
          <button className="lightbox-close" onClick={() => onChange(null)} aria-label="Cerrar galería"><Icon name="close" /></button>
          {images.length > 1 && <button className="lightbox-nav lightbox-prev" onMouseDown={(e) => e.stopPropagation()} onClick={() => go(-1)} aria-label="Imagen anterior"><Icon name="arrow" /></button>}
          <img key={images[index].src} src={images[index].src} alt={images[index].alt} onMouseDown={(e) => e.stopPropagation()} />
          {images.length > 1 && <button className="lightbox-nav lightbox-next" onMouseDown={(e) => e.stopPropagation()} onClick={() => go(1)} aria-label="Imagen siguiente"><Icon name="arrow" /></button>}
          <span className="lightbox-count">{index + 1} / {images.length}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
