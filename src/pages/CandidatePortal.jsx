import { useState } from 'react'
import { CheckCircle, ChevronRight, Eye, Ear, Accessibility, Brain, Wifi, WifiOff, AlertCircle, Mic, Volume2, MapPin, Briefcase } from 'lucide-react'

const disabilityTypes = [
  { id: 'visual', label: 'Visual Impairment', sub: 'Includes low vision & blindness', icon: Eye, accent: '#0056B3' },
  { id: 'hearing', label: 'Hearing Impairment', sub: 'Includes deaf & hard of hearing', icon: Ear, accent: '#6D28D9' },
  { id: 'locomotor', label: 'Locomotor Disability', sub: 'Mobility or limb impairment', icon: Accessibility, accent: '#0E7490' },
  { id: 'cognitive', label: 'Autism / Intellectual', sub: 'Cognitive or intellectual disability', icon: Brain, accent: '#B45309' },
]

const certOptions = [
  { id: 'verified', label: 'UDID verified', sub: 'Certificate confirmed', dot: '#15803D' },
  { id: 'pending', label: 'Certification pending', sub: 'Applied, awaiting issuance', dot: '#B45309' },
  { id: 'none', label: 'No certificate yet', sub: 'We can help you get certified', dot: '#B91C1C' },
]

const accessNeeds = [
  { id: 'screenreader', label: 'Screen reader required', sub: 'NVDA, JAWS, or system reader' },
  { id: 'ramp', label: 'Wheelchair / ramp access', sub: 'Ground floor or lift essential' },
  { id: 'interpreter', label: 'Sign language / visual prompts', sub: 'Text-based instructions' },
  { id: 'flexshift', label: 'Flexible shift timing', sub: 'Fixed hours not feasible' },
  { id: 'remote', label: 'Remote work preferred', sub: 'Partial or full WFH' },
  { id: 'workstation', label: 'Modified workstation', sub: 'Ergonomic or adapted setup' },
]

// Dynamic job database generating permutations per disability and commute
function getDynamicMatches(disability, commute, needs, skillsState) {
  const yesCount = Object.values(skillsState).filter(v => v === 'Yes').length
  const partialCount = Object.values(skillsState).filter(v => v === 'Partial').length
  const skillMultiplier = 55 + yesCount * 10 + partialCount * 5

  if (disability === 'visual') {
    return [
      {
        title: 'Data Entry Operator',
        org: 'Rajasthan State Cooperative Bank',
        location: `Ajmer · 4.2 km`,
        mode: 'Hybrid',
        type: 'Government',
        spp: Math.min(96, Math.round(skillMultiplier * 0.35 + 57)),
        dims: [
          { label: 'Skill match', val: Math.min(95, skillMultiplier), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 5 ? 90 : 70, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 86, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 94, color: '#0E7490' },
          { label: 'Shift compatibility', val: 88, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹2,400/yr',
        tags: ['Screen reader certified', 'Keyboard nav', 'Govt 4% Quota'],
        salary: '₹18,000 – ₹22,000'
      },
      {
        title: 'Remote Customer Support Specialist',
        org: 'TechSeva Solutions Pvt. Ltd.',
        location: 'Remote · Work from home',
        mode: 'Remote',
        type: 'Private',
        spp: Math.min(92, Math.round(skillMultiplier * 0.32 + 54)),
        dims: [
          { label: 'Skill match', val: Math.min(90, skillMultiplier - 4), color: '#0056B3' },
          { label: 'Travel feasibility', val: 100, color: '#0E7490' },
          { label: 'Workplace accessibility', val: 82, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 88, color: '#0E7490' },
          { label: 'Shift compatibility', val: 78, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹1,500/yr',
        tags: ['100% Remote', 'Telephony Shortcuts', 'Hindi/English'],
        salary: '₹14,000 – ₹18,000'
      },
      {
        title: 'Digital Records Cataloguer',
        org: 'District Information Office',
        location: `Ajmer · 3.5 km`,
        mode: 'On-site',
        type: 'Government',
        spp: Math.min(85, Math.round(skillMultiplier * 0.30 + 50)),
        dims: [
          { label: 'Skill match', val: Math.min(85, skillMultiplier - 8), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 4 ? 88 : 65, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 74, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 79, color: '#0E7490' },
          { label: 'Shift compatibility', val: 82, color: '#15803D' }
        ],
        accommodation: 'Moderate',
        cost: '₹3,200/yr',
        tags: ['Public Sector', 'OCR Assisted', 'Accessible Transit'],
        salary: '₹15,000 – ₹19,000'
      }
    ]
  } else if (disability === 'locomotor') {
    return [
      {
        title: 'Remote Financial Bookkeeper',
        org: 'TechSeva Solutions Pvt. Ltd.',
        location: 'Remote · Full WFH',
        mode: 'Remote',
        type: 'Private',
        spp: Math.min(95, Math.round(skillMultiplier * 0.34 + 56)),
        dims: [
          { label: 'Skill match', val: Math.min(94, skillMultiplier), color: '#0056B3' },
          { label: 'Travel feasibility', val: 100, color: '#0E7490' },
          { label: 'Workplace accessibility', val: 98, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 92, color: '#0E7490' },
          { label: 'Shift compatibility', val: 85, color: '#15803D' }
        ],
        accommodation: 'Zero Cost',
        cost: '₹0 (Remote)',
        tags: ['Zero Commute', 'Tally Cloud', 'Ergonomic Stipend'],
        salary: '₹16,000 – ₹20,000'
      },
      {
        title: 'Accounts Desk Executive',
        org: 'Ajmer Traders Cooperative',
        location: `Ajmer · 2.1 km`,
        mode: 'On-site',
        type: 'MSME',
        spp: Math.min(88, Math.round(skillMultiplier * 0.31 + 52)),
        dims: [
          { label: 'Skill match', val: Math.min(88, skillMultiplier - 5), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 3 ? 94 : 68, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 86, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 85, color: '#0E7490' },
          { label: 'Shift compatibility', val: 80, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹3,000/yr',
        tags: ['Ground Floor', 'Ramp Verified', 'Restroom Grab-bars'],
        salary: '₹13,000 – ₹16,500'
      },
      {
        title: 'Inventory Coordinator',
        org: 'Rajasthan State Agro Industries',
        location: `Ajmer · 5.8 km`,
        mode: 'Hybrid',
        type: 'Government',
        spp: Math.min(81, Math.round(skillMultiplier * 0.28 + 48)),
        dims: [
          { label: 'Skill match', val: Math.min(82, skillMultiplier - 10), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 6 ? 82 : 55, color: '#B45309' },
          { label: 'Workplace accessibility', val: 80, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 78, color: '#0E7490' },
          { label: 'Shift compatibility', val: 84, color: '#15803D' }
        ],
        accommodation: 'Moderate',
        cost: '₹4,500/yr',
        tags: ['Lift Access', 'Hybrid 2-Day', 'RPWD Quota'],
        salary: '₹17,000 – ₹21,000'
      }
    ]
  } else if (disability === 'hearing') {
    return [
      {
        title: 'Digital Data Specialist',
        org: 'Collectorate e-Governance Centre',
        location: `Nagaur / Ajmer · 3.8 km`,
        mode: 'On-site',
        type: 'Government',
        spp: Math.min(94, Math.round(skillMultiplier * 0.35 + 55)),
        dims: [
          { label: 'Skill match', val: Math.min(95, skillMultiplier), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 4 ? 92 : 72, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 90, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 95, color: '#0E7490' },
          { label: 'Shift compatibility', val: 88, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹1,200/yr',
        tags: ['100% Text Workflow', 'Visual Alert Strobe', 'Direct Govt Role'],
        salary: '₹19,000 – ₹23,000'
      },
      {
        title: 'Web Chat & Ticket Associate',
        org: 'E-Seva Customer Services',
        location: 'Remote · Full WFH',
        mode: 'Remote',
        type: 'Private',
        spp: Math.min(90, Math.round(skillMultiplier * 0.32 + 52)),
        dims: [
          { label: 'Skill match', val: Math.min(90, skillMultiplier - 4), color: '#0056B3' },
          { label: 'Travel feasibility', val: 100, color: '#0E7490' },
          { label: 'Workplace accessibility', val: 94, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 88, color: '#0E7490' },
          { label: 'Shift compatibility', val: 80, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹800/yr',
        tags: ['Chat & Email Only', 'No Voice Calls', 'Flexible Hours'],
        salary: '₹15,000 – ₹18,000'
      },
      {
        title: 'Document Cataloguer',
        org: 'District Co-operative Union',
        location: `Ajmer · 2.5 km`,
        mode: 'On-site',
        type: 'MSME',
        spp: Math.min(84, Math.round(skillMultiplier * 0.29 + 49)),
        dims: [
          { label: 'Skill match', val: Math.min(84, skillMultiplier - 8), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 3 ? 92 : 65, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 85, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 82, color: '#0E7490' },
          { label: 'Shift compatibility', val: 80, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹1,500/yr',
        tags: ['Visual Kanban', 'Written Briefings', 'Peer Buddy'],
        salary: '₹12,000 – ₹15,000'
      }
    ]
  } else {
    // Cognitive
    return [
      {
        title: 'E-Commerce Product Cataloguer',
        org: 'Rajasthan Khadi Gramodyog Board',
        location: `Ajmer · 3.0 km`,
        mode: 'On-site',
        type: 'Government',
        spp: Math.min(92, Math.round(skillMultiplier * 0.33 + 54)),
        dims: [
          { label: 'Skill match', val: Math.min(90, skillMultiplier), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 3 ? 92 : 70, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 92, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 90, color: '#0E7490' },
          { label: 'Shift compatibility', val: 86, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹1,200/yr',
        tags: ['Visual Checklist SOP', 'Quiet Workspace', 'Structured Routine'],
        salary: '₹14,000 – ₹17,500'
      },
      {
        title: 'Inventory & Barcode Associate',
        org: 'District Supply Corporation',
        location: `Ajmer · 4.5 km`,
        mode: 'On-site',
        type: 'MSME',
        spp: Math.min(86, Math.round(skillMultiplier * 0.30 + 50)),
        dims: [
          { label: 'Skill match', val: Math.min(86, skillMultiplier - 5), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 5 ? 88 : 64, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 84, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 85, color: '#0E7490' },
          { label: 'Shift compatibility', val: 82, color: '#15803D' }
        ],
        accommodation: 'Moderate',
        cost: '₹2,200/yr',
        tags: ['Color-Coded Shelves', 'Dedicated Mentor', 'Regular Day Shift'],
        salary: '₹13,000 – ₹16,000'
      },
      {
        title: 'Digital Bookmarking Clerk',
        org: 'District Central Library',
        location: `Ajmer · 2.2 km`,
        mode: 'On-site',
        type: 'Government',
        spp: Math.min(83, Math.round(skillMultiplier * 0.28 + 48)),
        dims: [
          { label: 'Skill match', val: Math.min(82, skillMultiplier - 8), color: '#0056B3' },
          { label: 'Travel feasibility', val: commute >= 3 ? 94 : 66, color: '#0056B3' },
          { label: 'Workplace accessibility', val: 86, color: '#0E7490' },
          { label: 'Assistive tech compat.', val: 80, color: '#0E7490' },
          { label: 'Shift compatibility', val: 84, color: '#15803D' }
        ],
        accommodation: 'Minimal',
        cost: '₹900/yr',
        tags: ['Low-Stimulus Desk', 'Calm Environment', 'Govt Role'],
        salary: '₹12,500 – ₹15,500'
      }
    ]
  }
}

function SPPRing({ value }) {
  const r = 28, circ = 2 * Math.PI * r
  const color = value >= 80 ? '#15803D' : value >= 65 ? '#B45309' : '#B91C1C'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <svg width={72} height={72} viewBox="0 0 72 72">
        <circle cx={36} cy={36} r={r} fill="none" stroke="#EEF2F7" strokeWidth={6} />
        <circle
          cx={36} cy={36} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - value / 100)}
          strokeLinecap="round" transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dashoffset 1.1s ease' }}
        />
        <text x={36} y={41} textAnchor="middle" fill="#2D2D2D" fontSize={13} fontWeight={800}>{value}%</text>
      </svg>
      <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '.05em' }}>SPP</span>
    </div>
  )
}

function DimBar({ label, val, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: '#4B5563' }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#2D2D2D' }}>{val}%</span>
      </div>
      <div style={{ height: 6, background: '#EEF2F7', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: 3, transition: 'width .8s ease' }} />
      </div>
    </div>
  )
}

function JobCard({ job }) {
  const [open, setOpen] = useState(false)
  const [applied, setApplied] = useState(false)
  const sppColor = job.spp >= 80 ? '#15803D' : job.spp >= 65 ? '#0056B3' : '#B45309'
  const typeBadge = job.type === 'Government' ? 'badge-blue' : job.type === 'MSME' ? 'badge-amber' : 'badge-gray'
  const modeBadge = job.mode === 'Remote' ? 'badge-teal' : job.mode === 'Hybrid' ? 'badge-indigo' : 'badge-gray'

  return (
    <div className="card" style={{ overflow: 'hidden', borderTop: `4px solid ${sppColor}` }}>
      <div style={{ padding: '20px 22px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              <span className={`badge ${typeBadge}`}>{job.type}</span>
              <span className={`badge ${modeBadge}`}>{job.mode}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#2D2D2D', marginBottom: 4 }}>{job.title}</div>
            <div style={{ fontSize: 13, color: '#4B5563' }}>{job.org}</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={13} color="#6B7280" /> {job.location}
            </div>
          </div>
          <SPPRing value={job.spp} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {job.tags.map(t => <span key={t} className="badge badge-gray">{t}</span>)}
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {job.dims.slice(0, 3).map(d => <DimBar key={d.label} {...d} />)}
        </div>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #D1DAE8', padding: '18px 22px', background: '#F5F7FA', display: 'grid', gap: 10 }}>
          {job.dims.slice(3).map(d => <DimBar key={d.label} {...d} />)}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 10 }}>
            {[
              { k: 'Accommodation', v: job.accommodation, c: job.accommodation === 'Minimal' ? '#15803D' : '#0056B3' },
              { k: 'Est. annual cost', v: job.cost, c: '#2D2D2D' },
              { k: 'Salary range', v: job.salary, c: '#2D2D2D' },
            ].map(item => (
              <div key={item.k} style={{ background: '#FFFFFF', borderRadius: 8, border: '1px solid #D1DAE8', padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 4 }}>{item.k}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.c }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px solid #D1DAE8', padding: '14px 20px', display: 'flex', gap: 12, background: '#FFFFFF' }}>
        <button onClick={() => setOpen(!open)} className="btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
          {open ? 'Hide details' : 'Full breakdown'}
        </button>
        <button
          onClick={() => setApplied(!applied)}
          className={applied ? "btn-light btn-sm" : "btn-blue btn-sm"}
          style={{ flex: 1, justifyContent: 'center', color: applied ? '#15803D' : '#fff' }}
        >
          {applied ? '✓ Application Submitted' : 'Apply for Role'}
        </button>
      </div>
    </div>
  )
}

export default function CandidatePortal() {
  const [step, setStep] = useState(0)
  const [disability, setDisability] = useState('visual')
  const [cert, setCert] = useState('verified')
  const [commute, setCommute] = useState(10)
  const [needs, setNeeds] = useState(['screenreader'])
  const [voice, setVoice] = useState(false)
  const [skillsState, setSkillsState] = useState({
    0: 'Yes',
    1: 'Yes',
    2: 'Partial',
    3: 'Yes'
  })

  const toggleNeed = id => setNeeds(p => p.includes(id) ? p.filter(n => n !== id) : [...p, id])
  const setSkillValue = (idx, val) => setSkillsState(p => ({ ...p, [idx]: val }))

  const steps = ['Profile', 'Capabilities', 'Matches']
  const currentMatches = getDynamicMatches(disability, commute, needs, skillsState)

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-5xl mx-auto px-5 py-12">

        {/* Header */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 8 }}>Candidate Capability Profiling</div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>Find work that genuinely fits</h1>
            <p style={{ fontSize: 15, color: '#4B5563', maxWidth: 520, lineHeight: 1.7 }}>
              We profile your functional work capabilities — not just generic keywords — and compute Sustainable Placement Probability (SPP) for local jobs.
            </p>
          </div>
          <button onClick={() => setVoice(!voice)} className={voice ? 'btn-blue btn-sm' : 'btn-light btn-sm'} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {voice ? <Volume2 size={15} /> : <Mic size={15} />}
            {voice ? 'Voice guidance on' : 'Voice guide'}
          </button>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid #D1DAE8' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => step > i && setStep(i)} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', cursor: step > i ? 'pointer' : 'default', padding: '4px 0' }}>
                <div className={`step-dot ${i < step ? 'step-dot-done' : i === step ? 'step-dot-active' : 'step-dot-pending'}`}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: i === step ? '#0056B3' : i < step ? '#15803D' : '#6B7280' }}>{s}</span>
              </button>
              {i < steps.length - 1 && <div style={{ width: 56, height: 2, background: i < step ? '#15803D' : '#D1DAE8', margin: '0 14px', borderRadius: 1 }} />}
            </div>
          ))}
        </div>

        {/* Step 0 */}
        {step === 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="card p-7" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D' }}>Basic information</div>
              <div>
                <label className="label">Full name</label>
                <input className="input" defaultValue="Ramesh Kumar Sharma" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label className="label">District</label><input className="input" defaultValue="Ajmer" /></div>
                <div><label className="label">State</label><input className="input" defaultValue="Rajasthan" /></div>
              </div>
              <div>
                <label className="label">Max commute threshold — <span style={{ color: '#0056B3', fontWeight: 700 }}>{commute} km</span></label>
                <input type="range" min={1} max={50} value={commute} onChange={e => setCommute(+e.target.value)} style={{ width: '100%', accentColor: '#0056B3', marginTop: 8 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                  <span>1 km</span><span>25 km</span><span>50 km</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card p-7">
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 14 }}>Disability classification</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {disabilityTypes.map(d => (
                    <button key={d.id} onClick={() => setDisability(d.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%',
                      border: `1.5px solid ${disability === d.id ? '#0056B3' : '#D1DAE8'}`,
                      background: disability === d.id ? '#E8F0FA' : '#FFFFFF',
                      transition: 'all .15s'
                    }}>
                      <d.icon size={18} color={disability === d.id ? '#0056B3' : '#6B7280'} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: disability === d.id ? '#0056B3' : '#2D2D2D' }}>{d.label}</div>
                        <div style={{ fontSize: 11.5, color: '#4B5563', marginTop: 1 }}>{d.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card p-7">
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 14 }}>Certificate status</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {certOptions.map(c => (
                    <button key={c.id} onClick={() => setCert(c.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%',
                      border: `1.5px solid ${cert === c.id ? c.dot : '#D1DAE8'}`,
                      background: cert === c.id ? '#F5F7FA' : '#FFFFFF', transition: 'all .15s'
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#2D2D2D' }}>{c.label}</div>
                        <div style={{ fontSize: 11.5, color: '#4B5563', marginTop: 1 }}>{c.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {cert === 'none' && (
                  <div style={{ marginTop: 12, padding: '12px 14px', background: '#E8F0FA', border: '1px solid #BFDBFE', borderRadius: 8, fontSize: 12.5, color: '#0056B3', lineHeight: 1.6 }}>
                    We will connect you to your nearest District Disability Rehabilitation Centre (DDRC) to initiate UDID certification.
                  </div>
                )}
              </div>
            </div>

            <div style={{ gridColumn: '1/-1', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(1)} className="btn-blue">Continue to Capabilities <ChevronRight size={16} /></button>
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card p-7">
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 6 }}>Functional capability profiling</div>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7, marginBottom: 20 }}>
                Tell us <strong style={{ color: '#2D2D2D' }}>how</strong> you work, not just what software you know.
                This provides employers with verified capability statements (e.g. keyboard-only typing, screen-reader navigation).
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Computer / laptop usage', note: 'Screen reader or keyboard-only navigation' },
                  { label: 'Data entry (Excel / Tally)', note: 'Keyboard shortcuts, without mouse' },
                  { label: 'Email and communication tools', note: 'Voice-to-text or magnification software' },
                  { label: 'Internet browsing', note: 'Screen reader or high contrast mode' },
                ].map((sk, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '14px 18px', background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#2D2D2D' }}>{sk.label}</div>
                      <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>{sk.note}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[['No', '#B91C1C', '#FEE2E2'], ['Partial', '#B45309', '#FEF3C7'], ['Yes', '#15803D', '#DCFCE7']].map(([opt, col, bg]) => {
                        const isSelected = skillsState[i] === opt
                        return (
                          <button
                            key={opt}
                            onClick={() => setSkillValue(i, opt)}
                            style={{
                              padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                              border: `1.5px solid ${isSelected ? col : '#D1DAE8'}`,
                              background: isSelected ? bg : '#FFFFFF',
                              color: isSelected ? col : '#4B5563', transition: 'all .15s'
                            }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-7">
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 14 }}>Workplace accessibility requirements</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {accessNeeds.map(n => (
                  <div key={n.id} onClick={() => toggleNeed(n.id)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 15px', background: '#F5F7FA', borderRadius: 8,
                    border: `1.5px solid ${needs.includes(n.id) ? '#0056B3' : '#D1DAE8'}`, cursor: 'pointer', transition: 'border-color .15s'
                  }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#2D2D2D' }}>{n.label}</div>
                      <div style={{ fontSize: 11.5, color: '#4B5563', marginTop: 1 }}>{n.sub}</div>
                    </div>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${needs.includes(n.id) ? '#0056B3' : '#D1DAE8'}`, background: needs.includes(n.id) ? '#0056B3' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
                      {needs.includes(n.id) && <CheckCircle size={13} color="white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(0)} className="btn-ghost">← Back to Profile</button>
              <button onClick={() => setStep(2)} className="btn-blue">Calculate Matching Jobs <ChevronRight size={16} /></button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: '18px 24px', background: '#FFFFFF', borderRadius: 10, border: '1px solid #D1DAE8', display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
              {[
                { k: 'District Jobs Analysed', v: '847', c: '#2D2D2D' },
                { k: 'Feasible Sustainable Matches', v: `${currentMatches.length}`, c: '#15803D' },
                { k: 'Top Calculated SPP', v: `${currentMatches[0]?.spp || 85}%`, c: '#0056B3' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>{item.k}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: item.c, letterSpacing: '-0.025em' }}>{item.v}</div>
                </div>
              ))}
              <div style={{ marginLeft: 'auto', fontSize: 12, color: '#6B7280' }}>
                Filtered for {disabilityTypes.find(d => d.id === disability)?.label} · Max {commute} km
              </div>
            </div>
            {currentMatches.map((job, i) => <JobCard key={i} job={job} />)}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setStep(1)} className="btn-ghost">← Refine Capabilities</button>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Showing verified vacancies with RPWD Act 4% reservation status</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
