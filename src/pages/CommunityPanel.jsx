import { useState, useEffect, useRef } from 'react'
import {
  Star, MessageCircle, Heart, Share2, BookOpen, Calendar,
  Award, Users, TrendingUp, ChevronRight, CheckCircle,
  Mic, Video, Send, ThumbsUp, Bookmark, Bell, Search,
  Filter, ArrowRight, Zap, MapPin, Clock, Globe, X,
  UserPlus, ChevronDown, ChevronUp, ExternalLink, Phone
} from 'lucide-react'

/* ═══════════════════════════════════════
   DATA LAYER
═══════════════════════════════════════ */

const communityStats = [
  { value: '1,240', label: 'Members',         sub: 'Across 38 districts',   color: '#0056B3', icon: Users      },
  { value: '186',   label: 'Active mentors',  sub: 'PwDs who are employed', color: '#15803D', icon: Award      },
  { value: '94%',   label: 'Satisfaction',    sub: 'Post-session rating',   color: '#0E7490', icon: Star       },
  { value: '312',   label: 'Sessions / mo.',  sub: 'Video + chat combined', color: '#6D28D9', icon: Video      },
]

const mentors = [
  {
    id: 1, name: 'Ramesh Kumar', title: 'Senior Data Entry Operator',
    org: 'Rajasthan State Co-op Bank', location: 'Ajmer, Rajasthan',
    disability: 'Visual impairment · 70%', disabilityTag: 'Visual', disabilityColor: '#0E7490',
    expertise: ['Excel via Screen Reader', 'NVDA Shortcuts', 'Banking Software', 'Keyboard Navigation'],
    mentees: 14, rating: 4.9, reviews: 23, sessions: 61,
    languages: ['Hindi', 'English'], badge: 'Top Mentor', badgeColor: '#B45309',
    story: 'Lost central vision at 22. Learned NVDA and Tally in 4 months through CSC. Now employed for 2+ years and trains others every Saturday.',
    availability: 'Saturdays 10 am – 1 pm · Video & Chat',
    avatar: 'RK', avatarBg: '#0056B3',
    phone: '+91 94XXX XXXXX',
  },
  {
    id: 2, name: 'Priya Meena', title: 'Remote Customer Support Executive',
    org: 'TechSeva Solutions Pvt. Ltd.', location: 'Bhilwara, Rajasthan',
    disability: 'Locomotor disability · 55%', disabilityTag: 'Locomotor', disabilityColor: '#0056B3',
    expertise: ['Work From Home Setup', 'CRM Tools', 'GST Filing', 'Communication Skills'],
    mentees: 9, rating: 4.8, reviews: 17, sessions: 38,
    languages: ['Hindi', 'Rajasthani'], badge: 'Rising Star', badgeColor: '#15803D',
    story: 'Wheelchair user who overcame commute barriers by securing a full WFH arrangement. Now helps others negotiate remote roles with local MSMEs.',
    availability: 'Tue & Thu 6 – 8 pm · Chat preferred',
    avatar: 'PM', avatarBg: '#0E7490',
    phone: '+91 96XXX XXXXX',
  },
  {
    id: 3, name: 'Arvind Sharma', title: 'Government Data Digitisation Officer',
    org: 'Nagaur District Collectorate', location: 'Nagaur, Rajasthan',
    disability: 'Hearing impairment · 80%', disabilityTag: 'Hearing', disabilityColor: '#6D28D9',
    expertise: ['Government Job Process', 'UDID Documentation', 'Typing Skills', 'Digital Literacy'],
    mentees: 21, rating: 4.7, reviews: 31, sessions: 88,
    languages: ['Hindi', 'English'], badge: 'Community Champion', badgeColor: '#0056B3',
    story: 'Cleared the Rajasthan government typing exam by practicing 2 hours daily for 6 months. Expert on navigating UDID and disability certificate paperwork.',
    availability: 'Daily 7 – 9 am · Text / Chat only',
    avatar: 'AS', avatarBg: '#6D28D9',
    phone: '+91 98XXX XXXXX',
  },
  {
    id: 4, name: 'Sunita Patel', title: 'Digital Bookkeeper',
    org: 'Ajmer Traders Association', location: 'Ajmer, Rajasthan',
    disability: 'Cerebral palsy (mild)', disabilityTag: 'Locomotor', disabilityColor: '#0056B3',
    expertise: ['Tally ERP', 'Bookkeeping', 'MS Office', 'Self-Advocacy at Work'],
    mentees: 7, rating: 4.9, reviews: 12, sessions: 29,
    languages: ['Hindi', 'Mewari'], badge: 'Verified Mentor', badgeColor: '#15803D',
    story: 'Told by three employers she could not manage a desk job. employAIble matched her with an MSME 1.8 km from home. Now thriving and paying it forward.',
    availability: 'Weekends 9 am – 12 pm · Video',
    avatar: 'SP', avatarBg: '#BE185D',
    phone: '+91 93XXX XXXXX',
  },
  {
    id: 5, name: 'Mohan Bishnoi', title: 'E-Commerce Content Cataloguer',
    org: 'Meesho Partner Seller (Tonk)', location: 'Tonk, Rajasthan',
    disability: 'Intellectual disability (mild)', disabilityTag: 'Cognitive', disabilityColor: '#B45309',
    expertise: ['E-Commerce Product Listing', 'Mobile Workflow', 'Routine Task Management', 'Online Payments'],
    mentees: 5, rating: 4.6, reviews: 9, sessions: 19,
    languages: ['Hindi', 'Rajasthani'], badge: 'New Mentor', badgeColor: '#6B7280',
    story: 'Started with just basic phone skills, trained through the CSC portal. Now manages 400+ product listings independently using a visual checklist system.',
    availability: 'Sundays 11 am – 1 pm · Video (Hindi only)',
    avatar: 'MB', avatarBg: '#B45309',
    phone: '+91 99XXX XXXXX',
  },
  {
    id: 6, name: 'Kavitha Rathore', title: 'Remote IT Support Technician',
    org: 'DigiSupport India Pvt. Ltd.', location: 'Didwana, Rajasthan',
    disability: 'Low vision · 60%', disabilityTag: 'Visual', disabilityColor: '#0E7490',
    expertise: ['IT Troubleshooting', 'Remote Desktop Tools', 'Voice Screen Reader', 'Women in Tech'],
    mentees: 11, rating: 5.0, reviews: 14, sessions: 44,
    languages: ['Hindi', 'English'], badge: 'Top Mentor', badgeColor: '#B45309',
    story: 'Passed a digital skills certification using a magnification app on her phone. The only PwD in her company who works fully remotely. Actively mentors women with visual impairments.',
    availability: 'Mon, Wed, Fri 8 – 10 pm · Video & Chat',
    avatar: 'KR', avatarBg: '#15803D',
    phone: '+91 91XXX XXXXX',
  },
]

const successStories = [
  {
    id: 1, name: 'Deepak Verma', avatar: 'DV', avatarBg: '#0056B3', location: 'Ajmer',
    role: 'Data Entry Clerk · Ajmer Co-op Bank',
    story: 'I applied to 12 places and was rejected every time. My mentor Ramesh taught me to highlight my NVDA typing speed in interviews. employAIble matched me with a role where screen-reader access was pre-verified. I got placed in 18 days.',
    mentorName: 'Ramesh Kumar', daysToPlacement: 18, spp: 87, likes: 142, disability: 'Visual',
  },
  {
    id: 2, name: 'Rekha Kumari', avatar: 'RKu', avatarBg: '#6D28D9', location: 'Bhilwara',
    role: 'Remote Customer Support · TechSeva',
    story: 'Priya didi showed me exactly how to set up my home workspace with my wheelchair and laptop stand. Nobody at any job portal ever thought about that. Now I earn ₹16,000/month and have not missed a single day.',
    mentorName: 'Priya Meena', daysToPlacement: 27, spp: 79, likes: 98, disability: 'Locomotor',
  },
  {
    id: 3, name: 'Suresh Tak', avatar: 'ST', avatarBg: '#15803D', location: 'Nagaur',
    role: 'Data Digitisation Officer · Collectorate',
    story: 'Arvind bhai guided me through the entire government disability certificate process step by step. The paperwork alone took 3 weeks, but he had done it before and knew every shortcut.',
    mentorName: 'Arvind Sharma', daysToPlacement: 45, spp: 83, likes: 211, disability: 'Hearing',
  },
]

const initialDiscussions = [
  {
    id: 1, author: 'Ramesh Kumar', authorRole: 'Mentor · Ajmer',
    avatar: 'RK', avatarBg: '#0056B3', time: '2 hours ago',
    tag: 'Tip', tagColor: '#15803D', tagBg: '#DCFCE7',
    title: 'NVDA keyboard shortcut guide for Tally ERP — free download',
    body: 'I have compiled a Hindi-language shortcut reference sheet for Tally ERP9 using NVDA. This helped 6 of my mentees pass their typing assessments. Sharing the PDF here for everyone in the community.',
    likes: 87, replies: [
      { author: 'Deepak Verma', avatar: 'DV', avatarBg: '#0056B3', time: '1 hr ago', text: 'This guide is gold! I cleared my assessment using exactly these shortcuts. Thank you Ramesh bhai.' },
      { author: 'Priya Meena', avatar: 'PM', avatarBg: '#0E7490', time: '45 min ago', text: 'Sharing this with all my mentees right away. Can you also do one for Zoho Books?' },
    ],
  },
  {
    id: 2, author: 'Priya Meena', authorRole: 'Mentor · Bhilwara',
    avatar: 'PM', avatarBg: '#0E7490', time: '5 hours ago',
    tag: 'Question', tagColor: '#0056B3', tagBg: '#E8F0FA',
    title: 'Which MSMEs in Rajasthan allow full WFH for locomotor PwDs?',
    body: 'Looking to build a verified employer list for members who cannot commute. If your employer allows WFH, please reply with district and company type. Building a shared community resource.',
    likes: 54, replies: [
      { author: 'Rekha Kumari', avatar: 'RKu', avatarBg: '#6D28D9', time: '3 hrs ago', text: 'TechSeva Solutions in Jaipur allows 100% WFH. Contact HR directly, mention the RPWD Act accommodation request.' },
      { author: 'Sunita Patel', avatar: 'SP', avatarBg: '#BE185D', time: '2 hrs ago', text: 'Ajmer Traders Association is open to hybrid — at least 3 days WFH. DM me for the contact person.' },
    ],
  },
  {
    id: 3, author: 'Kavitha Rathore', authorRole: 'Mentor · Didwana',
    avatar: 'KR', avatarBg: '#15803D', time: '1 day ago',
    tag: 'Success', tagColor: '#B45309', tagBg: '#FEF3C7',
    title: 'My mentee Pooja cleared IT support interview — here is what worked',
    body: 'Pooja has low vision and zero formal IT training. We spent 3 weeks on remote desktop tools using magnification. The turning point: reframing her "limitation" as "distraction-free high-contrast mode" — the employer loved it.',
    likes: 203, replies: [
      { author: 'Arvind Sharma', avatar: 'AS', avatarBg: '#6D28D9', time: '20 hrs ago', text: 'This reframing technique is brilliant. Using it in my next mock interview prep session.' },
      { author: 'New Member', avatar: 'NM', avatarBg: '#6B7280', time: '18 hrs ago', text: 'Kavitha ji please guide me too. I have similar low vision condition and want to get into IT support.' },
    ],
  },
  {
    id: 4, author: 'Community Member · Tonk', authorRole: 'Registered 3 days ago',
    avatar: '?', avatarBg: '#6B7280', time: '3 days ago',
    tag: 'Help Needed', tagColor: '#B91C1C', tagBg: '#FEE2E2',
    title: 'How do I explain my disability to a new employer without losing the job offer?',
    body: 'I have a locomotor condition (40% disability). I was given an offer letter and then it was withdrawn when I disclosed. Has anyone faced this and recovered? Looking for guidance from mentors.',
    likes: 38, replies: [
      { author: 'Priya Meena', avatar: 'PM', avatarBg: '#0E7490', time: '2 days ago', text: 'This is illegal under RPWD Act 2016 Section 20. Document everything. I can guide you through filing a complaint to the State Commissioner.' },
      { author: 'Arvind Sharma', avatar: 'AS', avatarBg: '#6D28D9', time: '2 days ago', text: 'Priya is right. Also reach out to me — I went through a similar situation with a government office and know the process.' },
    ],
  },
]

const upcomingEvents = [
  {
    id: 1, title: 'Resume Writing for PwDs — Live Workshop',
    host: 'Arvind Sharma', date: 'Sun, 14 Sep 2026', time: '11:00 AM – 1:00 PM',
    mode: 'Google Meet (Free)', spots: 12, lang: 'Hindi',
    type: 'Workshop', typeColor: '#0056B3', typeBg: '#E8F0FA',
    desc: 'Learn how to highlight your functional capabilities, not just your disability. Arvind will walk through real resume examples that got candidates hired.',
  },
  {
    id: 2, title: 'Mock Interview — Tally & Data Entry Roles with Screen Reader',
    host: 'Ramesh Kumar', date: 'Sat, 20 Sep 2026', time: '10:00 AM – 12:30 PM',
    mode: 'Video + Live Demo', spots: 8, lang: 'Hindi / English',
    type: 'Mock Interview', typeColor: '#B45309', typeBg: '#FEF3C7',
    desc: 'Live mock interview simulation for data entry roles. Ramesh will demonstrate NVDA + Tally setup live and do Q&A on common interview mistakes.',
  },
  {
    id: 3, title: 'WFH Setup Clinic — Locomotor PwD Edition',
    host: 'Priya Meena', date: 'Thu, 25 Sep 2026', time: '6:00 PM – 7:30 PM',
    mode: 'WhatsApp Video (Group)', spots: 6, lang: 'Hindi',
    type: 'Clinic', typeColor: '#15803D', typeBg: '#DCFCE7',
    desc: 'Practical session covering workspace ergonomics, negotiating WFH with employers, and setting up accessible home office equipment on a budget.',
  },
]

const sidebarLinks = [
  { id: 'mentors', label: 'Mentors',         icon: Users,          count: '186' },
  { id: 'stories', label: 'Success Stories', icon: Heart,          count: '3'   },
  { id: 'forum',   label: 'Forum',           icon: MessageCircle,  count: '4'   },
  { id: 'events',  label: 'Events',          icon: Calendar,       count: '3'   },
]

const filterTypes = ['All', 'Visual', 'Locomotor', 'Hearing', 'Cognitive']

/* ═══════════════════════════════════════
   SMALL HELPERS
═══════════════════════════════════════ */

function Avt({ initials, bg, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: size > 40 ? 14 : 11,
      flexShrink: 0, letterSpacing: '.02em', userSelect: 'none',
    }}>
      {initials}
    </div>
  )
}

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11}
          fill={i <= Math.round(rating) ? '#B45309' : 'none'}
          color={i <= Math.round(rating) ? '#B45309' : '#D1DAE8'}
        />
      ))}
      <span style={{ fontSize: 12, color: '#6B7280', marginLeft: 3 }}>{rating.toFixed(1)}</span>
    </div>
  )
}

function Tag({ label, color, bg }) {
  return (
    <span style={{
      fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
      background: bg, color, textTransform: 'uppercase', letterSpacing: '.05em',
    }}>{label}</span>
  )
}

/* ═══════════════════════════════════════
   MENTOR REQUEST MODAL
═══════════════════════════════════════ */

function MentorModal({ mentor, onClose, onSubmit }) {
  const [msg, setMsg] = useState('')
  const [goal, setGoal] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const goals = ['Find a job', 'Improve skills', 'Interview prep', 'UDID guidance', 'WFH negotiation', 'Salary negotiation']

  const handleSubmit = () => {
    if (!msg.trim()) return
    setSubmitted(true)
    setTimeout(() => { onSubmit(mentor.id); onClose() }, 2000)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card" style={{ width: '100%', maxWidth: 520, padding: '32px', position: 'relative', animation: 'pageIn .25s ease both' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, background: 'none', border: 'none',
          cursor: 'pointer', color: '#6B7280', padding: 4, borderRadius: 6,
        }}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={30} color="#15803D" />
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#2D2D2D', marginBottom: 8 }}>Request sent!</div>
            <div style={{ fontSize: 14, color: '#4B5563' }}>
              <strong style={{ color: '#0056B3' }}>{mentor.name}</strong> will respond within 24 hours via chat.
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24 }}>
              <Avt initials={mentor.avatar} bg={mentor.avatarBg} size={52} />
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#2D2D2D' }}>{mentor.name}</div>
                <div style={{ fontSize: 13, color: '#4B5563' }}>{mentor.title}</div>
                <div style={{ fontSize: 12, color: '#15803D', fontWeight: 600, marginTop: 3 }}>
                  <Clock size={11} color="#15803D" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {mentor.availability}
                </div>
              </div>
            </div>

            <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 10 }}>
              What do you want help with? <span style={{ color: '#B91C1C' }}>*</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {goals.map(g => (
                <button key={g} onClick={() => setGoal(g)} style={{
                  padding: '7px 13px', borderRadius: 7, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', border: `1.5px solid ${goal === g ? '#0056B3' : '#D1DAE8'}`,
                  background: goal === g ? '#E8F0FA' : '#FFFFFF', color: goal === g ? '#0056B3' : '#4B5563',
                  transition: 'all .15s'
                }}>{g}</button>
              ))}
            </div>

            <label className="label">Your message <span style={{ color: '#B91C1C' }}>*</span></label>
            <textarea
              className="input"
              style={{ minHeight: 100, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6, marginBottom: 20 }}
              placeholder={`Hi ${mentor.name.split(' ')[0]}, I am looking for guidance on...`}
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={onClose} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={!msg.trim()}
                className="btn-blue"
                style={{ flex: 2, justifyContent: 'center', opacity: msg.trim() ? 1 : 0.5 }}
              >
                <Send size={14} /> Send request
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   BECOME A MENTOR MODAL
═══════════════════════════════════════ */

function BecomeModal({ onClose }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', disability: '', org: '', expertise: '', lang: 'Hindi', avail: '' })
  const [done, setDone] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card" style={{ width: '100%', maxWidth: 520, padding: '32px', position: 'relative', animation: 'pageIn .25s ease both' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
          <X size={20} />
        </button>

        {done ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#2D2D2D', marginBottom: 8 }}>Application submitted!</div>
            <div style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>
              Our community team will review your profile and connect within <strong>2–3 business days</strong>.
            </div>
            <div style={{ marginTop: 20, padding: '12px 16px', background: '#E8F0FA', borderRadius: 8, fontSize: 13, color: '#0056B3', fontWeight: 600 }}>
              Thank you for paying it forward. 💙
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <div className="section-label" style={{ marginBottom: 6 }}>Become a Mentor</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D' }}>Share your journey. Guide others.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { key: 'name',     label: 'Full name',                   ph: 'Your full name'                    },
                { key: 'disability',label: 'Your disability type & %',   ph: 'e.g. Visual impairment · 70%'     },
                { key: 'org',      label: 'Current employer / role',      ph: 'e.g. Data Entry, Ajmer Co-op Bank' },
                { key: 'expertise',label: 'What can you mentor others on?',ph: 'e.g. NVDA, WFH setup, Tally...' },
                { key: 'avail',    label: 'Weekly availability',         ph: 'e.g. Saturdays 10am – 12pm'       },
              ].map(f => (
                <div key={f.key}>
                  <label className="label">{f.label}</label>
                  <input className="input" placeholder={f.ph} value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: '12px 14px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, fontSize: 13, color: '#15803D', lineHeight: 1.6 }}>
              ✓ Mentoring takes as little as <strong>1 hour per week</strong>. Your story matters.
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={onClose} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button
                onClick={() => setDone(true)}
                disabled={!form.name.trim() || !form.disability.trim()}
                className="btn-blue"
                style={{ flex: 2, justifyContent: 'center', opacity: (form.name && form.disability) ? 1 : 0.5 }}
              >
                <Zap size={14} /> Submit application
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   MENTOR CARD
═══════════════════════════════════════ */

function MentorCard({ mentor, onRequest }) {
  const [showStory, setShowStory] = useState(false)
  const [saved, setSaved]         = useState(false)

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 4, background: mentor.disabilityColor, borderRadius: '12px 12px 0 0' }} />

      <div style={{ padding: '18px 20px 0', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
          <Avt initials={mentor.avatar} bg={mentor.avatarBg} size={50} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
              <span style={{ fontSize: 14.5, fontWeight: 800, color: '#2D2D2D' }}>{mentor.name}</span>
              <span style={{
                fontSize: 9.5, fontWeight: 700, padding: '2px 6px', borderRadius: 4, flexShrink: 0,
                background: mentor.badgeColor + '18', color: mentor.badgeColor,
                border: `1px solid ${mentor.badgeColor}35`, textTransform: 'uppercase', letterSpacing: '.05em',
              }}>⭐ {mentor.badge}</span>
            </div>
            <div style={{ fontSize: 12.5, color: '#4B5563', fontWeight: 600, marginBottom: 2 }}>{mentor.title}</div>
            <div style={{ fontSize: 11.5, color: '#6B7280' }}>{mentor.org}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
              <MapPin size={10} color="#6B7280" /><span style={{ fontSize: 11.5, color: '#6B7280' }}>{mentor.location}</span>
            </div>
          </div>
          <button onClick={() => setSaved(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: saved ? '#0056B3' : '#D1DAE8', flexShrink: 0 }}>
            <Bookmark size={17} fill={saved ? '#0056B3' : 'none'} color={saved ? '#0056B3' : '#D1DAE8'} />
          </button>
        </div>

        {/* Disability badge + stars */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
          <Tag label={mentor.disabilityTag} color={mentor.disabilityColor} bg={mentor.disabilityColor + '18'} />
          <Stars rating={mentor.rating} />
          <span style={{ fontSize: 11.5, color: '#6B7280' }}>({mentor.reviews})</span>
        </div>

        {/* Expertise */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {mentor.expertise.map(t => <span key={t} className="badge badge-gray" style={{ fontSize: 10 }}>{t}</span>)}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #EEF2F7', borderBottom: '1px solid #EEF2F7', padding: '10px 0', marginBottom: 12, textAlign: 'center' }}>
          {[{ v: mentor.mentees, l: 'Mentees' }, { v: mentor.sessions, l: 'Sessions' }, { v: mentor.languages.join(' · '), l: 'Language' }].map((s, i) => (
            <div key={i} style={{ borderRight: i < 2 ? '1px solid #EEF2F7' : 'none' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#2D2D2D', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 10.5, color: '#6B7280', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Story toggle */}
        <button onClick={() => setShowStory(s => !s)} style={{
          display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
          cursor: 'pointer', padding: 0, fontSize: 12, color: '#0056B3', fontWeight: 600, marginBottom: 8,
        }}>
          <BookOpen size={12} />
          {showStory ? 'Hide story' : 'Read their story'}
          {showStory ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {showStory && (
          <div style={{ padding: '12px 14px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, fontSize: 13, color: '#4B5563', lineHeight: 1.7, marginBottom: 10, fontStyle: 'italic' }}>
            "{mentor.story}"
          </div>
        )}

        {/* Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 14 }}>
          <Clock size={12} color="#15803D" />
          <span style={{ fontSize: 12, color: '#15803D', fontWeight: 600 }}>{mentor.availability}</span>
        </div>
      </div>

      {/* Footer actions */}
      <div style={{ borderTop: '1px solid #D1DAE8', padding: '12px 20px', display: 'flex', gap: 8 }}>
        <button
          onClick={() => onRequest(mentor)}
          className="btn-blue btn-sm"
          style={{ flex: 2, justifyContent: 'center', gap: 6 }}
        >
          <MessageCircle size={13} /> Request mentorship
        </button>
        <button className="btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', gap: 6 }}>
          <Video size={13} /> Preview
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   DISCUSSION POST
═══════════════════════════════════════ */

function Post({ post }) {
  const [liked,    setLiked]    = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [localReplies, setLocalReplies] = useState(post.replies)
  const [saved, setSaved] = useState(false)

  const submitReply = () => {
    if (!replyText.trim()) return
    setLocalReplies(r => [...r, {
      author: 'You', avatar: 'Y', avatarBg: '#0056B3', time: 'Just now', text: replyText.trim()
    }])
    setReplyText('')
  }

  return (
    <div className="card p-6" style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <Avt initials={post.avatar} bg={post.avatarBg} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Author + time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>{post.author}</span>
            <span style={{ fontSize: 12, color: '#6B7280' }}>· {post.authorRole}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#9CA3AF' }}>{post.time}</span>
          </div>

          {/* Tag + Title */}
          <div style={{ marginBottom: 8 }}>
            <Tag label={post.tag} color={post.tagColor} bg={post.tagBg} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 8, lineHeight: 1.4 }}>{post.title}</div>
          <div style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.75, marginBottom: 14 }}>{post.body}</div>

          {/* Action bar */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', borderTop: '1px solid #EEF2F7', paddingTop: 12 }}>
            <button onClick={() => setLiked(l => !l)} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: liked ? '#E8F0FA' : 'none',
              border: `1px solid ${liked ? '#BFDBFE' : '#D1DAE8'}`, borderRadius: 6,
              padding: '5px 11px', cursor: 'pointer',
              color: liked ? '#0056B3' : '#6B7280', fontSize: 12.5, fontWeight: 600,
              transition: 'all .15s'
            }}>
              <ThumbsUp size={13} fill={liked ? '#0056B3' : 'none'} />
              {post.likes + (liked ? 1 : 0)}
            </button>

            <button
              onClick={() => setShowReplies(s => !s)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: showReplies ? '#F5F7FA' : 'none',
                border: '1px solid #D1DAE8', borderRadius: 6, padding: '5px 11px',
                cursor: 'pointer', color: '#6B7280', fontSize: 12.5, fontWeight: 600,
              }}>
              <MessageCircle size={13} />
              {localReplies.length} replies
              {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <button onClick={() => setSaved(s => !s)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: saved ? '#0056B3' : '#9CA3AF', marginLeft: 'auto'
            }}>
              <Bookmark size={15} fill={saved ? '#0056B3' : 'none'} color={saved ? '#0056B3' : '#9CA3AF'} />
            </button>
          </div>

          {/* Replies thread */}
          {showReplies && (
            <div style={{ marginTop: 14, borderLeft: '2px solid #EEF2F7', paddingLeft: 16 }}>
              {localReplies.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                  <Avt initials={r.avatar} bg={r.avatarBg} size={28} />
                  <div style={{ flex: 1, background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D' }}>{r.author}</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF' }}>{r.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.65 }}>{r.text}</div>
                  </div>
                </div>
              ))}

              {/* Reply composer */}
              <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'flex-start' }}>
                <Avt initials="Y" bg="#0056B3" size={28} />
                <div style={{ flex: 1 }}>
                  <textarea
                    className="input"
                    style={{ minHeight: 60, resize: 'none', fontFamily: 'inherit', lineHeight: 1.5, fontSize: 13, padding: '9px 12px' }}
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitReply() } }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                    <button
                      onClick={submitReply}
                      disabled={!replyText.trim()}
                      className="btn-blue btn-sm"
                      style={{ gap: 5, opacity: replyText.trim() ? 1 : 0.5 }}
                    >
                      <Send size={12} /> Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   LEFT SIDEBAR COMPONENT
═══════════════════════════════════════ */

function LeftSidebar({ activeTab, setActiveTab, onBecomeMentor }) {
  return (
    <aside style={{
      width: 256, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14,
      position: 'sticky', top: 78, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
    }}>

      {/* Navigation */}
      <div className="card p-4">
        <div style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 12 }}>Community</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sidebarLinks.map(link => {
            const active = activeTab === link.id
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                  padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: active ? '#E8F0FA' : 'transparent',
                  color: active ? '#0056B3' : '#4B5563',
                  fontWeight: active ? 700 : 500, fontSize: 13.5, transition: 'all .15s',
                }}
              >
                <link.icon size={16} />
                <span style={{ flex: 1 }}>{link.label}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 10,
                  background: active ? '#0056B3' : '#EEF2F7',
                  color: active ? '#fff' : '#6B7280',
                }}>{link.count}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Quick stats */}
      <div className="card p-4">
        <div style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 12 }}>Community at a glance</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {communityStats.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={15} color={s.color} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#2D2D2D', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured mentor of the week */}
      <div className="card p-4" style={{ borderTop: '3px solid #B45309' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>⭐ Mentor of the Week</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
          <Avt initials="KR" bg="#15803D" size={38} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#2D2D2D' }}>Kavitha Rathore</div>
            <div style={{ fontSize: 11.5, color: '#4B5563' }}>44 sessions · 5.0 ★</div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.65, marginBottom: 10 }}>
          "Reframe your disability as your superpower in interviews."
        </div>
        <button onClick={() => setActiveTab('mentors')} style={{
          width: '100%', padding: '7px', borderRadius: 7, fontSize: 12.5, fontWeight: 600,
          border: '1.5px solid #15803D', background: '#DCFCE7', color: '#15803D', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        }}>
          <ChevronRight size={13} /> View profile
        </button>
      </div>

      {/* Next event */}
      <div className="card p-4" style={{ borderTop: '3px solid #0056B3' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#0056B3', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>📅 Next Event</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D', marginBottom: 4, lineHeight: 1.4 }}>
          Resume Writing Workshop
        </div>
        <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 3 }}>Sun, 14 Sep · 11 AM</div>
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>by Arvind Sharma · Hindi</div>
        <button onClick={() => setActiveTab('events')} style={{
          width: '100%', padding: '7px', borderRadius: 7, fontSize: 12.5, fontWeight: 600,
          border: '1.5px solid #0056B3', background: '#E8F0FA', color: '#0056B3', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        }}>
          <Calendar size={13} /> Register Free
        </button>
      </div>

      {/* Become a mentor CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #003D80, #0056B3)',
        borderRadius: 12, padding: '18px 16px',
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
          Employed with a disability?
        </div>
        <div style={{ fontSize: 12, color: '#BFDBFE', lineHeight: 1.6, marginBottom: 12 }}>
          1 hour/week. Real impact. Mentor someone like you.
        </div>
        <button onClick={onBecomeMentor} style={{
          width: '100%', padding: '9px', borderRadius: 8, fontSize: 13, fontWeight: 700,
          background: '#fff', color: '#0056B3', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <UserPlus size={14} /> Apply as Mentor
        </button>
      </div>

    </aside>
  )
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */

export default function CommunityPanel() {
  const [activeTab,       setActiveTab]       = useState('mentors')
  const [filterType,      setFilterType]      = useState('All')
  const [searchQ,         setSearchQ]         = useState('')
  const [requestMentor,   setRequestMentor]   = useState(null)   // mentor object
  const [showBecomeModal, setShowBecomeModal] = useState(false)
  const [requestedIds,    setRequestedIds]    = useState([])     // confirmed requests
  const [likedStories,    setLikedStories]    = useState({})
  const [newPost,         setNewPost]         = useState('')
  const [postSent,        setPostSent]        = useState(false)
  const [registeredEvents,setRegisteredEvents]= useState({})
  const [toast,           setToast]           = useState(null)
  const toastTimer = useRef(null)

  // Auto-dismiss toast after 4 s
  useEffect(() => {
    if (toast) {
      clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(null), 4000)
    }
    return () => clearTimeout(toastTimer.current)
  }, [toast])

  const showToast = (msg) => setToast(msg)

  const handleMentorConfirm = (mentorId) => {
    setRequestedIds(p => [...p, mentorId])
    const m = mentors.find(x => x.id === mentorId)
    showToast(`Request sent to ${m?.name}! They'll reply within 24 hours.`)
  }

  const handlePostSubmit = () => {
    setPostSent(true)
    setNewPost('')
    showToast('Post submitted for community review!')
    setTimeout(() => setPostSent(false), 4000)
  }

  const handleRegister = (i) => {
    setRegisteredEvents(p => ({ ...p, [i]: true }))
    showToast(`Registered for "${upcomingEvents[i].title}"!`)
  }

  const filteredMentors = mentors.filter(m => {
    const okType   = filterType === 'All' || m.disabilityTag === filterType
    const okSearch = !searchQ || [m.name, m.location, ...m.expertise].some(t => t.toLowerCase().includes(searchQ.toLowerCase()))
    return okType && okSearch
  })

  return (
    <>
      {/* Modals */}
      {requestMentor && (
        <MentorModal
          mentor={requestMentor}
          onClose={() => setRequestMentor(null)}
          onSubmit={handleMentorConfirm}
        />
      )}
      {showBecomeModal && <BecomeModal onClose={() => setShowBecomeModal(false)} />}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 300,
          background: '#2D2D2D', color: '#fff', borderRadius: 12,
          padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,.2)', animation: 'pageIn .3s ease both',
          maxWidth: 380,
        }}>
          <CheckCircle size={20} color="#15803D" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{toast}</span>
          <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      )}

      <div style={{ paddingTop: 58 }} className="page-in">
        {/* ── Hero Banner ─────────────────────────── */}
        <div style={{
          background: 'linear-gradient(150deg, #003D80 0%, #0056B3 50%, #0E7490 100%)',
          padding: '36px 0 32px',
        }}>
          <div className="max-w-6xl mx-auto px-5">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Community & Peer Mentorship</div>
                <h1 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 10 }}>
                  Placed PwDs mentoring<br />the next generation of PwDs.
                </h1>
                <p style={{ fontSize: 14.5, color: '#BFDBFE', lineHeight: 1.75, maxWidth: 540 }}>
                  Real people. Real placements. Sharing what actually worked — so you don't have to start from scratch.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={() => setShowBecomeModal(true)}
                  style={{
                    padding: '11px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700,
                    background: '#fff', color: '#0056B3', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                  }}>
                  <UserPlus size={15} /> Become a Mentor
                </button>
                <button
                  onClick={() => setActiveTab('stories')}
                  style={{
                    padding: '11px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700,
                    background: 'transparent', color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                  }}>
                  <Heart size={15} /> Success stories
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Page body: sidebar + content ────────── */}
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

            {/* LEFT SIDEBAR */}
            <LeftSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onBecomeMentor={() => setShowBecomeModal(true)}
            />

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* ══ MENTORS TAB ══════════════════════ */}
              {activeTab === 'mentors' && (
                <div>
                  {/* Search + filter */}
                  <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1 1 220px' }}>
                      <Search size={15} color="#6B7280" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input
                        className="input"
                        style={{ paddingLeft: 36, background: '#fff' }}
                        placeholder="Search by name, skill, or location..."
                        value={searchQ}
                        onChange={e => setSearchQ(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {filterTypes.map(f => (
                        <button key={f} onClick={() => setFilterType(f)} style={{
                          padding: '7px 13px', borderRadius: 7, fontSize: 12.5, fontWeight: 600,
                          cursor: 'pointer', border: `1.5px solid ${filterType === f ? '#0056B3' : '#D1DAE8'}`,
                          background: filterType === f ? '#E8F0FA' : '#fff',
                          color: filterType === f ? '#0056B3' : '#4B5563', transition: 'all .15s',
                        }}>{f}</button>
                      ))}
                    </div>
                  </div>

                  {/* Count */}
                  <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
                    Showing <strong style={{ color: '#2D2D2D' }}>{filteredMentors.length}</strong> mentor{filteredMentors.length !== 1 ? 's' : ''}
                    {filterType !== 'All' && ` · ${filterType}`}
                    {searchQ && ` · "${searchQ}"`}
                  </div>

                  {/* Grid */}
                  {filteredMentors.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                      {filteredMentors.map(m => (
                        <MentorCard
                          key={m.id}
                          mentor={m}
                          onRequest={() => setRequestMentor(m)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="card p-12" style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 6 }}>No mentors found</div>
                      <div style={{ fontSize: 13.5, color: '#4B5563' }}>Try a different filter or clear the search.</div>
                      <button onClick={() => { setFilterType('All'); setSearchQ('') }} className="btn-ghost btn-sm" style={{ marginTop: 14 }}>
                        Clear filters
                      </button>
                    </div>
                  )}

                  {/* Already requested section */}
                  {requestedIds.length > 0 && (
                    <div style={{ marginTop: 24, padding: '16px 20px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 12 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#15803D', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle size={16} color="#15803D" /> Mentorship requests sent ({requestedIds.length})
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {requestedIds.map(id => {
                          const m = mentors.find(x => x.id === id)
                          return m ? (
                            <span key={id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff', borderRadius: 20, border: '1px solid #A7F3D0', fontSize: 13 }}>
                              <Avt initials={m.avatar} bg={m.avatarBg} size={20} />
                              {m.name}
                            </span>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ══ SUCCESS STORIES TAB ══════════════ */}
              {activeTab === 'stories' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#2D2D2D', marginBottom: 6 }}>Real placements. Real journeys.</h2>
                    <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>Stories submitted by members who found employment through employAIble and peer mentorship.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {successStories.map((story, i) => {
                      const liked = likedStories[story.id]
                      return (
                        <div key={story.id} className="card" style={{ overflow: 'hidden' }}>
                          <div style={{ display: 'flex' }}>
                            <div style={{ width: 5, background: '#0056B3', flexShrink: 0 }} />
                            <div style={{ flex: 1, padding: '24px 26px' }}>
                              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <Avt initials={story.avatar} bg={story.avatarBg} size={52} />
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                                    <span style={{ fontSize: 16, fontWeight: 800, color: '#2D2D2D' }}>{story.name}</span>
                                    <span style={{ fontSize: 12, color: '#6B7280' }}>
                                      <MapPin size={11} style={{ verticalAlign: 'middle' }} /> {story.location}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#15803D', marginBottom: 14 }}>✓ {story.role}</div>

                                  <div style={{
                                    padding: '16px 20px', background: '#F5F7FA', borderRadius: 10,
                                    border: '1px solid #D1DAE8', borderLeft: '4px solid #0056B3',
                                    fontSize: 14, color: '#4B5563', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 16
                                  }}>
                                    "{story.story}"
                                  </div>

                                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
                                    {[
                                      { l: 'Days to placement', v: `${story.daysToPlacement} days`, c: '#0056B3' },
                                      { l: 'Final SPP score',   v: `${story.spp}%`,               c: '#15803D' },
                                      { l: 'Mentored by',       v: story.mentorName,               c: '#B45309' },
                                    ].map((s, j) => (
                                      <div key={j}>
                                        <div style={{ fontSize: 10.5, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>{s.l}</div>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: s.c }}>{s.v}</div>
                                      </div>
                                    ))}
                                  </div>

                                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', borderTop: '1px solid #EEF2F7', paddingTop: 14 }}>
                                    <button onClick={() => setLikedStories(p => ({ ...p, [story.id]: !p[story.id] }))} style={{
                                      display: 'flex', alignItems: 'center', gap: 6, background: liked ? '#FEE2E2' : 'none',
                                      border: `1px solid ${liked ? '#FECACA' : '#D1DAE8'}`, borderRadius: 6,
                                      padding: '6px 12px', cursor: 'pointer', color: liked ? '#B91C1C' : '#6B7280',
                                      fontSize: 13, fontWeight: 600, transition: 'all .15s',
                                    }}>
                                      <Heart size={14} fill={liked ? '#B91C1C' : 'none'} />
                                      {story.likes + (liked ? 1 : 0)}
                                    </button>
                                    <button onClick={() => showToast('Story link copied!')} style={{
                                      display: 'flex', alignItems: 'center', gap: 6, background: 'none',
                                      border: '1px solid #D1DAE8', borderRadius: 6, padding: '6px 12px',
                                      cursor: 'pointer', color: '#6B7280', fontSize: 13, fontWeight: 600,
                                    }}>
                                      <Share2 size={14} /> Share
                                    </button>
                                    <span style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 'auto' }}>
                                      💙 Inspired {story.likes} people
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div style={{ marginTop: 24, padding: '28px 32px', background: 'linear-gradient(135deg, #DCFCE7, #E0F5F8)', border: '1px solid #A7F3D0', borderRadius: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#2D2D2D', marginBottom: 6 }}>Found a job? Share your story.</div>
                    <p style={{ fontSize: 14, color: '#4B5563', marginBottom: 16 }}>Your journey will help the next person take their first step.</p>
                    <button onClick={() => showToast('Story submission form opened!')} className="btn-blue">
                      Submit Your Story <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* ══ FORUM TAB ════════════════════════ */}
              {activeTab === 'forum' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20 }}>
                  {/* Main feed */}
                  <div>
                    {/* New post composer */}
                    <div className="card p-5" style={{ marginBottom: 18 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 12 }}>Start a discussion or share a tip</div>
                      <textarea
                        className="input"
                        style={{ minHeight: 90, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6, marginBottom: 12 }}
                        placeholder="Ask a question, share a resource, or tell a success moment..."
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                      />
                      {postSent && (
                        <div style={{ padding: '9px 14px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, fontSize: 13, color: '#15803D', fontWeight: 600, marginBottom: 10 }}>
                          ✓ Your post has been submitted for community review!
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <button className="btn-ghost btn-sm" style={{ gap: 5 }}><Mic size={13} /> Voice post</button>
                        <button
                          onClick={handlePostSubmit}
                          disabled={!newPost.trim()}
                          className="btn-blue btn-sm"
                          style={{ gap: 5, opacity: newPost.trim() ? 1 : 0.5 }}
                        >
                          <Send size={13} /> Post
                        </button>
                      </div>
                    </div>

                    {/* Posts */}
                    {initialDiscussions.map(post => <Post key={post.id} post={post} />)}
                  </div>

                  {/* Forum right panel */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div className="card p-5">
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
                        <Award size={15} color="#0056B3" /> Community guidelines
                      </div>
                      {['Speak from lived experience', 'No employer-specific complaints', 'Uplift, do not belittle', 'Share verified resources only', 'Hindi & regional languages welcome'].map((g, i, arr) => (
                        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: '#4B5563', padding: '7px 0', borderBottom: i < arr.length - 1 ? '1px solid #EEF2F7' : 'none' }}>
                          <CheckCircle size={13} color="#15803D" style={{ flexShrink: 0, marginTop: 2 }} /> {g}
                        </div>
                      ))}
                    </div>

                    <div className="card p-5">
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
                        <TrendingUp size={15} color="#0056B3" /> Trending topics
                      </div>
                      {[
                        { tag: '#ScreenReaderTips', posts: 84 },
                        { tag: '#WFHForPwD',        posts: 67 },
                        { tag: '#UDIDProcess',       posts: 52 },
                        { tag: '#TallyWithNVDA',     posts: 48 },
                        { tag: '#InterviewPrep',     posts: 41 },
                        { tag: '#MSMESubsidies',     posts: 33 },
                      ].map((t, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 5 ? '1px solid #EEF2F7' : 'none' }}>
                          <span style={{ fontSize: 12.5, color: '#0056B3', fontWeight: 600, cursor: 'pointer' }}>{t.tag}</span>
                          <span style={{ fontSize: 12, color: '#6B7280' }}>{t.posts}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: '16px', background: '#E8F0FA', border: '1px solid #BFDBFE', borderRadius: 10 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                        <Bell size={14} color="#0056B3" />
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0056B3' }}>SMS alerts</span>
                      </div>
                      <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.6, marginBottom: 10 }}>
                        Get notified when mentors post in your disability category.
                      </p>
                      <button onClick={() => showToast('SMS notifications enabled!')} className="btn-blue btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                        Enable notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ══ EVENTS TAB ═══════════════════════ */}
              {activeTab === 'events' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#2D2D2D', marginBottom: 6 }}>Upcoming community events</h2>
                    <p style={{ fontSize: 14, color: '#4B5563' }}>Free workshops, mock interviews, and clinics — run by mentors for the community.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {upcomingEvents.map((ev, i) => (
                      <div key={ev.id} className="card" style={{ overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap' }}>
                          {/* Date block */}
                          <div style={{
                            minWidth: 88, background: '#EEF2F7', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', padding: '20px 16px', flexShrink: 0,
                          }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#0056B3', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                              {ev.date.split(', ')[1]?.split(' ')[1]}
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 900, color: '#2D2D2D', lineHeight: 1.05 }}>
                              {ev.date.split(', ')[1]?.split(' ')[2]}
                            </div>
                            <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                              {ev.date.split(', ')[1]?.split(' ')[3]}
                            </div>
                          </div>

                          {/* Details */}
                          <div style={{ flex: 1, padding: '20px 24px' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 5, background: ev.typeBg, color: ev.typeColor, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                                {ev.type}
                              </span>
                              <span className="badge badge-gray" style={{ fontSize: 10 }}><Globe size={10} /> {ev.lang}</span>
                              {ev.spots <= 6 && (
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#B91C1C', background: '#FEE2E2', padding: '2px 8px', borderRadius: 4 }}>
                                  Only {ev.spots} spots!
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 6, lineHeight: 1.3 }}>{ev.title}</div>
                            <div style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.65, marginBottom: 12 }}>{ev.desc}</div>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                              {[
                                { icon: Users, text: `Hosted by ${ev.host}` },
                                { icon: Clock, text: ev.time },
                                { icon: Video, text: ev.mode },
                              ].map((d, j) => (
                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#4B5563' }}>
                                  <d.icon size={13} color="#6B7280" /> {d.text}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Register */}
                          <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #EEF2F7', minWidth: 140 }}>
                            {registeredEvents[i] ? (
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ padding: '10px 16px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, color: '#15803D', fontWeight: 700, fontSize: 13 }}>
                                  ✓ Registered!
                                </div>
                                <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 6 }}>Check your SMS</div>
                              </div>
                            ) : (
                              <div style={{ textAlign: 'center' }}>
                                <button onClick={() => handleRegister(i)} className="btn-blue btn-sm" style={{ display: 'block', width: '100%', justifyContent: 'center', marginBottom: 6 }}>
                                  Register Free
                                </button>
                                <div style={{ fontSize: 12, color: ev.spots <= 6 ? '#B91C1C' : '#6B7280', fontWeight: ev.spots <= 6 ? 700 : 400 }}>
                                  {ev.spots} spot{ev.spots !== 1 ? 's' : ''} left
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Propose event */}
                  <div style={{ marginTop: 24, padding: '24px 28px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: '#E8F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Calendar size={22} color="#0056B3" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>Want to host a community event?</div>
                        <p style={{ fontSize: 13.5, color: '#4B5563' }}>Mentors can propose free workshops. The platform provides scheduling, video link, and automated reminders.</p>
                      </div>
                      <button onClick={() => showToast('Event proposal form opened!')} className="btn-ghost" style={{ flexShrink: 0, gap: 6 }}>
                        Propose event <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>{/* end main content */}
          </div>{/* end flex row */}
        </div>{/* end max-w container */}
      </div>
    </>
  )
}
