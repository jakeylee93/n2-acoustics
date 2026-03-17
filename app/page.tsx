'use client'

import { useEffect, useState } from 'react'

/* ─── Autex colour swatches ─── */
const COLOURS = [
  { name: 'Koala', hex: '#8B7D6B' },
  { name: 'Stonewash', hex: '#A9B2B1' },
  { name: 'Senado', hex: '#4A5568' },
  { name: 'Petronas', hex: '#2C5F7C' },
  { name: 'Empire', hex: '#1B3A5C' },
  { name: 'Flatiron', hex: '#6B5B4F' },
  { name: 'Atlantis', hex: '#2D6A4F' },
  { name: 'Muralla', hex: '#7C3E2E' },
  { name: 'Gherkin', hex: '#7D8B3E' },
  { name: 'Lime', hex: '#A3B86C' },
  { name: 'Myst', hex: '#9CA3AF' },
  { name: 'Acros', hex: '#C85C3E' },
  { name: 'Onyx', hex: '#1a1a1a' },
  { name: 'Chalk', hex: '#E8E4DF' },
  { name: 'Dune', hex: '#C4B5A0' },
  { name: 'Arctic', hex: '#D1DDE6' },
  { name: 'Fjord', hex: '#3B6B8C' },
  { name: 'Sahara', hex: '#D4A76A' },
  { name: 'Raven', hex: '#2D2D3D' },
  { name: 'Sage', hex: '#7B9E87' },
]

const PRODUCTS = [
  { id: 'composition', name: 'Composition®', desc: 'Flexible acoustic wallcovering', price: 45, unit: 'm²', nrc: '0.30' },
  { id: 'quietspace-panel', name: 'Quietspace® Panel', desc: 'Acoustic wall panel', price: 85, unit: 'panel', nrc: '0.85' },
  { id: 'quietspace-frontier', name: 'Quietspace® Frontier', desc: 'Freestanding screen', price: 220, unit: 'unit', nrc: '0.75' },
  { id: 'quietspace-lattice', name: 'Quietspace® Lattice', desc: '3D geometric panel', price: 120, unit: 'panel', nrc: '0.70' },
  { id: 'quietspace-ceiling', name: 'Quietspace® Ceiling', desc: 'Suspended baffle/tile', price: 95, unit: 'tile', nrc: '0.90' },
  { id: 'verve', name: 'Verve™ Contoured', desc: 'Contoured feature panel', price: 150, unit: 'panel', nrc: '0.80' },
]

const SIZES = [
  { label: '600 × 600mm', w: 600, h: 600 },
  { label: '1200 × 600mm', w: 1200, h: 600 },
  { label: '1200 × 1200mm', w: 1200, h: 1200 },
  { label: '2400 × 1200mm', w: 2400, h: 1200 },
  { label: 'Custom', w: 0, h: 0 },
]

const FINISHES = ['Smooth', 'Velour', 'Grooved']

const GALLERY_PROJECTS = [
  { name: 'Corporate HQ, London', type: 'Office', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  { name: 'St. Andrews School', type: 'Education', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80' },
  { name: 'Hilton Manchester', type: 'Hospitality', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80' },
  { name: 'Soho Recording Studio', type: 'Studio', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80' },
  { name: 'NHS Trust Offices', type: 'Healthcare', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80' },
  { name: 'WeWork Moorgate', type: 'Co-Working', img: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [product, setProduct] = useState(PRODUCTS[1])
  const [colour, setColour] = useState(COLOURS[3])
  const [size, setSize] = useState(SIZES[1])
  const [finish, setFinish] = useState('Smooth')
  const [qty, setQty] = useState(10)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const total = product.price * qty
  const panelRatio = size.w && size.h ? size.w / size.h : 2

  return (
    <>
      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="nav-logo">N2 <span>Acoustics</span></a>
        <ul className="nav-links">
          <li><a href="#products">Products</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact" className="nav-cta">Get in Touch</a></li>
        </ul>
      </nav>

      {/* ═══════ HERO — PANEL BUILDER ═══════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 40%, #1a1a2e 100%)',
        padding: '6rem 2rem 3rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

          {/* LEFT — Live Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#c8956c', marginBottom: '1rem', fontWeight: 600,
            }}>
              Live Preview
            </div>

            {/* Panel visual */}
            <div style={{
              width: '100%', maxWidth: '420px', aspectRatio: String(panelRatio || 2),
              background: colour.hex, borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: `0 30px 80px ${colour.hex}40`,
              transition: 'all 0.4s ease',
            }}>
              {/* Texture overlay */}
              {finish === 'Velour' && (
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
              )}
              {finish === 'Grooved' && (
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.12) 30px, rgba(0,0,0,0.12) 32px)' }} />
              )}
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.5rem', fontFamily: "'DM Serif Display', serif", marginBottom: '0.25rem' }}>
                  {product.name}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                  {size.label} · {finish} · NRC {product.nrc}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div style={{
              marginTop: '1.5rem', background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px', padding: '1.25rem 1.5rem', width: '100%', maxWidth: '420px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Product</span>
                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{product.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Colour</span>
                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: colour.hex, display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)' }} />
                  {colour.name}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Size</span>
                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{size.label}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Finish</span>
                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{finish}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Quantity</span>
                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{qty} {product.unit}s</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', fontWeight: 600 }}>Estimated Total</span>
                <span style={{ color: '#c8956c', fontSize: '1.25rem', fontFamily: "'DM Serif Display', serif" }}>£{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Builder Steps */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'white', lineHeight: 1.15, marginBottom: '0.75rem' }}>
                Build Your Acoustic Solution
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.6 }}>
                Configure your panels, choose your colour and finish, and get an instant estimate.
              </p>
            </div>

            {/* Step indicators */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
              {['Product', 'Colour', 'Size & Finish', 'Quantity'].map((s, i) => (
                <button key={s} onClick={() => setStep(i + 1)} style={{
                  padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600,
                  background: step === i + 1 ? '#c8956c' : 'rgba(255,255,255,0.08)',
                  color: step === i + 1 ? 'white' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s',
                }}>
                  {i + 1}. {s}
                </button>
              ))}
            </div>

            {/* STEP 1 — Product */}
            {step === 1 && (
              <div>
                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: "'DM Serif Display', serif" }}>Choose Your Product</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {PRODUCTS.map(p => (
                    <button key={p.id} onClick={() => { setProduct(p); setStep(2) }} style={{
                      padding: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer',
                      background: product.id === p.id ? 'rgba(200,149,108,0.15)' : 'rgba(255,255,255,0.05)',
                      outline: product.id === p.id ? '2px solid #c8956c' : '1px solid rgba(255,255,255,0.08)',
                      textAlign: 'left', transition: 'all 0.2s',
                    }}>
                      <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{p.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{p.desc}</div>
                      <div style={{ color: '#c8956c', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.5rem' }}>£{p.price}/{p.unit} · NRC {p.nrc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 — Colour */}
            {step === 2 && (
              <div>
                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: "'DM Serif Display', serif" }}>
                  Select Colour — <span style={{ color: '#c8956c' }}>{colour.name}</span>
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '1rem' }}>20 colours from the Autex Acoustics® range</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
                  {COLOURS.map(c => (
                    <button key={c.name} onClick={() => { setColour(c); setStep(3) }} title={c.name} style={{
                      width: '100%', aspectRatio: '1', borderRadius: '12px', border: 'none', cursor: 'pointer',
                      background: c.hex, position: 'relative',
                      outline: colour.name === c.name ? '3px solid #c8956c' : '2px solid rgba(255,255,255,0.1)',
                      outlineOffset: colour.name === c.name ? '2px' : '0',
                      transition: 'all 0.2s',
                    }}>
                      <span style={{
                        position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)',
                        fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap',
                      }}>
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 — Size & Finish */}
            {step === 3 && (
              <div>
                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: "'DM Serif Display', serif" }}>Panel Size</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {SIZES.map(s => (
                    <button key={s.label} onClick={() => setSize(s)} style={{
                      padding: '0.625rem 1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontSize: '0.85rem', fontWeight: 600,
                      background: size.label === s.label ? '#c8956c' : 'rgba(255,255,255,0.08)',
                      color: size.label === s.label ? 'white' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.2s',
                    }}>
                      {s.label}
                    </button>
                  ))}
                </div>
                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: "'DM Serif Display', serif" }}>Finish</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {FINISHES.map(f => (
                    <button key={f} onClick={() => { setFinish(f); setStep(4) }} style={{
                      padding: '0.625rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontSize: '0.85rem', fontWeight: 600,
                      background: finish === f ? '#c8956c' : 'rgba(255,255,255,0.08)',
                      color: finish === f ? 'white' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.2s',
                    }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 — Quantity */}
            {step === 4 && (
              <div>
                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: "'DM Serif Display', serif" }}>Quantity</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
                    width: 48, height: 48, borderRadius: '12px', border: 'none', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '1.5rem',
                  }}>−</button>
                  <input type="number" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))} style={{
                    width: '80px', textAlign: 'center', padding: '0.75rem',
                    borderRadius: '12px', border: '2px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)', color: 'white',
                    fontSize: '1.25rem', fontWeight: 700, fontFamily: "'DM Serif Display', serif",
                  }} />
                  <button onClick={() => setQty(qty + 1)} style={{
                    width: 48, height: 48, borderRadius: '12px', border: 'none', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '1.5rem',
                  }}>+</button>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[10, 25, 50, 100].map(q => (
                      <button key={q} onClick={() => setQty(q)} style={{
                        padding: '0.5rem 0.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        fontSize: '0.75rem', fontWeight: 600,
                        background: qty === q ? '#c8956c' : 'rgba(255,255,255,0.06)',
                        color: qty === q ? 'white' : 'rgba(255,255,255,0.4)',
                      }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <a href={`mailto:hello@n2group.co.uk?subject=Acoustic Panel Quote Request&body=Product: ${product.name}%0AColour: ${colour.name}%0ASize: ${size.label}%0AFinish: ${finish}%0AQuantity: ${qty}%0AEstimated Total: £${total.toLocaleString()}%0A%0APlease provide a formal quote for the above specification.`}
                  style={{
                    display: 'inline-block', padding: '1rem 2.5rem',
                    background: '#c8956c', color: 'white', textDecoration: 'none',
                    fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontWeight: 600, borderRadius: '8px', transition: 'all 0.3s',
                  }}>
                  Request Quote — £{total.toLocaleString()}
                </a>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                  Estimated pricing. A member of our team will confirm your quote within 24 hours.
                </p>
              </div>
            )}

            {/* Step nav */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} style={{
                  padding: '0.625rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600,
                }}>← Back</button>
              )}
              {step < 4 && (
                <button onClick={() => setStep(step + 1)} style={{
                  padding: '0.625rem 1.5rem', borderRadius: '8px', border: 'none',
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600,
                }}>Next →</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="stats-inner">
          <div><div className="stat-num">50+</div><div className="stat-label">Years of manufacturing expertise</div></div>
          <div><div className="stat-num">60+</div><div className="stat-label">Colour options available</div></div>
          <div><div className="stat-num">100%</div><div className="stat-label">Carbon neutral operations</div></div>
          <div><div className="stat-num">UK</div><div className="stat-label">Made &amp; installed nationwide</div></div>
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
            <div key={i} className="product-card" onClick={() => { setProduct(p); setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ cursor: 'pointer' }}>
              <div className="product-img" style={{
                background: `linear-gradient(135deg, ${COLOURS[i * 3 % COLOURS.length].hex}40, ${COLOURS[(i * 3 + 2) % COLOURS.length].hex}40)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', color: COLOURS[i * 3 % COLOURS.length].hex }}>{p.name}</span>
              </div>
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  <span className="product-tag">NRC {p.nrc}</span>
                  <span className="product-tag">From £{p.price}/{p.unit}</span>
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
          <p className="subtitle">From corporate offices to schools and hotels — see how our acoustic solutions create comfortable, beautiful environments.</p>
          <div className="projects-grid">
            {GALLERY_PROJECTS.map((p, i) => (
              <div key={i} className="project-card">
                <img src={p.img} alt={p.name} />
                <div className="project-overlay">
                  <div><h4>{p.name}</h4><p>{p.type}</p></div>
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
              project managers, production specialists and precision installers.
            </p>
            <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We empower brands to create spaces that sound as good as they look. Our carbon neutral
              acoustic products are designed to reduce reverberation and control echo.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['Carbon Neutral', 'UK Made', 'BS EN Certified', 'Full Installation'].map(tag => (
                <span key={tag} style={{ padding: '0.5rem 1rem', background: '#f7f5f2', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#1a1a2e' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://images.unsplash.com/photo-1600607687644-c7f34b5063c4?w=600&q=80" alt="N2 workspace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="section-label">Get Started</div>
        <h2>Ready to transform your space?</h2>
        <p>Acoustic treatment from specification through to installation. Our team handles everything.</p>
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
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="https://www.n2group.co.uk" target="_blank" rel="noopener">N2 Group</a>
          </div>
          <div>
            <h4>Contact</h4>
            <p style={{ marginBottom: '0.5rem' }}>+44 (0)1992 440333</p>
            <a href="mailto:hello@n2group.co.uk">hello@n2group.co.uk</a>
            <p style={{ marginTop: '0.5rem' }}>N2 Group, Epping, Essex</p>
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
