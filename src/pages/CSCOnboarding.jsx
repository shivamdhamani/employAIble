import { useState } from 'react'
import {
  MapPin, Wifi, WifiOff, Mic, Volume2, QrCode, Users, Phone,
  CheckCircle, ChevronRight, User, FileText, Accessibility,
  AlertCircle, Globe, Languages, Smartphone
} from 'lucide-react'

const languages = ['हिंदी (Hindi)', 'English', 'Rajasthani', 'মারwadi', 'Urdu']

const steps = [
  { id: 0, label: 'Language', icon: Languages },
  { id: 1, label: 'Identity', icon: User },
  { id: 2, label: 'Disability Type', icon: Accessibility },
  { id: 3, label: 'Basic Skills', icon: FileText },
  { id: 4, label: 'Complete', icon: CheckCircle },
]

const disabilityOptions = [
  { id: 'visual', label: 'Aankhon ki dikkat', label2: 'Visual Impairment', icon: '👁️' },
  { id: 'hearing', label: 'Kaan ki dikkat', label2: 'Hearing Impairment', icon: '👂' },
  { id: 'locomotor', label: 'Chalne-firne mein dikkat', label2: 'Locomotor Disability', icon: '🦽' },
  { id: 'cognitive', label: 'Yaad ya seekhne mein dikkat', label2: 'Intellectual / Autism', icon: '🧠' },
]

const skillOptions = [
  { id: 'phone', label: 'Mobile phone use karna aata hai', icon: '📱' },
  { id: 'computer', label: 'Computer/Laptop thoda aata hai', icon: '💻' },
  { id: 'reading', label: 'Hindi mein padh sakta/sakti hoon', icon: '📖' },
  { id: 'numbers', label: 'Chota hisaab kitaab aata hai', icon: '🔢' },
  { id: 'speaking', label: 'Achi baat kar sakta/sakti hoon', icon: '🗣️' },
]

export default function CSCOnboarding() {
  const [step, setStep] = useState(0)
  const [offline, setOffline] = useState(false)
  const [selectedLang, setSelectedLang] = useState('हिंदी (Hindi)')
  const [selectedDisability, setSelectedDisability] = useState(null)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [voiceMode, setVoiceMode] = useState(false)
  const [form, setForm] = useState({ name: '', aadhaar: '', mobile: '', village: '', district: 'Ajmer' })

  const toggleSkill = (id) => {
    setSelectedSkills(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  return (
    <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-rose-400" />
          <span className="text-rose-400 text-sm font-semibold uppercase tracking-wider">CSC / Panchayat Onboarding Node</span>
        </div>
        <h1 className="text-4xl font-black text-white mb-2">
          <span className="gradient-text">Offline-First</span> Onboarding
        </h1>
        <p className="text-slate-400">
          Designed for Common Service Centres and Gram Panchayat offices. Low bandwidth, voice-guided, regional-language-first.
        </p>
      </div>

      {/* Connectivity + Voice bar */}
      <div className="glass-card p-4 flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOffline(!offline)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
              offline
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {offline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            {offline ? 'Offline Mode' : 'Online Mode'}
          </button>
          <div className="text-slate-500 text-xs">
            {offline ? '⚡ Data will sync when connection resumes' : '✓ Connected to EmployAIable servers'}
          </div>
        </div>
        <button
          onClick={() => setVoiceMode(!voiceMode)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
            voiceMode
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
        >
          {voiceMode ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          Voice Guide {voiceMode ? 'ON' : 'OFF'}
        </button>
      </div>

      {voiceMode && (
        <div className="glass-card p-4 mb-5 border border-blue-500/20 bg-blue-600/5 flex items-center gap-3 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-blue-300 font-semibold text-sm">Voice Guide Active 🎙️</div>
            <div className="text-slate-400 text-xs">
              {step === 0 && '"Namaste! Apni bhasha chuniye. Please select your language."'}
              {step === 1 && '"Apna naam aur gaon bharen. Please fill your name and village."'}
              {step === 2 && '"Apni disability type chuniye."'}
              {step === 3 && '"Jo kaam aata hai, wo chuniye."'}
              {step === 4 && '"Badhaai ho! Aapka registration ho gaya!"'}
            </div>
          </div>
        </div>
      )}

      {/* Progress stepper */}
      <div className="flex items-center mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              step === s.id ? 'bg-rose-600/20 border border-rose-500/40 text-rose-300' :
              i < step ? 'bg-emerald-600/20 text-emerald-400' :
              'text-slate-600'
            }`}>
              {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />}
              {s.label}
            </div>
            {i < steps.length - 1 && <div className={`w-6 h-0.5 mx-1 rounded-full ${i < step ? 'bg-emerald-500' : 'bg-slate-800'}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Language */}
      {step === 0 && (
        <div className="glass-card p-6 space-y-5 animate-fade-in">
          <div className="text-center">
            <div className="text-4xl mb-3">🌐</div>
            <h2 className="text-2xl font-bold text-white">Apni Bhasha Chuniye</h2>
            <p className="text-slate-400 text-sm">Select your language / अपनी भाषा चुनें</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`p-4 rounded-2xl border text-center font-semibold text-lg transition-all ${
                  selectedLang === lang
                    ? 'bg-rose-600/20 border-rose-500/50 text-rose-300 scale-105'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="w-full btn-primary text-lg py-4">
            Aage Badhein → Continue
          </button>
        </div>
      )}

      {/* Step 1: Identity */}
      {step === 1 && (
        <div className="glass-card p-6 space-y-5 animate-fade-in">
          <div className="text-center">
            <div className="text-4xl mb-3">👤</div>
            <h2 className="text-2xl font-bold text-white">Aapki Jankari</h2>
            <p className="text-slate-400 text-sm">Basic information / बुनियादी जानकारी</p>
          </div>

          <div className="space-y-4">
            {[
              { key: 'name', label: 'Naam (Name)', placeholder: 'Apna poora naam likhein', type: 'text' },
              { key: 'village', label: 'Gaon / Sheher (Village / Town)', placeholder: 'Gaon ya sheher ka naam', type: 'text' },
              { key: 'mobile', label: 'Mobile Number', placeholder: '10 ankon ka number', type: 'tel' },
              { key: 'aadhaar', label: 'Aadhaar Number (optional)', placeholder: 'XXXX-XXXX-XXXX', type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-slate-300 text-sm font-medium mb-1.5 block">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600"
                />
              </div>
            ))}
          </div>

          {/* QR scan option */}
          <div className="flex items-center gap-3 bg-slate-800/60 rounded-xl p-4">
            <QrCode className="w-8 h-8 text-blue-400 shrink-0" />
            <div>
              <div className="text-white text-sm font-semibold">UDID QR Code Scan</div>
              <div className="text-slate-400 text-xs">Agar UDID card hai to scan karein — details auto-fill ho jaenge</div>
            </div>
            <button className="ml-auto px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-medium">Scan</button>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="btn-secondary flex-1">← Wapas</button>
            <button onClick={() => setStep(2)} className="btn-primary flex-1 text-lg">Aage →</button>
          </div>
        </div>
      )}

      {/* Step 2: Disability */}
      {step === 2 && (
        <div className="glass-card p-6 space-y-5 animate-fade-in">
          <div className="text-center">
            <div className="text-4xl mb-3">♿</div>
            <h2 className="text-2xl font-bold text-white">Aapki Disability</h2>
            <p className="text-slate-400 text-sm">Apni disability type chuniye / Select disability type</p>
          </div>

          <div className="space-y-3">
            {disabilityOptions.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDisability(d.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${
                  selectedDisability === d.id
                    ? 'bg-rose-600/20 border-rose-500/50 scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <span className="text-3xl">{d.icon}</span>
                <div>
                  <div className="font-bold text-white text-lg">{d.label}</div>
                  <div className="text-slate-400 text-sm">{d.label2}</div>
                </div>
                {selectedDisability === d.id && <CheckCircle className="w-6 h-6 text-rose-400 ml-auto" />}
              </button>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div className="text-blue-300 text-xs">
              <strong>Zaruri nahi:</strong> Agar abhi disability certificate nahi hai, tab bhi register kar sakte hain. Hum aapko najdiki Zila Punarvas Kendra se certificate dilwane mein madad karenge.
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">← Wapas</button>
            <button onClick={() => setStep(3)} disabled={!selectedDisability} className="btn-primary flex-1 text-lg disabled:opacity-50">Aage →</button>
          </div>
        </div>
      )}

      {/* Step 3: Skills */}
      {step === 3 && (
        <div className="glass-card p-6 space-y-5 animate-fade-in">
          <div className="text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h2 className="text-2xl font-bold text-white">Aapke Kaam</h2>
            <p className="text-slate-400 text-sm">Jo bhi aata hai, select karein (sab galat nahi hoga!) / Select your skills</p>
          </div>

          <div className="space-y-3">
            {skillOptions.map((skill) => (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${
                  selectedSkills.includes(skill.id)
                    ? 'bg-emerald-600/20 border-emerald-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <span className="text-2xl">{skill.icon}</span>
                <div className="font-semibold text-white text-base">{skill.label}</div>
                {selectedSkills.includes(skill.id) && <CheckCircle className="w-5 h-5 text-emerald-400 ml-auto" />}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary flex-1">← Wapas</button>
            <button onClick={() => setStep(4)} className="btn-primary flex-1 text-lg">Register Karein ✓</button>
          </div>
        </div>
      )}

      {/* Step 4: Done */}
      {step === 4 && (
        <div className="glass-card p-8 text-center space-y-6 border border-emerald-500/30 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border-2 border-emerald-500/50">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Badhaai Ho! 🎉</h2>
            <p className="text-emerald-400 font-semibold text-lg">Registration Safal Hua!</p>
            <p className="text-slate-400 text-sm mt-2">Congratulations! Your profile has been created successfully.</p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-5 text-left space-y-3">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Your Profile Summary</div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Language</span><span className="text-white font-medium">{selectedLang}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">District</span><span className="text-white font-medium">Ajmer, Rajasthan</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Disability Type</span><span className="text-white font-medium capitalize">{selectedDisability || 'Not specified'}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Skills recorded</span><span className="text-white font-medium">{selectedSkills.length} selected</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Platform ID</span><span className="text-emerald-400 font-mono font-medium">EMP-AJM-{Math.floor(Math.random() * 90000 + 10000)}</span></div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-left">
            <div className="font-semibold text-blue-300 text-sm mb-1">Agle Kadam (Next Steps):</div>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>✦ AI match results within 24–48 hours</li>
              <li>✦ SMS notification on your mobile number</li>
              <li>✦ Nearest vocational centre will contact you</li>
              <li>✦ Certificate facilitation (if needed) will start</li>
            </ul>
          </div>

          <button className="w-full btn-primary text-lg py-4">
            Download Receipt / QR Card
          </button>
        </div>
      )}
    </div>
  )
}
