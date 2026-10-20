import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina en la parte superior que indica cuánto se ha recorrido de la página. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
