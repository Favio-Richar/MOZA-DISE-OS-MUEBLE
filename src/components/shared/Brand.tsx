import SmartLink from "./SmartLink";

export default function Brand({ tone = "light" }: { tone?: "light" | "dark" }) {
  const logo = tone === "dark" ? "/img/LogonocheWebsite.png" : "/img/Logo%20DIAAAWebsite.svg";

  return (
    <SmartLink className={`brand brand-${tone}`} href="/" aria-label="MOZA Diseños, inicio">
      <img
        className="brand-logo"
        src={logo}
        alt="Logotipo de MOZA Diseños, muebles de cocina"
        width={tone === "dark" ? 1903 : 1827}
        height={tone === "dark" ? 935 : 996}
      />
    </SmartLink>
  );
}
