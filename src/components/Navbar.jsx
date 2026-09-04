import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Platform',       path: '/candidate' },
  { label: 'For Employers',  path: '/employer'  },
  { label: 'For Government', path: '/government'},
  { label: 'Match Scorer',   path: '/ai-match'  },
  { label: 'CSC Access',     path: '/csc'       },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const active = p => loc.pathname === p

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #D1DAE8',
    }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 20px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#0056B3,#0E7490)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,86,179,0.25)' }}>
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 12C7 12 4 10.2 4 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 12C7 12 10 10.2 10 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="7" cy="7" r="1.2" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.02em' }}>
            employ<span style={{ color: '#0056B3' }}>AI</span>ble
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 1 }}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              padding: '6px 14px', borderRadius: 7, fontSize: 13.5, textDecoration: 'none',
              color: active(link.path) ? '#0056B3' : '#4B5563',
              background: active(link.path) ? '#E8F0FA' : 'transparent',
              fontWeight: active(link.path) ? 600 : 500,
              transition: 'all .15s',
            }}
              onMouseEnter={e => { if (!active(link.path)) { e.currentTarget.style.color = '#2D2D2D'; e.currentTarget.style.background = '#EEF2F7'; }}}
              onMouseLeave={e => { if (!active(link.path)) { e.currentTarget.style.color = '#4B5563'; e.currentTarget.style.background = 'transparent'; }}}
            >{link.label}</Link>
          ))}
        </nav>

        <div className="hidden md:flex" style={{ alignItems: 'center' }}>
          <Link to="/candidate" className="btn-blue btn-sm">Get started</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', padding: 4 }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid #D1DAE8', padding: '8px 20px 16px' }}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: active(link.path) ? 600 : 500,
              textDecoration: 'none', marginBottom: 2,
              color: active(link.path) ? '#0056B3' : '#4B5563',
              background: active(link.path) ? '#E8F0FA' : 'transparent',
            }}>{link.label}</Link>
          ))}
          <div style={{ marginTop: 10 }}>
            <Link to="/candidate" className="btn-blue" style={{ display: 'flex', justifyContent: 'center' }}>Get started</Link>
          </div>
        </div>
      )}
    </header>
  )
}
