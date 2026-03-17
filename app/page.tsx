'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Real Autex colour swatches with swatch images ─── */
const COLOURS = [
  { name: 'Canyon', hex: '#C4896B', swatch: '/swatches/canyon.jpg' },
  { name: 'Highland', hex: '#6B8C5A', swatch: '/swatches/highland.jpg' },
  { name: 'Caspian', hex: '#3B6B8C', swatch: '/swatches/caspian.jpg' },
  { name: 'Terrace', hex: '#B8A088', swatch: '/swatches/terrace.jpg' },
  { name: 'Cavalier', hex: '#8B2E2E', swatch: '/swatches/cavalier.jpg' },
  { name: 'Sargazo', hex: '#2D5A4E', swatch: '/swatches/sargazo.jpg' },
  { name: 'Senado', hex: '#4A5568', swatch: '/swatches/senado.jpg' },
  { name: 'Beehive', hex: '#C8A84E', swatch: '/swatches/beehive.jpg' },
  { name: 'Parthenon', hex: '#D4C8B0', swatch: '/swatches/parthenon.jpg' },
  { name: 'Opera', hex: '#E8E0D0', swatch: '/swatches/opera.jpg' },
  { name: 'Acros', hex: '#C85C3E', swatch: '/swatches/acros.jpg' },
  { name: 'Gherkin', hex: '#7D8B3E', swatch: '/swatches/gherkin.jpg' },
  { name: 'Muralla', hex: '#7C3E2E', swatch: '/swatches/muralla.jpg' },
  { name: 'Pinnacle', hex: '#3D3D3D', swatch: '/swatches/pinnacle.jpg' },
  { name: 'Petronas', hex: '#2C5F7C', swatch: '/swatches/petronas.jpg' },
  { name: 'Empire', hex: '#1B3A5C', swatch: '/swatches/empire.jpg' },
  { name: 'Flatiron', hex: '#6B5B4F', swatch: '/swatches/flatiron.jpg' },
  { name: 'Savoye', hex: '#9E9486', swatch: '/swatches/savoye.jpg' },
  { name: 'Pavilion', hex: '#8C8C8C', swatch: '/swatches/pavilion.jpg' },
  { name: 'Koala', hex: '#8B7D6B', swatch: '/swatches/koala.jpg' },
  { name: 'Stonewash', hex: '#A9B2B1', swatch: '/swatches/stonewash.jpg' },
  { name: 'Atlantis', hex: '#2D6A4F', swatch: '/swatches/atlantis.jpg' },
  { name: 'Myst', hex: '#9CA3AF', swatch: '/swatches/myst.jpg' },
  { name: 'Lime', hex: '#A3B86C', swatch: '/swatches/lime.jpg' },
  { name: 'Sage', hex: '#7B9E87', swatch: '/swatches/sage.jpg' },
  { name: 'Ink', hex: '#1E2A3A', swatch: '/swatches/ink.jpg' },
  { name: 'Calypso', hex: '#1A7B8C', swatch: '/swatches/calypso.jpg' },
  { name: 'Porcelain', hex: '#D8D4CE', swatch: '/swatches/porcelain.jpg' },
]

/* ─── Products with competitor-undercut pricing ─── */
/* Competitor: DBI sells Quietspace 25mm at £339.63 ex-VAT for 1200x2400mm = ~£118/m²
   Resonics: £120-250/m² installed. We undercut by 10% on supply-only */
const PRODUCTS = [
  { id: 'composition', name: 'Composition®', desc: 'Flexible acoustic wallcovering in rolls. 100% PET including recycled fibre.', price: 38, unit: 'm²', nrc: '0.30', thickness: '10–12mm', fire: 'B-s1, d0', img: '/projects/composition-office.jpg' },
  { id: 'quietspace-25', name: 'Quietspace® Panel 25mm', desc: 'High-performance wall & ceiling panel. Absorbs 85%+ of sound energy.', price: 99, unit: 'panel', nrc: '0.85', thickness: '25mm', fire: 'B-s2, d2', img: '/projects/quietspace-office.jpg' },
  { id: 'quietspace-50', name: 'Quietspace® Panel 50mm', desc: 'Maximum absorption broadband panel for demanding acoustic environments.', price: 135, unit: 'panel', nrc: '1.00', thickness: '50mm', fire: 'B-s2, d2', img: '/projects/quietspace-office.jpg' },
  { id: 'cube', name: 'Cube™', desc: 'Solid-colour acoustic panel with design flexibility. 21 colours through the core.', price: 72, unit: 'panel', nrc: '0.75', thickness: '12–24mm', fire: 'B-s1, d0', img: '/projects/cube-space.jpg' },
  { id: 'frontier', name: 'Quietspace® Frontier', desc: 'Freestanding or ceiling-suspended acoustic screens and baffles.', price: 195, unit: 'unit', nrc: '0.75', thickness: '25–50mm', fire: 'B-s2, d2', img: '/projects/ceiling-baffles.jpg' },
  { id: 'vertiface', name: 'Vertiface®', desc: 'Acoustic fabric overlay in velour or smooth finish. 38 colours.', price: 42, unit: 'm²', nrc: '0.35', thickness: '6mm', fire: 'B-s1, d0', img: '/projects/vertiface-wall.jpg' },
]

const PRESET_SIZES = [
  { label: '600 × 600', w: 600, h: 600 },
  { label: '1200 × 600', w: 1200, h: 600 },
  { label: '1200 × 1200', w: 1200, h: 1200 },
  { label: '1200 × 2400', w: 1200, h: 2400 },
  { label: '1200 × 2700', w: 1200, h: 2700 },
]

const FINISHES = ['Smooth', 'Velour', 'Grooved', 'Timber Print', 'Custom Print']

const PROJECTS = [
  { name: 'Composition® Office Install', type: 'Wallcovering', img: '/projects/composition-office.jpg' },
  { name: 'Quietspace® Open Plan', type: 'Wall Panels', img: '/projects/quietspace-office.jpg' },
  { name: 'Cube™ Feature Wall', type: 'Solid Colour Panels', img: '/projects/cube-space.jpg' },
  { name: '3D Tile Installation', type: 'Feature Panels', img: '/projects/3d-tile.jpg' },
  { name: 'Frontier Ceiling Baffles', type: 'Ceiling System', img: '/projects/ceiling-baffles.jpg' },
  { name: 'Vertiface® Meeting Room', type: 'Fabric Overlay', img: '/projects/vertiface-wall.jpg' },
]

/* ─── Animated counter hook ─── */
function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return val
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [product, setProduct] = useState(PRODUCTS[1])
  const [colour, setColour] = useState(COLOURS[14]) // Petronas
  const [sizePreset, setSizePreset] = useState<number | null>(3) // 1200x2400
  const [customW, setCustomW] = useState(1200)
  const [customH, setCustomH] = useState(2400)
  const [finish, setFinish] = useState('Smooth')
  const [qty, setQty] = useState(10)
  const [notes, setNotes] = useState('')
  const [step, setStep] = useState(1)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  const w = sizePreset !== null ? PRESET_SIZES[sizePreset].w : customW
  const h = sizePreset !== null ? PRESET_SIZES[sizePreset].h : customH
  const sizeLabel = sizePreset !== null ? PRESET_SIZES[sizePreset].label + 'mm' : `${customW} × ${customH}mm`
  const total = product.price * qty
  const panelRatio = w && h ? Math.max(w, h) / Math.min(w, h) : 2

  // Animated counters
  const c1 = useCounter(50, 1500, statsVisible)
  const c2 = useCounter(28, 1500, statsVisible)
  const c3 = useCounter(100, 2000, statsVisible)
  const c4 = useCounter(10, 1000, statsVisible)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer for stats
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.3 })
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/n2-logo.svg" alt="N2" style={{ height: '32px' }} />
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.25rem', color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Acoustics
          </span>
        </a>
        <ul className="nav-links">
          <li><a href="#builder">Panel Builder</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact" className="nav-cta-btn">Get a Quote</a></li>
        </ul>
      </nav>

      {/* ═══ HERO — PANEL BUILDER ═══ */}
      <section id="builder" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: '#0a0a0a', padding: '5rem 2rem 3rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* LEFT — Live Preview */}
          <div style={{ position: 'sticky', top: '5rem' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem', fontWeight: 700 }}>
              Live Preview
            </div>

            {/* Panel visual with real swatch texture */}
            <div style={{
              width: '100%', maxWidth: '440px',
              aspectRatio: String(Math.min(panelRatio, 2.5)),
              borderRadius: '8px', position: 'relative', overflow: 'hidden',
              boxShadow: `0 40px 80px rgba(0,0,0,0.5)`,
              transition: 'all 0.4s ease',
            }}>
              <img src={colour.swatch} alt={colour.name} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: finish === 'Grooved' ? 'contrast(1.1)' : 'none',
              }} />
              {/* Finish overlay */}
              {finish === 'Grooved' && (
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(0,0,0,0.15) 28px, rgba(0,0,0,0.15) 30px)', pointerEvents: 'none' }} />
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', pointerEvents: 'none' }}>
                <div style={{ color: 'white', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.05em' }}>{product.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '2px' }}>{sizeLabel} · {finish} · NRC {product.nrc}</div>
              </div>
            </div>

            {/* Quote Summary Card */}
            <div style={{
              marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px', padding: '1.25rem', maxWidth: '440px',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: "'Archivo', sans-serif",
            }}>
              {[
                ['Product', product.name],
                ['Colour', colour.name],
                ['Size', sizeLabel],
                ['Finish', finish],
                ['Quantity', `${qty} ${product.unit}${qty > 1 ? 's' : ''}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>{label}</span>
                  <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {label === 'Colour' && <span style={{ width: 10, height: 10, borderRadius: '50%', background: colour.hex, display: 'inline-block', border: '1px solid rgba(255,255,255,0.15)' }} />}
                    {value}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 700 }}>Estimated Total</span>
                <span style={{ color: 'white', fontSize: '1.5rem', fontFamily: "'Anton', sans-serif", letterSpacing: '0.02em' }}>£{total.toLocaleString()}</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginTop: '0.5rem' }}>
                Ex. VAT · Supply only · Installation quoted separately
              </div>
            </div>
          </div>

          {/* RIGHT — Builder Steps */}
          <div>
            <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'white', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>
              Build Your<br />Acoustic Solution
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '2rem' }}>
              Configure your panels and get an instant estimate. Real materials, real pricing.
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', gap: '2px', marginBottom: '2rem' }}>
              {['Product', 'Colour', 'Size & Finish', 'Review'].map((s, i) => (
                <button key={s} onClick={() => setStep(i + 1)} style={{
                  flex: 1, padding: '0.6rem 0.5rem', border: 'none', cursor: 'pointer',
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                  background: step >= i + 1 ? 'white' : 'rgba(255,255,255,0.06)',
                  color: step >= i + 1 ? 'black' : 'rgba(255,255,255,0.25)',
                  borderRadius: i === 0 ? '4px 0 0 4px' : i === 3 ? '0 4px 4px 0' : '0',
                  transition: 'all 0.2s',
                }}>
                  {s}
                </button>
              ))}
            </div>

            {/* STEP 1 — Product */}
            {step === 1 && (
              <div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {PRODUCTS.map(p => (
                    <button key={p.id} onClick={() => { setProduct(p); setStep(2) }} style={{
                      padding: '1rem 1.25rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                      background: product.id === p.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                      outline: product.id === p.id ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.05)',
                      textAlign: 'left', transition: 'all 0.15s',
                      display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>{p.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '2px' }}>{p.desc}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                          {[`NRC ${p.nrc}`, p.thickness, `Fire: ${p.fire}`].map(tag => (
                            <span key={tag} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'white', fontFamily: "'Anton', sans-serif", fontSize: '1.25rem' }}>£{p.price}</div>
                        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>per {p.unit}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 — Colour */}
            {step === 2 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem' }}>
                      Select Colour <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>— {colour.name}</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', marginTop: '2px' }}>{COLOURS.length} colours from the Autex Acoustics® range</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                  {COLOURS.map(c => (
                    <button key={c.name} onClick={() => { setColour(c); setStep(3) }} title={c.name} style={{
                      aspectRatio: '1', borderRadius: '6px', border: 'none', cursor: 'pointer',
                      overflow: 'hidden', position: 'relative',
                      outline: colour.name === c.name ? '2px solid white' : '1px solid rgba(255,255,255,0.08)',
                      outlineOffset: colour.name === c.name ? '2px' : '0',
                      transition: 'all 0.15s',
                    }}>
                      <img src={c.swatch} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {COLOURS.map(c => (
                    <button key={c.name} onClick={() => { setColour(c); setStep(3) }} style={{
                      padding: '3px 10px', borderRadius: '3px', border: 'none', cursor: 'pointer',
                      fontSize: '0.65rem', fontWeight: 600,
                      background: colour.name === c.name ? 'white' : 'rgba(255,255,255,0.05)',
                      color: colour.name === c.name ? 'black' : 'rgba(255,255,255,0.3)',
                    }}>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 — Size & Finish */}
            {step === 3 && (
              <div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', marginBottom: '1rem' }}>Panel Size</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
                  {PRESET_SIZES.map((s, i) => (
                    <button key={s.label} onClick={() => { setSizePreset(i) }} style={{
                      padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer',
                      fontSize: '0.8rem', fontWeight: 700,
                      background: sizePreset === i ? 'white' : 'rgba(255,255,255,0.05)',
                      color: sizePreset === i ? 'black' : 'rgba(255,255,255,0.4)',
                    }}>
                      {s.label}mm
                    </button>
                  ))}
                  <button onClick={() => setSizePreset(null)} style={{
                    padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer',
                    fontSize: '0.8rem', fontWeight: 700,
                    background: sizePreset === null ? 'white' : 'rgba(255,255,255,0.05)',
                    color: sizePreset === null ? 'black' : 'rgba(255,255,255,0.4)',
                  }}>
                    Custom
                  </button>
                </div>

                {sizePreset === null && (
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Width (mm)</label>
                      <input type="number" value={customW} onChange={e => setCustomW(Number(e.target.value) || 0)} style={{
                        width: '120px', padding: '0.6rem', borderRadius: '4px',
                        border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)',
                        color: 'white', fontSize: '1rem', fontWeight: 700,
                      }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.6rem', color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>×</div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Height (mm)</label>
                      <input type="number" value={customH} onChange={e => setCustomH(Number(e.target.value) || 0)} style={{
                        width: '120px', padding: '0.6rem', borderRadius: '4px',
                        border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)',
                        color: 'white', fontSize: '1rem', fontWeight: 700,
                      }} />
                    </div>
                  </div>
                )}

                <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Finish</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                  {FINISHES.map(f => (
                    <button key={f} onClick={() => setFinish(f)} style={{
                      padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer',
                      fontSize: '0.8rem', fontWeight: 700,
                      background: finish === f ? 'white' : 'rgba(255,255,255,0.05)',
                      color: finish === f ? 'black' : 'rgba(255,255,255,0.4)',
                    }}>
                      {f}
                    </button>
                  ))}
                </div>

                <button onClick={() => setStep(4)} style={{
                  padding: '0.75rem 2rem', borderRadius: '4px', border: 'none', cursor: 'pointer',
                  background: 'white', color: 'black', fontSize: '0.8rem', fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 4 — Quantity, Notes & Submit */}
            {step === 4 && (
              <div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', marginBottom: '1rem' }}>Quantity</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'white', fontSize: '1.25rem', cursor: 'pointer' }}>−</button>
                  <input type="number" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))} style={{
                    width: '70px', textAlign: 'center', padding: '0.5rem',
                    borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)', color: 'white',
                    fontSize: '1.1rem', fontWeight: 700,
                  }} />
                  <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 40, borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'white', fontSize: '1.25rem', cursor: 'pointer' }}>+</button>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[5, 10, 25, 50, 100].map(q => (
                      <button key={q} onClick={() => setQty(q)} style={{
                        padding: '0.4rem 0.6rem', borderRadius: '3px', border: 'none', cursor: 'pointer',
                        fontSize: '0.7rem', fontWeight: 700,
                        background: qty === q ? 'white' : 'rgba(255,255,255,0.05)',
                        color: qty === q ? 'black' : 'rgba(255,255,255,0.3)',
                      }}>{q}</button>
                    ))}
                  </div>
                </div>

                <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>Notes <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>(optional)</span></div>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special requirements — installation access, delivery constraints, custom branding..."
                  style={{
                    width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)',
                    color: 'white', fontSize: '0.85rem', fontFamily: "'Archivo', sans-serif",
                    resize: 'vertical', marginBottom: '1.5rem',
                  }}
                />

                <a href={`mailto:hello@n2group.co.uk?subject=Acoustic Panel Quote — ${product.name}&body=QUOTE REQUEST%0A%0AProduct: ${product.name}%0AColour: ${colour.name}%0ASize: ${sizeLabel}%0AFinish: ${finish}%0AQuantity: ${qty} ${product.unit}s%0AEstimated Total: £${total.toLocaleString()} (ex. VAT)%0A%0ANotes: ${encodeURIComponent(notes)}%0A%0APlease provide a formal quotation for the above specification.`}
                  style={{
                    display: 'inline-block', padding: '0.875rem 2.5rem',
                    background: 'white', color: 'black', textDecoration: 'none',
                    fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontWeight: 800, borderRadius: '4px',
                  }}>
                  Request Quote — £{total.toLocaleString()}
                </a>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', marginTop: '0.75rem' }}>
                  Estimated pricing ex. VAT. Supply only. Our team will confirm within 24 hours.
                </p>
              </div>
            )}

            {/* Step nav */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} style={{
                  padding: '0.5rem 1.25rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
                  fontSize: '0.75rem', fontWeight: 700,
                }}>← Back</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INTERACTIVE STATS ═══ */}
      <section ref={statsRef} style={{ background: 'black', padding: '5rem 2rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            {[
              { val: c1, suffix: '+', label: 'Years of manufacturing expertise', sub: 'N2 Group heritage' },
              { val: c2, suffix: '', label: 'Autex colour options', sub: 'Solid colours & textures' },
              { val: c3, suffix: '%', label: 'Carbon neutral operations', sub: 'Products & supply chain' },
              { val: c4, suffix: 'yr', label: 'Manufacturer warranty', sub: 'On all Autex products' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1.5rem' }}>
                <div style={{
                  fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: 'white', lineHeight: 1, marginBottom: '0.5rem',
                  transition: 'all 0.3s',
                }}>
                  {s.val}{s.suffix}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>{s.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="section" id="products">
        <div className="section-label">Products</div>
        <h2>Acoustic solutions for every space</h2>
        <p style={{ color: 'var(--n2-grey)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '550px', marginBottom: '2.5rem' }}>
          From flexible wallcoverings to ceiling baffles. Click any product to configure it in the builder.
        </p>
        <div className="products-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="product-card" onClick={() => { setProduct(p); setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              <img className="product-img" src={p.img} alt={p.name} />
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.4rem' }}>{p.name}</h3>
                <p style={{ color: 'var(--n2-grey)', fontSize: '0.85rem', lineHeight: 1.5 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  <span style={{ padding: '3px 10px', background: '#f5f5f5', borderRadius: '3px', fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>NRC {p.nrc}</span>
                  <span style={{ padding: '3px 10px', background: '#f5f5f5', borderRadius: '3px', fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>{p.thickness}</span>
                  <span style={{ padding: '3px 10px', background: 'black', borderRadius: '3px', fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>From £{p.price}/{p.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" style={{ background: '#f5f5f5', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-label">Projects</div>
          <h2>Installed across the UK</h2>
          <p style={{ color: 'var(--n2-grey)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '550px', marginBottom: '2.5rem' }}>
            Real Autex Acoustics® products supplied and installed by N2 Group.
          </p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card">
                <img src={p.img} alt={p.name} />
                <div className="project-overlay">
                  <div>
                    <div style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>{p.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{p.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="section" id="about">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="section-label">About</div>
            <h2>Part of N2 Group</h2>
            <p style={{ color: 'var(--n2-grey)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              N2 Acoustics is the acoustic solutions division of N2 Group — a powerhouse team with over
              50 years of manufacturing expertise. We provide a true 360° service from specification
              through to installation.
            </p>
            <p style={{ color: 'var(--n2-grey)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              All products supplied by Autex Acoustics®, a global leader in carbon neutral acoustic solutions.
              Made in the UK, designed for spaces where people live, work and learn.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Carbon Neutral', 'Made in UK', 'BS EN Certified', '10yr Warranty', 'Full Installation'].map(tag => (
                <span key={tag} style={{ padding: '0.4rem 0.75rem', background: 'black', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 700, color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <img src="/projects/composition-office.jpg" alt="" style={{ width: '100%', borderRadius: '6px', aspectRatio: '1', objectFit: 'cover' }} />
            <img src="/projects/cube-space.jpg" alt="" style={{ width: '100%', borderRadius: '6px', aspectRatio: '1', objectFit: 'cover' }} />
            <img src="/projects/vertiface-wall.jpg" alt="" style={{ width: '100%', borderRadius: '6px', aspectRatio: '1', objectFit: 'cover' }} />
            <img src="/projects/ceiling-baffles.jpg" alt="" style={{ width: '100%', borderRadius: '6px', aspectRatio: '1', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="contact" style={{ background: 'black', padding: '6rem 2rem', textAlign: 'center' }}>
        <div className="section-label" style={{ color: 'rgba(255,255,255,0.3)' }}>Get Started</div>
        <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', textTransform: 'uppercase', marginBottom: '1rem' }}>Ready to transform your space?</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '450px', margin: '0 auto 2rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
          From specification to installation — one team, one quote, one point of contact.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:hello@n2group.co.uk" style={{ display: 'inline-block', padding: '0.875rem 2.5rem', background: 'white', color: 'black', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 800, borderRadius: '4px' }}>
            Contact Us
          </a>
          <a href="#builder" style={{ display: 'inline-block', padding: '0.875rem 2.5rem', background: 'transparent', color: 'white', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 800, borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
            Build a Quote
          </a>
        </div>
        <div style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
          +44 (0)1992 440333 · hello@n2group.co.uk
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <img src="/n2-logo.svg" alt="N2" style={{ height: '24px' }} />
              <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '1rem', color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Acoustics</span>
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>Premium acoustic solutions supplied and installed by N2 Group.</p>
          </div>
          <div>
            <h4>Products</h4>
            <a href="#products">Composition®</a>
            <a href="#products">Quietspace® Panel</a>
            <a href="#products">Cube™</a>
            <a href="#products">Frontier</a>
            <a href="#products">Vertiface®</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About N2 Acoustics</a>
            <a href="#projects">Projects</a>
            <a href="https://www.n2group.co.uk" target="_blank" rel="noopener">N2 Group</a>
          </div>
          <div>
            <h4>Contact</h4>
            <p style={{ marginBottom: '0.4rem', fontSize: '0.85rem' }}>+44 (0)1992 440333</p>
            <a href="mailto:hello@n2group.co.uk">hello@n2group.co.uk</a>
            <p style={{ marginTop: '0.4rem', fontSize: '0.85rem' }}>N2 Group, Epping, Essex</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 N2 Acoustics. Part of N2 Group.</span>
          <span>Products supplied by Autex Acoustics®</span>
        </div>
      </footer>
    </>
  )
}
