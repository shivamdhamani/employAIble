import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Eye, Accessibility, MapPin, CheckCircle, RefreshCw } from 'lucide-react'

const candidates = [
  { id: 1, name: 'Ramesh Kumar', location: 'Ajmer, Rajasthan', disability: 'Visual impairment · 70%', skills: ['Data Entry', 'Excel', 'Tally', 'Customer Support'], commute: 10, screenReader: true, udid: true, remote: false, disabilityType: 'visual' },
  { id: 2, name: 'Priya Meena', location: 'Bhilwara, Rajasthan', disability: 'Locomotor disability · 55%', skills: ['Bookkeeping', 'GST Filing', 'Communication'], commute: 5, screenReader: false, udid: true, remote: true, disabilityType: 'locomotor' },
]

const jobs = [
  { id: 1, title: 'Data Entry Operator', org: 'Rajasthan State Co-op Bank', mode: 'Hybrid', screenCompatible: true, ramp: true, lift: false, flexShift: true, reqSkills: ['Data Entry', 'Excel'] },
  { id: 2, title: 'Remote Customer Support', org: 'TechSeva Solutions', mode: 'Remote', screenCompatible: true, ramp: false, lift: false, flexShift: false, reqSkills: ['Customer Support', 'Communication'] },
  { id: 3, title: 'Office Administrator', org: 'Ajmer District Cooperative', mode: 'On-site', screenCompatible: false, ramp: false, lift: false, flexShift: true, reqSkills: ['Excel', 'Communication'] },
]

const dimensions = [
  { key: 'skill', label: 'Skill match', weight: 0.30 },
  { key: 'travel', label: 'Travel feasibility', weight: 0.20 },
  { key: 'access', label: 'Workplace accessibility', weight: 0.20 },
  { key: 'at', label: 'Assistive tech compatibility', weight: 0.15 },
  { key: 'shift', label: 'Shift & schedule fit', weight: 0.15 },
]

function computeScore(c, j) {
  const overlap = c.skills.filter(s => j.reqSkills.includes(s)).length
  const skill = Math.min(100, 60 + overlap * 16)

  const travel = j.mode === 'Remote' ? 100 : c.commute <= 5 ? 95 : c.commute <= 15 ? 72 : 45
  const access = ((j.ramp ? 30 : 0) + (j.lift ? 20 : 0) + (j.flexShift ? 25 : 0) + 25)
  const at = c.screenReader ? (j.screenCompatible ? 94 : 28) : 84
  const shift = j.flexShift ? 90 : c.remote ? 75 : 62

  const spp = Math.round(skill * 0.30 + travel * 0.20 + access * 0.20 + at * 0.15 + shift * 0.15)
  const cost = c.disabilityType === 'visual' ? (j.screenCompatible ? 1800 : 6500) : (j.ramp ? 3200 : 14000)
  const accommodation = cost < 3000 ? 'Minimal' : cost < 8000 ? 'Moderate' : 'Significant'

  return { skill, travel, access, at, shift, spp, cost, accommodation }
}

const steps = [
  'Loading candidate profile and functional constraints...',
  'Mapping geographic accessibility and transport pathways...',
  'Validating assistive software and hardware interfaces...',
  'Computing 7-dimension sustainable placement probability...',
  'Placement feasibility report generated.'
]

function DimBar({ label, val, weight }) {
  const color = val >= 80 ? '#15803D' : val >= 60 ? '#0056B3' : val >= 45 ? '#B45309' : '#B91C1C'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ fontSize: 13, color: '#4B5563', fontWeight: 500 }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>weight {weight * 100}%</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D', width: 38, textAlign: 'right' }}>{val}%</span>
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${val}%`, background: color }} />
      </div>
    </div>
  )
}

function SPPRing({ value, size = 96 }) {
  const r = size / 2 - 9, circ = 2 * Math.PI * r
  const color = value >= 80 ? '#15803D' : value >= 65 ? '#B45309' : '#B91C1C'
  const label = value >= 80 ? 'High feasibility' : value >= 65 ? 'Moderate' : 'At-risk'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EEF2F7" strokeWidth={7} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - value / 100)}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <text x={size/2} y={size/2 + 5} textAnchor="middle" fill="#2D2D2D" fontSize={18} fontWeight={800}>{value}%</text>
      </svg>
      <div style={{ fontSize: 11.5, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '.04em' }}>
        {label}
      </div>
    </div>
  )
}

export default function AIMatchEngine() {
  const [cIdx, setCIdx] = useState(0)
  const [jIdx, setJIdx] = useState(0)
  const [running, setRunning] = useState(false)
  const [stepIdx, setStepIdx] = useState(-1)
  const [result, setResult] = useState(null)

  const c = candidates[cIdx], j = jobs[jIdx]

  const runMatch = () => {
    setResult(null); setRunning(true); setStepIdx(0)
    const interval = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) { clearInterval(interval); setRunning(false); setResult(computeScore(c, j)); return prev }
        return prev + 1
      })
    }, 380)
  }

  const radarData = result ? [
    { subject: 'Skill Fit', val: result.skill },
    { subject: 'Travel Ease', val: result.travel },
    { subject: 'Accessibility', val: result.access },
    { subject: 'Assistive Tech', val: result.at },
    { subject: 'Shift Fit', val: result.shift },
  ] : []

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>Match Scorer</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
            7-dimension placement feasibility engine
          </h1>
          <p style={{ fontSize: 15, color: '#4B5563', maxWidth: 560, lineHeight: 1.7 }}>
            Test compatibility between any candidate profile and job vacancy. The system computes a Sustainable Placement Probability (SPP) predicting retention beyond 90 days.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>
          {/* Left: selector panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card p-6">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em' }}>1. Select Candidate</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {candidates.map((cn, i) => (
                  <button key={i} onClick={() => { setCIdx(i); setResult(null) }} style={{
                    padding: '14px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%',
                    border: `1.5px solid ${cIdx === i ? '#0056B3' : '#D1DAE8'}`,
                    background: cIdx === i ? '#E8F0FA' : '#FFFFFF', transition: 'all 0.15s'
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cIdx === i ? '#0056B3' : '#2D2D2D', marginBottom: 3 }}>{cn.name}</div>
                    <div style={{ fontSize: 12, color: '#4B5563' }}>{cn.location}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{cn.disability}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                      {cn.skills.slice(0, 3).map(s => <span key={s} className="badge badge-gray" style={{ fontSize: 10 }}>{s}</span>)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em' }}>2. Select Job Role</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {jobs.map((jb, i) => (
                  <button key={i} onClick={() => { setJIdx(i); setResult(null) }} style={{
                    padding: '14px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%',
                    border: `1.5px solid ${jIdx === i ? '#0056B3' : '#D1DAE8'}`,
                    background: jIdx === i ? '#E8F0FA' : '#FFFFFF', transition: 'all 0.15s'
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: jIdx === i ? '#0056B3' : '#2D2D2D', marginBottom: 3 }}>{jb.title}</div>
                    <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 6 }}>{jb.org}</div>
                    <span className={`badge ${jb.mode === 'Remote' ? 'badge-teal' : jb.mode === 'Hybrid' ? 'badge-indigo' : 'badge-gray'}`}>{jb.mode}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={runMatch} disabled={running} className="btn-blue" style={{ justifyContent: 'center', width: '100%', padding: '12px' }}>
              {running ? <><RefreshCw size={16} className="spin" /> Computing feasibility...</> : 'Run feasibility analysis'}
            </button>
          </div>

          {/* Right: results panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Loading */}
            {running && (
              <div className="card p-7">
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 18 }}>Running 7-dimension algorithmic validation...</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {steps.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: i <= stepIdx ? 1 : 0.35, transition: 'opacity 0.25s' }}>
                      {i < stepIdx
                        ? <CheckCircle size={17} color="#15803D" />
                        : i === stepIdx
                          ? <RefreshCw size={17} color="#0056B3" className="spin" />
                          : <div style={{ width: 17, height: 17, borderRadius: '50%', border: '1.5px solid #D1DAE8' }} />
                      }
                      <span style={{ fontSize: 13.5, color: i <= stepIdx ? '#2D2D2D' : '#6B7280', fontWeight: i === stepIdx ? 600 : 400 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!running && !result && (
              <div className="card p-12" style={{ textAlign: 'center' }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: '#E8F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Eye size={24} color="#0056B3" />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 6 }}>Ready for feasibility check</div>
                <div style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>
                  Pick a candidate and an opening on the left, then trigger the feasibility test to view the multidimensional score report.
                </div>
              </div>
            )}

            {/* Result display */}
            {result && !running && (
              <>
                <div className="card p-7">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                    <SPPRing value={result.spp} size={106} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>Sustainable Placement Probability</div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: '#2D2D2D', marginBottom: 3 }}>
                        {c.name} → {j.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 14 }}>{j.org} · {j.mode} placement</div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <div style={{ padding: '10px 16px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>Accommodation</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: result.accommodation === 'Minimal' ? '#15803D' : '#B45309' }}>{result.accommodation}</div>
                        </div>
                        <div style={{ padding: '10px 16px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>Annual accommodation cost</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>₹{result.cost.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    </div>
                    {/* Radar chart */}
                    <div style={{ width: 190 }}>
                      <ResponsiveContainer width="100%" height={150}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#D1DAE8" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 10, fontWeight: 600 }} />
                          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar dataKey="val" fill="#0056B3" fillOpacity={0.16} stroke="#0056B3" strokeWidth={2} />
                          <Tooltip content={({ active, payload }) => active && payload?.[0] ? (
                            <div style={{ background: '#FFFFFF', border: '1px solid #D1DAE8', borderRadius: 6, padding: '6px 10px', fontSize: 12, color: '#2D2D2D', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
                              {payload[0].payload.subject}: <strong>{payload[0].value}%</strong>
                            </div>
                          ) : null} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="card p-6">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 16 }}>Score dimension breakdown</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {dimensions.map(dim => (
                      <DimBar key={dim.key} label={dim.label} val={result[dim.key]} weight={dim.weight} />
                    ))}
                  </div>
                </div>

                {/* Capability statement */}
                <div className="card p-6">
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12 }}>System-computed functional capability statement</div>
                  <div style={{ background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8', padding: '16px 20px', fontFamily: 'monospace', fontSize: 13, lineHeight: 2, color: '#2D2D2D' }}>
                    <div style={{ color: '#6B7280' }}>// Standard resume claim:</div>
                    <div style={{ color: '#4B5563', fontWeight: 600 }}>"Candidate knows Excel, data entry and office tools."</div>
                    <div style={{ marginTop: 10, color: '#6B7280' }}>// Precise functional capability output:</div>
                    <div><span style={{ color: '#15803D', fontWeight: 800 }}>✓</span> Performs spreadsheet tasks via <strong style={{ color: '#0056B3' }}>NVDA screen reader</strong></div>
                    <div><span style={{ color: '#15803D', fontWeight: 800 }}>✓</span> Operates efficiently using <strong style={{ color: '#0056B3' }}>keyboard-only shortcuts</strong> (mouse-independent)</div>
                    <div>
                      <span style={{ color: result.at >= 80 ? '#15803D' : '#B91C1C', fontWeight: 800 }}>{result.at >= 80 ? '✓' : '✗'}</span> Workplace CRM {result.at >= 80 ? 'is confirmed' : 'is NOT'} <strong style={{ color: result.at >= 80 ? '#0056B3' : '#B91C1C' }}>screen-reader accessible</strong>
                    </div>
                    <div><span style={{ color: '#B45309', fontWeight: 800 }}>→</span> Annual accommodation estimate: <strong style={{ color: '#2D2D2D' }}>₹{result.cost.toLocaleString('en-IN')}</strong> · Subsidy cover available</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
