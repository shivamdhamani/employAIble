import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Brain, ArrowRight, Users, Building2, BarChart3, Mic, MapPin,
  CheckCircle, AlertTriangle, TrendingUp, Zap, Globe, Shield,
  ChevronRight, Target
} from 'lucide-react'

const stats = [
  { value: '2.68 Cr', label: 'PwDs in India', sub: 'Latest Census' },
  { value: '23.8%', label: 'Labour Force Participation', sub: 'NSS 2018 Survey' },
  { value: '76.4%', label: 'Received No Aid', sub: 'Huge support gap' },
  { value: '67.1%', label: 'Faced Transport Barriers', sub: 'NSS 2018 Survey' },
]

const problems = [
  {
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    title: 'Existing Platforms Fail Tier 2/3',
    desc: 'SwarajAbility & Atypical Advantage are built for metro, formal-sector. 69% of PwDs are rural — structurally unreachable.'
  },
  {
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    title: 'No Accessibility Data Below Metro Level',
    desc: 'Tier 2/3 towns have no crowdsourced or institutional dataset of accessible buildings, transit, or last-mile transport.'
  },
  {
    icon: Building2,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    title: 'MSME Sector Has No Inclusion Mechanism',
    desc: '4% government quota has no teeth outside large establishments. India\'s MSME-heavy Tier 2/3 economy sits entirely outside enforcement.'
  },
  {
    icon: Shield,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Quota Under-fulfillment',
    desc: 'Fewer than 60% of Group A central PSU vacancies were filled at mandated 4% reservation level (CCPD Annual Report 2023–24).'
  },
]

const features = [
  {
    icon: Brain,
    title: 'Sustainable Placement Score',
    desc: 'Multi-dimensional AI score: Skill match × Travel feasibility × Workplace accessibility × Accommodation cost × Retention probability',
    color: 'from-blue-500 to-purple-600',
  },
  {
    icon: Target,
    title: 'Functional Capability Profiling',
    desc: '"I can do Excel using screen reader IF CRM supports keyboard navigation" — not just "I know Excel"',
    color: 'from-emerald-500 to-cyan-600',
  },
  {
    icon: MapPin,
    title: 'Hyperlocal Demand Mapping',
    desc: 'AI analyzes 500 PwDs in Ajmer and tells the district: 31 can do bookkeeping, 42 can do remote support, 37 e-commerce cataloguing.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Mic,
    title: 'Voice-First, Offline-Capable',
    desc: 'Regional language interfaces, low-bandwidth onboarding, CSC/panchayat physical nodes — for the 69% who are rural.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Building2,
    title: '"Convert This Job" AI Wizard',
    desc: 'Employers don\'t know how to make jobs disability-inclusive. Our AI converts any existing job role into an inclusive one.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Accommodation Cost Estimator',
    desc: 'Tier 2/3 MSMEs can\'t self-fund accommodations. We estimate cost, surface subsidies, and enable cost-sharing mechanisms.',
    color: 'from-cyan-500 to-blue-600',
  },
]

const formula = [
  { label: 'Skill Match', value: 92, color: 'bg-blue-500', existing: true },
  { label: 'Travel Feasibility', value: 42, color: 'bg-cyan-500', existing: true },
  { label: 'Workplace Accessibility', value: null, color: 'bg-purple-500', existing: false },
  { label: 'Screen-Reader Compatibility', value: null, color: 'bg-pink-500', existing: false },
  { label: 'Accommodation Cost (est.)', value: null, color: 'bg-orange-500', existing: false },
  { label: 'Shift Compatibility', value: 35, color: 'bg-yellow-500', existing: false },
  { label: 'Sustainable Placement Prob.', value: 58, color: 'bg-emerald-500', existing: false },
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const num = parseFloat(target)
    const step = num / 60
    let cur = 0
    const interval = setInterval(() => {
      cur += step
      if (cur >= num) { setCount(num); clearInterval(interval) }
      else setCount(Math.floor(cur * 10) / 10)
    }, 25)
    return () => clearInterval(interval)
  }, [target])
  return <span>{count}{suffix}</span>
}

export default function LandingPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Smart India Hackathon 2026 &nbsp;·&nbsp; Problem Statement #MH1583
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Not just a job portal.<br />
            <span className="gradient-text">The missing intelligence</span><br />
            <span className="text-slate-300">for PwD employment.</span>
          </h1>

          {/* Sub */}
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            EmployAIable computes the full picture that no platform does today:
            <br />
            <span className="text-white font-semibold">
              Candidate Capability × Job Requirement × Workplace Accessibility × Local Infrastructure × Accommodation × Cost × Retention Probability
            </span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/candidate" className="btn-primary flex items-center gap-2">
              Explore Candidate Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/ai-match" className="btn-secondary flex items-center gap-2">
              <Brain className="w-4 h-4" /> AI Match Engine
            </Link>
            <Link to="/government" className="btn-secondary flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Govt Dashboard
            </Link>
          </div>

          {/* Tier 2/3 callout */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
            <MapPin className="w-4 h-4" />
            Built specifically for <strong className="text-emerald-200 ml-1">Tier 2 & Tier 3 cities</strong> — where 69% of India's PwDs actually live
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title gradient-text">The Scale of the Problem</h2>
            <p className="section-subtitle mx-auto">
              Data from Census 2011, NSS 2018, DoPT — the numbers demand action.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
                <div className="text-white font-semibold text-sm">{s.label}</div>
                <div className="text-slate-500 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The missing formula */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">The <span className="gradient-text">Missing Formula</span></h2>
            <p className="section-subtitle mx-auto">
              Every other platform shows you 2 dimensions. We compute all 7.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4">
            <div className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">
              What a job match should actually show:
            </div>
            {formula.map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-48 text-sm text-slate-300 shrink-0 flex items-center gap-2">
                  {f.existing ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-slate-700 text-slate-400">Existing</span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">NEW ✦</span>
                  )}
                  {f.label}
                </div>
                <div className="flex-1 score-bar">
                  {f.value !== null ? (
                    <div
                      className={`score-fill ${f.color}`}
                      style={{ width: `${f.value}%` }}
                    />
                  ) : (
                    <div className="h-full flex items-center px-3">
                      <span className="text-xs text-slate-500 italic">unknown — EmployAIable maps this</span>
                    </div>
                  )}
                </div>
                <div className="w-16 text-right text-sm font-bold">
                  {f.value !== null ? (
                    <span className="text-white">{f.value}%</span>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-slate-400 text-sm">Sustainable Placement Probability</span>
              <span className="text-2xl font-black text-emerald-400">58%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Why <span className="gradient-text">Nothing Else Works</span></h2>
            <p className="section-subtitle mx-auto">
              This isn't an underfunded existing problem — it's an unaddressed frontier.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((p, i) => (
              <div key={i} className={`glass-card p-6 border ${p.bg} group hover:scale-[1.02] transition-transform`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.bg} mb-4`}>
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">What <span className="gradient-text">We Build</span></h2>
            <p className="section-subtitle mx-auto">
              6 groundbreaking features that no other platform has put together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card-hover p-6 group cursor-pointer">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals CTA */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Explore the <span className="gradient-text">5 Portals</span></h2>
            <p className="section-subtitle mx-auto">One system serving every stakeholder in the inclusion ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Candidate Portal', desc: 'Voice-first, accessibility-aware job matching with Sustainable Placement Score', path: '/candidate', icon: Users, color: 'from-blue-600 to-indigo-600' },
              { title: 'Employer Portal', desc: '"Convert This Job" wizard + accommodation cost estimator for MSMEs', path: '/employer', icon: Building2, color: 'from-emerald-600 to-cyan-600' },
              { title: 'Government Dashboard', desc: 'Hyperlocal disability employment demand map + quota tracker', path: '/government', icon: BarChart3, color: 'from-orange-600 to-red-600' },
              { title: 'AI Match Engine', desc: 'Full 7-dimension scoring engine with placement prediction', path: '/ai-match', icon: Brain, color: 'from-purple-600 to-pink-600' },
              { title: 'CSC Onboarding Node', desc: 'Offline-capable, low-bandwidth panchayat-level onboarding', path: '/csc', icon: MapPin, color: 'from-rose-600 to-pink-600' },
              { title: 'CSC Onboarding Node', desc: 'Offline-first, voice-guided Hindi onboarding — built for panchayat-level CSC operators', path: '/csc', icon: MapPin, color: 'from-rose-600 to-pink-600' },
              { title: 'Match Intelligence Engine', desc: '7-dimension real-time scorer: skill × travel × accessibility × accommodation × retention', path: '/ai-match', icon: Brain, color: 'from-yellow-600 to-orange-600' },
            ].map((portal, i) => (
              <Link key={i} to={portal.path} className="glass-card-hover p-6 group flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <portal.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{portal.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{portal.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:gap-2 transition-all mt-auto">
                  Open <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold gradient-text text-lg">EmployAIable</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs">
              <CheckCircle className="w-3 h-3" />
              RPWD Act 2016 Aligned
            </div>
          </div>

          {/* Team info */}
          <div className="glass-card p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Hackathon</div>
              <div className="text-white font-semibold">Smart India Hackathon 2026</div>
              <div className="text-slate-400 text-xs mt-0.5">PS #MH1583 — Ministry of Social Justice</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Problem Domain</div>
              <div className="text-white font-semibold">Disability & Employment</div>
              <div className="text-slate-400 text-xs mt-0.5">Tier 2/3 Inclusive Hiring Platform</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Research Basis</div>
              <div className="text-white font-semibold">Census 2011, NSS 2018</div>
              <div className="text-slate-400 text-xs mt-0.5">DoPT Data · CCPD Report 2023–24</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Legislation</div>
              <div className="text-white font-semibold">RPWD Act 2016</div>
              <div className="text-slate-400 text-xs mt-0.5">4% Reservation · Benchmark Disability</div>
            </div>
          </div>

          <div className="text-slate-600 text-xs text-center">
            EmployAIable — Bridging India's PwD Employment Gap, one district at a time. &nbsp;·&nbsp; SIH 2026
          </div>
        </div>
      </footer>
    </div>
  )
}
