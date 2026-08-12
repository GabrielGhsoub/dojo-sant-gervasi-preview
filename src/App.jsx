import { NavLink, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ClaseGratis from './pages/ClaseGratis.jsx'
import { brand } from './data/site.js'
import './layout/chrome.css'

function Chrome({ children }) {
  return (
    <>
      <a className="visually-hidden" href="#main">Saltar al contenido</a>
      <header className="hd">
        <div className="wrap hd__in">
          <Link to="/" className="hd__brand">
            <img src="img/escudo-def.jpg" alt="" width="40" height="40" />
            <span>
              <strong>Dojo Sant Gervasi</strong>
              <em>Barcelona, desde {brand.since}</em>
            </span>
          </Link>
          <nav className="hd__nav">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/clase-gratis">Clase gratis</NavLink>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </nav>
          <Link to="/clase-gratis" className="btn btn--primary hd__cta">
            <span className="hd__cta-long">Prueba una clase</span>
            <span className="hd__cta-short">Clase gratis</span>
          </Link>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="ft">
        <div className="wrap ft__in">
          <div>
            <strong>{brand.name}</strong>
            <p>
              {brand.address}<br />{brand.city}<br />
              <a href={brand.phoneHref}>{brand.phone}</a><br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </div>
          <p className="ft__demo">
            Maqueta de demostración creada por Likwiid con los contenidos públicos del
            dojo. No es la web oficial y no se envía ni se cobra nada.
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
        <Route path="/clase-gratis" element={<ClaseGratis />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Chrome>
  )
}
