import Button from "../shared/Button";

export default function ConversionBand() {
  return (
    <section className="conversion-band">
      <div className="container">
        <div><span className="eyebrow">Conversemos</span><h2>¿Tienes un espacio en mente?</h2><p>Comparte tu idea, medidas aproximadas y referencias para iniciar una cotización.</p></div>
        <div><Button href="/cotizacion" variant="light" icon="arrow">Solicitar cotización</Button><Button href="/contacto" variant="secondary" icon="whatsapp">Contactar</Button></div>
      </div>
    </section>
  );
}
