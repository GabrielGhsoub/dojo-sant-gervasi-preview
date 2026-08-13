/* The whole point of the demo.
   Their /contacto/ page is headed "RESERVA TU CLASE GRATIS" and collects a name,
   a phone, an email and a list of ticked disciplines. It has no date field of any
   kind, so nobody can actually reserve anything. Meanwhile /horarios/ publishes an
   exact weekly table and asks, in their words, "avisanos si vas a asistir".
   This joins the two: pick a discipline, see only the real sessions that teach it,
   pick one, done. Nothing confirms by itself; the request lands with the dojo. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { allSlots, brand, disciplines, timetableNote } from '../data/site.js'
import './booking.css'

const STEPS = ['Actividad', 'Día y hora', 'Tus datos']

/* The dojo confirms every request by phone or by email. A request carrying a
   name of "." or a phone of "aaa" is unreachable on both, so the visitor waits
   for a call that can never come and reads it as being ignored. These are the
   loosest checks that still leave the dojo a way to answer. */
const FIELDS = [
  {
    key: 'nombre',
    label: 'Nombre y apellidos',
    input: { name: 'nombre', autoComplete: 'name' },
    check: (v) => v.trim().length >= 2 && /\p{L}/u.test(v),
    error: 'Escribe tu nombre y apellidos.',
  },
  {
    key: 'telefono',
    label: 'Teléfono',
    input: { name: 'telefono', type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
    check: (v) => (v.match(/\d/g) || []).length >= 9,
    error: 'Necesitamos un teléfono de al menos 9 cifras para poder llamarte.',
  },
  {
    key: 'email',
    label: 'Correo electrónico',
    input: { name: 'email', type: 'email', autoComplete: 'email' },
    check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    error: 'Revisa el correo, parece que le falta algo.',
  },
]

export default function Booking() {
  const [step, setStep] = useState(0)
  const [discipline, setDiscipline] = useState(null)
  const [slot, setSlot] = useState(null)
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '' })
  const [showErrors, setShowErrors] = useState(false)
  const [sent, setSent] = useState(false)

  const slots = useMemo(
    () => allSlots().filter((s) => s.disciplines.includes(discipline)),
    [discipline],
  )
  const chosen = disciplines.find((d) => d.key === discipline)
  const errors = Object.fromEntries(
    FIELDS.map((f) => [f.key, f.check(form[f.key]) ? '' : f.error]),
  )

  /* Every step swaps the whole panel, which drops focus to the body and sends a
     keyboard visitor back to the top of the page on the next Tab. Move it to the
     new question instead. Not on first paint: that would yank the page down to
     the widget the moment it loads. */
  const ask = useRef(null)
  const inputs = useRef({})
  const painted = useRef(false)
  useEffect(() => {
    if (!painted.current) { painted.current = true; return }
    ask.current?.focus()
  }, [step, sent])

  function choose(key) {
    setDiscipline(key)
    setSlot(null)
    setStep(1)
  }

  function submit(e) {
    e.preventDefault()
    const bad = FIELDS.find((f) => errors[f.key])
    if (bad) {
      setShowErrors(true)
      inputs.current[bad.key]?.focus()
      return
    }
    setSent(true)
  }

  function again() {
    setSent(false)
    setStep(0)
    setSlot(null)
    setShowErrors(false)
  }

  if (sent) {
    return (
      <motion.div className="bk bk--done" initial={false} animate={{ opacity: 1, y: 0 }}>
        <div className="bk__tick" aria-hidden="true">✓</div>
        <h2 className="bk__ask" tabIndex={-1} ref={ask} role="status">Solicitud enviada</h2>
        <p className="bk__doneline">
          <strong>{chosen?.name}</strong>, {slot?.day.toLowerCase()} de {slot?.time}.
        </p>
        <p className="bk__note">
          El dojo la confirma por teléfono o por correo. Nada queda reservado hasta que
          ellos respondan, y no se ha cobrado nada.
        </p>
        <div className="bk__nav bk__nav--done">
          <button type="button" className="btn btn--ghost" onClick={again}>Pedir otra clase</button>
        </div>
        <p className="bk__demo">Esto es una demostración: no se ha enviado ningún mensaje real.</p>
      </motion.div>
    )
  }

  return (
    <div className="bk">
      <ol className="bk__steps" aria-label="Pasos">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={i === step ? 'is-now' : i < step ? 'is-done' : ''}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className="bk__num" aria-hidden="true">{i < step ? '✓' : i + 1}</span>
            {label}
            {i < step && <span className="visually-hidden">completado</span>}
          </li>
        ))}
      </ol>

        {step === 0 && (
          <motion.div key="s0" initial={false} animate={{ opacity: 1, y: 0 }}>
            <h2 className="bk__ask" tabIndex={-1} ref={ask}>¿Qué quieres probar?</h2>
            <div className="bk__grid">
              {disciplines.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  className="bk__disc"
                  aria-pressed={d.key === discipline}
                  onClick={() => choose(d.key)}
                >
                  <img src={`img/${d.img}`} alt="" loading="lazy" />
                  <span>{d.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={false} animate={{ opacity: 1, y: 0 }}>
            <h2 className="bk__ask" tabIndex={-1} ref={ask}>
              {slots.length ? 'Elige el día que te va bien' : 'Esta actividad se organiza aparte'}
            </h2>
            {slots.length ? (
              <div className="bk__slots">
                {slots.map((s) => {
                  const id = `${s.day}-${s.time}-${s.cell}`
                  const on = Boolean(slot) && `${slot.day}-${slot.time}-${slot.cell}` === id
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`bk__slot${on ? ' is-on' : ''}`}
                      aria-pressed={on}
                      onClick={() => setSlot(s)}
                    >
                      <strong>{s.day}</strong>
                      <span>{s.time}</span>
                      <em>{s.cell}</em>
                    </button>
                  )
                })}
              </div>
            ) : (
              /* Defensa personal femenina is the one activity with no fixed weekly
                 slot. Without these two links the widget is a dead end for exactly
                 the visitor who came for it. */
              <p className="bk__note">
                No todas las actividades tienen horario fijo semanal. Llámanos al{' '}
                <a href={brand.phoneHref}>{brand.phone}</a> o escribe a{' '}
                <a href={`mailto:${brand.email}`}>{brand.email}</a> y buscamos un hueco contigo.
              </p>
            )}
            <p className="bk__note bk__note--tt">{timetableNote}</p>
            {slots.length > 0 && !slot && (
              <p className="bk__hint">Elige un día para continuar.</p>
            )}
            <div className="bk__nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(0)}>Atrás</button>
              {slots.length > 0 && (
                <button type="button" className="btn btn--primary" disabled={!slot} onClick={() => setStep(2)}>
                  Continuar
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            key="s2"
            initial={false} animate={{ opacity: 1, y: 0 }}
            noValidate
            onSubmit={submit}
          >
            <h2 className="bk__ask" tabIndex={-1} ref={ask}>¿A quién avisamos?</h2>
            <div className="bk__recap">
              {chosen?.name} · {slot?.day} · {slot?.time}
            </div>
            {FIELDS.map((f) => {
              const bad = showErrors && Boolean(errors[f.key])
              return (
                <label key={f.key} className={`field${bad ? ' field--bad' : ''}`}>
                  <span>{f.label}</span>
                  <input
                    {...f.input}
                    ref={(el) => { inputs.current[f.key] = el }}
                    value={form[f.key]}
                    aria-invalid={bad || undefined}
                    aria-describedby={bad ? `err-${f.key}` : undefined}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                  {bad && <span className="field__err" id={`err-${f.key}`}>{errors[f.key]}</span>}
                </label>
              )
            })}
            <div className="bk__nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>Atrás</button>
              <button type="submit" className="btn btn--primary">Pedir la clase</button>
            </div>
            <p className="bk__demo">
              Demostración. No se envía nada y no se cobra nada.
            </p>
          </motion.form>
        )}
    </div>
  )
}
