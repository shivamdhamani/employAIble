import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import CandidatePortal from './pages/CandidatePortal'
import EmployerPortal from './pages/EmployerPortal'
import GovernmentDashboard from './pages/GovernmentDashboard'
import AIMatchEngine from './pages/AIMatchEngine'
import CSCOnboarding from './pages/CSCOnboarding'
import CommunityPanel from './pages/CommunityPanel'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#F5F7FA' }}>
        <Navbar />
        <Routes>
          <Route path="/"           element={<LandingPage />} />
          <Route path="/candidate"  element={<CandidatePortal />} />
          <Route path="/employer"   element={<EmployerPortal />} />
          <Route path="/government" element={<GovernmentDashboard />} />
          <Route path="/ai-match"   element={<AIMatchEngine />} />
          <Route path="/csc"        element={<CSCOnboarding />} />
          <Route path="/community"  element={<CommunityPanel />} />
          <Route path="/login"      element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
