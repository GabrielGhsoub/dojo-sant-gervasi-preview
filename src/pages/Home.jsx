/* Home, rewritten to the 2026-09-07 brief.

   His words, kept literally: the header "Artes marciales en Sant Gervasi",
   the line under it "50 años formando personas dentro y fuera del tatami",
   the two entry paths ("Niños · Jóvenes · Adultos" and the discipline row),
   "no tienes por qué elegir un único camino", "un Dojo para toda la familia",
   and "Escuela de valores" as a quiet thread rather than a banner.

   Everything factual still comes off dojosantgervasi.es: the weekly table, the
   fees, the four values, the teacher roster, the discipline names. The single
   number that comes from the brief instead of the site is the 50 years; their
   own pages say "más de 40" and, on the children's page, "más de 45". */
import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { avisos, brand, days, disciplines, tarifas, teachers, timetable, timetableNote } from '../data/site.js'
import './home.css'

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
}

/* framer-motion animates inline styles, so the reduced-motion media query in
   theme.css never reached these. Honour the preference at the source. */
const still = { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }

/* His line, his order, his separators. */
const disciplineRow = ['Karate', 'Judo', 'BJJ', 'Kickboxing', 'MMA', 'Muay Thai', 'Defensa Personal']

/* Ages read off the weekly table, not invented: alevín 5 a 10, juvenil 11 a 15,
   BJJ infantil 8 a 15, todo lo demás a partir de 15. */
const ages = [
  ['Niños', '5 a 10 años', 'Karate y judo alevín por la tarde, y BJJ a partir de los 8.'],
  ['Jóvenes', '11 a 15 años', 'Karate y judo juvenil, y el grupo de BJJ hasta los 15.'],
  ['Adultos', 'a partir de 15 años', 'Karate, judo, kickboxing, BJJ, MMA, Muay Thai, Krav Maga y acondicionamiento físico.'],
]

/* The reasons Lluís listed in the brief, in his order. */
const motives = [
  'Hacer deporte',
  'Aprender una disciplina',
  'Mejorar técnicamente',
  'Competir',
  'Ponerte en forma',
  'Desconectar',
  'Ganar confianza',
  'Pertenecer a un grupo',
]

export default function Home() {
  const quiet = useReducedMotion()
  const anim = quiet ? still : rise
  const horarios = useRef(null)
  /* Links from other pages that mean "go home and land on this block". A hash
     cannot do it here: under HashRouter the hash is the route. */
  const { state } = useLocation()
  useEffect(() => {
    if (!state?.scrollTo) return
    const el = document.getElementById(state.scrollTo)
    el?.scrollIntoView({ behavior: quiet ? 'auto' : 'smooth', block: 'start' })
  }, [state, quiet])

  return (
    <>
      <section className="hero">
        <img className="hero__bg" src="img/KARATE.jpg" alt="" width="1600" height="1067" fetchPriority="high" />
        <div className="hero__veil" />
        <div className="wrap hero__in">
          <motion.p className="eyebrow hero__eyebrow" variants={anim} initial="hidden" animate="show">
            Dojo Sant Gervasi · {brand.valuesClaim}
          </motion.p>
          <motion.h1 className="hero__h1" variants={anim} initial="hidden" animate="show" custom={1}>
            {brand.briefHeadline}
          </motion.h1>
          <motion.p className="hero__lede" variants={anim} initial="hidden" animate="show" custom={2}>
            {brand.briefSub}
          </motion.p>
          <motion.ul className="hero__row" variants={anim} initial="hidden" animate="show" custom={3}>
            {disciplineRow.map((d) => <li key={d}>{d}</li>)}
          </motion.ul>
          <motion.div className="hero__cta" variants={anim} initial="hidden" animate="show" custom={4}>
            <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
            <button type="button" className="btn btn--onDark"
              onClick={() => horarios.current?.scrollIntoView({ behavior: quiet ? 'auto' : 'smooth' })}>
              Ver horarios
            </button>
          </motion.div>
        </div>
      </section>

      {/* --------------------------------------------------- las dos entradas */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Por dónde entras</p>
          <h2>Dime quién entrena, o dime qué quieres entrenar</h2>
          <p className="lede ent__lede">
            Son las dos formas de buscar. Las dos llevan al mismo tatami de Carrer de
            Buscarons.
          </p>
          <div className="ent">
            <article className="ent__card card">
              <h3>Quiero entrenar</h3>
              <ul className="ent__ages">
                {ages.map(([who, age, what]) => (
                  <li key={who}>
                    <strong>{who}</strong>
                    <em>{age}</em>
                    <span>{what}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="ent__card card">
              <h3>Elige tu disciplina</h3>
              <p className="ent__note">
                Cada una con su recorrido propio: qué es, para quién, cómo es una clase,
                horarios, profesor y cómo se progresa. En esta maqueta está montado el de
                Brazilian Jiu Jitsu; el resto llevan de momento a la reserva.
              </p>
              <ul className="ent__discs">
                {disciplines.map((d) => (
                  <li key={d.key}>
                    {d.key === 'bjj'
                      ? <Link to="/bjj">{d.name}</Link>
                      : <Link to="/clase-gratis">{d.name}</Link>}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- combinaciones */}
      <section className="section section--sand">
        <div className="wrap comb">
          <div>
            <p className="eyebrow">Un solo Dojo, varios caminos</p>
            <h2>No tienes por qué elegir un único camino</h2>
            <p className="lede">
              Cada disciplina está completa por sí sola y no le falta nada. Pero si quieres
              ampliar tu formación, aquí lo tienes al lado, con los mismos profesores y sin
              cambiar de escuela.
            </p>
          </div>
          <ul className="comb__list">
            <li>
              <strong>Dos disciplinas el mismo día</strong>
              <span>
                Martes y jueves el BJJ acaba a las 20:30, y a esa hora empiezan el MMA y el
                judo de adultos. Te quedas y sigues.
              </span>
            </li>
            <li>
              <strong>O repartidas en la semana</strong>
              <span>
                Lunes y miércoles: Krav Maga o Muay Thai a las 19:30 y karate de adultos a
                las 20:30. Viernes por la tarde, acondicionamiento físico.
              </span>
            </li>
            <li>
              <strong>Lo que cuesta sumar</strong>
              <span>
                Según las tarifas del Dojo, la 2ª actividad son 20 euros al mes y la
                asistencia ilimitada, 100.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- familia */}
      <section className="section fam">
        <div className="wrap fam__in">
          <div className="fam__copy">
            <p className="eyebrow">Un Dojo para toda la familia</p>
            <h2>Aquí no entrena una persona, entra una casa</h2>
            <p className="lede">
              Cada uno encuentra lo suyo y todos acaban en el mismo sitio. Distintas edades,
              distintas disciplinas, el mismo tatami y la misma gente esperando en la puerta.
            </p>
            <p>
              De lunes a jueves las clases de niños y jóvenes van de 17:30 a 19:30, y las de
              adultos empiezan justo después. Es el mismo Dojo, la misma tarde y los mismos
              profesores.
            </p>
            <ul className="fam__values">
              {brand.values.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </div>
          <img className="fam__photo" src="img/familias-1.jpg" alt="Familias y alumnos del Dojo Sant Gervasi reunidos en el tatami" loading="lazy" width="1030" height="578" />
        </div>
      </section>

      {/* ------------------------------------------------------------- motivos */}
      <section className="section section--sand">
        <div className="wrap">
          <p className="eyebrow">Por qué viene la gente</p>
          <h2>Hay más de una razón para cruzar la puerta</h2>
          <p className="lede">
            Defenderte es una de ellas, y aquí lo aprendes. Pero hay quien viene por el
            deporte, quien viene por la técnica y quien viene por la gente.
          </p>
          <ul className="mot">
            {motives.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      </section>

      {/* Real photos, all four served by their own site today. Lluís asked for
          exactly this: clases reales antes que stock. */}
      <section className="strip">
        <div className="wrap">
          <p className="eyebrow strip__eyebrow">El Dojo por dentro</p>
          <div className="strip__grid">
            <img src="img/dojo-tatami.jpg" alt="Un profesor corrige a dos niños durante la clase de karate" loading="lazy" width="1030" height="494" />
            <img src="img/ninos-1.jpg" alt="Grupo infantil durante la clase en el tatami del Dojo Sant Gervasi" loading="lazy" width="1030" height="684" />
            <img src="img/karate-adultos.jpg" alt="Clase de karate de adultos haciendo técnica" loading="lazy" width="495" height="400" />
            <img src="img/grupo-karate.jpg" alt="Foto de grupo de alumnos del Dojo Sant Gervasi" loading="lazy" width="1030" height="578" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Qué se entrena aquí</p>
          <h2>Todas las disciplinas, un mismo tatami</h2>
          <div className="disc">
            {disciplines.map((d, i) => (
              <motion.article
                key={d.key} className="disc__item"
                variants={anim} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} custom={i % 4}
              >
                <Link to={d.key === 'bjj' ? '/bjj' : '/clase-gratis'}>
                  <img src={`img/${d.img}`} alt="" loading="lazy" />
                  <h3>{d.name}</h3>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" id="horarios" ref={horarios}>
        <div className="wrap">
          <p className="eyebrow">Horarios</p>
          <h2>La semana, de un vistazo</h2>
          <p className="lede tt__note">{timetableNote}</p>
          <div className="tt__scroll" tabIndex={0} role="region" aria-label="Horario semanal">
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
            <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ profesores */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Profesorado</p>
          <h2>Con quién vas a entrenar</h2>
          <p className="lede">
            En artes marciales el profesor es fundamental. Estos son los del Dojo, con la
            disciplina que lleva cada uno.
          </p>
          <ul className="team">
            {teachers.map((t, i) => (
              <li key={`${t.name}-${i}`}>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </li>
            ))}
          </ul>
          <p className="team__more">
            <Link to="/bjj">Ver la ficha del profesor de BJJ</Link>
          </p>
          {/* The roster is /nosotros/equipo/ verbatim except the BJJ line, which
              follows what Lluís nos pasó por WhatsApp el 8 de septiembre. */}
          <p className="team__src">
            Lista tal y como está en vuestra web, con el profesor de BJJ actualizado con lo
            que nos pasasteis. Decidnos si hay que mover alguna línea más.
          </p>
        </div>
      </section>

      <section className="section section--sand" id="tarifas">
        <div className="wrap tar">
          <div>
            <p className="eyebrow">Tarifas</p>
            <h2>Precios claros</h2>
            <p className="lede">
              Las cuotas van por días de entrenamiento a la semana, no por disciplina. La
              primera clase es gratuita y no compromete a nada.
            </p>
          </div>
          <div>
            <ul className="tar__list">
              {tarifas.map((t) => (
                <li key={t.label} className={t.featured ? 'is-featured' : ''}>
                  <span>{t.label}</span>
                  <strong>{t.price}<em>{t.unit}</em></strong>
                </li>
              ))}
            </ul>
            {/* Both of their Avisos are mandatory costs. A price panel that hides
                them is not the "precios claros" the heading promises. */}
            <ul className="tar__avisos">
              {avisos.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta__in">
          <h2>La primera clase es gratis</h2>
          <p>Eliges la actividad, eliges el día, y el Dojo te confirma.</p>
          <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
        </div>
      </section>
    </>
  )
}
