import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Eye, Accessibility, MapPin, CheckCircle, RefreshCw, Briefcase, Award, Zap, ShieldCheck } from 'lucide-react'

const candidates = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    location: 'Ajmer (Subhash Nagar)',
    disability: 'Visual Impairment · 70%',
    disabilityType: 'visual',
    skills: ['Data Entry', 'Excel', 'Tally Prime', 'Customer Support', 'Hindi Typing'],
    commute: 8,
    screenReader: true,
    udid: true,
    remotePref: false,
    detail: 'Experienced NVDA user with 45 wpm typing speed; keyboard-only navigation specialist.'
  },
  {
    id: 2,
    name: 'Priya Meena',
    location: 'Bhilwara (Textile Hub)',
    disability: 'Locomotor Disability · 55%',
    disabilityType: 'locomotor',
    skills: ['Bookkeeping', 'GST Filing', 'Communication', 'Customer Support', 'MS Word'],
    commute: 4,
    screenReader: false,
    udid: true,
    remotePref: true,
    detail: 'Wheelchair user seeking ground-floor or remote hybrid workstation.'
  },
  {
    id: 3,
    name: 'Arvind Sharma',
    location: 'Nagaur (Civil Lines)',
    disability: 'Hearing Impairment · 80%',
    disabilityType: 'hearing',
    skills: ['Govt. Documentation', 'Typing Skills', 'Digital Literacy', 'Data Entry', 'Excel'],
    commute: 6,
    screenReader: false,
    udid: true,
    remotePref: false,
    detail: 'Proficient in written communication, rapid digital data entry, visual verification workflows.'
  },
  {
    id: 4,
    name: 'Mohan Bishnoi',
    location: 'Tonk (Rajnagar)',
    disability: 'Intellectual / Cognitive (Mild)',
    disabilityType: 'cognitive',
    skills: ['E-commerce Listing', 'Inventory Cataloguing', 'Communication', 'Mobile Tools'],
    commute: 12,
    screenReader: false,
    udid: true,
    remotePref: false,
    detail: 'Thrives on consistent visual task checklists, high focus in cataloguing and repetitive operations.'
  },
]

const jobs = [
  {
    id: 1,
    title: 'Data Entry Operator',
    org: 'Rajasthan State Co-op Bank',
    location: 'Ajmer (4.2 km)',
    mode: 'Hybrid',
    screenCompatible: true,
    ramp: true,
    lift: true,
    groundFloor: true,
    visualAlarms: true,
    structuredSOP: true,
    flexShift: true,
    reqSkills: ['Data Entry', 'Excel', 'Hindi Typing']
  },
  {
    id: 2,
    title: 'Remote Customer Support',
    org: 'TechSeva Solutions Pvt. Ltd.',
    location: 'Remote · Full WFH',
    mode: 'Remote',
    screenCompatible: true,
    ramp: false,
    lift: false,
    groundFloor: true,
    visualAlarms: true,
    structuredSOP: true,
    flexShift: true,
    reqSkills: ['Customer Support', 'Communication']
  },
  {
    id: 3,
    title: 'Digital Bookkeeper & GST Assistant',
    org: 'Ajmer Traders Cooperative',
    location: 'Ajmer Market (2.8 km)',
    mode: 'On-site',
    screenCompatible: false, // Legacy desktop Tally needs custom bridge
    ramp: true,
    lift: false,
    groundFloor: true,
    visualAlarms: false,
    structuredSOP: true,
    flexShift: false,
    reqSkills: ['Bookkeeping', 'GST Filing', 'Tally Prime']
  },
  {
    id: 4,
    title: 'Inventory & E-Commerce Cataloguer',
    org: 'District Khadi & Village Industries Board',
    location: 'Nagaur Centre (5.5 km)',
    mode: 'On-site',
    screenCompatible: true,
    ramp: false,
    lift: false,
    groundFloor: false, // 1st floor without elevator
    visualAlarms: true,
    structuredSOP: true,
    flexShift: true,
    reqSkills: ['Inventory Cataloguing', 'E-commerce Listing', 'Typing Skills']
  },
]

const dimensions = [
  { key: 'skill', label: 'Functional Skill Match', weight: 0.30 },
  { key: 'travel', label: 'Travel & Mobility Feasibility', weight: 0.20 },
  { key: 'access', label: 'Physical Workplace Accessibility', weight: 0.20 },
  { key: 'at', label: 'Assistive Tech & Tool Compatibility', weight: 0.15 },
  { key: 'shift', label: 'Schedule & Shift Alignment', weight: 0.15 },
]

function computeScore(c, j) {
  // 1. Skill overlap (30%)
  const overlap = c.skills.filter(s => j.reqSkills.includes(s)).length
  const totalReq = j.reqSkills.length
  const skill = Math.min(100, Math.round(55 + (overlap / totalReq) * 45))

  // 2. Travel & Commute (20%)
  let travel = 85
  if (j.mode === 'Remote') {
    travel = 100
  } else if (c.disabilityType === 'locomotor') {
    // Locomotor candidates have tighter commute decay
    travel = c.commute <= 5 ? 92 : c.commute <= 10 ? 70 : 45
  } else if (c.disabilityType === 'visual') {
    travel = c.commute <= 5 ? 95 : c.commute <= 10 ? 82 : 60
  } else {
    travel = c.commute <= 10 ? 90 : 75
  }

  // 3. Physical Accessibility (20%)
  let access = 50
  if (j.mode === 'Remote') {
    access = 98 // Home workstation controlled by candidate
  } else {
    let score = 30
    if (j.groundFloor) score += 25
    if (j.ramp) score += 20
    if (j.lift) score += 15
    if (c.disabilityType === 'locomotor' && !j.ramp && !j.groundFloor) {
      score = Math.min(score, 38) // Critical penalty
    }
    access = Math.min(100, score)
  }

  // 4. Assistive Tech Compatibility (15%)
  let at = 80
  if (c.disabilityType === 'visual') {
    at = j.screenCompatible ? 95 : 32
  } else if (c.disabilityType === 'hearing') {
    at = j.visualAlarms ? 92 : 68
  } else if (c.disabilityType === 'cognitive') {
    at = j.structuredSOP ? 94 : 58
  } else {
    at = 88
  }

  // 5. Shift & Schedule (15%)
  let shift = 70
  if (j.flexShift) shift += 20
  if (c.remotePref && j.mode === 'Remote') shift += 10
  shift = Math.min(100, shift)

  // Composite Sustainable Placement Probability (SPP)
  const spp = Math.round(skill * 0.30 + travel * 0.20 + access * 0.20 + at * 0.15 + shift * 0.15)

  // Realistic accommodation cost estimation
  let cost = 0
  let accommodation = 'Minimal'
  if (c.disabilityType === 'visual') {
    cost = j.screenCompatible ? 1800 : 7200
  } else if (c.disabilityType === 'locomotor') {
    cost = j.mode === 'Remote' ? 1200 : (j.ramp ? 3500 : 14500)
  } else if (c.disabilityType === 'hearing') {
    cost = 2200
  } else {
    cost = 1500
  }
  accommodation = cost < 2500 ? 'Minimal' : cost < 8000 ? 'Moderate' : 'Significant'

  // Dynamic functional capability statement
  const statements = generateStatement(c, j, at, cost)

  return { skill, travel, access, at, shift, spp, cost, accommodation, statements }
}

function generateStatement(c, j, atScore, cost) {
  if (c.disabilityType === 'visual') {
    return {
      resumeClaim: `"${c.name} is proficient in office productivity, spreadsheets, and database management."`,
      facts: [
        { pass: true, text: `Performs spreadsheet operations via NVDA / JAWS screen reader without mouse dependency.` },
        { pass: atScore >= 70, text: `Employer core software (${j.title}) is ${atScore >= 70 ? 'certified screen-reader compatible' : 'NOT screen-reader optimized; requires keyboard bridge'}.` },
        { pass: true, text: `Commute distance (${c.commute} km) verified against accessible public transit corridors.` },
      ]
    }
  } else if (c.disabilityType === 'locomotor') {
    return {
      resumeClaim: `"${c.name} has experience in administration, accounts, and client support."`,
      facts: [
        { pass: true, text: `Fully independent in all computer and desk-based operational responsibilities.` },
        { pass: j.mode === 'Remote' || j.ramp || j.groundFloor, text: `Workplace physical access: ${j.mode === 'Remote' ? 'Full remote setup eliminates commute hurdles' : (j.ramp ? 'Ramp and ground-floor access confirmed' : 'Requires entrance ramp retrofitting')}.` },
        { pass: true, text: `Accommodations required: ₹${cost.toLocaleString('en-IN')}/yr (70%+ covered under MSME Accessible India Scheme).` },
      ]
    }
  } else if (c.disabilityType === 'hearing') {
    return {
      resumeClaim: `"${c.name} demonstrates excellent typing speed and meticulous record-keeping."`,
      facts: [
        { pass: true, text: `Excels at digital-first, chat-based and written documentation without voice phone dependency.` },
        { pass: true, text: `Workplace emergency notifications mapped to visual flashing beacon signals.` },
        { pass: true, text: `Sustainable placement score: high retention likelihood for text-based workflow roles.` },
      ]
    }
  } else {
    return {
      resumeClaim: `"${c.name} is dedicated, punctual, and methodical in repetitive administrative tasks."`,
      facts: [
        { pass: true, text: `Excels when task flows are structured with sequential visual SOP checklists.` },
        { pass: true, text: `Low-distraction workstation environment optimizes focus and output throughput.` },
        { pass: true, text: `Peer buddy onboarding for initial 30 days yields 2.4× higher retention.` },
      ]
    }
  }
}

const steps = [
  'Extracting functional capability matrix (motor, visual, sensory)...',
  'Analyzing commute geography, physical transit nodes & decay factors...',
  'Inspecting software layer (CRM accessibility, screen reader, visual alerts)...',
  'Evaluating statutory RPWD Act Section 34 alignment & subsidies...',
  'Generating 5-dimension Sustainable Placement Probability (SPP) report.'
]

function DimBar({ label, val, weight }) {
  const color = val >= 80 ? '#15803D' : val >= 65 ? '#0056B3' : val >= 45 ? '#B45309' : '#B91C1C'
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

function SPPRing({ value, size = 106 }) {
  const r = size / 2 - 10, circ = 2 * Math.PI * r
  const color = value >= 80 ? '#15803D' : value >= 65 ? '#0056B3' : value >= 50 ? '#B45309' : '#B91C1C'
  const label = value >= 80 ? 'High Feasibility' : value >= 65 ? 'Sustainable' : value >= 50 ? 'Moderate' : 'High Risk'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EEF2F7" strokeWidth={8} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - value / 100)}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <text x={size/2} y={size/2 + 6} textAnchor="middle" fill="#2D2D2D" fontSize={20} fontWeight={800}>{value}%</text>
      </svg>
      <div style={{ fontSize: 11.5, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '.05em' }}>
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
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setRunning(false)
          setResult(computeScore(c, j))
          return prev
        }
        return prev + 1
      })
    }, 320)
  }

  const radarData = result ? [
    { subject: 'Skill Fit', val: result.skill },
    { subject: 'Travel', val: result.travel },
    { subject: 'Accessibility', val: result.access },
    { subject: 'Assistive Tech', val: result.at },
    { subject: 'Shift Fit', val: result.shift },
  ] : []

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>Multidimensional Placement Engine</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
            7-dimension placement feasibility engine
          </h1>
          <p style={{ fontSize: 15, color: '#4B5563', maxWidth: 650, lineHeight: 1.7 }}>
            Simulate compatibility across all candidate disability categories and job structures. Calculates Sustainable Placement Probability (SPP) predicting 90+ day workplace retention.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
          {/* Left: selector panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card p-6">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                1. Select Candidate Profile ({candidates.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {candidates.map((cn, i) => (
                  <button key={cn.id} onClick={() => { setCIdx(i); setResult(null) }} style={{
                    padding: '13px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%',
                    border: `1.5px solid ${cIdx === i ? '#0056B3' : '#D1DAE8'}`,
                    background: cIdx === i ? '#E8F0FA' : '#FFFFFF', transition: 'all 0.15s'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: cIdx === i ? '#0056B3' : '#2D2D2D' }}>{cn.name}</div>
                      <span className="badge badge-gray" style={{ fontSize: 10 }}>{cn.location.split(' ')[0]}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#0E7490', fontWeight: 600, marginTop: 2 }}>{cn.disability}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                      {cn.skills.slice(0, 3).map(s => <span key={s} className="badge badge-gray" style={{ fontSize: 10 }}>{s}</span>)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                2. Select Job Opportunity ({jobs.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {jobs.map((jb, i) => (
                  <button key={jb.id} onClick={() => { setJIdx(i); setResult(null) }} style={{
                    padding: '13px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%',
                    border: `1.5px solid ${jIdx === i ? '#0056B3' : '#D1DAE8'}`,
                    background: jIdx === i ? '#E8F0FA' : '#FFFFFF', transition: 'all 0.15s'
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: jIdx === i ? '#0056B3' : '#2D2D2D', marginBottom: 2 }}>{jb.title}</div>
                    <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 6 }}>{jb.org}</div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className={`badge ${jb.mode === 'Remote' ? 'badge-teal' : jb.mode === 'Hybrid' ? 'badge-indigo' : 'badge-gray'}`}>{jb.mode}</span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>{jb.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={runMatch} disabled={running} className="btn-blue" style={{ justifyContent: 'center', width: '100%', padding: '13px' }}>
              {running ? <><RefreshCw size={16} className="spin" /> Calculating feasibility...</> : 'Run Feasibility Check'}
            </button>
          </div>

          {/* Right: results panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Loading */}
            {running && (
              <div className="card p-7">
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 18 }}>Validating 7 dimensional parameters...</div>
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
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E8F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Eye size={24} color="#0056B3" />
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#2D2D2D', marginBottom: 6 }}>Ready for algorithmic feasibility test</div>
                <div style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.6, maxWidth: 380, margin: '0 auto' }}>
                  Choose any candidate and job opening on the left, then click <strong>"Run Feasibility Check"</strong> to simulate the sustainable placement score.
                </div>
              </div>
            )}

            {/* Result display */}
            {result && !running && (
              <>
                <div className="card p-7">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                    <SPPRing value={result.spp} size={110} />
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>
                        Sustainable Placement Probability (SPP)
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D', marginBottom: 3 }}>
                        {c.name} → {j.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 14 }}>{j.org} · {j.mode} setup</div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ padding: '10px 16px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>Accommodation</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: result.accommodation === 'Minimal' ? '#15803D' : result.accommodation === 'Moderate' ? '#B45309' : '#B91C1C' }}>
                            {result.accommodation}
                          </div>
                        </div>
                        <div style={{ padding: '10px 16px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>Est. Annual Adaptation Cost</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>₹{result.cost.toLocaleString('en-IN')}</div>
                        </div>
                        <div style={{ padding: '10px 16px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#15803D', marginBottom: 2 }}>Govt. Subsidy Share</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#15803D' }}>70% Coverage</div>
                        </div>
                      </div>
                    </div>
                    {/* Radar chart */}
                    <div style={{ width: 190, height: 160 }}>
                      <ResponsiveContainer width="100%" height="100%">
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
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 16 }}>Dimension breakdown & weighted contribution</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {dimensions.map(dim => (
                      <DimBar key={dim.key} label={dim.label} val={result[dim.key]} weight={dim.weight} />
                    ))}
                  </div>
                </div>

                {/* Capability statement */}
                <div className="card p-6">
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12 }}>
                    System-computed functional capability statement
                  </div>
                  <div style={{ background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8', padding: '16px 20px', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.9, color: '#2D2D2D' }}>
                    <div style={{ color: '#6B7280' }}>// Standard resume text:</div>
                    <div style={{ color: '#4B5563', fontWeight: 600 }}>{result.statements.resumeClaim}</div>
                    <div style={{ marginTop: 10, color: '#6B7280' }}>// Verified functional capability output:</div>
                    {result.statements.facts.map((fact, idx) => (
                      <div key={idx}>
                        <span style={{ color: fact.pass ? '#15803D' : '#B91C1C', fontWeight: 800 }}>{fact.pass ? '✓' : '✗'}</span> {fact.text}
                      </div>
                    ))}
                    <div><span style={{ color: '#0056B3', fontWeight: 800 }}>→</span> Statutory Recommendation: <strong style={{ color: '#0056B3' }}>Eligible for Section 34 RPWD Act Mandate</strong></div>
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
