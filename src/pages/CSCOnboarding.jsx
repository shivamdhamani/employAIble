import { useState } from 'react'
import { CheckCircle, Wifi, WifiOff, Volume2, Mic, QrCode, AlertCircle, MapPin } from 'lucide-react'

const languages = ['हिंदी', 'English', 'Rajasthani', 'मारवाड़ी']

const disabilityOptions = [
  { id: 'visual', emoji: '👁️', label: 'Aankhon ki dikkat', sub: 'Visual Impairment' },
  { id: 'hearing', emoji: '👂', label: 'Kaan ki dikkat', sub: 'Hearing Impairment' },
  { id: 'locomotor', emoji: '🦽', label: 'Chalne-firne mein dikkat', sub: 'Locomotor Disability' },
  { id: 'cognitive', emoji: '🧠', label: 'Seekhne mein dikkat', sub: 'Intellectual / Autism' },
]

const skillOptions = [
  { id: 'phone', emoji: '📱', label: 'Mobile phone use karna aata hai' },
  { id: 'computer', emoji: '💻', label: 'Computer thoda aata hai' },
  { id: 'reading', emoji: '📖', label: 'Hindi mein padh sakta/sakti hoon' },
  { id: 'numbers', emoji: '🔢', label: 'Basic hisaab kar sakta/sakti hoon' },
  { id: 'speaking', emoji: '🗣️', label: 'Achhi tarah baat kar sakta/sakti hoon' },
]

const stepLabels = ['Bhasha', 'Jankari', 'Disability', 'Skills', 'Complete']

export default function CSCOnboarding() {
  const [step, setStep] = useState(0)
  const [offline, setOffline] = useState(false)
  const [voice, setVoice] = useState(false)
  const [lang, setLang] = useState('हिंदी')
  const [disability, setDisability] = useState(null)
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: '', mobile: '', village: '' })

  const toggleSkill = id => setSkills(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id])
  const platformId = `EMP-AJM-${Math.floor(53000 + Math.random() * 9000)}`

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>CSC / Panchayat Access</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
            Assisted onboarding portal
          </h1>
          <p style={{ fontSize: 14.5, color: '#4B5563', lineHeight: 1.6 }}>
            Designed for Common Service Centre (CSC) Village Level Entrepreneurs and Gram Panchayat desks. High-contrast, keyboard accessible, and works on low bandwidth with automatic sync.
          </p>
        </div>

        {/* Status bar */}
        <div className="card p-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setOffline(!offline)} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: `1.5px solid ${offline ? '#B45309' : '#15803D'}`,
              background: offline ? '#FEF3C7' : '#DCFCE7',
              color: offline ? '#B45309' : '#15803D', transition: 'all 0.15s'
            }}>
              {offline ? <WifiOff size={14} /> : <Wifi size={14} />}
              {offline ? 'Offline cache active' : 'Online connected'}
            </button>
            {offline && (
              <span style={{ fontSize: 12, color: '#4B5563' }}>
                Records store locally and sync upon reconnection.
              </span>
            )}
          </div>
          <button onClick={() => setVoice(!voice)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: `1.5px solid ${voice ? '#0056B3' : '#D1DAE8'}`,
            background: voice ? '#E8F0FA' : '#FFFFFF',
            color: voice ? '#0056B3' : '#4B5563', transition: 'all 0.15s'
          }}>
            {voice ? <Volume2 size={15} /> : <Mic size={15} />}
            Voice guide (आवाज़ निर्देश)
          </button>
        </div>

        {/* Voice prompt box */}
        {voice && (
          <div className="card p-5" style={{ border: '1.5px solid #BFDBFE', background: '#E8F0FA', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0056B3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Volume2 size={16} color="white" />
            </div>
            <div style={{ fontSize: 14, color: '#0056B3', fontWeight: 600, lineHeight: 1.5 }}>
              {step === 0 && '"नमस्ते! अपनी पसंदीदा भाषा चुनें।"'}
              {step === 1 && '"उम्मीदवार का नाम, गांव और मोबाइल नंबर दर्ज करें।"'}
              {step === 2 && '"दिव्यांगता की श्रेणी चुनें।"'}
              {step === 3 && '"जो-जो काम आते हैं, उन्हें टिक करें।"'}
              {step === 4 && '"पंजीकरण सफलतापूर्वक पूर्ण हुआ। पावती डाउनलोड करें।"'}
            </div>
          </div>
        )}

        {/* Step progress */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28, gap: 0 }}>
          {stepLabels.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < stepLabels.length - 1 ? '1' : '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div className={`step-dot ${i < step ? 'step-dot-done' : i === step ? 'step-dot-active' : 'step-dot-pending'}`}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: i === step ? '#0056B3' : i < step ? '#15803D' : '#6B7280', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? '#15803D' : '#D1DAE8', margin: '0 8px', marginBottom: 18 }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Language */}
        {step === 0 && (
          <div className="card p-8 space-y-6">
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🌐</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>अपनी भाषा चुनें</h2>
              <p style={{ fontSize: 13.5, color: '#4B5563' }}>Select preferred regional language</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {languages.map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '18px', borderRadius: 8, border: `1.5px solid ${lang === l ? '#0056B3' : '#D1DAE8'}`,
                  background: lang === l ? '#E8F0FA' : '#FFFFFF',
                  color: lang === l ? '#0056B3' : '#2D2D2D', fontSize: 17, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s'
                }}>{l}</button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="btn-blue" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15 }}>
              आगे बढ़ें (Continue) →
            </button>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="card p-8 space-y-5">
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>मूल जानकारी (Candidate Details)</h2>
              <p style={{ fontSize: 13, color: '#4B5563' }}>Enter applicant identification details</p>
            </div>

            {[
              { key: 'name', label: 'पूरा नाम (Full Name)', placeholder: 'नाम दर्ज करें...' },
              { key: 'village', label: 'गांव / कस्बा (Village / Town)', placeholder: 'गांव या शहर का नाम...' },
              { key: 'mobile', label: 'मोबाइल नंबर (Mobile Number)', placeholder: '10 अंकों का नंबर...' },
            ].map(f => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                <input className="input" style={{ fontSize: 15, padding: '12px 14px' }}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
              </div>
            ))}

            <div style={{ padding: '14px 16px', background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
              <QrCode size={22} color="#0056B3" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>UDID कार्ड क्यूआर स्कैन करें</div>
                <div style={{ fontSize: 12, color: '#4B5563' }}>Auto-fill disability details from UDID card</div>
              </div>
              <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>Scan</span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(0)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>← वापस</button>
              <button onClick={() => setStep(2)} className="btn-blue" style={{ flex: 2, justifyContent: 'center', fontSize: 15, padding: 12 }}>आगे बढ़ें →</button>
            </div>
          </div>
        )}

        {/* Step 2: Disability */}
        {step === 2 && (
          <div className="card p-8 space-y-5">
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>दिव्यांगता श्रेणी (Disability Category)</h2>
              <p style={{ fontSize: 13, color: '#4B5563' }}>Select correct disability classification</p>
            </div>
            {disabilityOptions.map(d => (
              <button key={d.id} onClick={() => setDisability(d.id)} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', borderRadius: 8, cursor: 'pointer',
                border: `1.5px solid ${disability === d.id ? '#0056B3' : '#D1DAE8'}`,
                background: disability === d.id ? '#E8F0FA' : '#FFFFFF',
                width: '100%', textAlign: 'left', transition: 'all 0.15s'
              }}>
                <span style={{ fontSize: 24 }}>{d.emoji}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: disability === d.id ? '#0056B3' : '#2D2D2D' }}>{d.label}</div>
                  <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>{d.sub}</div>
                </div>
                {disability === d.id && <CheckCircle size={18} color="#0056B3" style={{ marginLeft: 'auto' }} />}
              </button>
            ))}

            <div style={{ padding: '12px 16px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AlertCircle size={16} color="#B45309" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: '#B45309', lineHeight: 1.5 }}>
                यदि प्रमाण पत्र नहीं है, तो निकटतम जिला पुनर्वास केंद्र (DDRC) से परीक्षण हेतु आवेदन मंच द्वारा भेजा जाएगा।
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>← वापस</button>
              <button onClick={() => setStep(3)} disabled={!disability} className="btn-blue" style={{ flex: 2, justifyContent: 'center', fontSize: 15, padding: 12, opacity: disability ? 1 : 0.5 }}>आगे बढ़ें →</button>
            </div>
          </div>
        )}

        {/* Step 3: Skills */}
        {step === 3 && (
          <div className="card p-8 space-y-5">
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>कौशल व क्षमताएं (Functional Skills)</h2>
              <p style={{ fontSize: 13, color: '#4B5563' }}>Select all functional abilities that apply</p>
            </div>
            {skillOptions.map(s => (
              <button key={s.id} onClick={() => toggleSkill(s.id)} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', borderRadius: 8, cursor: 'pointer',
                border: `1.5px solid ${skills.includes(s.id) ? '#15803D' : '#D1DAE8'}`,
                background: skills.includes(s.id) ? '#DCFCE7' : '#FFFFFF',
                width: '100%', textAlign: 'left', transition: 'all 0.15s'
              }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: skills.includes(s.id) ? '#15803D' : '#2D2D2D', flex: 1 }}>{s.label}</span>
                {skills.includes(s.id) && <CheckCircle size={18} color="#15803D" />}
              </button>
            ))}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>← वापस</button>
              <button onClick={() => setStep(4)} className="btn-blue" style={{ flex: 2, justifyContent: 'center', fontSize: 15, padding: 12 }}>पंजीकरण पूर्ण करें ✓</button>
            </div>
          </div>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <div className="card p-8 text-center" style={{ border: '1.5px solid #A7F3D0' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#DCFCE7', border: '1.5px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <CheckCircle size={28} color="#15803D" />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>बधाई हो! 🎉</h2>
            <p style={{ fontSize: 14, color: '#15803D', marginBottom: 24, fontWeight: 600 }}>पंजीकरण सफलतापूर्वक दर्ज हुआ (Registration Successful)</p>

            <div className="card p-6" style={{ textAlign: 'left', marginBottom: 20, background: '#F5F7FA' }}>
              <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 14 }}>Profile Overview</div>
              {[
                ['Candidate Name', form.name.trim() || 'Ramesh Kumar'],
                ['Village / Town', form.village.trim() || 'Ajmer Rural, Rajasthan'],
                ['Mobile Contact', form.mobile.trim() || '+91 98XXX XXXXX'],
                ['Language Selected', lang],
                ['Disability Classification', disabilityOptions.find(d => d.id === disability)?.sub || 'Visual Impairment'],
                ['Functional Capabilities', `${skills.length > 0 ? skills.length : 3} capabilities recorded`],
                ['Platform Registration ID', platformId],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #D1DAE8', fontSize: 13.5 }}>
                  <span style={{ color: '#4B5563' }}>{k}</span>
                  <span style={{ color: k === 'Platform Registration ID' ? '#0056B3' : '#2D2D2D', fontWeight: 700, fontFamily: k === 'Platform Registration ID' ? 'monospace' : 'inherit' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '14px 18px', background: '#E8F0FA', border: '1px solid #BFDBFE', borderRadius: 8, fontSize: 13, color: '#0056B3', lineHeight: 1.7, textAlign: 'left', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>अगले चरण (Next Steps):</div>
              <div>• 24 से 48 घंटे में उपयुक्त नौकरियों की SMS अधिसूचना <strong>{form.mobile.trim() || 'पंजीकृत नंबर'}</strong> पर भेजी जाएगी।</div>
              <div>• निकटतम ग्राम पंचायत अथवा CSC संचालक से सत्यापन संपर्क होगा।</div>
              <div>• RPWD अधिनियम 2016 के तहत 4% आरक्षित पदों पर प्राथमिक विचार होगा।</div>
            </div>

            <button
              onClick={() => alert(`Registration Slip downloaded for ${form.name.trim() || 'Candidate'} (${platformId}). Sent to official CSC register.`)}
              className="btn-blue"
              style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15 }}
            >
              पावती रसीद डाउनलोड करें (Download Official Slip)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
