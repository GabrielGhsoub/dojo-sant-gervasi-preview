import { motion } from 'framer-motion'
import Booking from '../components/Booking.jsx'
import { brand } from '../data/site.js'
import './clase.css'

export default function ClaseGratis() {
  return (
    <section className="cg">
      <div className="wrap cg__in">
        <motion.div className="cg__copy" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <p className="eyebrow">Clase de prueba</p>
          <h1>Prueba tu primera clase gratis</h1>
          <p className="lede">
            Elige la actividad y el día que te vaya bien. Nosotros lo confirmamos contigo
            antes de que vengas, y si ese día cambia algo te avisamos.
          </p>
          <ul className="cg__points">
            <li><strong>No se paga nada</strong> para reservarla.</li>
            <li><strong>Nada queda confirmado solo</strong>: lo revisa el Dojo.</li>
            {/* Was "el material lo ponemos nosotros", which their own /tarifas/
                denies: "cada actividad requiere la compra de un equipo o material
                específico". Replaced with something they do publish. */}
            <li>La <strong>matrícula de inscripción es gratuita</strong>.</li>
          </ul>
          <p className="cg__alt">
            Si lo prefieres, escríbenos por{' '}
            <a href={brand.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>,
            llámanos al <a href={brand.phoneHref}>{brand.phone}</a> o escribe a{' '}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
        </motion.div>
        <motion.div className="cg__widget" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .08 }}>
          <Booking />
        </motion.div>
      </div>
    </section>
  )
}
