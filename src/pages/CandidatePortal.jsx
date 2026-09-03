import { useState } from 'react'
import { 
  Mic, Volume2, CheckCircle, ChevronRight, MapPin, 
  Accessibility, Eye, Ear, Hand, Brain, Wifi, WifiOff,
  Star, Clock, IndianRupee, TrendingUp, AlertCircle,
  User, Phone, FileText, Briefcase
} from 'lucide-react'

const disabilityTypes = [
  { id: 'visual', label: 'Visual Impairment', icon: Eye, color: 'blue' },
  { id: 'hearing', label: 'Hearing Impairment', icon: Ear, color: 'purple' },
  { id: 'locomotor', label: 'Locomotor Disability', icon: Accessibility, color: 'orange' },
  { id: 'cognitive', label: 'Autism / Intellectual', icon: Brain, color: 'pink' },
]

const matchResults = [
  {
    id: 1,
    title: 'Data Entry Operator',
    company: 'Rajasthan State Cooperative',
    location: 'Ajmer (4.2 km)',
    type: 'Government',
    scores: {
      skillMatch: 92,
      travelFeasibility: 78,
      accessibilityScore: 84,
      screenReaderCompat: 91,
      accommodationLevel: 'Low',
      estimatedCost: 4200,
      shiftCompatibility: 88,
      spp: 87,
    },
    tags: ['Screen-reader friendly', 'Keyboard navigation', 'Flexible hours'],
    salary: '18,000–22,000',
    mode: 'Hybrid',
    color: 'emerald',
  },
  {
    id: 2,
    title: 'Remote Customer Support',
    company: 'TechSeva Solutions',
    location: 'Remote (Work from Home)',
    type: 'Private MSME',
    scores: {
      skillMatch: 85,
      travelFeasibility: 100,
      accessibilityScore: 72,
      screenReaderCompat: 78,
      accommodationLevel: 'Minimal',
      estimatedCost: 1500,
      shiftCompatibility: 65,
      spp: 79,
    },
    tags: ['Work from home', 'Regional language', 'Voice interface'],
    salary: '14,000–18,000',
    mode: 'Remote',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Digital Bookkeeping Assistant',
    company: 'Ajmer Traders Association',
    location: 'Ajmer (1.8 km)',
    type: 'MSME',
    scores: {
      skillMatch: 78,
      travelFeasibility: 95,
      accessibilityScore: 61,
      screenReaderCompat: 55,
      accommodationLevel: 'Moderate',
      estimatedCost: 8500,
      shiftCompatibility: 90,
      spp: 63,
    },
    tags: ['Near home', 'Tally compatible', 'Ramp access'],
    salary: '12,000–15,000',
    mode: 'On-site',
    color: 'orange',
  },
]

function ScoreRing({ value, size = 80, color = '#3b82f6', label }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        <text x="40" y="44" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{value}%</text>
      </svg>
      {label && <span className="text-xs text-slate-400 text-center leading-tight">{label}</span>}
    </div>
  )
}

function ScoreBar({ label, value, color, isNew = false }) {
  const colorMap = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    cyan: 'bg-cyan-500',
    pink: 'bg-pink-500',
    yellow: 'bg-yellow-500',
  }
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 flex items-center gap-1">
          {isNew && <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-600/30 text-blue-300 border border-blue-500/30">NEW</span>}
          {label}
        </span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="score-bar">
        <div className={`score-fill ${colorMap[color] || 'bg-blue-500'}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false)
  const sppColor = job.scores.spp >= 80 ? 'text-emerald-400' : job.scores.spp >= 65 ? 'text-yellow-400' : 'text-orange-400'
  const sppBg = job.scores.spp >= 80 ? 'bg-emerald-500/10 border-emerald-500/30' : job.scores.spp >= 65 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-orange-500/10 border-orange-500/30'
  const sppRingColor = job.scores.spp >= 80 ? '#22c55e' : job.scores.spp >= 65 ? '#f59e0b' : '#f97316'

  return (
    <div className="glass-card p-6 space-y-4 hover:bg-white/[0.07] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
              job.type === 'Government' ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' :
              'bg-purple-500/10 border-purple-500/30 text-purple-300'
            }`}>{job.type}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              job.mode === 'Remote' ? 'bg-emerald-500/10 text-emerald-300' :
              job.mode === 'Hybrid' ? 'bg-cyan-500/10 text-cyan-300' :
              'bg-slate-500/10 text-slate-400'
            }`}>{job.mode}</span>
          </div>
          <h3 className="font-bold text-white text-xl">{job.title}</h3>
          <p className="text-slate-400 text-sm">{job.company}</p>
          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
            <MapPin className="w-3 h-3" /> {job.location}
          </div>
        </div>
        <div className={`flex flex-col items-center p-3 rounded-2xl border ${sppBg}`}>
          <ScoreRing value={job.scores.spp} size={72} color={sppRingColor} />
          <span className={`text-xs font-bold mt-1 ${sppColor}`}>SPP Score</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span key={tag} className="tag-pill bg-slate-800 border-slate-700 text-slate-300">{tag}</span>
        ))}
      </div>

      {/* Mini scores */}
      <div className="grid grid-cols-2 gap-3">
        <ScoreBar label="Skill Match" value={job.scores.skillMatch} color="blue" />
        <ScoreBar label="Travel Feasibility" value={job.scores.travelFeasibility} color="cyan" />
        <ScoreBar label="Workplace Accessibility" value={job.scores.accessibilityScore} color="emerald" isNew />
        <ScoreBar label="Screen-Reader Compat." value={job.scores.screenReaderCompat} color="purple" isNew />
      </div>

      {/* Expanded scores */}
      {expanded && (
        <div className="pt-4 border-t border-white/10 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <ScoreBar label="Shift Compatibility" value={job.scores.shiftCompatibility} color="orange" isNew />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-3 text-center">
              <div className="text-slate-400 text-xs mb-1">Accommodation Level</div>
              <div className={`font-bold text-sm ${
                job.scores.accommodationLevel === 'Low' ? 'text-emerald-400' :
                job.scores.accommodationLevel === 'Minimal' ? 'text-green-400' :
                'text-yellow-400'
              }`}>{job.scores.accommodationLevel}</div>
            </div>
            <div className="glass-card p-3 text-center">
              <div className="text-slate-400 text-xs mb-1">Est. Accommodation Cost</div>
              <div className="font-bold text-sm text-white flex items-center justify-center gap-0.5">
                <IndianRupee className="w-3 h-3" />{job.scores.estimatedCost.toLocaleString('en-IN')}/yr
              </div>
            </div>
          </div>
          <div className="glass-card p-3">
            <div className="text-slate-400 text-xs mb-1">Salary Range</div>
            <div className="font-bold text-white flex items-center gap-0.5">
              <IndianRupee className="w-3.5 h-3.5" />{job.salary}/month
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-2"
        >
          {expanded ? 'Show Less' : 'Full Analysis'} <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
        <button className="flex-1 btn-primary text-sm py-2">
          Apply Now
        </button>
      </div>
    </div>
  )
}

export default function CandidatePortal() {
  const [step, setStep] = useState(0) // 0=profile, 1=capabilities, 2=results
  const [voiceMode, setVoiceMode] = useState(false)
  const [selectedDisability, setSelectedDisability] = useState('visual')
  const [udidStatus, setUdidStatus] = useState('verified')
  const [commuteRadius, setCommuteRadius] = useState(10)
  const [showResults, setShowResults] = useState(false)

  const steps = ['Profile & Disability', 'Functional Capabilities', 'AI Match Results']

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Candidate Portal</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Your <span className="gradient-text">Inclusive Career</span></h1>
          <p className="text-slate-400">Find jobs matched to your actual functional capabilities — not just your resume.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVoiceMode(!voiceMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              voiceMode
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                : 'bg-white/5 border-white/20 text-slate-400'
            }`}
          >
            {voiceMode ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            {voiceMode ? 'Voice Mode ON' : 'Voice Mode'}
          </button>
          <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <Wifi className="w-3.5 h-3.5" /> Online
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => { if (i < step || showResults) setStep(i) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                step === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' :
                i < step || showResults ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' :
                'bg-white/5 text-slate-500'
              }`}
            >
              {i < step || showResults ? <CheckCircle className="w-4 h-4" /> : <span className="w-5 h-5 rounded-full bg-white/10 text-xs flex items-center justify-center">{i+1}</span>}
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Profile */}
      {step === 0 && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          <div className="glass-card p-6 space-y-5">
            <h2 className="font-bold text-white text-xl flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" /> Personal Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm mb-1.5 block">Full Name</label>
                <input defaultValue="Ramesh Kumar Sharma" className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-sm mb-1.5 block">District</label>
                  <input defaultValue="Ajmer" className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1.5 block">State</label>
                  <input defaultValue="Rajasthan" className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1.5 block">Commute Radius: <span className="text-white font-bold">{commuteRadius} km</span></label>
                <input
                  type="range" min="1" max="50" value={commuteRadius}
                  onChange={e => setCommuteRadius(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>1 km</span><span>25 km</span><span>50 km</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Disability type */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-bold text-white text-xl flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-purple-400" /> Disability Type
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {disabilityTypes.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDisability(d.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedDisability === d.id
                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <d.icon className="w-4 h-4 shrink-0" />
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* UDID status */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-bold text-white text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" /> UDID / Disability Certificate
              </h2>
              <div className="space-y-2">
                {[
                  { id: 'verified', label: 'Verified (UDID available)', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
                  { id: 'pending', label: 'Pending certification', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
                  { id: 'none', label: 'No certificate yet', icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setUdidStatus(opt.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-sm transition-all ${
                      udidStatus === opt.id ? `${opt.bg} ${opt.color}` : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <opt.icon className="w-4 h-4 shrink-0" />
                    {opt.label}
                  </button>
                ))}
              </div>
              {udidStatus === 'none' && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-blue-300 text-xs">
                  💡 EmployAIable can help you get certified via your nearest CSC/District Rehabilitation Centre. <button className="underline font-semibold">Start process →</button>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button onClick={() => setStep(1)} className="btn-primary flex items-center gap-2">
              Next: Functional Capabilities <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Functional Capabilities */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card p-6">
            <h2 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" /> Functional Capability Profiling
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Not what you know — but <strong className="text-white">how you can work</strong>. This creates your unique functional capability profile.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Digital skills */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-300 text-sm uppercase tracking-wider">Digital Skills</h3>
                {[
                  { label: 'Computer / Laptop usage', example: 'e.g. via screen reader / keyboard-only' },
                  { label: 'Data Entry (Excel / Tally)', example: 'e.g. with keyboard shortcuts' },
                  { label: 'Email / Communication tools', example: 'e.g. with voice-to-text' },
                  { label: 'Internet browsing', example: 'e.g. with screen magnification' },
                ].map((skill, i) => (
                  <div key={i} className="bg-slate-800/60 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="text-white text-sm font-medium">{skill.label}</div>
                        <div className="text-slate-500 text-xs">{skill.example}</div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {['No', 'Partial', 'Yes'].map((opt) => (
                          <button key={opt} className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all ${
                            opt === 'Yes' ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'
                          }`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accessibility needs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-300 text-sm uppercase tracking-wider">Accessibility Needs</h3>
                {[
                  { label: 'Screen Reader Required', detail: 'NVDA / JAWS / system reader' },
                  { label: 'Wheelchair / Ramp Access', detail: 'Ground-floor or lift essential' },
                  { label: 'Sign Language Interpreter', detail: 'For meetings/interviews' },
                  { label: 'Flexible Shift Timing', detail: 'Specific hours needed' },
                  { label: 'Remote Work Preferred', detail: 'Full or partial WFH' },
                  { label: 'Modified Workstation', detail: 'Ergonomic chair, adjusted desk' },
                ].map((need, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 bg-slate-800/60 rounded-xl p-3">
                    <div>
                      <div className="text-white text-sm font-medium">{need.label}</div>
                      <div className="text-slate-500 text-xs">{need.detail}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                      <div className="w-10 h-5 bg-slate-700 peer-checked:bg-blue-600 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* The KEY differentiator box */}
            <div className="mt-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-5">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">✦ Functional Capability Statement — What this means for employers</div>
              <div className="bg-slate-900/60 rounded-xl p-4 font-mono text-sm text-slate-300">
                <span className="text-slate-500">A resume says: </span>
                <span className="text-white">"I know Excel."</span>
                <br /><br />
                <span className="text-slate-500">EmployAIable says: </span>
                <span className="text-emerald-300">"I can perform Excel-based data entry independently using NVDA screen reader, provided the company's CRM supports keyboard navigation and Tab-key traversal."</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(0)} className="btn-secondary">← Back</button>
            <button onClick={() => { setStep(2); setShowResults(true) }} className="btn-primary flex items-center gap-2">
              <Brain className="w-4 h-4" /> Run AI Match Engine <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Results */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">AI Match Complete</div>
                <div className="text-slate-400 text-xs">Analysed 847 jobs in Ajmer district · 3 sustainable matches found</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-black text-blue-400">847</div>
                <div className="text-xs text-slate-400">Jobs scanned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-400">3</div>
                <div className="text-xs text-slate-400">High-SPP matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-400">87%</div>
                <div className="text-xs text-slate-400">Best SPP score</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {matchResults.map((job) => <JobCard key={job.id} job={job} />)}
          </div>

          <div className="flex justify-start">
            <button onClick={() => setStep(1)} className="btn-secondary">← Refine Capabilities</button>
          </div>
        </div>
      )}
    </div>
  )
}
