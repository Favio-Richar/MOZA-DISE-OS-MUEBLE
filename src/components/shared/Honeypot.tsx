/** Campo trampa anti-spam: los usuarios no lo ven, los bots suelen rellenarlo. */
export default function Honeypot() {
  return (
    <div className="hp-field" aria-hidden="true">
      <label>No completar este campo<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}
