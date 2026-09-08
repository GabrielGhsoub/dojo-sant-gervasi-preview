/* The BJJ page, built to the running order Lluís asked for on 2026-09-07:
   Qué es, Para quién, Cómo es una clase, Qué vas a aprender, Horarios, Profesor,
   Cómo progresas, Precio y prueba, Reservar.

   Sources for every claim on this page:
     · /clases/brasilian-jiu-jitsu/  what BJJ is, the 60 minutes, the two age groups
     · Lluís by WhatsApp, 2026-09-08  the BJJ week and the profesor, Steve Luzardo
     · /horarios/                    the rest of the weekly table (re-read 2026-09-08)
     · /clases/judo-o-karate-para-ninos/  the children's programme and its benefits
     · /tarifas/                     free trial, free matrícula, the fee table, the avisos
     · /nosotros/                    "Somos una escuela de valores"
     · the joinchat widget           the WhatsApp number
   Nothing else is asserted about the Dojo. Where the site publishes nothing,
   the page carries a <Slot> instead of a guess. */
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Slot from '../components/Slot.jsx'
import { avisos, bjjFacts, bjjSlots, bjjTeacher, brand, tarifas, timetableNote } from '../data/site.js'
import './bjj.css'

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
}
const still = { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }

/* Their own BJJ page writes times as "de 17:30h a 18:30h". Ours are stored the
   same way, so the prose only needs the preposition. */
function hours(time) {
  return `de ${time.trim()}`
}

const learn = [
  ['Caer sin hacerte daño', 'Lo primero que se aprende y lo que más se acaba usando fuera del tatami.'],
  ['Derribos y proyecciones', 'Llevar el combate al suelo, que es donde el BJJ juega.'],
  ['El juego de agarres', 'El grappling: controlar, avanzar posición y no dejarte controlar.'],
  ['Luxaciones y estrangulaciones', 'Técnicas de brazo y de pierna hasta la sumisión, siempre con el compañero avisando.'],
  ['Conciencia corporal', 'Saber dónde está cada parte de ti, y cada parte del otro, con los ojos cerrados.'],
  ['Resolver bajo presión', 'Cada movimiento tiene respuesta. Hay que leerla y elegir rápido.'],
  ['Fuerza, flexibilidad y resistencia', 'La condición física llega sola cuando entrenas dos días a la semana.'],
]

const kidsBenefits = [
  'Disciplina', 'Confianza', 'Coordinación', 'Concentración',
  'Compañerismo', 'Respeto', 'Aprendizaje técnico',
]

/* The four fee rows a BJJ visitor actually looks at. Their /tarifas/ table is
   priced by training days per week, not by discipline, so this page puts no price
   on BJJ itself. */
const feeKeys = ['1 día a la semana', '2 a 3 días a la semana', '2ª actividad', 'Clase de prueba']

export default function Bjj() {
  const quiet = useReducedMotion()
  const anim = quiet ? still : rise
  const horarios = useRef(null)
  /* The sticky booking bar is fixed, so the footer needs room underneath it on a
     phone. Only this page has the bar, so only this page pays for it. */
  useEffect(() => {
    document.body.classList.add('has-bookbar')
    return () => document.body.classList.remove('has-bookbar')
  }, [])
  /* bjjSlots() comes out in table order, which puts the Friday open mat first
     because it is the earliest hour of the week. Read as a list, the week wants
     day order. */
  const byWeek = (a, b) => a.dayIndex - b.dayIndex || a.time.localeCompare(b.time)
  const slots = bjjSlots()
  const kids = slots.filter((s) => s.cell.includes('8 a 15')).sort(byWeek)
  const adults = slots.filter((s) => !s.cell.includes('8 a 15')).sort(byWeek)
  const fees = feeKeys.map((k) => tarifas.find((t) => t.label === k)).filter(Boolean)

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="bhero">
        <img className="bhero__bg" src="img/bjj-rolling.jpg" alt="" width="1030" height="579" fetchPriority="high" />
        <div className="bhero__veil" />
        <div className="wrap bhero__in">
          <motion.p className="eyebrow bhero__eyebrow" variants={anim} initial="hidden" animate="show">
            Brazilian Jiu Jitsu · Dojo Sant Gervasi
          </motion.p>
          <motion.h1 variants={anim} initial="hidden" animate="show" custom={1}>
            Brazilian Jiu Jitsu<br />en Sant Gervasi
          </motion.h1>
          <motion.p className="bhero__lede" variants={anim} initial="hidden" animate="show" custom={2}>
            Seis sesiones de BJJ cada semana entre adultos e infantil, open mat incluido, y
            un grupo propio para los de 8 a 15 años. Puedes empezar de cero un martes y
            seguir aquí dentro de diez años.
          </motion.p>
          <motion.div className="bhero__cta" variants={anim} initial="hidden" animate="show" custom={3}>
            <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
            <a className="btn btn--onDark" href={brand.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp {brand.whatsapp}
            </a>
          </motion.div>
          <motion.p className="bhero__fine" variants={anim} initial="hidden" animate="show" custom={4}>
            La clase de prueba es gratis y la matrícula de inscripción también.
          </motion.p>
        </div>
      </section>

      {/* ------------------------------------------------------------- qué es */}
      <section className="section" id="que-es">
        <div className="wrap bcols">
          <div>
            <p className="eyebrow">Qué es</p>
            <h2>Un arte marcial que se resuelve en el suelo</h2>
          </div>
          <div>
            <p className="lede">
              El Brazilian Jiu Jitsu viene del jiu jitsu tradicional japonés. Se entrena
              cuerpo a cuerpo: llevar al compañero al tatami con un derribo o una proyección
              y, ya abajo, resolver la situación con agarres, luxaciones o estrangulaciones
              hasta que uno de los dos cede.
            </p>
            <p>
              No hace falta ser el más fuerte ni el más rápido. Una técnica bien hecha
              neutraliza a alguien más grande que tú, y esa es la parte que engancha: cada
              movimiento tiene respuesta, y hay que encontrarla mientras el otro también
              piensa. Físicamente ganas fuerza, flexibilidad y resistencia sin darte cuenta.
            </p>
            <p className="bfact">Cada clase dura {bjjFacts.duration}.</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- por qué aquí */}
      <section className="section section--sand">
        <div className="wrap">
          <p className="eyebrow">Por qué aquí</p>
          <h2>Quieres entrenar BJJ en Sant Gervasi. Esto es lo que encuentras</h2>
          <div className="bwhy">
            {[
              ['Un profesor de BJJ', <>Steve Luzardo, cinturón negro, con más de quince años entrenando y enseñando Brazilian Jiu Jitsu. Profesor titulado de la filial de Cícero Costha y alumno directo de Javier Feliubadaló.</>],
              ['Seis sesiones a la semana', <>Martes y jueves {hours('19:30 a 20:30')}, viernes {hours('18:30 a 19:30')}, open mat los viernes {hours('16:30 a 17:30')} y el grupo de 8 a 15 años lunes y miércoles.</>],
              ['Un grupo infantil de verdad', <>De 8 a 15 años, con su horario y su clase. No es un hueco dentro del entrenamiento de los adultos.</>],
              ['Y alrededor, una escuela entera', <>Judo, karate, kickboxing, MMA, Muay Thai y Krav Maga en el mismo tatami de Carrer de Buscarons. El BJJ está completo por sí solo; tener el resto al lado es un extra, no un parche.</>],
            ].map(([t, body], i) => (
              <motion.article
                key={t} className="bwhy__item card"
                variants={anim} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} custom={i}
              >
                <h3>{t}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </div>
          <p className="bcta-mid">
            <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- para quién */}
      <section className="section" id="para-quien">
        <div className="wrap">
          <p className="eyebrow">Para quién es</p>
          <h2>Tres puertas de entrada</h2>
          <div className="bwho">
            <article className="bwho__item">
              <img src="img/bjj-grupo-2.jpg" alt="Entrenamiento de BJJ en el tatami del Dojo Sant Gervasi" loading="lazy" width="1030" height="578" />
              <h3>Adultos, a partir de 15 años</h3>
              <p>
                Martes y jueves por la tarde, viernes antes de cenar y open mat para
                practicar libre. Quien empieza de cero y quien lleva años entrenan en el
                mismo grupo, y Steve adapta el trabajo al nivel de cada uno.
              </p>
            </article>
            <article className="bwho__item">
              <img src="img/bjj-grupo-1.jpg" alt="Grupo de BJJ entrenando por parejas en el tatami del Dojo Sant Gervasi" loading="lazy" width="1030" height="578" />
              <h3>Niños y jóvenes, de 8 a 15 años</h3>
              <p>
                Lunes y miércoles, con su propio grupo. Aquí abajo tienes el programa
                entero, porque es la pregunta que más hacen los padres.
              </p>
            </article>
            <article className="bwho__item">
              <img src="img/bjj-grupo-3.jpg" alt="Dos alumnos practicando en el suelo durante una clase de BJJ" loading="lazy" width="1030" height="578" />
              <h3>Principiantes</h3>
              <p>
                Nadie llega sabiendo. Se empieza por caer sin hacerte daño, moverte en el
                suelo y salir de una postura incómoda. El primer día no tienes que saber
                nada y no compites con nadie.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- BJJ infantil */}
      <section className="section section--sand" id="infantil">
        <div className="wrap bkids">
          <div className="bkids__copy">
            <p className="eyebrow">Programa infantil y juvenil</p>
            <h2>BJJ para niños y jóvenes de 8 a 15 años</h2>
            <p className="lede">
              Lunes y miércoles {hours('17:30 a 18:30')}, con su grupo, su ritmo y su
              profesor. No es una clase de adultos en pequeño.
            </p>
            <p>
              Es una actividad educativa y deportiva. Los chavales mejoran coordinación,
              equilibrio, fuerza y flexibilidad, y a la vez aprenden a pensar, analizar y
              resolver con técnica en lugar de con fuerza. Cada entrenamiento trae un reto
              nuevo, y resolverlo delante de sus compañeros es lo que les deja la seguridad
              que se llevan fuera del tatami.
            </p>
            <ul className="bchips">
              {kidsBenefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <p className="bkids__note">
              Es artes marciales, así que aprenden a defenderse. Pero para nosotros el eje
              es otro: educación, deporte, valores y confianza. Somos una escuela de valores,
              y en el grupo infantil es donde más se nota.
            </p>
            <p>
              <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
            </p>
          </div>
          <div className="bkids__side">
            <img className="bkids__photo" src="img/dojo-tatami.jpg" alt="Clase infantil de karate en el tatami del Dojo Sant Gervasi" loading="lazy" width="1030" height="494" />
            <Slot title="Fotos del grupo infantil de BJJ">
              <p>
                La foto de arriba es de una clase infantil del Dojo, no del grupo de BJJ.
                Pasadnos cuatro o cinco fotos de los chavales rodando y las cambiamos.
              </p>
            </Slot>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- cómo es una clase */}
      <section className="section" id="clase">
        <div className="wrap">
          <p className="eyebrow">Cómo es una clase</p>
          <h2>Sesenta minutos, siempre con la misma forma</h2>
          <ol className="bsteps">
            {[
              ['Saludo y calentamiento', 'Se entra al tatami, se saluda y se calienta el cuerpo para trabajar en el suelo sin lesionarse.'],
              ['Técnica del día', 'El profesor enseña un movimiento concreto y lo desmonta paso a paso delante de todos.'],
              ['Práctica con compañero', 'Se repite la técnica por parejas, sin prisa, hasta que sale sola. Aquí es donde se aprende.'],
              ['Práctica libre', 'Rodar aplicando lo trabajado. Se va tan fuerte o tan suave como acordéis, y siempre se puede parar.'],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="bsteps__n" aria-hidden="true">{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <Slot title="Confirmadnos el orden de la clase">
            <p>
              El Dojo publica que la clase dura {bjjFacts.duration}, y Steve nos contó cómo
              entiende la enseñanza, pero no el minuto a minuto. Lo de arriba es nuestra
              propuesta, escrita para que se entienda desde fuera. Decidnos cómo lo hacéis
              de verdad y lo reescribimos con vuestras palabras.
            </p>
          </Slot>
        </div>
      </section>

      {/* ----------------------------------------------------- qué vas a aprender */}
      <section className="section section--sand">
        <div className="wrap">
          <p className="eyebrow">Qué vas a aprender</p>
          <h2>Lo que te llevas del primer año</h2>
          <div className="blearn">
            {learn.map(([t, d], i) => (
              <motion.div
                key={t} className="blearn__item"
                variants={anim} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} custom={i % 4}
              >
                <h3>{t}</h3>
                <p>{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- horarios */}
      <section className="section" id="horarios" ref={horarios}>
        <div className="wrap">
          <p className="eyebrow">Horarios</p>
          <h2>Cuándo se entrena BJJ</h2>
          <p className="lede">
            Sin salir de esta página, tal y como nos lo confirmasteis el 8 de septiembre.
          </p>

          <h3 className="bh3">Adultos, a partir de 15 años</h3>
          <ul className="bslots">
            {adults.map((s) => (
              <li key={`${s.day}-${s.time}-${s.cell}`}>
                <strong>{s.day}</strong>
                <span>{hours(s.time)}</span>
                <em>{s.cell}</em>
              </li>
            ))}
          </ul>

          <h3 className="bh3">Niños y jóvenes, de 8 a 15 años</h3>
          <ul className="bslots">
            {kids.map((s) => (
              <li key={`${s.day}-${s.time}-${s.cell}`}>
                <strong>{s.day}</strong>
                <span>{hours(s.time)}</span>
                <em>{s.cell}</em>
              </li>
            ))}
          </ul>

          <p className="bnote">{timetableNote}</p>
          <p className="bnote">
            <Link to="/" state={{ scrollTo: 'horarios' }}>Ver la semana entera del Dojo</Link>
          </p>
          <p className="bcta-mid">
            <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- profesor */}
      <section className="section section--sand" id="profesor">
        <div className="wrap bteacher">
          <div className="bteacher__photo">
            {/* No photo of Steve exists yet, so the frame carries his initials
                instead of a stock face or an empty box. Swap the tile for an
                <img> the day he sends one. */}
            <div className="bteacher__mono" role="img" aria-label={`Retrato pendiente de ${bjjTeacher.name}`}>
              <span aria-hidden="true">{bjjTeacher.initials}</span>
            </div>
            <p className="bteacher__monocap">Foto pendiente</p>
          </div>
          <div>
            <p className="eyebrow">Profesor</p>
            <h2>{bjjTeacher.name}</h2>
            <p className="bteacher__role">{bjjTeacher.belt} · {bjjTeacher.role}</p>
            <ul className="bteacher__list">
              {bjjTeacher.credentials.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <h3 className="bh3">Cómo entiende la enseñanza</h3>
            {bjjTeacher.approach.map((t) => <p key={t.slice(0, 24)} className="bteacher__p">{t}</p>)}
            <p className="bteacher__quote">{bjjTeacher.closing}</p>
            <Slot title="Una foto de Steve en el tatami">
              <p>
                Su nombre, su grado y su forma de dar clase son suyos, tal y como nos los
                pasasteis. Lo único que falta aquí es la foto: una suya explicando técnica
                y la ponemos en el hueco de al lado.
              </p>
            </Slot>
            <p className="bcta-mid">
              <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- cómo progresas */}
      <section className="section" id="progreso">
        <div className="wrap">
          <p className="eyebrow">Cómo progresas</p>
          <h2>Esto no se prueba un mes, se recorre</h2>
          <div className="bprog">
            <article>
              <h3>Empiezas de cero</h3>
              <p>
                El primer día aprendes a caer. Nadie te pide que sepas nada y nadie te
                suelta en medio de un combate.
              </p>
            </article>
            <article>
              <h3>Los grados llevan su tiempo</h3>
              <p>
                Los grados del BJJ son los mismos en todas partes: de blanco a negro,
                pasando por azul, morado y marrón, y se miden en años, no en meses. Los
                menores tienen su propia escala hasta los 16.
              </p>
            </article>
            <article>
              <h3>El open mat de los viernes</h3>
              <p>
                Una hora para practicar libre lo que estás trabajando, sin clase dirigida.
                Es donde se nota lo que has aprendido en los últimos meses.
              </p>
            </article>
            <article>
              <h3>Y si un día quieres ampliar</h3>
              <p>
                El BJJ tiene su propio camino y no le falta nada. Aun así, el Dojo entero
                está ahí para cuando te apetezca sumar algo.
              </p>
            </article>
          </div>
          <Slot title="Vuestro sistema de grados">
            <p>
              Cada academia da los grados a su manera. Contadnos con qué criterio y cada
              cuánto se gradúa aquí, y lo ponemos en esta misma sección.
            </p>
          </Slot>
        </div>
      </section>

      {/* ------------------------------------------------------------- combinar */}
      <section className="section section--sand">
        <div className="wrap bcombo">
          <div>
            <p className="eyebrow">Sin salir del Dojo</p>
            <h2>Puedes ampliar, pero no tienes por qué</h2>
            <p className="lede">
              El BJJ es BJJ y tiene su recorrido propio. Si algún día quieres sumar otra
              disciplina, la tienes en el mismo tatami y sin cambiar de escuela.
            </p>
          </div>
          <ul className="bcombo__list">
            <li>
              <strong>BJJ y MMA</strong>
              <span>
                Martes y jueves el BJJ acaba a las 20:30 y el MMA empieza a las 20:30.
                Puedes quedarte seguido.
              </span>
            </li>
            <li>
              <strong>BJJ y judo</strong>
              <span>
                Mismo caso: el judo de adultos va martes y jueves de 20:30 a 21:30, justo
                después. El judo te da los derribos que el BJJ aprovecha.
              </span>
            </li>
            <li>
              <strong>La segunda actividad</strong>
              <span>
                Según las tarifas del Dojo, la 2ª actividad son 20 euros al mes.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------------- precio */}
      <section className="section" id="precio">
        <div className="wrap bprice">
          <div>
            <p className="eyebrow">Precio y clase de prueba</p>
            <h2>Primero pruebas, y ya hablamos</h2>
            <p className="lede">
              La clase de prueba es gratuita y la matrícula de inscripción también. Vienes,
              entrenas una hora y decides después.
            </p>
            <p>
              Las cuotas del Dojo van por días de entrenamiento a la semana, no por
              disciplina, así que el BJJ entra en la misma tabla que el resto.
            </p>
            <p>
              <Link to="/" state={{ scrollTo: 'tarifas' }}>Ver todas las tarifas</Link>
            </p>
          </div>
          <div>
            <ul className="tar__list">
              {fees.map((t) => (
                <li key={t.label} className={t.label === '2 a 3 días a la semana' ? 'is-featured' : ''}>
                  <span>{t.label}</span>
                  <strong>{t.price}<em>{t.unit}</em></strong>
                </li>
              ))}
            </ul>
            <ul className="tar__avisos">
              {avisos.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- testimonios */}
      <section className="section section--sand">
        <div className="wrap bslotwrap">
          <p className="eyebrow">Testimonios</p>
          <h2>Aquí van vuestros alumnos</h2>
          <Slot title="Testimonios reales de alumnos de BJJ">
            <p>
              En vuestra página de valores ya hay testimonios reales, pero ninguno es de
              alguien que entrene BJJ. Pedid dos o tres a la gente del grupo, con nombre y
              tiempo entrenando, y los ponemos aquí. No vamos a escribirlos nosotros.
            </p>
          </Slot>
        </div>
      </section>

      {/* -------------------------------------------------------------- reservar */}
      <section className="cta" id="reservar">
        <div className="wrap cta__in">
          <h2>Reserva tu clase de prueba</h2>
          <p>
            Eliges el día que te va bien y el Dojo te confirma. No se paga nada y nada queda
            reservado hasta que ellos respondan.
          </p>
          <div className="bfinal">
            <Link to="/clase-gratis" className="btn btn--primary">Reservar clase de prueba</Link>
            <a className="btn btn--onDark" href={brand.whatsappHref} target="_blank" rel="noreferrer">
              Escribir por WhatsApp
            </a>
          </div>
          <p className="bfinal__alt">
            O llámanos al <a href={brand.phoneHref}>{brand.phone}</a>. Estamos en{' '}
            {brand.address}, {brand.city}. {brand.hours}.
          </p>
        </div>
      </section>

      {/* Sticky on a phone: the CTA is never more than a thumb away. */}
      <div className="bbar">
        <Link to="/clase-gratis" className="btn btn--primary bbar__book">Reservar clase de prueba</Link>
        <a className="bbar__wa" href={brand.whatsappHref} target="_blank" rel="noreferrer" aria-label={`Escribir por WhatsApp al ${brand.whatsapp}`}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.23-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.06 0 1.21.88 2.38 1 2.55.13.16 1.73 2.64 4.2 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.19-.06-.1-.22-.16-.47-.28Z" />
          </svg>
          <span className="visually-hidden">WhatsApp</span>
        </a>
      </div>
    </>
  )
}
