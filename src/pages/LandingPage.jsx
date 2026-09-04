import { Link } from 'react-router-dom'
import { ArrowRight, Users, Building2, BarChart3, MapPin, CheckCircle, ChevronRight, TrendingUp, Globe, Shield } from 'lucide-react'

const stats = [
  { value: '2.68 Cr', label: 'PwDs in India',        note: 'Census 2011',                   color: '#0056B3' },
  { value: '23.8%',   label: 'Labour participation', note: 'NSS 2018 · age 15+',            color: '#0E7490' },
  { value: '69.5%',   label: 'Are rural',             note: 'Underserved by all platforms',  color: '#6D28D9' },
  { value: '76.4%',   label: 'Received no aid',       note: 'Government or NGO · NSS 2018',  color: '#B45309' },
]

const problems = [
  { num: '01', title: 'Existing platforms don\'t reach Tier 2/3 India',      body: 'SwarajAbility and Atypical Advantage serve metro, formal-sector hiring. 69% of PwDs live in smaller towns — structurally outside their reach.', accent: '#0056B3' },
  { num: '02', title: 'Job matching ignores functional reality',               body: '"I know Excel" on a resume doesn\'t tell an employer: "I use Excel via screen reader, keyboard-only." That missing detail kills placements.',           accent: '#0E7490' },
  { num: '03', title: 'MSMEs have no inclusive hiring path',                  body: 'The 4% RPWD Act quota has no enforcement outside large establishments. India\'s MSME-heavy Tier 2/3 economy has no mechanism at all.',              accent: '#6D28D9' },
  { num: '04', title: 'No workplace accessibility data below metro level',    body: 'A matching engine needs workplace accessibility signals to function. That data doesn\'t exist below metro level — so no platform has tried.',        accent: '#B45309' },
]

const dimensions = [
  { label: 'Skill compatibility',         pct: 92,   color: '#0056B3', existing: true  },
  { label: 'Travel feasibility',           pct: 61,   color: '#0056B3', existing: true  },
  { label: 'Workplace accessibility',      pct: 74,   color: '#0E7490', existing: false },
  { label: 'Assistive tech compatibility', pct: 88,   color: '#0E7490', existing: false },
  { label: 'Shift & schedule fit',         pct: 55,   color: '#B45309', existing: false },
  { label: 'Accommodation cost estimate',  pct: null, color: '#6D28D9', existing: false },
  { label: 'Placement retention score',    pct: 67,   color: '#15803D', existing: false },
]

const portals = [
  { title: 'Candidate Platform',  desc: 'Functional capability profiling, accessibility mapping, and placement-scored job matches.',              path: '/candidate',  icon: Users,      bg: '#0056B3' },
  { title: 'Employer Tools',      desc: 'Convert any role into an inclusive one. Estimate accommodation costs. Discover subsidies.',             path: '/employer',   icon: Building2,  bg: '#0E7490' },
  { title: 'District Dashboard',  desc: 'Skill inventory, placement gaps, quota compliance, and local employment opportunity maps.',             path: '/government', icon: BarChart3,  bg: '#6D28D9' },
  { title: 'Match Scorer',        desc: '7-dimension feasibility check between any candidate and job. Get a placement sustainability score.',    path: '/ai-match',   icon: TrendingUp, bg: '#B45309' },
  { title: 'CSC / Panchayat',     desc: 'Offline-capable, Hindi-first onboarding designed for rural candidates via Common Service Centres.',    path: '/csc',        icon: MapPin,     bg: '#BE185D' },
]

const proof = [
  { icon: Globe,        text: 'Tier 2 & Tier 3 focus',    sub: 'Built for the towns existing platforms ignore' },
  { icon: Shield,       text: 'RPWD Act 2016 aligned',     sub: '4% reservation · benchmark disability categories' },
  { icon: CheckCircle,  text: 'Research-driven',           sub: 'Census 2011 · NSS 2018 · DoPT · CCPD 2023–24' },
]

export default function LandingPage() {
  return (
    <div style={{ paddingTop: 58 }} className="page-in">

      {/* ── Hero ────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(165deg, #EBF2FC 0%, #F0F7FF 40%, #EEF2F7 100%)',
        borderBottom: '1px solid #D1DAE8',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Subtle geometric accent */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,86,179,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: 160, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,116,144,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-6xl mx-auto px-5 pt-20 pb-24" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, background: '#fff', border: '1px solid #BFDBFE', marginBottom: 28, boxShadow: '0 1px 4px rgba(0,86,179,.08)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0056B3' }} />
              <span style={{ fontSize: 12.5, color: '#0056B3', fontWeight: 700, letterSpacing: '.02em' }}>PwD Employment Platform · Tier 2/3 India</span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#2D2D2D', marginBottom: 20 }}>
              The placement layer<br />
              <span style={{ color: '#0056B3' }}>no job portal builds.</span>
            </h1>

            <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4B5563', maxWidth: 540, marginBottom: 36 }}>
              employ<strong style={{ color: '#0056B3' }}>AI</strong>ble doesn't match resumes to listings. It computes whether a
              placement will <em style={{ color: '#2D2D2D', fontStyle: 'normal', fontWeight: 600 }}>actually work</em> — factoring
              in workplace accessibility, assistive tech needs, accommodation costs, and retention likelihood.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/candidate" className="btn-blue" style={{ fontSize: 15, padding: '12px 28px' }}>
                See how it works <ArrowRight size={16} />
              </Link>
              <Link to="/ai-match" className="btn-ghost" style={{ fontSize: 15, padding: '12px 28px' }}>
                Try the match scorer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────── */}
      <section style={{ background: '#fff', borderBottom: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.035em', color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#2D2D2D', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problems ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <div style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 10 }}>The gap</div>
          <h2 style={{ fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#2D2D2D', maxWidth: 520, lineHeight: 1.2 }}>
            Why every existing platform misses<br />Tier 2/3 India
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {problems.map((p, i) => (
            <div key={i} className="card p-7" style={{ borderTop: `3px solid ${p.accent}` }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: p.accent, opacity: .18, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>{p.num}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 10, lineHeight: 1.5 }}>{p.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.75, color: '#4B5563' }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formula ─────────────────────────────── */}
      <section style={{ background: '#fff', borderTop: '1px solid #D1DAE8', borderBottom: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-24">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
            <div>
              <div className="section-label" style={{ marginBottom: 10 }}>What we compute</div>
              <h2 style={{ fontSize: 'clamp(20px,2.8vw,34px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#2D2D2D', lineHeight: 1.25, marginBottom: 16 }}>
                Placement isn't a match score.<br />
                <span style={{ color: '#0E7490' }}>It's a sustainability prediction.</span>
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#4B5563', marginBottom: 24 }}>
                Existing platforms score skill fit and stop. We add five more dimensions — the ones that
                actually determine whether someone stays employed beyond three months.
              </p>
              <div className="info-box" style={{ borderLeft: '3px solid #0E7490' }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 10, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>Example output</div>
                <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 2, color: '#4B5563' }}>
                  <div><span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> Excel data entry via <strong style={{ color: '#2D2D2D' }}>NVDA screen reader</strong></div>
                  <div><span style={{ color: '#0056B3', fontWeight: 700 }}>→</span> Provided CRM supports keyboard navigation</div>
                  <div><span style={{ color: '#B45309', fontWeight: 700 }}>!</span> Accommodation cost: <strong style={{ color: '#2D2D2D' }}>₹4,200/yr</strong> · Subsidy available</div>
                  <div><span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> Sustainable placement score: <strong style={{ color: '#0056B3', fontSize: 16 }}>83%</strong></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {dimensions.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 170, fontSize: 12.5, color: '#4B5563', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, lineHeight: 1.4 }}>
                    {!d.existing && (
                      <span style={{ background: '#E8F0FA', color: '#0056B3', fontSize: 9, fontWeight: 800, padding: '2px 5px', borderRadius: 3, letterSpacing: '.05em', textTransform: 'uppercase', flexShrink: 0 }}>new</span>
                    )}
                    {d.label}
                  </div>
                  <div style={{ flex: 1, height: 6, background: '#EEF2F7', borderRadius: 3, overflow: 'hidden' }}>
                    {d.pct !== null
                      ? <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: 3 }} />
                      : <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(90deg,#D1DAE8 0,#D1DAE8 4px,transparent 4px,transparent 8px)' }} />
                    }
                  </div>
                  <div style={{ width: 38, textAlign: 'right', fontSize: 12.5, fontWeight: 700, color: d.pct ? '#4B5563' : '#D1DAE8' }}>
                    {d.pct ?? '—'}%
                  </div>
                </div>
              ))}
              <div style={{ paddingTop: 16, borderTop: '1px solid #D1DAE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#4B5563' }}>Sustainable placement score</span>
                <span style={{ fontSize: 30, fontWeight: 800, color: '#15803D', letterSpacing: '-0.03em' }}>83%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portals ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <div style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Five portals</div>
          <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#2D2D2D', lineHeight: 1.2 }}>
            One platform, every stakeholder
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
          {portals.map((p, i) => (
            <Link key={i} to={p.path} className="card-hover p-6">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${p.bg}40` }}>
                  <p.icon size={19} color="white" />
                </div>
                <ChevronRight size={16} color="#B0BFD4" />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: '#4B5563' }}>{p.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trust row ───────────────────────────── */}
      <section style={{ background: '#fff', borderTop: '1px solid #D1DAE8', borderBottom: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-12">
          {proof.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: '#E8F0FA', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <p.icon size={18} color="#0056B3" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 4 }}>{p.text}</div>
                <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#EBF2FC,#E0F5F8)' }}>
        <div className="max-w-6xl mx-auto px-5 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#2D2D2D', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Built on real data. Designed for real constraints.
            </h3>
            <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7 }}>
              Census 2011 · NSS 2018 · DoPT records · CCPD Annual Report 2023–24 · RPWD Act 2016
            </p>
          </div>
          <Link to="/candidate" className="btn-blue" style={{ flexShrink: 0, fontSize: 14.5, padding: '12px 26px' }}>
            Explore the platform <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{ background: '#fff', borderTop: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#0056B3,#0E7490)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M7 12C7 12 4 10.2 4 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M7 12C7 12 10 10.2 10 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="7" cy="7" r="1.2" fill="white"/>
              </svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.015em' }}>
              employ<span style={{ color: '#0056B3' }}>AI</span>ble
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#6B7280' }}>
            Bridging the PwD employment gap across Tier 2 &amp; Tier 3 India · RPWD Act 2016
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {portals.slice(0,3).map(p => (
              <Link key={p.path} to={p.path} style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#0056B3'}
                onMouseLeave={e => e.target.style.color = '#6B7280'}
              >{p.title}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
