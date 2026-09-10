import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import CandidatePortal from './pages/CandidatePortal'
import EmployerPortal from './pages/EmployerPortal'
import GovernmentDashboard from './pages/GovernmentDashboard'
import AIMatchEngine from './pages/AIMatchEngine'
import CSCOnboarding from './pages/CSCOnboarding'
import CommunityPanel from './pages/CommunityPanel'
import LoginPage from './pages/LoginPage'
import AIChatbot from './components/AIChatbot'

function FrontGateway() {
  const { isLoggedIn, user } = useAuth()
  if (isLoggedIn && user?.redirect) {
    // Already signed in — show the internal landing hub
    return <LandingPage />
  }
  // Not signed in — show the beautiful public landing page first
  return <LandingPage />
}

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#F5F7FA' }}>
          <Navbar />
          <Routes>
            {/* Front route: Sign in comes in the front first! */}
            <Route path="/" element={<FrontGateway />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<LandingPage />} />
            
            {/* Portals open once signed in */}
            <Route path="/candidate" element={<ProtectedRoute><CandidatePortal /></ProtectedRoute>} />
            <Route path="/employer" element={<ProtectedRoute><EmployerPortal /></ProtectedRoute>} />
            <Route path="/government" element={<ProtectedRoute><GovernmentDashboard /></ProtectedRoute>} />
            <Route path="/ai-match" element={<ProtectedRoute><AIMatchEngine /></ProtectedRoute>} />
            <Route path="/csc" element={<ProtectedRoute><CSCOnboarding /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><CommunityPanel /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <AIChatbot />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
