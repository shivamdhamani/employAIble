import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'
import { AlertTriangle, CheckCircle, TrendingUp, Users, Target, Zap } from 'lucide-react'

const districts = ['Ajmer', 'Bhilwara', 'Nagaur', 'Tonk', 'Didwana']

const districtData = {
  Ajmer: {
    total: 847, registered: 312, placed: 89, quotaFill: 58,
    opportunities: [
      { role: 'Digital bookkeeping', candidates: 31, demand: 18 },
      { role: 'Remote customer support', candidates: 42, demand: 25 },
      { role: 'E-commerce cataloguing', candidates: 37, demand: 19 },
      { role: 'Govt. data digitisation', candidates: 58, demand: 41 },
      { role: 'Basic IT support', candidates: 24, demand: 12 },
    ],
    skills: [
      { name: 'Basic digital', count: 80 },
      { name: 'Customer support', count: 45 },
      { name: 'Bookkeeping', count: 30 },
      { name: 'Remote-capable', count: 65 },
      { name: 'Screen reader', count: 40 },
      { name: 'Data entry', count: 55 },
    ],
    trend: [
      { month: 'Mar', registered: 198, placed: 45 },
      { month: 'Apr', registered: 234, placed: 58 },
      { month: 'May', registered: 267, placed: 62 },
      { month: 'Jun', registered: 289, placed: 71 },
      { month: 'Jul', registered: 301, placed: 79 },
      { month: 'Aug', registered: 312, placed: 89 },
    ],
    disability: [
      { name: 'Locomotor', value: 38, color: '#0056B3' },
      { name: 'Visual', value: 22, color: '#0E7490' },
      { name: 'Hearing', value: 19, color: '#6D28D9' },
      { name: 'Intellectual', value: 13, color: '#B45309' },
      { name: 'Other', value: 8, color: '#6B7280' },
    ],
    quota: [
      { cat: 'Blindness / Low vision', filled: 1.1, req: 1 },
      { cat: 'Deaf / Hard of hearing', filled: 0.7, req: 1 },
      { cat: 'Locomotor disability', filled: 1.93, req: 1 },
      { cat: 'Autism / Intellectual', filled: 0.27, req: 1 },
    ]
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #D1DAE8', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,.08)' }}>
      {label && <div style={{ color: '#2D2D2D', marginBottom: 6, fontWeight: 700 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || '#2D2D2D', marginBottom: 3 }}>
          {p.name}: <strong style={{ color: '#2D2D2D' }}>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function GovernmentDashboard() {
  const [district, setDistrict] = useState('Ajmer')
  const d = districtData[district] || districtData.Ajmer
  const empRate = Math.round((d.placed / d.total) * 100)
  const regRate = Math.round((d.registered / d.total) * 100)

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 8 }}>District Dashboard</div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
              District employment overview — {district}
            </h1>
            <p style={{ fontSize: 15, color: '#4B5563', maxWidth: 520, lineHeight: 1.7 }}>
              Registered candidates, skill inventory, placement rates, and quota compliance under the RPWD Act.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', background: '#FFFFFF', padding: '4px', borderRadius: 8, border: '1px solid #D1DAE8' }}>
            {districts.map(dt => (
              <button key={dt} onClick={() => setDistrict(dt)} className={`tab ${district === dt ? 'tab-active' : ''}`}>
                {dt}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Total PwD Population', val: d.total.toLocaleString('en-IN'), sub: 'Census benchmark', icon: Users, color: '#0056B3' },
            { label: 'Registered Profiles', val: `${regRate}%`, sub: `${d.registered} on platform`, icon: CheckCircle, color: '#15803D' },
            { label: 'Sustained Placed', val: `${empRate}%`, sub: `${d.placed} currently employed`, icon: TrendingUp, color: '#0E7490' },
            { label: 'Quota Compliance', val: `${d.quotaFill}%`, sub: '4% RPWD benchmark', icon: Target, color: d.quotaFill >= 80 ? '#15803D' : '#B45309' },
          ].map((kpi, i) => (
            <div key={i} className="card p-6">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>{kpi.label}</span>
                <kpi.icon size={18} color={kpi.color} />
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>{kpi.val}</div>
              <div style={{ fontSize: 12.5, color: '#4B5563' }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Opportunity map + pie */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 24 }}>
          {/* Opportunity map */}
          <div className="card p-7">
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 4 }}>Local employment opportunities</div>
              <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                Synthesized from registered candidate functional capabilities against local business demand.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {d.opportunities.map((opp, i) => (
                <div key={i} style={{ padding: '14px 16px', background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>{opp.role}</div>
                    <span className="badge badge-blue">
                      {opp.demand} vacancies
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 4, fontWeight: 600 }}>Candidates ready</div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${(opp.candidates / 65) * 100}%`, background: '#0056B3' }} />
                      </div>
                      <div style={{ fontSize: 12, color: '#0056B3', marginTop: 4, fontWeight: 700 }}>{opp.candidates} matched</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 4, fontWeight: 600 }}>Employer demand</div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${(opp.demand / 65) * 100}%`, background: '#15803D' }} />
                      </div>
                      <div style={{ fontSize: 12, color: '#15803D', marginTop: 4, fontWeight: 700 }}>{opp.demand} target openings</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#E8F0FA', border: '1px solid #BFDBFE', borderRadius: 8, fontSize: 13, color: '#0056B3', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Zap size={16} color="#0056B3" style={{ flexShrink: 0 }} />
              <span><strong>Action recommendation:</strong> Mobilize 18 local commerce establishments for digital bookkeeping — highest feasibility ratio.</span>
            </div>
          </div>

          {/* Disability breakdown */}
          <div className="card p-6">
            <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 16 }}>Disability category breakdown</div>
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
                    <span style={{ fontSize: 13, color: '#4B5563' }}>{item.name}</span>
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
            <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 16 }}>Candidate skill pool</div>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={d.skills} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis type="number" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#6B7280" tick={{ fill: '#4B5563', fontSize: 12 }} width={110} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#0056B3" radius={[0, 4, 4, 0]} name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trend */}
          <div className="card p-6">
            <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 16 }}>Monthly registration & placement trend</div>
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={d.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: '#4B5563' }} />
                <Line type="monotone" dataKey="registered" stroke="#0056B3" strokeWidth={2.5} dot={{ r: 4, fill: '#0056B3' }} name="Registered" />
                <Line type="monotone" dataKey="placed" stroke="#15803D" strokeWidth={2.5} dot={{ r: 4, fill: '#15803D' }} name="Placed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quota compliance tracker */}
        <div className="card p-7">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <AlertTriangle size={18} color="#B45309" />
            <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D' }}>RPWD Act 2016 — Section 34 Quota Compliance Tracker</div>
          </div>
          <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginBottom: 20, maxWidth: 680 }}>
            Mandates 4% reservation split across benchmark categories (1% per category). CCPD 2023–24 records show under 60% compliance in central PSU Group A vacancies.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {d.quota.map((q, i) => {
              const pct = Math.min(100, (q.filled / q.req) * 100)
              const ok = q.filled >= q.req
              return (
                <div key={i} className="card p-5" style={{ border: `1.5px solid ${ok ? '#A7F3D0' : '#FECACA'}`, background: ok ? '#FFFFFF' : '#FEF2F2' }}>
                  <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 8, lineHeight: 1.4, fontWeight: 600 }}>{q.cat}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: ok ? '#15803D' : '#B91C1C', marginBottom: 8 }}>{q.filled}%</div>
                  <div className="progress-track" style={{ marginBottom: 8, background: '#E5E7EB' }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, background: ok ? '#15803D' : '#B91C1C' }} />
                  </div>
                  <div style={{ fontSize: 11.5, color: ok ? '#15803D' : '#B91C1C', fontWeight: 700 }}>
                    {ok ? '✓ Meets 1% statutory quota' : '✗ Below 1% statutory mandate'}
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
