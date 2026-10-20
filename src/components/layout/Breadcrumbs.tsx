import SmartLink from "../shared/SmartLink";

export default function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <SmartLink href="/">Inicio</SmartLink>{items.map((item) => <span key={item}><i>/</i>{item}</span>)}
    </nav>
  );
}
