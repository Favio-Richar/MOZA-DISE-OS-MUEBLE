import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { company } from "../../data/company";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || !value) return;
    if (reduce) { setShown(value); return; }
    const controls = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return <span ref={ref} style={value ? undefined : { opacity: 0.35 }}>{value ? `${shown}${suffix}` : `00${suffix}`}</span>;
}

/** Franja de cifras de confianza con contadores animados (datos en data/company.ts). */
export default function StatsStrip({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`stats-strip ${dark ? "stats-dark" : ""}`} aria-label="Cifras de la empresa">
      <div className="container stats-grid">
        {company.stats.map((stat) => (
          <div key={stat.label}><strong><Counter value={stat.value} suffix={stat.suffix} /></strong><span>{stat.label}</span></div>
        ))}
      </div>
    </section>
  );
}
