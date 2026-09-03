import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import {
  MapPin, TrendingUp, Users, Building2, AlertTriangle, CheckCircle,
  ChevronRight, BarChart3, Target, Brain, IndianRupee, Zap
} from 'lucide-react'

const districts = ['Ajmer', 'Bhilwara', 'Nagaur', 'Tonk', 'Didwana']

const demandMapData = {
  Ajmer: {
    totalPwDs: 847,
    registered: 312,
    employed: 89,
    opportunities: [
      { role: 'Digital Bookkeeping', candidates: 31, demand: 18, gap: -13 },
      { role: 'Remote Customer Support', candidates: 42, demand: 25, gap: -17 },
      { role: 'E-commerce Cataloguing', candidates: 37, demand: 19, gap: -18 },
      { role: 'Govt Data Digitisation', candidates: 58, demand: 41, gap: -17 },
      { role: 'Basic IT Support', candidates: 24, demand: 12, gap: -12 },
    ],
    skills: [
      { skill: 'Basic Digital', count: 80 },
      { skill: 'Customer Support', count: 45 },
      { skill: 'Bookkeeping', count: 30 },
      { skill: 'Remote Work Ready', count: 65 },
      { skill: 'Screen Reader Users', count: 40 },
      { skill: 'Data Entry', count: 55 },
    ],
    quotaStatus: { filled: 58, required: 100 },
    disabilityBreakdown: [
      { name: 'Locomotor', value: 38, color: '#3b82f6' },
      { name: 'Visual', value: 22, color: '#8b5cf6' },
      { name: 'Hearing', value: 19, color: '#10b981' },
      { name: 'Intellectual', value: 13, color: '#f59e0b' },
      { name: 'Others', value: 8, color: '#ef4444' },
    ],
    monthlyTrend: [
      { month: 'Mar', registered: 198, placed: 45 },
      { month: 'Apr', registered: 234, placed: 58 },
      { month: 'May', registered: 267, placed: 62 },
      { month: 'Jun', registered: 289, placed: 71 },
      { month: 'Jul', registered: 301, placed: 79 },
      { month: 'Aug', registered: 312, placed: 89 },
    ],
  },
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-white/20 rounded-xl p-3 text-sm">
        <p className="text-white font-semibold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function GovernmentDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('Ajmer')
  const data = demandMapData[selectedDistrict] || demandMapData['Ajmer']

  const employmentRate = Math.round((data.employed / data.totalPwDs) * 100)
  const registrationRate = Math.round((data.registered / data.totalPwDs) * 100)
  const quotaFill = data.quotaStatus.filled

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">Government Dashboard</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            District <span className="gradient-text">Disability Employment</span> Map
          </h1>
          <p className="text-slate-400 max-w-2xl">
            District-level view of the PwD workforce — registered candidates, skill inventory, placement gaps, and quota compliance. Updated as new data flows in.
          </p>
        </div>

        {/* District selector */}
        <div className="flex flex-wrap gap-2">
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selectedDistrict === d
                  ? 'bg-orange-600/20 border-orange-500/50 text-orange-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total PwDs', value: data.totalPwDs.toLocaleString('en-IN'), sub: 'in district', icon: Users, color: 'blue' },
          { label: 'Registered', value: `${registrationRate}%`, sub: `${data.registered} on platform`, icon: CheckCircle, color: 'emerald' },
          { label: 'Employment Rate', value: `${employmentRate}%`, sub: `${data.employed} placed`, icon: TrendingUp, color: 'purple' },
          { label: 'Quota Fulfillment', value: `${quotaFill}%`, sub: 'Govt 4% mandate', icon: Target, color: quotaFill >= 80 ? 'emerald' : 'orange' },
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
              kpi.color === 'blue' ? 'bg-blue-500/20' :
              kpi.color === 'emerald' ? 'bg-emerald-500/20' :
              kpi.color === 'purple' ? 'bg-purple-500/20' :
              'bg-orange-500/20'
            }`}>
              <kpi.icon className={`w-5 h-5 ${
                kpi.color === 'blue' ? 'text-blue-400' :
                kpi.color === 'emerald' ? 'text-emerald-400' :
                kpi.color === 'purple' ? 'text-purple-400' :
                'text-orange-400'
              }`} />
            </div>
            <div className="text-3xl font-black text-white">{kpi.value}</div>
            <div className="text-white text-sm font-semibold mt-0.5">{kpi.label}</div>
            <div className="text-slate-500 text-xs mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Opportunity map — the KEY feature */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-white text-xl flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" /> Local Employment Opportunity Map
            </h2>
            <span className="text-xs text-slate-500">District: {selectedDistrict}</span>
          </div>
          <p className="text-slate-400 text-sm mb-5">
            Based on candidate skill data and local economic activity, our system surfaces potential inclusive job roles that <em>could</em> work in this district. Instead of "No jobs found" — here's what's realistically possible.
          </p>
          <div className="space-y-3">
            {data.opportunities.map((opp, i) => (
              <div key={i} className="bg-slate-800/60 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="font-semibold text-white">{opp.role}</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      {opp.candidates} candidates ready · {opp.demand} employer spots identified
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    Math.abs(opp.gap) <= 5 ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    Gap: {Math.abs(opp.gap)} positions
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Candidates Available</div>
                    <div className="score-bar">
                      <div className="score-fill bg-blue-500" style={{ width: `${(opp.candidates / 65) * 100}%` }} />
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-semibold">{opp.candidates} people</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Employer Demand</div>
                    <div className="score-bar">
                      <div className="score-fill bg-emerald-500" style={{ width: `${(opp.demand / 65) * 100}%` }} />
                    </div>
                    <div className="text-xs text-emerald-400 mt-1 font-semibold">{opp.demand} positions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <Zap className="w-4 h-4" />
              <span className="font-semibold">Action Recommended:</span>
              <span className="text-slate-400">Engage 18 local businesses for digital bookkeeping roles — highest ROI intervention.</span>
            </div>
          </div>
        </div>

        {/* Disability breakdown pie */}
        <div className="glass-card p-6">
          <h2 className="font-bold text-white text-lg mb-4">Disability Category Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data.disabilityBreakdown}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {data.disabilityBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {data.disabilityBreakdown.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-300">{d.name}</span>
                </div>
                <span className="text-white font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Skills bar chart */}
        <div className="glass-card p-6">
          <h2 className="font-bold text-white text-lg mb-4">Candidate Skill Inventory — {selectedDistrict}</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.skills} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis dataKey="skill" type="category" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} width={110} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly trend */}
        <div className="glass-card p-6">
          <h2 className="font-bold text-white text-lg mb-4">Registration & Placement Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
              <Line type="monotone" dataKey="registered" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Registered" />
              <Line type="monotone" dataKey="placed" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="Placed" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quota tracker */}
      <div className="glass-card p-6">
        <h2 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" /> Government Quota Compliance Tracker
        </h2>
        <p className="text-slate-400 text-sm mb-5">
          RPWD Act 2016 mandates 4% reservation across Blindness/Low Vision, Deaf/Hard of Hearing, Locomotor Disability, and Autism/Intellectual categories. Fewer than 60% of Group A central PSU vacancies were filled as of CCPD Annual Report 2023–24.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { category: 'Blindness / Low Vision', filled: 1.1, required: 1, color: 'blue' },
            { category: 'Deaf / Hard of Hearing', filled: 0.7, required: 1, color: 'purple' },
            { category: 'Locomotor Disability', filled: 1.93, required: 1, color: 'emerald' },
            { category: 'Autism / Intellectual', filled: 0.27, required: 1, color: 'orange' },
          ].map((q, i) => {
            const pct = Math.min(100, (q.filled / q.required) * 100)
            const isOk = q.filled >= q.required
            return (
              <div key={i} className={`glass-card p-4 border ${isOk ? 'border-emerald-500/20' : 'border-orange-500/20'}`}>
                <div className="text-sm font-semibold text-white mb-1">{q.category}</div>
                <div className={`text-2xl font-black mb-2 ${isOk ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {q.filled}%
                </div>
                <div className="score-bar mb-2">
                  <div className={`score-fill ${isOk ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {isOk ? (
                    <><CheckCircle className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Above mandate</span></>
                  ) : (
                    <><AlertTriangle className="w-3 h-3 text-orange-400" /><span className="text-orange-400">Below 1% mandate</span></>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
