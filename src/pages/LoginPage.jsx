import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Users, Building2, BarChart3, MapPin, Shield, KeyRound,
  CheckCircle, ArrowRight, Sparkles, Smartphone, Mail,
  Eye, EyeOff, Lock, AlertCircle, Volume2
} from 'lucide-react'

const roles = [
  {
    id: 'candidate',
    title: 'Candidate / PwD',
    sub: 'Job Seeker Access',
    icon: Users,
    color: '#0056B3',
    bg: '#E8F0FA',
    redirect: '/candidate',
    defaultIdentifier: 'RJ-01-2021-0849201',
    idLabel: 'UDID Card No. / Mobile Number',
    idPlaceholder: 'e.g. RJ-01-2021-0849201 or 98290XXXXX',
    demoUser: 'Ramesh Kumar (Category A - Visual)'
  },
  {
    id: 'employer',
    title: 'Employer / MSME',
    sub: 'Hiring & Subsidies',
    icon: Building2,
    color: '#0E7490',
    bg: '#E0F5F8',
    redirect: '/employer',
    defaultIdentifier: 'UDYAM-RJ-01-0028491',
    idLabel: 'Udyam No. / Work Email',
    idPlaceholder: 'hr@coopbank.rajasthan.gov.in',
    demoUser: 'Rajasthan State Co-operative Bank HR'
  },
  {
    id: 'government',
    title: 'Govt Official',
    sub: 'Section 34 Monitor',
    icon: BarChart3,
    color: '#6D28D9',
    bg: '#EDE9FE',
    redirect: '/government',
    defaultIdentifier: 'officer.ajmer@rajasthan.gov.in',
    idLabel: 'SSO ID / Gov Email',
    idPlaceholder: 'officer.ajmer@rajasthan.gov.in',
    demoUser: 'Ajmer District Social Welfare Officer'
  },
  {
    id: 'csc',
    title: 'CSC / VLE Kiosk',
    sub: 'Rural Assisted Desk',
    icon: MapPin,
    color: '#B45309',
    bg: '#FEF3C7',
    redirect: '/csc',
    defaultIdentifier: 'VLE-CSC-RAJ-8821',
    idLabel: 'CSC ID / VLE Mobile',
    idPlaceholder: 'e.g. VLE-CSC-RAJ-8821',
    demoUser: 'Kishangarh Gram Panchayat VLE'
  },
]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('candidate')
  const [authMode, setAuthMode] = useState('otp') // 'otp' or 'password'
  const [identifier, setIdentifier] = useState('RJ-01-2021-0849201')
  const [password, setPassword] = useState('••••••••')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '0'])
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const activeRole = roles.find(r => r.id === selectedRole) || roles[0]

  const handleRoleSelect = (r) => {
    setSelectedRole(r.id)
    setIdentifier(r.defaultIdentifier)
    setOtpSent(false)
    setSuccess(false)
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (!identifier.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOtpSent(true)
    }, 600)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        navigate(activeRole.redirect)
      }, 900)
    }, 800)
  }

  const handleQuickDemoFill = (roleObj) => {
    handleRoleSelect(roleObj)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        navigate(roleObj.redirect)
      }, 700)
    }, 500)
  }

  return (
    <div style={{ paddingTop: 58, minHeight: '100vh', background: 'linear-gradient(175deg, #F0F4F8 0%, #F5F7FA 100%)' }} className="page-in">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#E8F0FA', borderRadius: 20, border: '1px solid #BFDBFE', marginBottom: 12 }}>
            <Shield size={14} color="#0056B3" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0056B3', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Unified Access Portal
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 8 }}>
            Sign in to employAIble
          </h1>
          <p style={{ fontSize: 14.5, color: '#4B5563', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
            Select your platform role to access candidate capability profiles, employer tools, district dashboards, or rural CSC services.
          </p>
        </div>

        {/* Role Switcher Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
          {roles.map(r => {
            const isSel = selectedRole === r.id
            const Icon = r.icon
            return (
              <button
                key={r.id}
                onClick={() => handleRoleSelect(r)}
                style={{
                  padding: '16px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                  border: `2px solid ${isSel ? r.color : '#D1DAE8'}`,
                  background: isSel ? r.bg : '#FFFFFF',
                  boxShadow: isSel ? `0 4px 14px ${r.color}20` : '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'all 0.18s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: isSel ? r.color : '#EEF2F7', color: isSel ? '#fff' : r.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} />
                  </div>
                  {isSel && <CheckCircle size={16} color={r.color} />}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: isSel ? r.color : '#2D2D2D', lineHeight: 1.2 }}>{r.title}</div>
                <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 3 }}>{r.sub}</div>
              </button>
            )
          })}
        </div>

        {/* Main Login Card Container */}
        <div className="card p-8" style={{ maxWidth: 520, margin: '0 auto', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>

          {/* Role Header Banner inside card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid #EEF2F7', marginBottom: 20 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: activeRole.bg, color: activeRole.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <activeRole.icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D' }}>{activeRole.title} Sign In</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{activeRole.sub} · Direct Redirect to Dashboard</div>
            </div>
          </div>

          {/* Quick Demo One-Click Sign In (Perfect for Hackathon Presentation) */}
          <div style={{ marginBottom: 20, padding: '12px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={14} color="#B45309" /> Demo Quick Sign In:
              </span>
              <button
                type="button"
                onClick={() => handleQuickDemoFill(activeRole)}
                style={{
                  fontSize: 12, fontWeight: 700, color: activeRole.color, background: 'none', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
                }}
              >
                1-Click Launch →
              </button>
            </div>
            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 4 }}>
              Preloaded credentials for: <strong>{activeRole.demoUser}</strong>
            </div>
          </div>

          {/* Auth Method Toggle: Mobile OTP vs Password */}
          <div style={{ display: 'flex', gap: 6, padding: 3, background: '#EEF2F7', borderRadius: 8, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => { setAuthMode('otp'); setOtpSent(false) }}
              style={{
                flex: 1, padding: '7px', fontSize: 13, fontWeight: authMode === 'otp' ? 700 : 500,
                borderRadius: 6, border: 'none', cursor: 'pointer',
                background: authMode === 'otp' ? '#FFFFFF' : 'transparent',
                color: authMode === 'otp' ? '#2D2D2D' : '#6B7280',
                boxShadow: authMode === 'otp' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              Mobile / UDID OTP
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('password')}
              style={{
                flex: 1, padding: '7px', fontSize: 13, fontWeight: authMode === 'password' ? 700 : 500,
                borderRadius: 6, border: 'none', cursor: 'pointer',
                background: authMode === 'password' ? '#FFFFFF' : 'transparent',
                color: authMode === 'password' ? '#2D2D2D' : '#6B7280',
                boxShadow: authMode === 'password' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              Password Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={authMode === 'otp' && !otpSent ? handleSendOtp : handleLogin}>
            {/* Identifier input */}
            <div style={{ marginBottom: 16 }}>
              <label className="label">{activeRole.idLabel}</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  style={{ paddingLeft: 38, fontSize: 14 }}
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={activeRole.idPlaceholder}
                  required
                />
                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}>
                  {authMode === 'otp' ? <Smartphone size={16} /> : <Mail size={16} />}
                </div>
              </div>
            </div>

            {/* If Auth Mode is Password */}
            {authMode === 'password' && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="label">Account Password</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset SMS sent to verified mobile linked with UDID.') }} style={{ fontSize: 12, color: '#0056B3', textDecoration: 'none' }}>
                    Forgot?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input"
                    style={{ paddingLeft: 38, paddingRight: 38, fontSize: 14 }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter security password..."
                    required
                  />
                  <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}>
                    <Lock size={16} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* If Auth Mode is OTP and OTP is Sent */}
            {authMode === 'otp' && otpSent && (
              <div style={{ marginBottom: 20, animation: 'pageIn .2s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label className="label" style={{ margin: 0 }}>Enter 4-Digit OTP Code</label>
                  <span style={{ fontSize: 11.5, color: '#15803D', fontWeight: 600 }}>Sent to registered mobile</span>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  {otpCode.map((digit, i) => (
                    <input
                      key={i}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value
                        const newOtp = [...otpCode]
                        newOtp[i] = val
                        setOtpCode(newOtp)
                      }}
                      style={{
                        width: 52, height: 52, textAlign: 'center', fontSize: 20, fontWeight: 800,
                        border: '1.5px solid #0056B3', borderRadius: 8, background: '#F8FAFC',
                        fontFamily: 'monospace', outline: 'none'
                      }}
                    />
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => alert('New OTP sent to registered number.')}
                    style={{ background: 'none', border: 'none', color: '#0056B3', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                  >
                    Resend Code in 30s
                  </button>
                </div>
              </div>
            )}

            {/* Success Notification */}
            {success && (
              <div style={{ padding: '12px 14px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, color: '#15803D', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <CheckCircle size={16} /> Authentication successful! Redirecting to {activeRole.title}...
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="btn-blue"
              style={{
                width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15,
                background: activeRole.color, opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <span>Authenticating with Swavlamban Gateway...</span>
              ) : authMode === 'otp' && !otpSent ? (
                <span>Generate OTP & Sign In →</span>
              ) : (
                <span>Confirm & Enter {activeRole.title} →</span>
              )}
            </button>
          </form>

          {/* Footer note inside card */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #EEF2F7', textAlign: 'center' }}>
            <div style={{ fontSize: 12.5, color: '#6B7280' }}>
              Don't have a registered profile yet?{' '}
              <Link to="/candidate" style={{ color: '#0056B3', fontWeight: 700, textDecoration: 'none' }}>
                Register as Candidate
              </Link>{' '}
              or{' '}
              <Link to="/csc" style={{ color: '#0E7490', fontWeight: 700, textDecoration: 'none' }}>
                CSC Desk
              </Link>
            </div>
          </div>
        </div>

        {/* Security & Compliance Ticker */}
        <div style={{ maxWidth: 520, margin: '20px auto 0', textAlign: 'center' }}>
          <div style={{ fontSize: 11.5, color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span>✓ DEPwD API Certified</span>
            <span>✓ 256-bit Encrypted Token</span>
            <span>✓ Section 34 RPWD Ready</span>
          </div>
        </div>

      </div>
    </div>
  )
}
