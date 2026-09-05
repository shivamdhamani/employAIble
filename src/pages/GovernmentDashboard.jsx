import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'
import { AlertTriangle, CheckCircle, TrendingUp, Users, Target, Zap, Download, ShieldCheck, FileText, ExternalLink } from 'lucide-react'

const districts = ['Ajmer', 'Bhilwara', 'Nagaur', 'Tonk', 'Didwana']

const districtData = {
  Ajmer: {
    total: 38420, registered: 14210, placed: 3840, quotaFill: 64,
    districtCode: 'RJ-01',
    collectorateZone: 'Ajmer Division Central Hub',
    opportunities: [
      { role: 'Digital Bookkeeping (Tally Prime)', candidates: 142, demand: 86, cluster: 'Ajmer Grain & Trading Merchants' },
      { role: 'Customer Support (Bilingual Hindi/Eng)', candidates: 188, demand: 110, cluster: 'Rajasthan State Road Transport Call Desk' },
      { role: 'E-Mitra Data Digitisation Operator', candidates: 260, demand: 195, cluster: 'District e-Governance Society (DeGS)' },
      { role: 'Banking Back-Office Clerk', candidates: 94, demand: 52, cluster: 'Ajmer Central Co-operative Bank Ltd.' },
      { role: 'Healthcare Documentation Associate', candidates: 78, demand: 45, cluster: 'Jawaharlal Nehru Hospital & Medical College' },
    ],
    skills: [
      { name: 'NVDA Screen Reader', count: 184 },
      { name: 'Tally Prime / Bookkeeping', count: 240 },
      { name: 'Data Entry (35+ WPM)', count: 410 },
      { name: 'Remote CRM / Tele-support', count: 320 },
      { name: 'RSCIT Certified', count: 480 },
      { name: 'GST & Invoice Filing', count: 160 },
    ],
    trend: [
      { month: 'Oct 25', registered: 980, placed: 240 },
      { month: 'Nov 25', registered: 1140, placed: 310 },
      { month: 'Dec 25', registered: 1320, placed: 390 },
      { month: 'Jan 26', registered: 1560, placed: 480 },
      { month: 'Feb 26', registered: 1810, placed: 570 },
      { month: 'Mar 26', registered: 2100, placed: 680 },
    ],
    disability: [
      { name: 'Locomotor Disability (40%+)', value: 41, color: '#0056B3' },
      { name: 'Visual Impairment / Low Vision', value: 24, color: '#0E7490' },
      { name: 'Hearing & Speech Impairment', value: 18, color: '#6D28D9' },
      { name: 'Intellectual & Autism Spectrum', value: 11, color: '#B45309' },
      { name: 'Multiple Disabilities', value: 6, color: '#6B7280' },
    ],
    quota: [
      { cat: 'Category A: Blindness & Low Vision', filled: 1.15, req: 1.0, dept: 'Ajmer Vidyut Vitran Nigam Ltd (AVVNL)' },
      { cat: 'Category B: Deaf & Hard of Hearing', filled: 0.72, req: 1.0, dept: 'Public Health Engineering Dept (PHED)' },
      { cat: 'Category C: Locomotor & Cerebral Palsy', filled: 1.84, req: 1.0, dept: 'Zila Parishad Rural Development Desk' },
      { cat: 'Category D & E: Autism, Intellectual, Multiple', filled: 0.38, req: 1.0, dept: 'Social Justice & Empowerment Directorate' },
    ],
    action: 'Mobilize 86 vacancies with Ajmer Grain Trading Association via the MSME SIPDA Subsidy Scheme — highest candidate feasibility ratio (142 certified ready).',
  },
  Bhilwara: {
    total: 31200, registered: 11450, placed: 2980, quotaFill: 52,
    districtCode: 'RJ-06',
    collectorateZone: 'Mewar Industrial Textile Belt',
    opportunities: [
      { role: 'Textile Inventory & Weft Cataloguer', candidates: 165, demand: 120, cluster: 'Bhilwara Synthetic Textile Industrial Cluster' },
      { role: 'Commercial Invoicing Assistant', candidates: 112, demand: 75, cluster: 'Mewar Chamber of Commerce & Industry' },
      { role: 'Remote Tele-Support Coordinator', candidates: 140, demand: 85, cluster: 'Bhilwara BPO Services' },
      { role: 'District Treasury Data Assistant', candidates: 90, demand: 60, cluster: 'Bhilwara District Treasury Office' },
      { role: 'Retail Billing & POS Clerk', candidates: 85, demand: 50, cluster: 'Pur Road Retail Aggregators' },
    ],
    skills: [
      { name: 'Inventory ERP Data Entry', count: 320 },
      { name: 'Basic Digital / RSCIT', count: 410 },
      { name: 'Customer Support (Hindi)', count: 260 },
      { name: 'Tally Accounts Entry', count: 190 },
      { name: 'Screen Reader Assistive', count: 120 },
      { name: 'Quality Checklist Audit', count: 150 },
    ],
    trend: [
      { month: 'Oct 25', registered: 720, placed: 180 },
      { month: 'Nov 25', registered: 860, placed: 230 },
      { month: 'Dec 25', registered: 1040, placed: 290 },
      { month: 'Jan 26', registered: 1210, placed: 360 },
      { month: 'Feb 26', registered: 1400, placed: 430 },
      { month: 'Mar 26', registered: 1620, placed: 520 },
    ],
    disability: [
      { name: 'Locomotor Disability (40%+)', value: 44, color: '#0056B3' },
      { name: 'Visual Impairment / Low Vision', value: 20, color: '#0E7490' },
      { name: 'Hearing & Speech Impairment', value: 21, color: '#6D28D9' },
      { name: 'Intellectual & Autism Spectrum', value: 10, color: '#B45309' },
      { name: 'Multiple Disabilities', value: 5, color: '#6B7280' },
    ],
    quota: [
      { cat: 'Category A: Blindness & Low Vision', filled: 0.82, req: 1.0, dept: 'Rajasthan State Mines & Minerals' },
      { cat: 'Category B: Deaf & Hard of Hearing', filled: 0.45, req: 1.0, dept: 'Urban Improvement Trust (UIT) Bhilwara' },
      { cat: 'Category C: Locomotor & Cerebral Palsy', filled: 1.62, req: 1.0, dept: 'District Industries Centre (DIC)' },
      { cat: 'Category D & E: Autism, Intellectual, Multiple', filled: 0.28, req: 1.0, dept: 'Education Dept (Samagra Shiksha)' },
    ],
    action: 'Fast-track 120 textile cataloguing placements in RIICO Phase III industrial area; ground-floor logistics workspaces already certified accessible.',
  },
  Nagaur: {
    total: 28400, registered: 9800, placed: 2420, quotaFill: 57,
    districtCode: 'RJ-21',
    collectorateZone: 'Central Marwar Agricultural Division',
    opportunities: [
      { role: 'Mandi E-NAM Digital Auction Clerk', candidates: 130, demand: 90, cluster: 'Krishi Upaj Mandi Samiti (Nagaur & Merta)' },
      { role: 'Panchayat Samiti Digitisation Executive', candidates: 190, demand: 140, cluster: 'Nagaur Zila Parishad E-Governance Desk' },
      { role: 'Makrana Marble Inventory Logger', candidates: 85, demand: 55, cluster: 'Makrana Marble Industrial Association' },
      { role: 'Rural Tele-Consultation Assistant', candidates: 110, demand: 70, cluster: 'Tele-Health CSC Kiosk Network' },
      { role: 'Cooperative Banking Assistant', candidates: 75, demand: 42, cluster: 'Nagaur Central Cooperative Bank' },
    ],
    skills: [
      { name: 'E-NAM Portal & Trade Entry', count: 210 },
      { name: 'Hindi Typing (Kruti Dev / Mangal)', count: 340 },
      { name: 'RSCIT Computer Diploma', count: 380 },
      { name: 'Remote Assistance Tools', count: 180 },
      { name: 'Screen Reader Navigation', count: 140 },
      { name: 'Inventory Weighbridge Entry', count: 160 },
    ],
    trend: [
      { month: 'Oct 25', registered: 580, placed: 140 },
      { month: 'Nov 25', registered: 710, placed: 190 },
      { month: 'Dec 25', registered: 880, placed: 240 },
      { month: 'Jan 26', registered: 1050, placed: 310 },
      { month: 'Feb 26', registered: 1220, placed: 390 },
      { month: 'Mar 26', registered: 1440, placed: 480 },
    ],
    disability: [
      { name: 'Locomotor Disability (40%+)', value: 37, color: '#0056B3' },
      { name: 'Visual Impairment / Low Vision', value: 25, color: '#0E7490' },
      { name: 'Hearing & Speech Impairment', value: 19, color: '#6D28D9' },
      { name: 'Intellectual & Autism Spectrum', value: 13, color: '#B45309' },
      { name: 'Multiple Disabilities', value: 6, color: '#6B7280' },
    ],
    quota: [
      { cat: 'Category A: Blindness & Low Vision', filled: 1.18, req: 1.0, dept: 'Revenue Dept (Tehsil Land Records)' },
      { cat: 'Category B: Deaf & Hard of Hearing', filled: 0.62, req: 1.0, dept: 'Agriculture Marketing Board' },
      { cat: 'Category C: Locomotor & Cerebral Palsy', filled: 1.48, req: 1.0, dept: 'PWD Quality Control Division' },
      { cat: 'Category D & E: Autism, Intellectual, Multiple', filled: 0.32, req: 1.0, dept: 'Child Development Services (ICDS)' },
    ],
    action: 'Activate Krishi Upaj Mandi e-NAM integration: 130 trained data entry operators ready to clear seasonal grain intake digitisation backlog.',
  },
  Tonk: {
    total: 21800, registered: 7600, placed: 1850, quotaFill: 48,
    districtCode: 'RJ-26',
    collectorateZone: 'Banas River Handloom & Agrarian Belt',
    opportunities: [
      { role: 'Handloom & Namda Craft Cataloguer', candidates: 98, demand: 65, cluster: 'Tonk District Artisan & Weaver Hub' },
      { role: 'Panchayat Land Record Digitiser', candidates: 145, demand: 110, cluster: 'Tonk District Collectorate Land Registry' },
      { role: 'Remote Tele-Caller (Health & Ag)', candidates: 115, demand: 75, cluster: 'Rural BPO Facility Niwai' },
      { role: 'Banas Dairy Data Logger', candidates: 70, demand: 45, cluster: 'Tonk Zila Dugdh Utpadak Sahakari Sangh' },
      { role: 'Primary School Inclusive Aide', candidates: 60, demand: 35, cluster: 'District Education Office (Elementary)' },
    ],
    skills: [
      { name: 'Data Entry (Hindi/English)', count: 280 },
      { name: 'Mobile Handloom ERP Logging', count: 160 },
      { name: 'Customer Communication', count: 210 },
      { name: 'RSCIT Certification', count: 310 },
      { name: 'Screen Reader Accessible Tech', count: 95 },
      { name: 'Stock Reconciliation', count: 120 },
    ],
    trend: [
      { month: 'Oct 25', registered: 440, placed: 110 },
      { month: 'Nov 25', registered: 560, placed: 150 },
      { month: 'Dec 25', registered: 690, placed: 190 },
      { month: 'Jan 26', registered: 840, placed: 240 },
      { month: 'Feb 26', registered: 990, placed: 310 },
      { month: 'Mar 26', registered: 1180, placed: 390 },
    ],
    disability: [
      { name: 'Locomotor Disability (40%+)', value: 39, color: '#0056B3' },
      { name: 'Visual Impairment / Low Vision', value: 23, color: '#0E7490' },
      { name: 'Hearing & Speech Impairment', value: 20, color: '#6D28D9' },
      { name: 'Intellectual & Autism Spectrum', value: 12, color: '#B45309' },
      { name: 'Multiple Disabilities', value: 6, color: '#6B7280' },
    ],
    quota: [
      { cat: 'Category A: Blindness & Low Vision', filled: 0.68, req: 1.0, dept: 'Tonk Co-operative Bank' },
      { cat: 'Category B: Deaf & Hard of Hearing', filled: 0.42, req: 1.0, dept: 'Irrigation & Canal Division' },
      { cat: 'Category C: Locomotor & Cerebral Palsy', filled: 1.35, req: 1.0, dept: 'Zila Parishad Rural Works' },
      { cat: 'Category D & E: Autism, Intellectual, Multiple', filled: 0.18, req: 1.0, dept: 'Social Welfare Advisory Board' },
    ],
    action: 'Tonk artisan cluster offers immediate 65 opening quotas for remote/hybrid cataloguers; eligible for 70% DIC accommodation grants.',
  },
  Didwana: {
    total: 16900, registered: 5820, placed: 1420, quotaFill: 51,
    districtCode: 'RJ-37',
    collectorateZone: 'Nagaur-Didwana Salt & Minerals Corridor',
    opportunities: [
      { role: 'Salt Chemical Production Logger', candidates: 74, demand: 50, cluster: 'Didwana Salt Lake Industrial Area' },
      { role: 'Gram Panchayat Digital Record Keeper', candidates: 120, demand: 85, cluster: 'Didwana-Kuchaman Zila Parishad' },
      { role: 'Remote Citizen Helpdesk Assistant', candidates: 95, demand: 60, cluster: 'E-Governance CSC Network' },
      { role: 'Kuchaman City Commerce Clerk', candidates: 65, demand: 40, cluster: 'Kuchaman Trade & Wholesale Market' },
      { role: 'Primary Health Centre Data Entry', candidates: 50, demand: 30, cluster: 'Block Chief Medical Office' },
    ],
    skills: [
      { name: 'Basic Digital / RSCIT', count: 240 },
      { name: 'Industrial Weighment Data Entry', count: 140 },
      { name: 'Hindi Typing & Office Tools', count: 210 },
      { name: 'Customer Helpdesk Skills', count: 160 },
      { name: 'Screen Reader Accessible Tools', count: 75 },
      { name: 'Document Scanning & Archival', count: 110 },
    ],
    trend: [
      { month: 'Oct 25', registered: 320, placed: 80 },
      { month: 'Nov 25', registered: 410, placed: 110 },
      { month: 'Dec 25', registered: 520, placed: 145 },
      { month: 'Jan 26', registered: 650, placed: 190 },
      { month: 'Feb 26', registered: 780, placed: 240 },
      { month: 'Mar 26', registered: 940, placed: 310 },
    ],
    disability: [
      { name: 'Locomotor Disability (40%+)', value: 36, color: '#0056B3' },
      { name: 'Visual Impairment / Low Vision', value: 26, color: '#0E7490' },
      { name: 'Hearing & Speech Impairment', value: 19, color: '#6D28D9' },
      { name: 'Intellectual & Autism Spectrum', value: 13, color: '#B45309' },
      { name: 'Multiple Disabilities', value: 6, color: '#6B7280' },
    ],
    quota: [
      { cat: 'Category A: Blindness & Low Vision', filled: 0.94, req: 1.0, dept: 'Treasury & Accounts Sub-Office' },
      { cat: 'Category B: Deaf & Hard of Hearing', filled: 0.54, req: 1.0, dept: 'Salt Commissionate Field Office' },
      { cat: 'Category C: Locomotor & Cerebral Palsy', filled: 1.28, req: 1.0, dept: 'Panchayat Samiti Kuchaman' },
      { cat: 'Category D & E: Autism, Intellectual, Multiple', filled: 0.22, req: 1.0, dept: 'District Special Education Wing' },
    ],
    action: 'Newly established Didwana district can achieve full 4% compliance rapidly by staffing 85 open Gram Panchayat e-Mitra Plus operator seats.',
  },
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #D1DAE8', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,.08)' }}>
      {label && <div style={{ color: '#2D2D2D', marginBottom: 6, fontWeight: 700 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || '#2D2D2D', marginBottom: 3 }}>
          {p.name}: <strong style={{ color: '#2D2D2D' }}>{p.value.toLocaleString('en-IN')}</strong>
        </div>
      ))}
    </div>
  )
}

export default function GovernmentDashboard() {
  const [district, setDistrict] = useState('Ajmer')
  const d = districtData[district]
  const empRate = ((d.placed / d.registered) * 100).toFixed(1)
  const regRate = ((d.registered / d.total) * 100).toFixed(1)

  const handleExport = () => {
    alert(`Official District PwD Employment Dossier (${district}, Code: ${d.districtCode}) downloaded. Includes RPWD Act Section 34 compliance annexure & statutory employer audit.`)
  }

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* Header with official statutory identifiers */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="section-label">State Disability Employment Monitoring</span>
              <span className="badge badge-blue">{d.districtCode} · {d.collectorateZone}</span>
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
              District PwD Employment Dashboard — {district}
            </h1>
            <p style={{ fontSize: 14.5, color: '#4B5563', maxWidth: 640, lineHeight: 1.7 }}>
              Live statutory compliance portal under the <strong>RPWD Act 2016 (Section 34)</strong>. Tracks Census 2011 benchmarks, UDID registrations, 90+ day sustained placements, and private MSME inclusion quotas.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', background: '#FFFFFF', padding: '4px', borderRadius: 8, border: '1px solid #D1DAE8' }}>
              {districts.map(dt => (
                <button key={dt} onClick={() => setDistrict(dt)} className={`tab ${district === dt ? 'tab-active' : ''}`}>
                  {dt}
                </button>
              ))}
            </div>
            <button onClick={handleExport} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: '1px solid #D1DAE8', background: '#FFFFFF', color: '#0056B3',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'all 0.15s'
            }}>
              <Download size={14} /> Download District Gazette Dossier (PDF)
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Total PwD Population', val: d.total.toLocaleString('en-IN'), sub: 'Census 2011 Benchmark Base', icon: Users, color: '#0056B3' },
            { label: 'UDID Registered Pool', val: `${d.registered.toLocaleString('en-IN')}`, sub: `${regRate}% coverage of district base`, icon: CheckCircle, color: '#15803D' },
            { label: 'Sustained Placements', val: `${d.placed.toLocaleString('en-IN')}`, sub: `${empRate}% retention beyond 90 days`, icon: TrendingUp, color: '#0E7490' },
            { label: 'Overall 4% Quota Fill', val: `${d.quotaFill}%`, sub: 'Central & State PSUs combined', icon: Target, color: d.quotaFill >= 60 ? '#15803D' : '#B45309' },
          ].map((kpi, i) => (
            <div key={i} className="card p-6">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 11.5, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>{kpi.label}</span>
                <kpi.icon size={18} color={kpi.color} />
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>{kpi.val}</div>
              <div style={{ fontSize: 12, color: '#4B5563' }}>{kpi.sub}</div>
              {kpi.label === 'Overall 4% Quota Fill' && (
                <div style={{ marginTop: 8, fontSize: 11.5, color: d.quotaFill >= 60 ? '#15803D' : '#B45309', fontWeight: 700 }}>
                  {d.quotaFill >= 60 ? '✓ On track for 2026 mandate' : '⚠ Compliance backlog notices issued'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Opportunity map + pie */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 24 }}>
          {/* Opportunity map */}
          <div className="card p-7">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D' }}>District Industry Demand vs Certified Candidate Supply</div>
                <span style={{ fontSize: 12, color: '#6B7280' }}>Verified Hyperlocal Micro-Clusters</span>
              </div>
              <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginTop: 4 }}>
                Real-time matching of candidates holding verified functional profiler credentials against active employer vacancies.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {d.opportunities.map((opp, i) => (
                <div key={i} style={{ padding: '14px 16px', background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>{opp.role}</div>
                      <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 2 }}>Industry Partner: {opp.cluster}</div>
                    </div>
                    <span className="badge badge-blue">
                      {opp.demand} Active Openings
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 4, fontWeight: 600 }}>Ready Candidate Supply</div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${Math.min(100, (opp.candidates / 280) * 100)}%`, background: '#0056B3' }} />
                      </div>
                      <div style={{ fontSize: 12, color: '#0056B3', marginTop: 4, fontWeight: 700 }}>{opp.candidates} verified PwDs</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 4, fontWeight: 600 }}>Employer Hiring Target</div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${Math.min(100, (opp.demand / 280) * 100)}%`, background: '#15803D' }} />
                      </div>
                      <div style={{ fontSize: 12, color: '#15803D', marginTop: 4, fontWeight: 700 }}>{opp.demand} reserved slots</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#E8F0FA', border: '1px solid #BFDBFE', borderRadius: 8, fontSize: 13, color: '#0056B3', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Zap size={18} color="#0056B3" style={{ flexShrink: 0 }} />
              <span><strong>Collectorate Directive:</strong> {d.action}</span>
            </div>
          </div>

          {/* Disability breakdown */}
          <div className="card p-6">
            <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 16 }}>Disability Registry Breakdown (Census Aligned)</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={d.disability} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                  {d.disability.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {d.disability.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: '#4B5563' }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          {/* Skills */}
          <div className="card p-6">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D' }}>Certified Skills Inventory (RSLDC / DEPwD)</div>
              <span className="badge badge-gray">Active Profiles</span>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={d.skills} layout="vertical" margin={{ left: 15, right: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis type="number" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#6B7280" tick={{ fill: '#4B5563', fontSize: 11 }} width={140} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#0056B3" radius={[0, 4, 4, 0]} name="Certified PwDs" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trend */}
          <div className="card p-6">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D' }}>Monthly Registration vs Retention (Over 90 Days)</div>
              <span className="badge badge-green">Last 6 Months</span>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={d.trend} margin={{ top: 5, right: 15, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: '#4B5563' }} />
                <Line type="monotone" dataKey="registered" stroke="#0056B3" strokeWidth={2.5} dot={{ r: 4, fill: '#0056B3' }} name="New Registrations" />
                <Line type="monotone" dataKey="placed" stroke="#15803D" strokeWidth={2.5} dot={{ r: 4, fill: '#15803D' }} name="Sustained Placed (>90d)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quota compliance tracker */}
        <div className="card p-7">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShieldCheck size={20} color="#0056B3" />
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D' }}>
                RPWD Act 2016 — Section 34 Statutory 4% Quota Audit Table
              </div>
            </div>
            <span className="badge badge-blue">Mandatory 1% Equal Reservation Per Benchmark Category</span>
          </div>
          <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginBottom: 20 }}>
            Official audit tracking Group A, B, C & D vacancies across district government establishments and notified public undertakings. Source: Chief Commissioner for Persons with Disabilities (CCPD) Statutory Framework.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {d.quota.map((q, i) => {
              const pct = Math.min(100, (q.filled / q.req) * 100)
              const ok = q.filled >= q.req
              return (
                <div key={i} className="card p-5" style={{ border: `1.5px solid ${ok ? '#A7F3D0' : '#FECACA'}`, background: ok ? '#FFFFFF' : '#FEF2F2' }}>
                  <div style={{ fontSize: 12, color: '#2D2D2D', marginBottom: 6, lineHeight: 1.4, fontWeight: 700 }}>{q.cat}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 8 }}>Audited: {q.dept}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: ok ? '#15803D' : '#B91C1C', marginBottom: 8 }}>
                    {q.filled}% <span style={{ fontSize: 13, fontWeight: 500, color: '#6B7280' }}>/ 1.0%</span>
                  </div>
                  <div className="progress-track" style={{ marginBottom: 8, background: '#E5E7EB' }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, background: ok ? '#15803D' : '#B91C1C' }} />
                  </div>
                  <div style={{ fontSize: 11.5, color: ok ? '#15803D' : '#B91C1C', fontWeight: 700 }}>
                    {ok ? '✓ Compliant with 1% Mandate' : `✗ Deficit: ${(1.0 - q.filled).toFixed(2)}% below threshold`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
