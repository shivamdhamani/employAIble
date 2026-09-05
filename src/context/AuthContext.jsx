import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('employaiable_auth_user')
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  })

  const login = (userData) => {
    setUser(userData)
    try {
      localStorage.setItem('employaiable_auth_user', JSON.stringify(userData))
    } catch (e) {
      console.error('Failed to save user session', e)
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('employaiable_auth_user')
    } catch (e) {
      console.error('Failed to clear user session', e)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
