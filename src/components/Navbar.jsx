import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, UserCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Platform',       path: '/candidate'  },
  { label: 'For Employers',  path: '/employer'   },
  { label: 'For Government', path: '/government' },
  { label: 'Match Scorer',   path: '/ai-match'   },
  { label: 'Community',      path: '/community'  },
  { label: 'CSC Access',     path: '/csc'        },
]

export default function Navbar() {
  const { user, logout } = useAuth()
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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="employAIble - Empowering PwD Through Career Opportunities"
            style={{ height: 38, width: 'auto', maxHeight: 42, objectFit: 'contain' }}
          />
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

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 10 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link
                to={user.redirect || '/candidate'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: user.bg || '#E8F0FA',
                  padding: '5px 12px', borderRadius: 20,
                  border: `1.5px solid ${user.color || '#0056B3'}`,
                  textDecoration: 'none'
                }}
                title={`Active profile: ${user.name}`}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: user.color || '#0056B3' }} />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: user.color || '#0056B3' }}>
                  {user.name.split(' ')[0]} ({user.roleTitle ? user.roleTitle.split('/')[0].trim() : 'User'})
                </span>
              </Link>
              <button
                onClick={logout}
                className="btn-ghost btn-sm"
                style={{ fontSize: 12, padding: '5px 10px', color: '#B91C1C', borderColor: '#FCA5A5', display: 'flex', alignItems: 'center', gap: 4 }}
                title="Sign out and return to front login"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link
                to="/login"
                className="btn-blue btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, padding: '7px 16px' }}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', padding: 4 }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid #D1DAE8', padding: '8px 20px 16px' }}>
          {user && (
            <div style={{ marginBottom: 12, padding: '8px 12px', background: user.bg || '#E8F0FA', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: user.color || '#0056B3' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: user.color || '#0056B3' }}>
                  {user.name}
                </span>
              </div>
              <button
                onClick={() => { logout(); setOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#B91C1C', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <LogOut size={12} /> Sign Out
              </button>
            </div>
          )}
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: active(link.path) ? 600 : 500,
              textDecoration: 'none', marginBottom: 2,
              color: active(link.path) ? '#0056B3' : '#4B5563',
              background: active(link.path) ? '#E8F0FA' : 'transparent',
            }}>{link.label}</Link>
          ))}
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {user ? (
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="btn-ghost"
                style={{ display: 'flex', justifyContent: 'center', color: '#B91C1C', fontWeight: 600 }}
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="btn-blue"
                style={{ display: 'flex', justifyContent: 'center', fontWeight: 700 }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
