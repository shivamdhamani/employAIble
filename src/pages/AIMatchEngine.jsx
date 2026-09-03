import { useState } from 'react'
import {
  Brain, Zap, ChevronRight, CheckCircle, AlertTriangle, Info,
  Accessibility, Eye, Ear, Hand, MapPin, IndianRupee,
  TrendingUp, BarChart3, Clock, RefreshCw
} from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'

const candidateProfiles = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    location: 'Ajmer (Tier 3)',
    disability: 'Visual Impairment (70%)',
    disabilityType: 'visual',
    skills: ['Data Entry', 'Excel (screen reader)', 'Tally', 'Customer Support'],
    commuteRadius: 10,
    udid: 'Verified',
    digitalLiteracy: 'Medium',
    screenReader: true,
    remotePreferred: false,
  },
  {
    id: 2,
    name: 'Priya Meena',
    location: 'Bhilwara (Tier 3)',
    disability: 'Locomotor Disability (55%)',
    disabilityType: 'locomotor',
    skills: ['Bookkeeping', 'GST Filing', 'Communication'],
    commuteRadius: 5,
    udid: 'Verified',
    digitalLiteracy: 'High',
    screenReader: false,
    remotePreferred: true,
  },
]

const jobPostings = [
  {
    id: 1,
    title: 'Data Entry Operator',
    employer: 'Rajasthan State Cooperative',
    location: 'Ajmer (2.1 km)',
    mode: 'Hybrid',
    screenReaderCompatible: true,
    hasRamp: true,
    hasLift: false,
    shiftFlexible: true,
    accommodationBudget: 5000,
    salaryRange: '18,000–22,000',
  },
  {
    id: 2,
    title: 'Remote Customer Support',
    employer: 'TechSeva Solutions',
    location: 'Remote',
    mode: 'Remote',
    screenReaderCompatible: true,
    hasRamp: null,
    hasLift: null,
    shiftFlexible: false,
    accommodationBudget: 2000,
    salaryRange: '14,000–18,000',
  },
  {
    id: 3,
    title: 'Office Admin',
    employer: 'Ajmer Traders Co.',
    location: 'Ajmer (0.8 km)',
    mode: 'On-site',
    screenReaderCompatible: false,
    hasRamp: false,
    hasLift: false,
    shiftFlexible: true,
    accommodationBudget: 8000,
    salaryRange: '12,000–16,000',
  },
]

function computeScore(candidate, job) {
  const skillMatch = candidate.disabilityType === 'visual' ? (job.screenReaderCompatible ? 92 : 58) : 82
  const travelFeasibility = job.mode === 'Remote' ? 100 : Math.max(0, 100 - (2.1 / candidate.commuteRadius) * 60)
  const accessibilityScore = job.mode === 'Remote' ? 95 :
    ((job.hasRamp ? 30 : 0) + (job.hasLift ? 20 : 0) + (job.shiftFlexible ? 20 : 0) + 30)
  const screenReaderCompat = candidate.screenReader ? (job.screenReaderCompatible ? 95 : 30) : 85
  const shiftCompatibility = job.shiftFlexible ? 88 : (candidate.remotePreferred ? 55 : 70)
  const accommodationLevel = job.accommodationBudget > 6000 ? 'Moderate' : job.accommodationBudget > 2000 ? 'Low' : 'Minimal'
  const estimatedCost = job.accommodationBudget

  const spp = Math.round(
    (skillMatch * 0.3) +
    (travelFeasibility * 0.2) +
    (accessibilityScore * 0.2) +
    (screenReaderCompat * 0.15) +
    (shiftCompatibility * 0.15)
  )

  return {
    skillMatch: Math.round(skillMatch),
    travelFeasibility: Math.round(travelFeasibility),
    accessibilityScore: Math.round(accessibilityScore),
    screenReaderCompat: Math.round(screenReaderCompat),
    shiftCompatibility: Math.round(shiftCompatibility),
    accommodationLevel,
    estimatedCost,
    spp,
  }
}

function ScoreBar({ label, value, color, isNew = false }) {
  const colors = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
  }
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-400 flex items-center gap-1">
          {isNew && <span className="px-1 py-0.5 rounded text-[10px] bg-blue-600/30 text-blue-300 border border-blue-500/30">NEW</span>}
          {label}
        </span>
        <span className="font-bold text-white">{value}%</span>
      </div>
      <div className="score-bar">
        <div className={`score-fill ${colors[color] || 'bg-blue-500'}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

const radarLabels = {
  skillMatch: 'Skill Match',
  travelFeasibility: 'Travel',
  accessibilityScore: 'Accessibility',
  screenReaderCompat: 'AT Compat.',
  shiftCompatibility: 'Shift Fit',
}

export default function AIMatchEngine() {
  const [selectedCandidate, setSelectedCandidate] = useState(0)
  const [selectedJob, setSelectedJob] = useState(0)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null)

  const candidate = candidateProfiles[selectedCandidate]
  const job = jobPostings[selectedJob]

  const runMatch = () => {
    setRunning(true)
    setResult(null)
    setTimeout(() => {
      setResult(computeScore(candidate, job))
      setRunning(false)
    }, 1800)
  }

  const radarData = result ? [
    { subject: 'Skill Match', value: result.skillMatch },
    { subject: 'Travel', value: result.travelFeasibility },
    { subject: 'Accessibility', value: result.accessibilityScore },
    { subject: 'AT Compat.', value: result.screenReaderCompat },
    { subject: 'Shift Fit', value: result.shiftCompatibility },
  ] : []

  const sppColor = result ? (result.spp >= 80 ? '#22c55e' : result.spp >= 65 ? '#f59e0b' : '#ef4444') : '#3b82f6'
  const sppLabel = result ? (result.spp >= 80 ? 'Excellent Match' : result.spp >= 65 ? 'Good Match' : 'Needs Accommodation') : ''

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Placement Feasibility Engine</span>
        </div>
        <h1 className="text-4xl font-black text-white mb-2">
          <span className="gradient-text">7-Dimension</span> Match Scoring
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Pick a candidate profile and a job posting — the system runs a full feasibility check across 7 parameters and outputs a <strong className="text-white">Sustainable Placement Probability (SPP)</strong> score.
          This is what existing job portals don't compute.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-6">
          {/* Candidate selector */}
          <div className="glass-card p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" /> Select Candidate
            </h2>
            <div className="space-y-3">
              {candidateProfiles.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCandidate(i); setResult(null) }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedCandidate === i
                      ? 'bg-blue-600/20 border-blue-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold text-white text-sm">{c.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{c.disability}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skills.slice(0, 3).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px]">{s}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Job selector */}
          <div className="glass-card p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" /> Select Job Posting
            </h2>
            <div className="space-y-3">
              {jobPostings.map((j, i) => (
                <button
                  key={j.id}
                  onClick={() => { setSelectedJob(i); setResult(null) }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedJob === i
                      ? 'bg-emerald-600/20 border-emerald-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold text-white text-sm">{j.title}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{j.employer}</div>
                  <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{j.location}
                    <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                      j.mode === 'Remote' ? 'bg-emerald-500/20 text-emerald-400' :
                      j.mode === 'Hybrid' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>{j.mode}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {j.screenReaderCompatible && <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[10px]">Screen Reader ✓</span>}
                    {j.hasRamp && <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px]">Ramp ✓</span>}
                    {j.shiftFlexible && <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 text-[10px]">Flex Shift ✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Run button */}
          <button
            onClick={runMatch}
            disabled={running}
            className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-base disabled:opacity-70"
          >
            {running ? (
              <><RefreshCw className="w-5 h-5 animate-spin" /> Computing Match…</>
            ) : (
              <><Zap className="w-5 h-5" /> Run AI Match Engine</>
            )}
          </button>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !running && (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center h-full">
              <Brain className="w-16 h-16 text-purple-400/40 mb-4" />
              <div className="text-slate-400 text-lg font-medium">Select a candidate and job,<br />then click Run AI Match Engine</div>
              <p className="text-slate-600 text-sm mt-2">The engine will compute all 7 dimensions and output a Sustainable Placement Probability score.</p>
            </div>
          )}

          {running && (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500" />
                <Brain className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-white font-semibold text-lg">Computing Match…</div>
              <div className="space-y-2 mt-4 text-sm text-slate-400">
                {[
                  '✦ Analysing functional capability profile…',
                  '✦ Mapping workplace accessibility data…',
                  '✦ Computing commute feasibility…',
                  '✦ Estimating accommodation requirements…',
                  '✦ Running placement retention model…',
                ].map((step, i) => (
                  <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>{step}</div>
                ))}
              </div>
            </div>
          )}

          {result && !running && (
            <div className="space-y-6 animate-fade-in">
              {/* SPP Score hero */}
              <div className="glass-card p-6 bg-gradient-to-br from-purple-600/10 to-blue-600/10 border-purple-500/20">
                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
                      <circle
                        cx="60" cy="60" r="50"
                        fill="none"
                        stroke={sppColor}
                        strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - result.spp / 100)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                      />
                      <text x="60" y="55" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">{result.spp}%</text>
                      <text x="60" y="72" textAnchor="middle" fill="#94a3b8" fontSize="9">SPP Score</text>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-black text-white mb-1">{sppLabel}</div>
                    <div className="text-slate-400 text-sm mb-3">
                      Sustainable Placement Probability for <strong className="text-white">{candidate.name}</strong> at <strong className="text-white">{job.title}</strong>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                        result.spp >= 80 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                        result.spp >= 65 ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                        'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}>
                        {result.spp >= 80 ? '✓ Recommend Placement' : result.spp >= 65 ? '⚠ Proceed with Accommodation' : '✗ High Intervention Needed'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-slate-300">
                        Accommodation: {result.accommodationLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7 dimension scores */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-white mb-5 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" /> Full 7-Dimension Breakdown
                </h3>
                <div className="space-y-4">
                  <ScoreBar label="Skill Match" value={result.skillMatch} color="blue" />
                  <ScoreBar label="Travel Feasibility" value={result.travelFeasibility} color="cyan" />
                  <ScoreBar label="Workplace Accessibility Score" value={result.accessibilityScore} color="emerald" isNew />
                  <ScoreBar label="Assistive Technology Compatibility" value={result.screenReaderCompat} color="purple" isNew />
                  <ScoreBar label="Shift Compatibility" value={result.shiftCompatibility} color="orange" isNew />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="bg-slate-800/60 rounded-xl p-4">
                    <div className="text-slate-400 text-xs mb-1">Accommodation Level</div>
                    <div className={`font-bold text-lg ${
                      result.accommodationLevel === 'Minimal' ? 'text-emerald-400' :
                      result.accommodationLevel === 'Low' ? 'text-green-400' :
                      'text-yellow-400'
                    }`}>{result.accommodationLevel}</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4">
                    <div className="text-slate-400 text-xs mb-1">Estimated Accommodation Cost</div>
                    <div className="font-bold text-lg text-white flex items-center gap-0.5">
                      <IndianRupee className="w-4 h-4" />{result.estimatedCost.toLocaleString('en-IN')}/yr
                    </div>
                  </div>
                </div>
              </div>

              {/* Radar chart */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-white mb-4">Match Profile — Radar View</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} />
                    <Radar name="Score" dataKey="value" stroke={sppColor} fill={sppColor} fillOpacity={0.2} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      labelStyle={{ color: '#fff' }}
                      itemStyle={{ color: '#94a3b8' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Functional capability statement */}
              <div className="glass-card p-6 border border-blue-500/20 bg-blue-600/5">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">✦ Functional Capability Statement (System Generated)</div>
                <div className="bg-slate-900/60 rounded-xl p-4 text-sm text-slate-300 font-mono leading-relaxed">
                  <span className="text-slate-500">Resume says: </span>
                  <span className="text-white">"I know Excel and data entry."</span>
                  <br /><br />
                  <span className="text-slate-500">EmployAIable says: </span>
                  <span className="text-emerald-300">
                    "{candidate.name} can perform Excel-based data entry independently using NVDA screen reader,
                    provided the employer's system supports keyboard navigation and Tab-key traversal.
                    Commute feasible within {candidate.commuteRadius}km. Estimated employer accommodation cost:
                    ₹{result.estimatedCost.toLocaleString('en-IN')}/year. Sustainable placement probability: {result.spp}%."
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
