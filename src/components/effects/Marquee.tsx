/** Cinta de texto en movimiento continuo (solo CSS). Se detiene con "reducir movimiento". */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((item) => <li key={item}>{item}<i /></li>)}
    </ul>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}
