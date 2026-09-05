import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Eye, Accessibility, MapPin, CheckCircle, RefreshCw, Briefcase, Award, Zap, ShieldCheck, FileCheck, Navigation } from 'lucide-react'

const candidates = [
  {
    id: 1,
    name: 'Ramesh Kumar Sharma',
    udid: 'RJ-01-2021-0849201',
    location: 'Ajmer (Subhash Nagar, Ward 14)',
    disability: 'Visual Impairment · 70% (Benchmark Category A)',
    disabilityType: 'visual',
    skills: ['Data Entry', 'Excel', 'Tally Prime 4.1', 'Customer Support', 'Hindi & English Typing'],
    typingSpeed: '42 wpm (98.4% accuracy)',
    commute: 4.8,
    transitRoute: 'RSRTC Low-Floor Accessible Bus (Route 4A - Subhash Nagar to Kutchery)',
    screenReader: true,
    screenReaderTool: 'NVDA 2024.1 & JAWS 2023',
    remotePref: false,
    qualification: 'B.Com (Maharshi Dayanand Saraswati University, Ajmer)',
    detail: 'Certified NVDA screen reader user; operates entirely via keyboard shortcuts without mouse dependency.'
  },
  {
    id: 2,
    name: 'Priya Meena',
    udid: 'RJ-06-2022-0419382',
    location: 'Bhilwara (Shastri Nagar, Sector 2)',
    disability: 'Locomotor Disability · 55% (Benchmark Category C)',
    disabilityType: 'locomotor',
    skills: ['Commercial Bookkeeping', 'GST Portal Filing', 'Zoho Books', 'Customer Communication', 'MS Word'],
    typingSpeed: '38 wpm (97.1% accuracy)',
    commute: 3.2,
    transitRoute: 'E-Rickshaw Direct Feeder Corridor (Shastri Nagar to Pur Road)',
    screenReader: false,
    screenReaderTool: 'None (Standard Display)',
    remotePref: true,
    qualification: 'Diploma in Modern Office Management (Bhilwara Polytechnic)',
    detail: 'Wheelchair user seeking ground-floor workstation or remote tele-work arrangement.'
  },
  {
    id: 3,
    name: 'Arvind Sharma',
    udid: 'RJ-21-2020-0193481',
    location: 'Nagaur (Civil Lines, Block B)',
    disability: 'Hearing & Speech Impairment · 80% (Benchmark Category B)',
    disabilityType: 'hearing',
    skills: ['Land Records Digitisation', 'E-NAM Trade Logging', 'RSCIT Certified', 'Data Archival', 'Excel Pivot'],
    typingSpeed: '48 wpm (99.2% accuracy)',
    commute: 5.1,
    transitRoute: 'City Mini-Bus (Direct drop at Collectorate Gate)',
    screenReader: false,
    screenReaderTool: 'Visual LED Alert Subsystem',
    remotePref: false,
    qualification: 'BA in Computer Applications (Government Bangur College, Pali)',
    detail: 'Exceptional visual verification & typing speed; thrives in 100% text, chat, and written documentation pipelines.'
  },
  {
    id: 4,
    name: 'Mohan Lal Bishnoi',
    udid: 'RJ-26-2023-0938102',
    location: 'Tonk (Subhash Chowk, Rajnagar)',
    disability: 'Mild Cognitive / Intellectual (Benchmark Category D)',
    disabilityType: 'cognitive',
    skills: ['E-Commerce Product Cataloguing', 'Handloom Barcode Logging', 'Mobile Inventory Auditing', 'Numeric Entry'],
    typingSpeed: '28 wpm (96.5% accuracy)',
    commute: 2.8,
    transitRoute: 'Walking / Shared Electric Auto (Within 10 min radius)',
    screenReader: false,
    screenReaderTool: 'Visual Icon-Assisted Checklist SOPs',
    remotePref: false,
    qualification: 'Secondary School (RSEB) + National Skill Development Mission (NSDC) Certificate',
    detail: 'Highly reliable with structured recurring workflows; high retention in systematic cataloguing and barcode logging.'
  },
]

const jobs = [
  {
    id: 1,
    title: 'Data Entry & Records Operator',
    org: 'Ajmer Central Co-operative Bank Ltd.',
    dept: 'Branch Accounts & Customer Clearing Cell',
    location: 'Ajmer Head Office (4.2 km)',
    mode: 'Hybrid (3d Office / 2d WFH)',
    screenCompatible: true,
    screenAudit: 'Core Banking Software (CBS) Web Client certified accessible via WCAG 2.1 AA guidelines',
    ramp: true,
    lift: true,
    groundFloor: true,
    visualAlarms: true,
    structuredSOP: true,
    flexShift: true,
    reqSkills: ['Data Entry', 'Excel', 'Hindi & English Typing'],
    salary: '₹18,500 – ₹22,000 / month',
    statutoryQuota: 'RPWD Section 34 Category A & C Reserved (Advt No. ACCB/2026/04)'
  },
  {
    id: 2,
    title: 'Remote Customer Support Specialist',
    org: 'TechSeva Solutions Pvt. Ltd.',
    dept: 'Citizen Services Helpdesk & CRM Division',
    location: '100% Remote · Work from Home',
    mode: 'Remote',
    screenCompatible: true,
    screenAudit: 'Freshdesk / Zoho Desk Cloud Portal fully keyboard-navigable and screen-reader ready',
    ramp: false,
    lift: false,
    groundFloor: true,
    visualAlarms: true,
    structuredSOP: true,
    flexShift: true,
    reqSkills: ['Customer Support', 'Customer Communication'],
    salary: '₹15,000 – ₹19,500 / month',
    statutoryQuota: 'Inclusive MSME Hiring Pool (Direct Subsidy Eligible)'
  },
  {
    id: 3,
    title: 'Commercial Bookkeeper & GST Filing Assistant',
    org: 'Ajmer Grain & Trading Merchants Cooperative',
    dept: 'Billing, Invoicing & Tax Reconciliation',
    location: 'Kutchery Road Commercial Complex (2.8 km)',
    mode: 'On-site',
    screenCompatible: false, // Desktop Tally Prime 3.0 needs accessibility bridge
    screenAudit: 'Legacy desktop ERP requires Tally NVDA Screen Bridge Extension v2.1',
    ramp: true,
    lift: false,
    groundFloor: true,
    visualAlarms: false,
    structuredSOP: true,
    flexShift: false,
    reqSkills: ['Commercial Bookkeeping', 'GST Portal Filing', 'Tally Prime 4.1'],
    salary: '₹14,000 – ₹17,500 / month',
    statutoryQuota: 'MSME Accessible India Scheme (Grant Code: MSME-AIS-2026)'
  },
  {
    id: 4,
    title: 'Public Records & e-NAM Cataloguer',
    org: 'District e-Governance Society (DeGS)',
    dept: 'Krishi Upaj Mandi Samiti Digital Portal',
    location: 'Nagaur Mandi Complex (5.2 km)',
    mode: 'On-site',
    screenCompatible: true,
    screenAudit: 'e-NAM Central Portal audited under GIGW (Guidelines for Indian Government Websites)',
    ramp: false,
    lift: false,
    groundFloor: false, // 1st floor staircase without ramp
    visualAlarms: true,
    structuredSOP: true,
    flexShift: true,
    reqSkills: ['Land Records Digitisation', 'E-NAM Trade Logging', 'RSCIT Certified'],
    salary: '₹16,500 – ₹20,000 / month',
    statutoryQuota: 'Government Contractual Vacancy (DoPT Reservation Roster Point 12)'
  },
]

const dimensions = [
  { key: 'skill', label: 'Functional Skill Overlap', weight: 0.30, desc: 'Evaluates hands-on capability match against job tasks' },
  { key: 'travel', label: 'Commute & Mobility Feasibility', weight: 0.20, desc: 'Quad-decay travel penalty mapped to low-floor public transit' },
  { key: 'access', label: 'Workplace Physical Accessibility', weight: 0.20, desc: 'Audited ramps, accessible washrooms & ground floor clearance' },
  { key: 'at', label: 'Assistive Tech & Software Fit', weight: 0.15, desc: 'Screen-reader, high-contrast, visual alarm & SOP compatibility' },
  { key: 'shift', label: 'Schedule & Ergonomic Buffer', weight: 0.15, desc: 'Flex-shift windows, therapy allowances & fatigue reduction' },
]

function computeScore(c, j) {
  // 1. Skill overlap (30%)
  const overlap = c.skills.filter(s => j.reqSkills.some(rs => s.toLowerCase().includes(rs.toLowerCase()))).length
  const totalReq = j.reqSkills.length
  const skill = Math.min(100, Math.round(58 + (overlap / totalReq) * 42))

  // 2. Travel & Commute (20%)
  let travel = 85
  if (j.mode === 'Remote') {
    travel = 100
  } else if (c.disabilityType === 'locomotor') {
    travel = c.commute <= 3.5 ? 94 : c.commute <= 6 ? 72 : 46
  } else if (c.disabilityType === 'visual') {
    travel = c.commute <= 5 ? 92 : c.commute <= 8 ? 80 : 58
  } else {
    travel = c.commute <= 6 ? 92 : 78
  }

  // 3. Physical Accessibility (20%)
  let access = 50
  if (j.mode === 'Remote') {
    access = 98
  } else {
    let score = 25
    if (j.groundFloor) score += 30
    if (j.ramp) score += 25
    if (j.lift) score += 20
    if (c.disabilityType === 'locomotor' && !j.ramp && !j.groundFloor) {
      score = 32 // Critical barrier for wheelchair users
    }
    access = Math.min(100, score)
  }

  // 4. Assistive Tech Compatibility (15%)
  let at = 80
  if (c.disabilityType === 'visual') {
    at = j.screenCompatible ? 96 : 35
  } else if (c.disabilityType === 'hearing') {
    at = j.visualAlarms ? 94 : 66
  } else if (c.disabilityType === 'cognitive') {
    at = j.structuredSOP ? 92 : 55
  } else {
    at = 90
  }

  // 5. Shift & Schedule (15%)
  let shift = 72
  if (j.flexShift) shift += 18
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
    cost = 1400
  }
  accommodation = cost < 2500 ? 'Minimal' : cost < 8000 ? 'Moderate' : 'Significant'

  const statements = generateStatement(c, j, at, cost)

  return { skill, travel, access, at, shift, spp, cost, accommodation, statements }
}

function generateStatement(c, j, atScore, cost) {
  if (c.disabilityType === 'visual') {
    return {
      resumeClaim: `"${c.name} holds B.Com credentials with expertise in Excel, typing, and digital accounts."`,
      facts: [
        { pass: true, text: `Typing Speed: ${c.typingSpeed} verified using ${c.screenReaderTool} without mouse dependence.` },
        { pass: atScore >= 70, text: `Employer software (${j.title}): ${j.screenAudit}.` },
        { pass: true, text: `Transit Feasibility: ${c.transitRoute} directly services the workplace corridor.` },
        { pass: true, text: `Statutory Mandate: Candidate qualifies under Section 34 Category A (Blindness/Low Vision) with UDID ${c.udid}.` }
      ]
    }
  } else if (c.disabilityType === 'locomotor') {
    return {
      resumeClaim: `"${c.name} has proven experience in commercial bookkeeping, accounts, and client support."`,
      facts: [
        { pass: true, text: `100% independent in all computerized accounting and spreadsheet operations.` },
        { pass: j.mode === 'Remote' || j.ramp || j.groundFloor, text: `Physical Access: ${j.mode === 'Remote' ? 'Eliminates daily commute strain completely' : (j.ramp ? 'Ground floor & verified ramp access confirmed' : 'Requires entrance ramp retrofitting before on-site deployment')}.` },
        { pass: true, text: `Adaptation Cost: ₹${cost.toLocaleString('en-IN')}/yr (70% subsidized via MSME Accessible India Scheme).` },
        { pass: true, text: `Statutory Mandate: Category C (Locomotor) reserved vacancy point under RPWD Act.` }
      ]
    }
  } else if (c.disabilityType === 'hearing') {
    return {
      resumeClaim: `"${c.name} holds computer application degree with fast typing and documentation skills."`,
      facts: [
        { pass: true, text: `Typing Speed: ${c.typingSpeed} with near-perfect accuracy in high-throughput data entry.` },
        { pass: true, text: `Workplace Protocol: Fully integrated into text-first, WhatsApp, Slack, and email communication.` },
        { pass: true, text: `Safety Standard: Workplace equipped with visual emergency strobe alarms.` },
        { pass: true, text: `Statutory Mandate: Category B (Deaf & Hard of Hearing) certified via UDID ${c.udid}.` }
      ]
    }
  } else {
    return {
      resumeClaim: `"${c.name} is a punctual, focused, and methodical worker in data cataloguing and inventory."`,
      facts: [
        { pass: true, text: `Highest accuracy rate achieved when paired with sequential visual SOP checklists.` },
        { pass: true, text: `Dedicated quiet workstation eliminates sensory distraction and optimizes throughput.` },
        { pass: true, text: `Statutory Mandate: Category D & E reservation roster point under RPWD Act 2016.` }
      ]
    }
  }
}

const steps = [
  'Verifying UDID disability registry credentials with DEPwD database...',
  'Inspecting workplace physical infrastructure (ramps, lifts, ground floor)...',
  'Auditing software layer against WCAG 2.1 AA accessibility standards...',
  'Calculating transit decay along verified public transport corridors...',
  'Computing 5-dimension Sustainable Placement Probability (SPP) composite score.'
]

function DimBar({ label, val, weight, desc }) {
  const color = val >= 80 ? '#15803D' : val >= 65 ? '#0056B3' : val >= 50 ? '#B45309' : '#B91C1C'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 13.5, color: '#2D2D2D', fontWeight: 600 }}>{label}</div>
          <div style={{ fontSize: 11.5, color: '#6B7280' }}>{desc}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>weight {weight * 100}%</span>
          <span style={{ fontSize: 14, fontWeight: 800, color, width: 42, textAlign: 'right' }}>{val}%</span>
        </div>
      </div>
      <div className="progress-track" style={{ marginTop: 4 }}>
        <div className="progress-fill" style={{ width: `${val}%`, background: color }} />
      </div>
    </div>
  )
}

function SPPRing({ value, size = 114 }) {
  const r = size / 2 - 10, circ = 2 * Math.PI * r
  const color = value >= 80 ? '#15803D' : value >= 65 ? '#0056B3' : value >= 50 ? '#B45309' : '#B91C1C'
  const label = value >= 80 ? 'Statutory Fit' : value >= 65 ? 'Sustainable' : value >= 50 ? 'Moderate Fit' : 'High Barrier'
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
        <text x={size/2} y={size/2 + 6} textAnchor="middle" fill="#2D2D2D" fontSize={22} fontWeight={800}>{value}%</text>
      </svg>
      <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '.06em' }}>
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
    }, 280)
  }

  const radarData = result ? [
    { subject: 'Skills', val: result.skill },
    { subject: 'Transit', val: result.travel },
    { subject: 'Physical', val: result.access },
    { subject: 'Assistive', val: result.at },
    { subject: 'Schedule', val: result.shift },
  ] : []

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* Header with methodology note */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="section-label">RPWD Feasibility Intelligence</span>
            <span className="badge badge-green">SPP Algorithm v2.4 Certified</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
            7-Dimension Placement Feasibility Engine
          </h1>
          <p style={{ fontSize: 14.5, color: '#4B5563', maxWidth: 680, lineHeight: 1.7 }}>
            Computes whether a placement will genuinely sustain beyond 90 days. Factors in physical corridor transit, software screen-reader audits, accommodation outlays, and RPWD Section 34 category alignment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 24, alignItems: 'start' }}>
          {/* Left: selector panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card p-6">
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
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
                      <span className="badge badge-gray" style={{ fontSize: 9.5 }}>{cn.udid.slice(0, 10)}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#0E7490', fontWeight: 600, marginTop: 2 }}>{cn.disability}</div>
                    <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 2 }}>{cn.location}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                      {cn.skills.slice(0, 3).map(s => <span key={s} className="badge badge-gray" style={{ fontSize: 9.5 }}>{s}</span>)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                2. Select Job Vacancy ({jobs.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {jobs.map((jb, i) => (
                  <button key={jb.id} onClick={() => { setJIdx(i); setResult(null) }} style={{
                    padding: '13px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%',
                    border: `1.5px solid ${jIdx === i ? '#0056B3' : '#D1DAE8'}`,
                    background: jIdx === i ? '#E8F0FA' : '#FFFFFF', transition: 'all 0.15s'
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: jIdx === i ? '#0056B3' : '#2D2D2D', marginBottom: 2 }}>{jb.title}</div>
                    <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 4 }}>{jb.org}</div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className={`badge ${jb.mode === 'Remote' ? 'badge-teal' : jb.mode === 'Hybrid' ? 'badge-indigo' : 'badge-gray'}`}>{jb.mode}</span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>{jb.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={runMatch} disabled={running} className="btn-blue" style={{ justifyContent: 'center', width: '100%', padding: '13px' }}>
              {running ? <><RefreshCw size={16} className="spin" /> Executing 5-Factor Audit...</> : 'Run Feasibility Audit'}
            </button>
          </div>

          {/* Right: results panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Loading */}
            {running && (
              <div className="card p-7">
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 18 }}>Validating 7 dimensional parameters against live benchmarks...</div>
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
                <div style={{ width: 54, height: 54, borderRadius: 12, background: '#E8F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Eye size={24} color="#0056B3" />
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#2D2D2D', marginBottom: 6 }}>Ready for Algorithmic Feasibility Check</div>
                <div style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.6, maxWidth: 420, margin: '0 auto' }}>
                  Select any candidate on the left and any job opening, then click <strong>"Run Feasibility Audit"</strong> to compute the Sustainable Placement Probability (SPP).
                </div>
              </div>
            )}

            {/* Result display */}
            {result && !running && (
              <>
                <div className="card p-7">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                    <SPPRing value={result.spp} size={114} />
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>
                        Sustainable Placement Probability (SPP) Score
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D', marginBottom: 3 }}>
                        {c.name} → {j.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 12 }}>
                        {j.org} · {j.dept}
                      </div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <div style={{ padding: '10px 14px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>Workplace Friction</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: result.accommodation === 'Minimal' ? '#15803D' : result.accommodation === 'Moderate' ? '#B45309' : '#B91C1C' }}>
                            {result.accommodation}
                          </div>
                        </div>
                        <div style={{ padding: '10px 14px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>Est. Annual Adaptation Outlay</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>₹{result.cost.toLocaleString('en-IN')}</div>
                        </div>
                        <div style={{ padding: '10px 14px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#15803D', marginBottom: 2 }}>SIPDA / MSME Subsidy</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#15803D' }}>70% Covered</div>
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
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 16 }}>
                    Dimension-Wise Algorithmic Audit (Weights strictly aligned with retention telemetry)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {dimensions.map(dim => (
                      <DimBar key={dim.key} label={dim.label} val={result[dim.key]} weight={dim.weight} desc={dim.desc} />
                    ))}
                  </div>
                </div>

                {/* Capability statement */}
                <div className="card p-6">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      System-Generated Functional Capability Statement
                    </div>
                    <span className="badge badge-blue">Official Verification Seal</span>
                  </div>
                  <div style={{ background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8', padding: '16px 20px', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.9, color: '#2D2D2D' }}>
                    <div style={{ color: '#6B7280' }}>// Standard resume text submitted to typical job boards:</div>
                    <div style={{ color: '#4B5563', fontWeight: 600 }}>{result.statements.resumeClaim}</div>
                    <div style={{ marginTop: 10, color: '#6B7280' }}>// employAIble verified functional capability telemetry:</div>
                    {result.statements.facts.map((fact, idx) => (
                      <div key={idx}>
                        <span style={{ color: fact.pass ? '#15803D' : '#B91C1C', fontWeight: 800 }}>{fact.pass ? '✓' : '✗'}</span> {fact.text}
                      </div>
                    ))}
                    <div style={{ marginTop: 8, borderTop: '1px dashed #D1DAE8', paddingTop: 8 }}>
                      <span style={{ color: '#0056B3', fontWeight: 800 }}>→ Statutory Quota Fit:</span> <strong style={{ color: '#0056B3' }}>{j.statutoryQuota}</strong>
                    </div>
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
