"use client";

import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useScroll,
    useSpring,
    MotionValue,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

/*
 * Perspective Tunnel Hero (adaptado a MOZA Diseños)
 *
 * Cambios respecto al componente original de 21st.dev:
 *  - El avance del túnel va ligado al scroll normal de la página (contenedor "sticky"),
 *    en lugar de capturar la rueda del mouse con preventDefault. Así funciona en móvil
 *    (táctil), con teclado y no atrapa al usuario dentro de la sección.
 *  - Textos, imágenes y colores se reciben por props; los colores usan la marca (--brand).
 *  - Con "reducir movimiento" activado se muestra una cuadrícula estática accesible.
 */

export interface TunnelImage {
    src: string;
    title: string;
    alt?: string;
}

interface TunnelCardData {
    item: TunnelImage;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

function buildCards(images: TunnelImage[]): TunnelCardData[] {
    return images.map((item, i) => {
        const goldenAngle = i * 137.5 * (Math.PI / 180);
        return {
            item,
            angleCos: Math.cos(goldenAngle),
            angleSin: Math.sin(goldenAngle),
            radiusFactorX: 0.28 + (i % 3) * 0.08,
            radiusFactorY: 0.26 + (i % 2) * 0.09,
            rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
            index: i,
        };
    });
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(130, Math.min(180, stage.width * 0.38))
        : Math.max(180, Math.min(270, stage.width * 0.18));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform(
        [z, pointer.x, pointer.y],
        ([currZ, px, py]: number[]) => {
            const offsetX = baseX - px * panStrength;
            const offsetY = baseY - py * panStrength;
            return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
        }
    );

    return (
        <motion.div
            style={{
                width: cardWidth,
                transform,
                opacity,
                zIndex: card.index + 1,
            }}
            className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none"
        >
            <div className="group relative h-full w-full overflow-hidden rounded-sm bg-neutral-900 shadow-2xl shadow-black/60 ring-1 ring-white/15 transition-all duration-500 hover:ring-[color:var(--brand)] hover:shadow-[color:var(--brand)]/30">
                <img
                    src={card.item.src}
                    alt={card.item.alt ?? card.item.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 sm:p-5">
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/95 drop-shadow-md sm:text-[13px]">
                        {card.item.title}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export interface PerspectiveTunnelHeroProps {
    images: TunnelImage[];
    eyebrow?: string;
    title?: ReactNode;
    description?: string;
    hint?: string;
    /** Alto total de la sección en pantallas (más alto = recorrido más lento). */
    scrollScreens?: number;
    /** Alto del header fijo del sitio, para que el escenario no quede debajo de él. */
    headerOffset?: number;
}

export default function PerspectiveTunnelHero({
    images,
    eyebrow = "Recorrido visual",
    title = (
        <>
            RECORRE
            <br />
            NUESTROS ESPACIOS.
        </>
    ),
    description = "Desliza para avanzar por un pasillo de referencias de mobiliario a medida.",
    hint = "Desliza para explorar",
    scrollScreens = 3.2,
    headerOffset = 84,
}: PerspectiveTunnelHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const cards = useRef(buildCards(images)).current;

    const [stage, setStage] = useState<StageDimensions>({
        width: 1440,
        height: 900,
        isMobile: false,
    });

    useEffect(() => {
        const updateDimensions = () => {
            setStage({
                width: window.innerWidth,
                height: window.innerHeight - headerOffset,
                isMobile: window.innerWidth < 768,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [headerOffset]);

    // El progreso del túnel sigue al scroll de la página dentro de esta sección.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.0001,
    });

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.25, 1, 1, 0]);
    const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

    if (reduce) {
        return (
            <section className="bg-[#20211e] px-6 py-24 text-white" aria-label={eyebrow}>
                <div className="mx-auto max-w-6xl">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b49d]">{eyebrow}</p>
                    <h2 className="mb-4 text-4xl font-medium tracking-tight sm:text-6xl">{title}</h2>
                    <p className="mb-12 max-w-[48ch] text-white/70">{description}</p>
                    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {images.map((image) => (
                            <li key={image.src} className="relative aspect-[4/5] overflow-hidden rounded-sm">
                                <img src={image.src} alt={image.alt ?? image.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs uppercase tracking-[0.2em]">{image.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: `${scrollScreens * 100}svh` }}
            aria-label={eyebrow}
        >
            <div
                className="sticky flex w-full items-center justify-center overflow-hidden bg-[#20211e] text-white select-none"
                style={{
                    top: headerOffset,
                    height: `calc(100svh - ${headerOffset}px)`,
                    perspective: stage.isMobile ? "900px" : "1200px",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Fondo: retícula de puntos + resplandor de marca */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,93,55,0.28)_0%,transparent_70%)]" />

                {/* Anillos de profundidad */}
                <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-[#d8b49d]/20" />
                <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-white/10" />

                {/* Texto central */}
                <motion.div
                    style={{ scale: titleScale, opacity: titleOpacity }}
                    className="pointer-events-none z-0 flex max-w-xl flex-col items-center px-6 text-center"
                >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b49d]">{eyebrow}</p>
                    <h2 className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-5xl font-medium leading-[0.95] tracking-tighter text-transparent sm:text-7xl md:text-8xl">
                        {title}
                    </h2>
                    <p className="mt-4 max-w-[38ch] text-sm font-light text-white/65 sm:text-base">{description}</p>
                </motion.div>

                {/* Indicador de scroll */}
                <motion.div
                    style={{ opacity: promptOpacity }}
                    className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60"
                >
                    <span>{hint}</span>
                    <div className="h-6 w-px bg-gradient-to-b from-[#d8b49d] to-transparent" />
                </motion.div>

                {/* Plano 3D */}
                <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    {cards.map((card) => (
                        <TunnelCard
                            key={card.item.src}
                            card={card}
                            progress={smoothProgress}
                            pointer={pointer}
                            total={cards.length}
                            stage={stage}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
