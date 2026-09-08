/* An honest hole in the page.
   Lluís asked for teacher bios, testimonials and a class breakdown. Some of that
   is not published anywhere on dojosantgervasi.es, so inventing it would put
   words in his mouth on a page he may end up publishing. Every gap is shown as
   what it is: a box that says what we need and who has to send it. */
export default function Slot({ title, children }) {
  return (
    <div className="slot">
      <p className="slot__tag">Falta vuestro contenido</p>
      <h3>{title}</h3>
      <div className="slot__body">{children}</div>
    </div>
  )
}
