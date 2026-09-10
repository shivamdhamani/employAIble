import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  ArrowRight, Users, Building2, BarChart3, MapPin, CheckCircle,
  ChevronRight, TrendingUp, Globe, Shield, Zap, Heart, Star,
  Award, Target, Layers, Eye, Ear, Accessibility, Brain,
  Phone, MessageSquare, Bot
} from 'lucide-react'

/* ── Animated counter hook ────────────────── */
function useCountUp(target, duration = 1800, suffix = '') {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const numTarget = parseFloat(target)
        const tick = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setVal(eased * numTarget)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])

  const isFloat = String(target).includes('.')
  const display = isFloat ? val.toFixed(1) : Math.round(val)
  return { ref, display: display + suffix }
}

/* ── Data ────────────────────────────────── */
const impactStats = [
  { value: '2.68', suffix: ' Cr', label: 'PwDs in India', note: 'Census 2011', color: '#0056B3' },
  { value: '23.8', suffix: '%', label: 'Labour Participation', note: 'NSS 2018 · Age 15+', color: '#0E7490' },
  { value: '69.5', suffix: '%', label: 'Live in Rural India', note: 'Underserved by all platforms', color: '#6D28D9' },
  { value: '76.4', suffix: '%', label: 'Received Zero Aid', note: 'No govt or NGO support', color: '#B45309' },
]

const howItWorks = [
  { step: '01', title: 'Candidate Profiles', desc: 'Functional capability profiling — not just resume keywords. We capture what tools a person uses, how they use them, and what accommodations they need.', icon: Users, color: '#0056B3' },
  { step: '02', title: 'AI Match Engine', desc: 'Our 7-dimension Sustainable Placement Probability (SPP) algorithm scores workplace accessibility, commute, assistive tech, and retention — not just skills.', icon: Zap, color: '#0E7490' },
  { step: '03', title: 'Employer Toolkit', desc: 'Companies get accommodation cost estimates, subsidy calculators, and automatic compliance audit reports for RPWD Act Section 34.', icon: Building2, color: '#6D28D9' },
  { step: '04', title: 'Sustainable Placement', desc: 'Every match outputs a placement sustainability score. Green means the person will likely stay employed beyond 6 months — not just get hired.', icon: Target, color: '#15803D' },
]

const portals = [
  { title: 'Candidate Portal', desc: 'Functional capability profiling, accessibility mapping, govt scheme discovery, and SPP-scored job matches.', path: '/candidate', icon: Users, bg: '#0056B3' },
  { title: 'Employer Tools', desc: 'Convert any role into an inclusive one. Estimate accommodation costs. Discover government subsidies.', path: '/employer', icon: Building2, bg: '#0E7490' },
  { title: 'District Dashboard', desc: 'Skill inventory, placement gaps, quota compliance, and local employment opportunity maps for government officers.', path: '/government', icon: BarChart3, bg: '#6D28D9' },
  { title: 'AI Match Scorer', desc: '7-dimension feasibility check between any candidate and job. Get a placement sustainability score instantly.', path: '/ai-match', icon: TrendingUp, bg: '#B45309' },
  { title: 'Community & Mentors', desc: 'Placed PwDs mentoring the next generation. Peer workshops, success stories, and a live discussion forum.', path: '/community', icon: Heart, bg: '#15803D' },
  { title: 'CSC / Panchayat Desk', desc: 'Offline-capable, Hindi-first onboarding designed for rural candidates via Common Service Centres across India.', path: '/csc', icon: MapPin, bg: '#BE185D' },
]

const disabilities = [
  { icon: Eye, label: 'Visual Impairment', color: '#0056B3' },
  { icon: Ear, label: 'Hearing Disability', color: '#0E7490' },
  { icon: Accessibility, label: 'Locomotor Disability', color: '#6D28D9' },
  { icon: Brain, label: 'Cognitive / Intellectual', color: '#B45309' },
]

const testimonials = [
  { name: 'Ramesh K.', role: 'Data Entry Operator, Ajmer', text: 'I have visual impairment and could never find a job that understood I use a screen reader. employAIble matched me with a role that already had NVDA support.', disability: 'Visual', avatar: '👨‍💼' },
  { name: 'Priya M.', role: 'HR Manager, Jaipur MSME', text: 'We wanted to hire PwD candidates but didn\'t know what accommodations to provide or what subsidies we qualify for. This platform solved both problems instantly.', disability: 'Employer', avatar: '👩‍💼' },
  { name: 'Sanjay T.', role: 'CSC VLE, Kishangarh', text: 'I enrolled 15 candidates in one week using the Hindi onboarding system. Even candidates who cannot read English could complete their profile with voice guidance.', disability: 'VLE', avatar: '👨‍🌾' },
]

const techFeatures = [
  'AI-powered matching with Google Gemini',
  'Voice-guided onboarding in Hindi',
  'Offline-capable CSC kiosk mode',
  'Real-time govt scheme recommendations',
  'RPWD Act 2016 compliance engine',
  'Accessible UI (WCAG 2.1 AA)',
]

/* ── Stat Card Component ──────────────────── */
function StatCard({ value, suffix, label, note, color }) {
  const { ref, display } = useCountUp(value, 1800, suffix)
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.04em', color, lineHeight: 1, marginBottom: 8 }}>
        {display}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#6B7280' }}>{note}</div>
    </div>
  )
}

/* ── Main Component ───────────────────────── */
export default function LandingPage() {
  const { isLoggedIn } = useAuth()

  return (
    <div style={{ paddingTop: 58 }} className="page-in">

      {/* ═══════════════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(165deg, #EBF2FC 0%, #F0F7FF 40%, #EEF2F7 100%)',
        borderBottom: '1px solid #D1DAE8',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,86,179,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: 160, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,116,144,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '60%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(109,40,217,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-6xl mx-auto px-5 pt-16 pb-20" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div style={{ maxWidth: 580 }}>
              {/* SIH Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#FFFFFF', borderRadius: 24, border: '1px solid #D1DAE8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 20 }}>
                <Award size={15} color="#B45309" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#B45309', letterSpacing: '.03em' }}>
                  Smart India Hackathon 2024
                </span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>•</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#4B5563' }}>
                  Problem Statement ID: 1712
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#2D2D2D', marginBottom: 20 }}>
                India's first<br />
                <span style={{ color: '#0056B3' }}>hyperlocal PwD</span><br />
                employment platform.
              </h1>

              <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4B5563', maxWidth: 520, marginBottom: 32 }}>
                employ<strong style={{ color: '#0056B3' }}>AI</strong>ble doesn't just match resumes. It computes whether a
                placement will <em style={{ color: '#2D2D2D', fontStyle: 'normal', fontWeight: 600 }}>actually sustain</em> — factoring
                workplace accessibility, assistive tech, accommodation costs, and retention probability.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {isLoggedIn ? (
                  <Link to="/candidate" className="btn-blue" style={{ fontSize: 15, padding: '13px 30px' }}>
                    Open Dashboard <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link to="/login" className="btn-blue" style={{ fontSize: 15, padding: '13px 30px' }}>
                    Sign In & Explore <ArrowRight size={16} />
                  </Link>
                )}
                <Link to="/ai-match" className="btn-ghost" style={{ fontSize: 15, padding: '13px 28px' }}>
                  Try AI Match Scorer
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                {['RPWD Act 2016 Aligned', 'Google Gemini AI', 'WCAG 2.1 Accessible'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={14} color="#15803D" />
                    <span style={{ fontSize: 12.5, color: '#4B5563', fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side — Logo showcase */}
            <div className="hidden md:flex" style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: '40px 36px',
              border: '1px solid #D1DAE8',
              boxShadow: '0 12px 32px -8px rgba(0,86,179,0.12), 0 4px 12px rgba(0,0,0,0.04)',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              <img src="/logo.png" alt="employAIble" style={{ width: '100%', maxWidth: 320, height: 'auto', objectFit: 'contain', marginBottom: 20 }} />
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#0E7490', marginBottom: 8 }}>
                National PwD Employment Companion
              </div>
              <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
                Hyperlocal Feasibility · AI-Powered Matching · RPWD Act 2016
              </div>

              {/* Disability categories served */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 24, width: '100%' }}>
                {disabilities.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: '1px solid #EEF2F7', background: '#F8FAFC' }}>
                    <d.icon size={16} color={d.color} />
                    <span style={{ fontSize: 11.5, color: '#4B5563', fontWeight: 500 }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IMPACT STATS (Animated counters)
         ═══════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderBottom: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-16">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="section-label" style={{ marginBottom: 8 }}>The problem we solve</div>
            <h2 style={{ fontSize: 'clamp(20px,3vw,30px)', fontWeight: 700, color: '#2D2D2D', letterSpacing: '-0.02em' }}>
              Millions excluded. Zero platforms built for them.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {impactStats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS
         ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F5F7FA' }}>
        <div className="max-w-6xl mx-auto px-5 py-24">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 10 }}>How it works</div>
            <h2 style={{ fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#2D2D2D', lineHeight: 1.2 }}>
              From profile to sustainable placement
            </h2>
            <p style={{ fontSize: 15, color: '#4B5563', maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>
              Four steps that replace months of manual searching and guesswork.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
            {howItWorks.map((item, i) => (
              <div key={i} className="card p-7" style={{ borderTop: `3px solid ${item.color}`, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 14px ${item.color}30` }}>
                    <item.icon size={20} color="white" />
                  </div>
                  <span style={{ fontSize: 40, fontWeight: 900, color: item.color, opacity: 0.1, letterSpacing: '-0.04em', lineHeight: 1 }}>{item.step}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: '#4B5563' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SPP FORMULA — What makes us different
         ═══════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderTop: '1px solid #D1DAE8', borderBottom: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-24">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <div className="section-label" style={{ marginBottom: 10 }}>Our core innovation</div>
              <h2 style={{ fontSize: 'clamp(20px,2.8vw,34px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#2D2D2D', lineHeight: 1.25, marginBottom: 16 }}>
                Placement isn't a match score.<br />
                <span style={{ color: '#0E7490' }}>It's a sustainability prediction.</span>
              </h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: '#4B5563', marginBottom: 24 }}>
                Existing platforms score skill fit and stop. We add five more dimensions — the ones that
                actually determine whether someone stays employed beyond three months.
              </p>

              {/* Example output box */}
              <div className="info-box" style={{ borderLeft: '3px solid #0E7490' }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 10, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>Live output example</div>
                <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 2, color: '#4B5563' }}>
                  <div><span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> Excel data entry via <strong style={{ color: '#2D2D2D' }}>NVDA screen reader</strong></div>
                  <div><span style={{ color: '#0056B3', fontWeight: 700 }}>→</span> CRM supports keyboard navigation</div>
                  <div><span style={{ color: '#B45309', fontWeight: 700 }}>!</span> Accommodation cost: <strong style={{ color: '#2D2D2D' }}>₹4,200/yr</strong> · Subsidy available</div>
                  <div><span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> Sustainable placement score: <strong style={{ color: '#0056B3', fontSize: 16 }}>83%</strong></div>
                </div>
              </div>
            </div>

            {/* Dimension bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Skill compatibility', pct: 92, color: '#0056B3', isNew: false },
                { label: 'Travel feasibility', pct: 61, color: '#0056B3', isNew: false },
                { label: 'Workplace accessibility', pct: 74, color: '#0E7490', isNew: true },
                { label: 'Assistive tech compatibility', pct: 88, color: '#0E7490', isNew: true },
                { label: 'Shift & schedule fit', pct: 55, color: '#B45309', isNew: true },
                { label: 'Accommodation cost estimate', pct: null, color: '#6D28D9', isNew: true },
                { label: 'Placement retention score', pct: 67, color: '#15803D', isNew: true },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 180, fontSize: 12.5, color: '#4B5563', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, lineHeight: 1.4 }}>
                    {d.isNew && (
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

      {/* ═══════════════════════════════════════════════
          PORTALS — Every stakeholder
         ═══════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Six integrated modules</div>
          <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#2D2D2D', lineHeight: 1.2 }}>
            One platform, every stakeholder
          </h2>
          <p style={{ fontSize: 14.5, color: '#4B5563', maxWidth: 480, margin: '10px auto 0', lineHeight: 1.6 }}>
            Candidates, employers, government officers, and CSC operators — all on one unified system.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {portals.map((p, i) => (
            <Link key={i} to={isLoggedIn ? p.path : '/login'} className="card-hover p-6">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${p.bg}40` }}>
                  <p.icon size={20} color="white" />
                </div>
                <ChevronRight size={16} color="#B0BFD4" />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: '#4B5563' }}>{p.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
         ═══════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderTop: '1px solid #D1DAE8', borderBottom: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Impact stories</div>
            <h2 style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 700, color: '#2D2D2D', letterSpacing: '-0.02em' }}>
              Real people. Real placements.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card p-7" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#4B5563', flex: 1 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: '1px solid #EEF2F7' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TECH FEATURES + AI CHATBOT
         ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F5F7FA' }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="section-label" style={{ marginBottom: 10 }}>Technology</div>
              <h2 style={{ fontSize: 'clamp(20px,2.8vw,32px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#2D2D2D', lineHeight: 1.25, marginBottom: 16 }}>
                Built with production-grade tech
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#4B5563', marginBottom: 24 }}>
                Not a prototype mockup — a fully functional platform with real AI integration, voice accessibility, and offline capability.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {techFeatures.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={16} color="#15803D" />
                    <span style={{ fontSize: 14, color: '#2D2D2D', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Chatbot preview card */}
            <div className="card p-7" style={{ boxShadow: '0 12px 32px rgba(0,86,179,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#0056B3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D' }}>Sahayak AI Assistant</div>
                  <div style={{ fontSize: 12, color: '#15803D', fontWeight: 600 }}>● Online · Google Gemini</div>
                </div>
              </div>

              {/* Chat preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ alignSelf: 'flex-end', background: '#0056B3', color: 'white', padding: '10px 14px', borderRadius: '14px 14px 4px 14px', fontSize: 13, maxWidth: '80%' }}>
                  What schemes can I apply for with locomotor disability?
                </div>
                <div style={{ alignSelf: 'flex-start', background: '#F5F7FA', color: '#2D2D2D', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', fontSize: 13, maxWidth: '85%', lineHeight: 1.6 }}>
                  You may be eligible for: <strong>ADIP Scheme</strong> (free assistive devices), <strong>SIPDA</strong> (skill training scholarship), <strong>NHFDC Loans</strong> (up to ₹25L at 5% interest). I can help you apply! 🎯
                </div>
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 6 }}>
                  <span style={{ padding: '5px 10px', borderRadius: 16, border: '1px solid #D1DAE8', fontSize: 11, color: '#4B5563', background: '#fff' }}>Apply for ADIP</span>
                  <span style={{ padding: '5px 10px', borderRadius: 16, border: '1px solid #D1DAE8', fontSize: 11, color: '#4B5563', background: '#fff' }}>Find jobs near me</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST / COMPLIANCE ROW
         ═══════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderTop: '1px solid #D1DAE8', borderBottom: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-12">
          {[
            { icon: Globe, text: 'Tier 2 & Tier 3 Focus', sub: 'Built for the 69% of PwDs living in towns existing platforms completely ignore' },
            { icon: Shield, text: 'RPWD Act 2016 Aligned', sub: 'Full 4% reservation compliance · All 21 benchmark disability categories supported' },
            { icon: Layers, text: 'Research-Backed Data', sub: 'Census 2011 · NSS 2018 · DoPT · CCPD Annual Report 2023–24' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: '#E8F0FA', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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

      {/* ═══════════════════════════════════════════════
          FINAL CTA
         ═══════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg,#EBF2FC,#E0F5F8)' }}>
        <div className="max-w-6xl mx-auto px-5 py-20" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.2 }}>
            Ready to bridge the employment gap?
          </h2>
          <p style={{ fontSize: 15, color: '#4B5563', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Join the platform that's making inclusive hiring actually work — from metros to mandis.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            {isLoggedIn ? (
              <Link to="/candidate" className="btn-blue" style={{ fontSize: 15, padding: '14px 32px' }}>
                Open Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <Link to="/login" className="btn-blue" style={{ fontSize: 15, padding: '14px 32px' }}>
                Get Started — It's Free <ArrowRight size={16} />
              </Link>
            )}
            <Link to="/ai-match" className="btn-ghost" style={{ fontSize: 15, padding: '14px 28px' }}>
              See AI Match Engine
            </Link>
          </div>
          <div style={{ marginTop: 24, fontSize: 13, color: '#6B7280' }}>
            Built on real data · Census 2011 · NSS 2018 · DoPT · CCPD 2023–24 · RPWD Act 2016
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════════ */}
      <footer style={{ background: '#fff', borderTop: '1px solid #D1DAE8' }}>
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32, marginBottom: 32 }}>
            {/* Brand */}
            <div>
              <img src="/logo.png" alt="employAIble" style={{ height: 36, width: 'auto', objectFit: 'contain', marginBottom: 12 }} />
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>
                India's first hyperlocal PwD employment platform. Bridging the gap across Tier 2 & Tier 3 India.
              </p>
            </div>

            {/* Platform */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2D2D2D', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>Platform</div>
              {portals.slice(0,4).map(p => (
                <Link key={p.path} to={isLoggedIn ? p.path : '/login'} style={{ display: 'block', fontSize: 13, color: '#6B7280', textDecoration: 'none', marginBottom: 8 }}
                  onMouseEnter={e => e.target.style.color = '#0056B3'}
                  onMouseLeave={e => e.target.style.color = '#6B7280'}
                >{p.title}</Link>
              ))}
            </div>

            {/* Resources */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2D2D2D', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>Resources</div>
              {['RPWD Act 2016', 'UDID Portal', 'DEPwD Schemes', 'Census 2011 Data'].map(l => (
                <div key={l} style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>{l}</div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2D2D2D', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>Contact</div>
              <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Mail size={14} color="#6B7280" />
                  <span>team@employaible.in</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Phone size={14} color="#6B7280" />
                  <span>+91-XXXXX-XXXXX</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={14} color="#6B7280" />
                  <span>Rajasthan, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ paddingTop: 20, borderTop: '1px solid #EEF2F7', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>
              © 2024 employAIble · Built for Smart India Hackathon · Problem Statement 1712
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Privacy Policy', 'Terms of Use', 'Accessibility'].map(l => (
                <span key={l} style={{ fontSize: 12, color: '#9CA3AF', cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#0056B3'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}
                >{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
