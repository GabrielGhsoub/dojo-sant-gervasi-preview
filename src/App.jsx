import { useEffect, useRef } from 'react'
import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Bjj from './pages/Bjj.jsx'
import ClaseGratis from './pages/ClaseGratis.jsx'
import { brand } from './data/site.js'
import './layout/chrome.css'

function Chrome({ children }) {
  /* Not <a href="#main">. Under HashRouter the fragment IS the route, so that
     link navigates to /main, misses every route, and the catch-all swaps the
     page for Home. One Tab and one Enter used to wipe the booking form. */
  const main = useRef(null)

  /* React Router keeps the scroll offset across routes, and the home page is far
     taller than /clase-gratis. Tapping a CTA from halfway down used to land the
     visitor at the bottom of the booking page, looking at the footer.
     Must be 'instant': html has scroll-behavior:smooth, so a plain scrollTo
     animates from 4,000px while React swaps in a shorter page underneath, and
     the run gets clamped part way and stops at ~460px. */
  /* Under HashRouter the fragment is the route, so "/#horarios" cannot work as an
     anchor. Links that mean "go home and land on that block" carry the target in
     router state instead, and the reset has to stand aside for them. */
  const { pathname, state } = useLocation()
  useEffect(() => {
    if (state?.scrollTo) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, state])

  return (
    <>
      <button
        type="button"
        className="skip"
        onClick={() => { main.current?.focus(); main.current?.scrollIntoView() }}
      >
        Saltar al contenido
      </button>
      <header className="hd">
        <div className="wrap hd__in">
          <Link to="/" className="hd__brand">
            <img src="img/escudo-def.jpg" alt="" width="40" height="40" />
            <span>
              <strong>Dojo Sant Gervasi</strong>
              <em>Sant Gervasi, Barcelona</em>
            </span>
          </Link>
          <nav className="hd__nav">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/bjj">BJJ</NavLink>
            <NavLink to="/clase-gratis">Clase gratis</NavLink>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </nav>
          <Link to="/clase-gratis" className="btn btn--primary hd__cta">
            <span className="hd__cta-long">Prueba una clase</span>
            <span className="hd__cta-short">Clase gratis</span>
          </Link>
        </div>
      </header>

      <main id="main" ref={main} tabIndex={-1}>{children}</main>

      <footer className="ft">
        <div className="wrap ft__in">
          <div>
            <strong>{brand.name}</strong>
            {/* "Somos una escuela de valores" is their own line, off /nosotros/.
                Lluís wants it as a thread through the site, not a banner. */}
            <p className="ft__claim">{brand.valuesClaim}</p>
            <p>
              {brand.address}<br />{brand.city}<br />
              <a href={brand.phoneHref}>{brand.phone}</a><br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
              <a href={brand.whatsappHref} target="_blank" rel="noreferrer">WhatsApp {brand.whatsapp}</a><br />
              <span className="ft__hours">{brand.hours}</span>
            </p>
          </div>
          <p className="ft__demo">
            Maqueta de demostración creada por Likwiid con los contenidos del Dojo y con lo
            que nos habéis pasado. No es la web oficial y no se envía ni se cobra nada.
          </p>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <Chrome>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bjj" element={<Bjj />} />
        <Route path="/clase-gratis" element={<ClaseGratis />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Chrome>
  )
}
