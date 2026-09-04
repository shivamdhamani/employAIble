import { useState } from 'react'
import { CheckCircle, ChevronRight, IndianRupee, AlertTriangle, TrendingUp, Shield, Lightbulb } from 'lucide-react'

const roles = [
  'Accountant / Bookkeeper', 'Customer Support', 'Data Entry Operator',
  'Office Administrator', 'Sales Representative', 'Content Writer',
  'Store Assistant', 'Software Developer', 'Teacher / Trainer', 'Delivery Coordinator',
]

const actions = {
  'visual+Accountant / Bookkeeper': [
    { text: 'Install NVDA screen reader on the accounting workstation', cost: 0, effort: 'Low', impact: 'High' },
    { text: 'Confirm Tally / ERP supports keyboard-only navigation', cost: 0, effort: 'Low', impact: 'High' },
    { text: 'Assign a document-handling buddy for physical paperwork', cost: 0, effort: 'Low', impact: 'Medium' },
    { text: 'Provide financial summaries in audio or accessible digital format', cost: 1500, effort: 'Low', impact: 'Medium' },
  ],
  'locomotor+Accountant / Bookkeeper': [
    { text: 'Ensure ground-floor or lift-accessible workstation', cost: 0, effort: 'Medium', impact: 'High' },
    { text: 'Adjust desk height to accommodate wheelchair clearance', cost: 3000, effort: 'Low', impact: 'High' },
    { text: 'Allow partial work-from-home on high-mobility-need days', cost: 0, effort: 'Low', impact: 'High' },
    { text: 'Ensure accessible restroom within 50m of workstation', cost: 8000, effort: 'High', impact: 'High' },
  ],
  'visual+Customer Support': [
    { text: 'Enable screen-reader compatible CRM (Freshdesk / Zoho Desk)', cost: 0, effort: 'Low', impact: 'High' },
    { text: 'Configure keyboard shortcuts for telephony and ticket logging', cost: 0, effort: 'Low', impact: 'High' },
    { text: 'Provide high-quality headset with voice confirmation prompts', cost: 2500, effort: 'Low', impact: 'Medium' },
    { text: 'Enable full remote work option to eliminate daily commute barriers', cost: 0, effort: 'Low', impact: 'High' },
  ],
  'locomotor+Customer Support': [
    { text: 'Provide company laptop and headset for full remote setup', cost: 15000, effort: 'Medium', impact: 'High' },
    { text: 'Permit flexible shift windows for medical or physiotherapy needs', cost: 0, effort: 'Low', impact: 'High' },
  ],
}

const incentives = [
  { name: 'MSME Accessible India Scheme', amount: '₹8,000 – ₹25,000', type: 'Subsidy', who: 'All registered MSMEs' },
  { name: 'Employer PF Contribution Waiver', amount: '3-year exemption', type: 'Tax relief', who: 'All PwD hires under RPWD Act' },
  { name: 'DIC Inclusive Employment Grant', amount: '₹5,000 – ₹15,000', type: 'Grant', who: 'Tier 2/3 city MSMEs' },
  { name: 'Accommodation Cost Pooling', amount: 'Up to 70% shared', type: 'Platform Benefit', who: 'Via employAIble platform' },
]

const disabilityOptions = [
  { id: 'visual', label: 'Visual Impairment' },
  { id: 'locomotor', label: 'Locomotor Disability' },
  { id: 'hearing', label: 'Hearing Impairment' },
  { id: 'cognitive', label: 'Autism / Intellectual' },
]

export default function EmployerPortal() {
  const [role, setRole] = useState('Accountant / Bookkeeper')
  const [disability, setDisability] = useState('visual')
  const [submitted, setSubmitted] = useState(false)

  const key = `${disability}+${role}`
  const suggestions = actions[key] || actions[`visual+${role}`] || actions['visual+Accountant / Bookkeeper']

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>Employer Tools</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
            Make any role inclusive
          </h1>
          <p style={{ fontSize: 15, color: '#4B5563', maxWidth: 560, lineHeight: 1.7 }}>
            Select a job role and disability type. We compute exact workplace accommodations,
            break down realistic costs, and highlight state and national subsidies to offset them.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* Main wizard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Step 1: Role */}
            <div className="card p-6">
              <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#0056B3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>1</span>
                Select job role
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {roles.map(r => (
                  <button key={r} onClick={() => setRole(r)} style={{
                    padding: '8px 14px', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    border: `1.5px solid ${role === r ? '#0056B3' : '#D1DAE8'}`,
                    background: role === r ? '#E8F0FA' : '#FFFFFF',
                    color: role === r ? '#0056B3' : '#4B5563', transition: 'all 0.15s'
                  }}>{r}</button>
                ))}
              </div>
            </div>

            {/* Step 2: Disability type */}
            <div className="card p-6">
              <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#0056B3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>2</span>
                Hiring for which disability category?
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {disabilityOptions.map(d => (
                  <button key={d.id} onClick={() => setDisability(d.id)} style={{
                    padding: '8px 16px', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    border: `1.5px solid ${disability === d.id ? '#0056B3' : '#D1DAE8'}`,
                    background: disability === d.id ? '#E8F0FA' : '#FFFFFF',
                    color: disability === d.id ? '#0056B3' : '#4B5563', transition: 'all 0.15s'
                  }}>{d.label}</button>
                ))}
              </div>
            </div>

            {/* Step 3: Recommendations */}
            <div className="card p-6">
              <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#0056B3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>3</span>
                  Inclusion recommendations
                </span>
                <span style={{ fontSize: 12, color: '#6B7280' }}>For: {role}</span>
              </div>
              <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginBottom: 18, paddingLeft: 30 }}>
                Targeted workplace adaptations. Most cost little to nothing — focusing on process setup and assistive compatibility.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {suggestions.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8' }}>
                    <CheckCircle size={17} color="#15803D" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, color: '#2D2D2D', fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>{s.text}</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span className="badge badge-gray">Effort: {s.effort}</span>
                        <span className="badge badge-blue">Impact: {s.impact}</span>
                        <span className={`badge ${s.cost === 0 ? 'badge-green' : 'badge-amber'}`}>
                          {s.cost === 0 ? 'Free (Zero Cost)' : `₹${s.cost.toLocaleString('en-IN')}/yr`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost summary */}
              <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 8, border: '1px solid #D1DAE8', background: '#EEF2F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>Estimated annual accommodation</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D' }}>
                    {disability === 'locomotor' ? '₹3,000 – ₹23,000' : '₹0 – ₹4,000'} <span style={{ fontSize: 13, fontWeight: 500, color: '#4B5563' }}>/ year</span>
                  </div>
                </div>
                <div style={{ padding: '6px 14px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 6, fontSize: 12, color: '#15803D', fontWeight: 700 }}>
                  Subsidy covers 70%+
                </div>
              </div>
            </div>

            {/* Post button */}
            {!submitted ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setSubmitted(true)} className="btn-blue" style={{ fontSize: 14.5, padding: '12px 26px' }}>
                  Post this inclusive job role
                </button>
              </div>
            ) : (
              <div className="card p-6" style={{ border: '1.5px solid #15803D', background: '#DCFCE7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <CheckCircle size={20} color="#15803D" />
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#15803D' }}>Listing published successfully</span>
                </div>
                <p style={{ fontSize: 14, color: '#2D2D2D', marginBottom: 16, lineHeight: 1.6 }}>
                  Your inclusive posting for <strong>{role}</strong> is live. Matching candidates from your district are being ranked.
                </p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ padding: '12px 20px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #D1DAE8', textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#0056B3' }}>19</div>
                    <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>Candidates ready</div>
                  </div>
                  <div style={{ padding: '12px 20px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #D1DAE8', textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#15803D' }}>84%</div>
                    <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>Average SPP score</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Incentives */}
            <div className="card p-6">
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 14 }}>Available incentives</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {incentives.map((inc, i) => (
                  <div key={i} style={{ padding: '12px 14px', background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D', lineHeight: 1.4 }}>{inc.name}</div>
                      <span className="badge badge-blue" style={{ flexShrink: 0 }}>{inc.type}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0056B3', marginBottom: 3 }}>{inc.amount}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{inc.who}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div className="card p-6">
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={16} color="#0056B3" /> Quota compliance
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: '#4B5563' }}>Current PwD team members</span>
                <span style={{ fontWeight: 700, color: '#2D2D2D' }}>2 of 80 employees</span>
              </div>
              <div className="progress-track" style={{ marginBottom: 8 }}>
                <div className="progress-fill" style={{ width: '2.5%', background: '#B91C1C' }} />
              </div>
              <div style={{ fontSize: 12, color: '#B91C1C', fontWeight: 600, marginBottom: 10 }}>2.5% — below 4% RPWD mandate</div>
              <div style={{ padding: '10px 12px', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 6, fontSize: 12, color: '#B91C1C', lineHeight: 1.5 }}>
                Hire 1 more candidate to reach full statutory compliance under Section 34 of the RPWD Act.
              </div>
            </div>

            {/* Why hire */}
            <div className="card p-6">
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Lightbulb size={16} color="#0056B3" /> Business benefits
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Statutory RPWD Act compliance',
                  '3-year exemption on PF contributions',
                  '2.4× higher retention rate vs general pool',
                  'Fulfills ESG and CSR score requirements',
                  'Cost pooling covers assistive software',
                ].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#4B5563' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#0056B3', flexShrink: 0 }} />
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
