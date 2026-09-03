import { useState } from 'react'
import {
  Building2, Wand2, CheckCircle, IndianRupee, ChevronRight,
  Accessibility, Eye, Ear, Brain, Hand, Lightbulb, AlertCircle,
  TrendingUp, Shield, Users, Star
} from 'lucide-react'

const jobRoles = [
  'Accountant / Bookkeeper',
  'Customer Support Executive',
  'Data Entry Operator',
  'Sales Representative',
  'Office Admin / Receptionist',
  'Delivery / Field Agent',
  'Store Manager',
  'Software Developer',
  'Content Writer',
  'Teacher / Trainer',
]

const inclusionSuggestions = {
  'Accountant / Bookkeeper': {
    forVisual: [
      { action: 'Install NVDA screen reader on accounting computer', cost: 0, effort: 'Low', impact: 'High' },
      { action: 'Ensure Tally/ERP software supports keyboard navigation', cost: 0, effort: 'Low', impact: 'High' },
      { action: 'Provide audio format for financial reports', cost: 1500, effort: 'Low', impact: 'Medium' },
      { action: 'Designate a buddy for physical document handling', cost: 0, effort: 'Low', impact: 'Medium' },
    ],
    forLocomotive: [
      { action: 'Provide ground-floor or lift-accessible workstation', cost: 0, effort: 'Medium', impact: 'High' },
      { action: 'Adjust desk height for wheelchair user', cost: 3000, effort: 'Low', impact: 'High' },
      { action: 'Allow partial work-from-home for days with mobility challenges', cost: 0, effort: 'Low', impact: 'High' },
      { action: 'Ensure accessible restroom within 50m of workstation', cost: 8000, effort: 'High', impact: 'High' },
    ],
    totalCostRange: '₹3,000 – ₹15,000/year',
    subsidyEligible: true,
    subsidyAmount: '₹8,000 (MSME Accessible India Scheme)',
  },
  'Customer Support Executive': {
    forVisual: [
      { action: 'Enable screen-reader compatible CRM (Freshdesk / Zoho)', cost: 0, effort: 'Low', impact: 'High' },
      { action: 'Provide headset with voice confirmation system', cost: 2500, effort: 'Low', impact: 'High' },
      { action: 'Set up keyboard shortcuts for call handling software', cost: 0, effort: 'Low', impact: 'High' },
      { action: 'Allow remote work to remove commute barrier', cost: 0, effort: 'Low', impact: 'High' },
    ],
    forLocomotive: [
      { action: 'Enable full remote work setup with laptop + headset', cost: 15000, effort: 'Medium', impact: 'High' },
      { action: 'Flexible shift timing to accommodate medical schedules', cost: 0, effort: 'Low', impact: 'High' },
    ],
    totalCostRange: '₹0 – ₹20,000/year',
    subsidyEligible: true,
    subsidyAmount: '₹10,000 (DIC Inclusive Employment Grant)',
  },
}

const incentives = [
  { name: 'MSME Accessible India Scheme', amount: '₹8,000 – ₹25,000', type: 'Subsidy', eligibility: 'All registered MSMEs' },
  { name: 'PF Contribution Exemption (RPWD Act)', amount: '3 years employer PF contribution', type: 'Tax Benefit', eligibility: 'For all PwD hires' },
  { name: 'DIC Inclusive Employment Grant', amount: '₹5,000 – ₹15,000', type: 'Grant', eligibility: 'Tier 2/3 city MSMEs' },
  { name: 'CSR Accommodation Cost Pooling', amount: 'Up to 70% cost sharing', type: 'Cost Share', eligibility: 'Through EmployAIable platform' },
]

export default function EmployerPortal() {
  const [step, setStep] = useState(0)
  const [selectedRole, setSelectedRole] = useState('Accountant / Bookkeeper')
  const [selectedDisability, setSelectedDisability] = useState('forVisual')
  const [wizardDone, setWizardDone] = useState(false)

  const suggestions = inclusionSuggestions[selectedRole] || inclusionSuggestions['Accountant / Bookkeeper']
  const currentSuggestions = suggestions[selectedDisability] || suggestions.forVisual

  const effortColor = { Low: 'text-emerald-400 bg-emerald-500/10', Medium: 'text-yellow-400 bg-yellow-500/10', High: 'text-orange-400 bg-orange-500/10' }
  const impactColor = { High: 'text-blue-400 bg-blue-500/10', Medium: 'text-purple-400 bg-purple-500/10' }

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Employer Portal</span>
        </div>
        <h1 className="text-4xl font-black text-white mb-2">
          <span className="gradient-text-green">Convert Any Job</span> into an Inclusive Role
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Employers don't know how to make jobs disability-inclusive. Our AI wizard converts any existing job role in minutes — with zero guesswork.
        </p>
      </div>

      {/* Steps */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Wizard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 0: Select role */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">1</div>
              <h2 className="font-bold text-white text-lg">Select Job Role</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {jobRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border text-left transition-all ${
                    selectedRole === role
                      ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1: Disability type for inclusion */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">2</div>
              <h2 className="font-bold text-white text-lg">Hiring for which disability type?</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {[
                { id: 'forVisual', label: 'Visual Impairment', icon: Eye },
                { id: 'forLocomotive', label: 'Locomotor Disability', icon: Accessibility },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDisability(d.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    selectedDisability === d.id
                      ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <d.icon className="w-4 h-4" />
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: AI recommendations */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h2 className="font-bold text-white text-lg flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-purple-400" /> AI Inclusion Recommendations
                  </h2>
                  <p className="text-slate-400 text-xs">For: <strong className="text-white">{selectedRole}</strong></p>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium">
                {currentSuggestions.length} actions
              </div>
            </div>

            <div className="space-y-3">
              {currentSuggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-4 bg-slate-800/60 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{s.action}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${effortColor[s.effort]}`}>Effort: {s.effort}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${impactColor[s.impact]}`}>Impact: {s.impact}</span>
                      {s.cost === 0 ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Free</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 flex items-center gap-0.5">
                          <IndianRupee className="w-3 h-3" />{s.cost.toLocaleString('en-IN')}/yr
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Estimated Total Accommodation Cost:</span>
                <span className="font-bold text-white">{suggestions.totalCostRange}</span>
              </div>
              {suggestions.subsidyEligible && (
                <div className="mt-3 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-sm">
                    <span className="text-emerald-300 font-semibold">Subsidy Available: </span>
                    <span className="text-slate-300">{suggestions.subsidyAmount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setWizardDone(true)}
              className="btn-primary flex items-center gap-2"
            >
              Post This Inclusive Job <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {wizardDone && (
            <div className="glass-card p-6 border border-emerald-500/30 bg-emerald-500/10 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <h3 className="font-bold text-emerald-300 text-lg">Job Listed Successfully!</h3>
              </div>
              <p className="text-slate-300 text-sm">Your inclusive job posting for <strong>{selectedRole}</strong> is now live. EmployAIable's AI will match it with the most suitable PwD candidates in your district.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-blue-400">23</div>
                  <div className="text-xs text-slate-400">Potential matches found</div>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-emerald-400">89%</div>
                  <div className="text-xs text-slate-400">Avg. candidate SPP score</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Incentives panel */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" /> Available Incentives
            </h3>
            <div className="space-y-3">
              {incentives.map((inc, i) => (
                <div key={i} className="bg-slate-800/60 rounded-xl p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-white text-sm">{inc.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      inc.type === 'Subsidy' ? 'bg-blue-500/20 text-blue-300' :
                      inc.type === 'Tax Benefit' ? 'bg-emerald-500/20 text-emerald-300' :
                      inc.type === 'Grant' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>{inc.type}</span>
                  </div>
                  <div className="text-lg font-black gradient-text">{inc.amount}</div>
                  <div className="text-slate-500 text-xs">{inc.eligibility}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-sm">Why Hire PwD Candidates?</h3>
            </div>
            <ul className="space-y-2 text-slate-300 text-sm">
              {[
                '4% quota compliance — avoid penalties',
                'Tax benefits under RPWD Act 2016',
                'Proven higher retention rates (avg. 2.4x)',
                'CSR reporting & ESG score boost',
                'Access to subsidised accommodation costs',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" /> Your Compliance Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Current PwD employees</span>
                <span className="font-bold text-white">2 / 80 total</span>
              </div>
              <div className="score-bar">
                <div className="score-fill bg-orange-500" style={{ width: '2.5%' }} />
              </div>
              <div className="text-xs text-orange-400">2.5% — Below mandated 4% quota</div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-orange-300 text-xs">
                ⚠️ You need to hire <strong>1 more PwD employee</strong> to meet RPWD Act compliance.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
