'use client'

import { useEffect, useState } from 'react'

const PRODUCTS = [
  {
    name: 'Composition®',
    desc: 'Flexible acoustic wallcovering available in velour or smooth finish. 100% PET including recycled fibre.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    tag: 'Wallcovering',
    specs: 'NRC 0.30 · 10–12mm · BS EN 13501-1',
  },
  {
    name: 'Quietspace® Panel',
    desc: 'Acoustic wall panels that combine sound absorption with design flexibility. Available in 60+ colours.',
    img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
    tag: 'Wall Panel',
    specs: 'NRC 0.85 · 25mm · Class A rated',
  },
  {
    name: 'Quietspace® Frontier',
    desc: 'Freestanding acoustic screens for open-plan offices. Easy to reposition, no tools required.',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80',
    tag: 'Screen',
    specs: 'NRC 0.75 · Freestanding · PET recycled',
  },
  {
    name: 'Quietspace® Lattice',
    desc: 'Geometric 3D acoustic panels that create bold feature walls while controlling reverberation.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    tag: '3D Panel',
    specs: 'NRC 0.70 · Custom patterns · Carbon neutral',
  },
  {
    name: 'Quietspace® Ceiling',
    desc: 'Suspended acoustic baffles and ceiling tiles designed to reduce overhead noise in large spaces.',
    img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80',
    tag: 'Ceiling',
    specs: 'NRC 0.90 · 24mm · Easy install grid',
  },
  {
    name: 'Verve™ Contoured',
    desc: 'Contoured acoustic panels with organic flowing shapes. A design-led approach to sound management.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    tag: 'Feature Panel',
    specs: 'Custom contours · NRC 0.80 · Made in UK',
  },
]

const PROJECTS = [
  { name: 'Corporate HQ, London', type: 'Office', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  { name: 'St. Andrews School', type: 'Education', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80' },
  { name: 'Hilton Manchester', type: 'Hospitality', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80' },
  { name: 'Soho Recording Studio', type: 'Studio', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80' },
  { name: 'NHS Trust Offices', type: 'Healthcare', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80' },
  { name: 'WeWork Moorgate', type: 'Co-Working', img: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="nav-logo">
          N2 <span>Acoustics</span>
        </a>
        <ul className="nav-links">
          <li><a href="#products">Products</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact" className="nav-cta">Get in Touch</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-label">Premium Acoustic Solutions</div>
          <h1>Beautiful acoustics for spaces where people thrive</h1>
          <p>
            Carbon neutral acoustic panels, wallcoverings and baffles — designed to reduce
            reverberation and control echo. Supplied, installed and project-managed by N2 Group.
          </p>
          <a href="#products" className="hero-btn">Explore Products</a>
        </div>
        <div className="hero-overlay" />
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="stats-inner">
          <div>
            <div className="stat-num">50+</div>
            <div className="stat-label">Years of manufacturing expertise</div>
          </div>
          <div>
            <div className="stat-num">60+</div>
            <div className="stat-label">Colour options available</div>
          </div>
          <div>
            <div className="stat-num">100%</div>
            <div className="stat-label">Carbon neutral operations</div>
          </div>
          <div>
            <div className="stat-num">UK</div>
            <div className="stat-label">Made &amp; installed nationwide</div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="section-label">Our Products</div>
        <h2>Acoustic solutions for every space</h2>
        <p className="subtitle">
          From flexible wallcoverings to suspended ceiling baffles, our range offers
          design-led acoustic treatment for offices, schools, hospitality and more.
        </p>
        <div className="products-grid">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="product-card">
              <img className="product-img" src={p.img} alt={p.name} />
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  <span className="product-tag">{p.tag}</span>
                  <span className="product-tag">{p.specs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects" style={{ background: '#f7f5f2', maxWidth: '100%', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-label">Featured Projects</div>
          <h2>Transforming spaces across the UK</h2>
          <p className="subtitle">
            From corporate offices to schools and hotels — see how our acoustic solutions
            create comfortable, beautiful environments.
          </p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card">
                <img src={p.img} alt={p.name} />
                <div className="project-overlay">
                  <div>
                    <h4>{p.name}</h4>
                    <p>{p.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="section-label">About N2 Acoustics</div>
            <h2>Part of N2 Group — over 50 years of expertise</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              N2 Acoustics is the acoustic solutions division of N2 Group, a powerhouse team of creatives,
              project managers, production specialists and precision installers. With over 50 years of
              manufacturing expertise, we provide a true 360° service from concept to delivery.
            </p>
            <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We empower brands to create spaces that sound as good as they look. Our carbon neutral
              acoustic products are designed to reduce reverberation and control echo in building interiors,
              creating comfortable, acoustically balanced environments.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['Carbon Neutral', 'UK Made', 'BS EN Certified', 'Full Installation'].map(tag => (
                <span key={tag} style={{
                  padding: '0.5rem 1rem', background: '#f7f5f2', borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: 600, color: '#1a1a2e',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
            <img
              src="https://images.unsplash.com/photo-1600607687644-c7f34b5063c4?w=600&q=80"
              alt="N2 Group workspace"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="section-label">Get Started</div>
        <h2>Ready to transform your space?</h2>
        <p>
          Whether you need acoustic treatment for one room or an entire building,
          our team is here to help from specification through to installation.
        </p>
        <a href="mailto:hello@n2group.co.uk" className="cta-btn">Contact Us</a>
        <div style={{ marginTop: '2rem', color: '#6b7280', fontSize: '0.9rem' }}>
          <p>+44 (0)1992 440333 · hello@n2group.co.uk</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">N2 <span>Acoustics</span></div>
            <p>Premium acoustic solutions supplied and installed by N2 Group. Over 50 years of manufacturing expertise.</p>
          </div>
          <div>
            <h4>Products</h4>
            <a href="#products">Wallcoverings</a>
            <a href="#products">Wall Panels</a>
            <a href="#products">Screens</a>
            <a href="#products">Ceiling Solutions</a>
            <a href="#products">Baffles</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About N2 Acoustics</a>
            <a href="#projects">Projects</a>
            <a href="https://www.n2group.co.uk" target="_blank" rel="noopener">N2 Group</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Contact</h4>
            <p style={{ marginBottom: '0.5rem' }}>+44 (0)1992 440333</p>
            <a href="mailto:hello@n2group.co.uk">hello@n2group.co.uk</a>
            <p style={{ marginTop: '0.5rem' }}>N2 Group<br />Epping, Essex</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 N2 Acoustics. Part of N2 Group.</span>
          <span>All acoustic products supplied by Autex Acoustics®</span>
        </div>
      </footer>
    </>
  )
}
