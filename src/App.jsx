import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import CandidatePortal from './pages/CandidatePortal'
import EmployerPortal from './pages/EmployerPortal'
import GovernmentDashboard from './pages/GovernmentDashboard'
import AIMatchEngine from './pages/AIMatchEngine'
import CSCOnboarding from './pages/CSCOnboarding'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen animated-bg dot-grid">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/candidate" element={<CandidatePortal />} />
          <Route path="/employer" element={<EmployerPortal />} />
          <Route path="/government" element={<GovernmentDashboard />} />
          <Route path="/ai-match" element={<AIMatchEngine />} />
          <Route path="/csc" element={<CSCOnboarding />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
