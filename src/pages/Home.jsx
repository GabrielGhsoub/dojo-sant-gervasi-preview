import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brand, days, disciplines, tarifas, timetable, timetableNote } from '../data/site.js'
import './home.css'

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero__bg" src="img/KARATE.jpg" alt="" />
        <div className="hero__veil" />
        <div className="wrap hero__in">
          <motion.p className="eyebrow hero__eyebrow" variants={rise} initial="hidden" animate="show">
            Sant Gervasi, Barcelona · desde {brand.since}
          </motion.p>
          <motion.h1 variants={rise} initial="hidden" animate="show" custom={1}>
            Artes marciales<br />y defensa personal
          </motion.h1>
          <motion.p className="hero__lede" variants={rise} initial="hidden" animate="show" custom={2}>
            Judo, karate, kickboxing, Krav Maga, Brazilian Jiu Jitsu y MMA. Desde los cinco
            años hasta la edad que sea, en un tatami de barrio con profesores que se saben
            tu nombre.
          </motion.p>
          <motion.div className="hero__cta" variants={rise} initial="hidden" animate="show" custom={3}>
            <Link to="/clase-gratis" className="btn btn--primary">Prueba una clase gratis</Link>
            <a href="#horarios" className="btn btn--onDark">Ver horarios</a>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Qué se entrena aquí</p>
          <h2>Diez disciplinas, un mismo tatami</h2>
          <div className="disc">
            {disciplines.map((d, i) => (
              <motion.article
                key={d.key} className="disc__item"
                variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} custom={i % 4}
              >
                <img src={`img/${d.img}`} alt="" loading="lazy" />
                <h3>{d.name}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" id="horarios">
        <div className="wrap">
          <p className="eyebrow">Horarios</p>
          <h2>La semana, de un vistazo</h2>
          <p className="lede tt__note">{timetableNote}</p>
          <div className="tt__scroll">
            <table className="tt">
              <thead>
                <tr>
                  <th />
                  {days.map((d) => <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {timetable.map((row) => (
                  <tr key={row.time}>
                    <th scope="row">{row.time}</th>
                    {row.slots.map((cells, i) => (
                      <td key={i}>
                        {cells.map((c) => <span key={c}>{c}</span>)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tt__cta">
            <Link to="/clase-gratis" className="btn btn--primary">Reservar una clase de prueba</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap tar">
          <div>
            <p className="eyebrow">Tarifas</p>
            <h2>Precios claros, sin permanencia</h2>
            <p className="lede">
              Las cuotas son mensuales. La primera clase es gratuita y no compromete a nada.
            </p>
          </div>
          <ul className="tar__list">
            {tarifas.map((t) => (
              <li key={t.label} className={t.featured ? 'is-featured' : ''}>
                <span>{t.label}</span>
                <strong>{t.price}<em>{t.unit}</em></strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta__in">
          <h2>La primera clase es gratis</h2>
          <p>Eliges la actividad, eliges el día, y el dojo te confirma.</p>
          <Link to="/clase-gratis" className="btn btn--primary">Elegir mi clase</Link>
        </div>
      </section>
    </>
  )
}
