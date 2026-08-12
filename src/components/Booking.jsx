/* The whole point of the demo.
   Their /contacto/ page is headed "RESERVA TU CLASE GRATIS" and collects a name,
   a phone, an email and a list of ticked disciplines. It has no date field of any
   kind, so nobody can actually reserve anything. Meanwhile /horarios/ publishes an
   exact weekly table and asks, in their words, "avisanos si vas a asistir".
   This joins the two: pick a discipline, see only the real sessions that teach it,
   pick one, done. Nothing confirms by itself; the request lands with the dojo. */
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { allSlots, disciplines, timetableNote } from '../data/site.js'
import './booking.css'

const STEPS = ['Actividad', 'Día y hora', 'Tus datos']

export default function Booking() {
  const [step, setStep] = useState(0)
  const [discipline, setDiscipline] = useState(null)
  const [slot, setSlot] = useState(null)
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '' })
  const [sent, setSent] = useState(false)

  const slots = useMemo(
    () => allSlots().filter((s) => s.discipline === discipline),
    [discipline],
  )
  const complete = form.nombre.trim() && form.telefono.trim() && form.email.trim()

  function choose(key) {
    setDiscipline(key)
    setSlot(null)
    setStep(1)
  }

  if (sent) {
    const d = disciplines.find((x) => x.key === discipline)
    return (
      <motion.div className="bk bk--done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bk__tick" aria-hidden="true">✓</div>
        <h3>Solicitud enviada</h3>
        <p className="bk__doneline">
          <strong>{d?.name}</strong>, {slot.day.toLowerCase()} de {slot.time}.
        </p>
        <p className="bk__note">
          El dojo la confirma por teléfono o por correo. Nada queda reservado hasta que
          ellos respondan, y no se ha cobrado nada.
        </p>
        <p className="bk__demo">Esto es una demostración: no se ha enviado ningún mensaje real.</p>
      </motion.div>
    )
  }

  return (
    <div className="bk">
      <ol className="bk__steps" aria-label="Pasos">
        {STEPS.map((label, i) => (
          <li key={label} className={i === step ? 'is-now' : i < step ? 'is-done' : ''}>
            <span className="bk__num">{i < step ? '✓' : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <p className="bk__ask">¿Qué quieres probar?</p>
            <div className="bk__grid">
              {disciplines.map((d) => (
                <button key={d.key} type="button" className="bk__disc" onClick={() => choose(d.key)}>
                  <img src={`img/${d.img}`} alt="" loading="lazy" />
                  <span>{d.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <p className="bk__ask">
              {slots.length ? 'Elige el día que te va bien' : 'Esta actividad se organiza aparte'}
            </p>
            {slots.length ? (
              <div className="bk__slots">
                {slots.map((s) => {
                  const id = `${s.day}-${s.time}-${s.cell}`
                  const on = slot && `${slot.day}-${slot.time}-${slot.cell}` === id
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`bk__slot${on ? ' is-on' : ''}`}
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
              <p className="bk__note">
                Escríbenos y buscamos un hueco contigo. No todas las actividades tienen
                horario fijo semanal.
              </p>
            )}
            <p className="bk__note bk__note--tt">{timetableNote}</p>
            <div className="bk__nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(0)}>Atrás</button>
              <button type="button" className="btn btn--primary" disabled={!slot} onClick={() => setStep(2)}>
                Continuar
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            key="s2"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
          >
            <p className="bk__ask">¿A quién avisamos?</p>
            <div className="bk__recap">
              {disciplines.find((d) => d.key === discipline)?.name} · {slot.day} · {slot.time}
            </div>
            <label className="field">
              <span>Nombre y apellidos</span>
              <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </label>
            <label className="field">
              <span>Teléfono</span>
              <input required inputMode="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
            </label>
            <label className="field">
              <span>Correo electrónico</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <div className="bk__nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>Atrás</button>
              <button type="submit" className="btn btn--primary" disabled={!complete}>Pedir la clase</button>
            </div>
            <p className="bk__demo">
              Demostración. No se envía nada y no se cobra nada.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
