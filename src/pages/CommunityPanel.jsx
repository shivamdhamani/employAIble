import { useState } from 'react'
import {
  Star, MessageCircle, Heart, Share2, BookOpen, Calendar,
  Award, Users, TrendingUp, ChevronRight, CheckCircle,
  Mic, Video, Send, ThumbsUp, Bookmark, Bell, Search,
  Filter, ArrowRight, Zap, MapPin, Clock, Globe
} from 'lucide-react'

/* ─── DATA ─────────────────────────────────────── */

const communityStats = [
  { value: '1,240', label: 'Community members', sub: 'Across 38 districts', color: '#0056B3' },
  { value: '186',   label: 'Active mentors',    sub: 'PwDs who are employed', color: '#15803D' },
  { value: '94%',   label: 'Mentee satisfaction', sub: 'Post-session rating', color: '#0E7490' },
  { value: '312',   label: 'Sessions this month', sub: 'Video + chat combined', color: '#6D28D9' },
]

const mentors = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    title: 'Senior Data Entry Operator',
    org: 'Rajasthan State Co-op Bank',
    location: 'Ajmer, Rajasthan',
    disability: 'Visual impairment · 70%',
    disabilityTag: 'Visual',
    disabilityColor: '#0E7490',
    expertise: ['Excel via Screen Reader', 'NVDA Shortcuts', 'Banking Software', 'Keyboard Navigation'],
    mentees: 14,
    rating: 4.9,
    reviews: 23,
    sessions: 61,
    languages: ['Hindi', 'English'],
    badge: 'Top Mentor',
    badgeColor: '#B45309',
    story: 'Lost central vision at 22. Learned NVDA and Tally in 4 months through CSC. Now employed for 2+ years and trains others weekly.',
    availability: 'Saturdays 10am–1pm · Video & Chat',
    avatar: 'RK',
    avatarBg: '#0056B3',
  },
  {
    id: 2,
    name: 'Priya Meena',
    title: 'Remote Customer Support Executive',
    org: 'TechSeva Solutions Pvt. Ltd.',
    location: 'Bhilwara, Rajasthan',
    disability: 'Locomotor disability · 55%',
    disabilityTag: 'Locomotor',
    disabilityColor: '#0056B3',
    expertise: ['Work From Home Setup', 'CRM Tools', 'GST Filing', 'Communication Skills'],
    mentees: 9,
    rating: 4.8,
    reviews: 17,
    sessions: 38,
    languages: ['Hindi', 'Rajasthani'],
    badge: 'Rising Star',
    badgeColor: '#15803D',
    story: 'Wheelchair user who overcame commute barriers by securing a full WFH arrangement. Now helps others negotiate remote roles with MSMEs.',
    availability: 'Tuesdays & Thursdays 6–8pm · Chat preferred',
    avatar: 'PM',
    avatarBg: '#0E7490',
  },
  {
    id: 3,
    name: 'Arvind Sharma',
    title: 'Government Data Digitisation Officer',
    org: 'Nagaur District Collectorate',
    location: 'Nagaur, Rajasthan',
    disability: 'Hearing impairment · 80%',
    disabilityTag: 'Hearing',
    disabilityColor: '#6D28D9',
    expertise: ['Government Job Process', 'UDID Documentation', 'Typing Skills', 'Digital Literacy'],
    mentees: 21,
    rating: 4.7,
    reviews: 31,
    sessions: 88,
    languages: ['Hindi', 'English'],
    badge: 'Community Champion',
    badgeColor: '#0056B3',
    story: 'Cleared the Rajasthan government typing exam by practicing 2 hours daily for 6 months. Expert on navigating UDID and disability certificate processes.',
    availability: 'Daily 7–9am · Chat only (text preferred)',
    avatar: 'AS',
    avatarBg: '#6D28D9',
  },
  {
    id: 4,
    name: 'Sunita Patel',
    title: 'Digital Bookkeeper',
    org: 'Ajmer Traders Association',
    location: 'Ajmer, Rajasthan',
    disability: 'Cerebral palsy (mild)',
    disabilityTag: 'Locomotor',
    disabilityColor: '#0056B3',
    expertise: ['Tally ERP', 'Bookkeeping', 'MS Office', 'Self-Advocacy at Work'],
    mentees: 7,
    rating: 4.9,
    reviews: 12,
    sessions: 29,
    languages: ['Hindi', 'Mewari'],
    badge: 'Verified Mentor',
    badgeColor: '#15803D',
    story: 'Told by three employers she could not manage a desk job. employAIble matched her with an MSME 1.8 km from home. Now thriving and paying it forward.',
    availability: 'Weekends 9am–12pm · Video',
    avatar: 'SP',
    avatarBg: '#BE185D',
  },
  {
    id: 5,
    name: 'Mohan Bishnoi',
    title: 'E-Commerce Content Cataloguer',
    org: 'Meesho Partner Seller (Tonk)',
    location: 'Tonk, Rajasthan',
    disability: 'Intellectual disability (mild)',
    disabilityTag: 'Cognitive',
    disabilityColor: '#B45309',
    expertise: ['E-Commerce Product Listing', 'Mobile Workflow', 'Routine Task Management', 'Online Payments'],
    mentees: 5,
    rating: 4.6,
    reviews: 9,
    sessions: 19,
    languages: ['Hindi', 'Rajasthani'],
    badge: 'New Mentor',
    badgeColor: '#6B7280',
    story: 'Started with just basic phone skills. Was trained through the CSC portal. Now manages 400+ product listings independently using a simplified visual checklist system.',
    availability: 'Sundays 11am–1pm · Video (Hindi only)',
    avatar: 'MB',
    avatarBg: '#B45309',
  },
  {
    id: 6,
    name: 'Kavitha Rathore',
    title: 'Remote IT Support Technician',
    org: 'DigiSupport India Pvt. Ltd.',
    location: 'Didwana, Rajasthan',
    disability: 'Low vision · 60%',
    disabilityTag: 'Visual',
    disabilityColor: '#0E7490',
    expertise: ['IT Troubleshooting', 'Remote Desktop Tools', 'Voice Screen Reader', 'Women in Tech'],
    mentees: 11,
    rating: 5.0,
    reviews: 14,
    sessions: 44,
    languages: ['Hindi', 'English'],
    badge: 'Top Mentor',
    badgeColor: '#B45309',
    story: 'Passed a digital skills certification using a magnification app and a phone. The only PwD in her company who works fully remotely. Actively mentors women with visual impairments.',
    availability: 'Mon, Wed, Fri 8–10pm · Video & Chat',
    avatar: 'KR',
    avatarBg: '#15803D',
  },
]

const successStories = [
  {
    name: 'Deepak Verma',
    avatar: 'DV',
    avatarBg: '#0056B3',
    location: 'Ajmer',
    role: 'Now: Data Entry Clerk · Ajmer Co-op Bank',
    story: 'I applied to 12 places and was rejected every time. My mentor Ramesh taught me to highlight my NVDA speed in interviews. employAIble matched me with a role where screen-reader access was already verified. I got placed in 18 days.',
    mentorName: 'Ramesh Kumar',
    daysToPlacement: 18,
    spp: 87,
    liked: false,
    likes: 142,
    disability: 'Visual',
  },
  {
    name: 'Rekha Kumari',
    avatar: 'RKu',
    avatarBg: '#6D28D9',
    location: 'Bhilwara',
    role: 'Now: Remote Customer Support · TechSeva',
    story: 'Priya didi showed me exactly how to set up my home workspace with my wheelchair and laptop stand. Nobody at any job portal ever thought about that. Now I earn ₹16,000/month and I have not missed a single day.',
    mentorName: 'Priya Meena',
    daysToPlacement: 27,
    spp: 79,
    liked: false,
    likes: 98,
    disability: 'Locomotor',
  },
  {
    name: 'Suresh Tak',
    avatar: 'ST',
    avatarBg: '#15803D',
    location: 'Nagaur',
    role: 'Now: Data Digitisation Officer · Collectorate',
    story: 'Arvind bhai guided me through the entire government disability certificate process. The paperwork alone took 3 weeks, but he had done it before and knew every shortcut. I would not have survived without that guidance.',
    mentorName: 'Arvind Sharma',
    daysToPlacement: 45,
    spp: 83,
    liked: false,
    likes: 211,
    disability: 'Hearing',
  },
]

const discussions = [
  {
    id: 1,
    author: 'Ramesh Kumar',
    authorRole: 'Mentor · Ajmer',
    avatar: 'RK',
    avatarBg: '#0056B3',
    time: '2 hours ago',
    tag: 'Tip',
    tagColor: '#15803D',
    tagBg: '#DCFCE7',
    title: 'NVDA keyboard shortcut guide for Tally ERP — free download',
    body: 'I have compiled a Hindi-language shortcut reference sheet for Tally ERP9 using NVDA. This helped 6 of my mentees pass their typing assessments. Sharing the PDF here for everyone.',
    likes: 87,
    replies: 23,
    bookmarked: false,
  },
  {
    id: 2,
    author: 'Priya Meena',
    authorRole: 'Mentor · Bhilwara',
    avatar: 'PM',
    avatarBg: '#0E7490',
    time: '5 hours ago',
    tag: 'Question',
    tagColor: '#0056B3',
    tagBg: '#E8F0FA',
    title: 'Which MSMEs in Rajasthan allow full WFH for locomotor PwDs?',
    body: 'Looking to build a verified employer list for members who cannot commute. If your employer allows WFH, please reply with district and company type. Building a shared resource.',
    likes: 54,
    replies: 41,
    bookmarked: false,
  },
  {
    id: 3,
    author: 'Kavitha Rathore',
    authorRole: 'Mentor · Didwana',
    avatar: 'KR',
    avatarBg: '#15803D',
    time: '1 day ago',
    tag: 'Success',
    tagColor: '#B45309',
    tagBg: '#FEF3C7',
    title: 'My mentee Pooja cleared IT support interview — here is what worked',
    body: 'Pooja has low vision and zero formal IT training. We spent 3 weeks on remote desktop tools using magnification. The turning point was reframing her "limitation" as "she works in high-contrast, distraction-free mode". The employer loved it.',
    likes: 203,
    replies: 67,
    bookmarked: false,
  },
  {
    id: 4,
    author: 'New Member · Tonk',
    authorRole: 'Registered 3 days ago',
    avatar: '?',
    avatarBg: '#6B7280',
    time: '3 days ago',
    tag: 'Help Needed',
    tagColor: '#B91C1C',
    tagBg: '#FEE2E2',
    title: 'How do I explain my disability to a new employer without losing the job offer?',
    body: 'I have a locomotor condition (40% disability). I was given an offer letter and then it was withdrawn when I disclosed. Has anyone faced this and recovered? Looking for guidance.',
    likes: 38,
    replies: 29,
    bookmarked: false,
  },
]

const upcomingEvents = [
  {
    title: 'Resume Writing for PwDs — Live Workshop',
    host: 'Arvind Sharma',
    date: 'Sun, 14 Sep 2026',
    time: '11:00 AM – 1:00 PM',
    mode: 'Google Meet (Free)',
    spots: 12,
    lang: 'Hindi',
    type: 'Workshop',
    typeColor: '#0056B3',
    typeBg: '#E8F0FA',
  },
  {
    title: 'Mock Interview with Screen Reader — Tally & Data Entry Roles',
    host: 'Ramesh Kumar',
    date: 'Sat, 20 Sep 2026',
    time: '10:00 AM – 12:30 PM',
    mode: 'Video + Demo',
    spots: 8,
    lang: 'Hindi / English',
    type: 'Mock Interview',
    typeColor: '#B45309',
    typeBg: '#FEF3C7',
  },
  {
    title: 'WFH Setup Clinic — Locomotor PwD Edition',
    host: 'Priya Meena',
    date: 'Thu, 25 Sep 2026',
    time: '6:00 PM – 7:30 PM',
    mode: 'WhatsApp Video',
    spots: 6,
    lang: 'Hindi',
    type: 'Clinic',
    typeColor: '#15803D',
    typeBg: '#DCFCE7',
  },
]

const filters = ['All', 'Visual', 'Locomotor', 'Hearing', 'Cognitive']

/* ─── SUB-COMPONENTS ────────────────────────────── */

function Avatar({ initials, bg, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: size > 40 ? 15 : 12,
      flexShrink: 0, letterSpacing: '.02em'
    }}>
      {initials}
    </div>
  )
}

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12}
          fill={i <= Math.round(rating) ? '#B45309' : 'none'}
          color={i <= Math.round(rating) ? '#B45309' : '#D1DAE8'}
        />
      ))}
      <span style={{ fontSize: 12, color: '#6B7280', marginLeft: 2 }}>{rating}</span>
    </div>
  )
}

function MentorCard({ mentor, onConnect }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [showStory, setShowStory] = useState(false)

  return (
    <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Top accent bar */}
      <div style={{ height: 4, background: mentor.disabilityColor }} />

      <div style={{ padding: '20px 20px 0' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
          <Avatar initials={mentor.avatar} bg={mentor.avatarBg} size={52} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#2D2D2D' }}>{mentor.name}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                background: mentor.badgeColor + '18', color: mentor.badgeColor,
                border: `1px solid ${mentor.badgeColor}40`, textTransform: 'uppercase', letterSpacing: '.05em'
              }}>⭐ {mentor.badge}</span>
            </div>
            <div style={{ fontSize: 13, color: '#4B5563', fontWeight: 600 }}>{mentor.title}</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>{mentor.org}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
              <MapPin size={11} color="#6B7280" />
              <span style={{ fontSize: 12, color: '#6B7280' }}>{mentor.location}</span>
            </div>
          </div>
          <button onClick={() => setBookmarked(b => !b)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: bookmarked ? '#0056B3' : '#D1DAE8',
          }}>
            <Bookmark size={18} fill={bookmarked ? '#0056B3' : 'none'} />
          </button>
        </div>

        {/* Disability & rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
            background: mentor.disabilityColor + '15', color: mentor.disabilityColor,
            border: `1px solid ${mentor.disabilityColor}30`, textTransform: 'uppercase', letterSpacing: '.05em'
          }}>{mentor.disabilityTag}</span>
          <StarRating rating={mentor.rating} />
          <span style={{ fontSize: 12, color: '#6B7280' }}>({mentor.reviews} reviews)</span>
        </div>

        {/* Expertise tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {mentor.expertise.map(tag => (
            <span key={tag} className="badge badge-gray" style={{ fontSize: 10 }}>{tag}</span>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 14, borderTop: '1px solid #EEF2F7', borderBottom: '1px solid #EEF2F7', padding: '10px 0' }}>
          {[
            { val: mentor.mentees, lbl: 'Mentees' },
            { val: mentor.sessions, lbl: 'Sessions' },
            { val: mentor.languages.join(' · '), lbl: 'Languages' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid #EEF2F7' : 'none' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#2D2D2D', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Story snippet */}
        <div>
          <button onClick={() => setShowStory(s => !s)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: 12, color: '#0056B3', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
            marginBottom: showStory ? 10 : 0
          }}>
            <BookOpen size={13} /> {showStory ? 'Hide story' : 'Read their story'}
          </button>
          {showStory && (
            <div style={{ padding: '12px 14px', background: '#F5F7FA', borderRadius: 8, border: '1px solid #D1DAE8', fontSize: 13, color: '#4B5563', lineHeight: 1.7, marginBottom: 10 }}>
              "{mentor.story}"
            </div>
          )}
        </div>

        {/* Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, marginTop: 8 }}>
          <Clock size={13} color="#15803D" />
          <span style={{ fontSize: 12, color: '#15803D', fontWeight: 600 }}>{mentor.availability}</span>
        </div>
      </div>

      {/* Action footer */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #D1DAE8', padding: '13px 20px', display: 'flex', gap: 10 }}>
        <button onClick={onConnect} className="btn-blue btn-sm" style={{ flex: 2, justifyContent: 'center', gap: 6 }}>
          <MessageCircle size={14} /> Request mentorship
        </button>
        <button className="btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', gap: 6 }}>
          <Video size={14} /> Preview
        </button>
      </div>
    </div>
  )
}

/* ─── MAIN COMPONENT ────────────────────────────── */

export default function CommunityPanel() {
  const [activeTab, setActiveTab] = useState('mentors')
  const [filterType, setFilterType] = useState('All')
  const [searchQ, setSearchQ] = useState('')
  const [requestedId, setRequestedId] = useState(null)
  const [likedStories, setLikedStories] = useState({})
  const [likedPosts, setLikedPosts] = useState({})
  const [newPost, setNewPost] = useState('')
  const [postSent, setPostSent] = useState(false)
  const [registeredEvent, setRegisteredEvent] = useState({})

  const filteredMentors = mentors.filter(m => {
    const matchType = filterType === 'All' || m.disabilityTag === filterType
    const matchSearch = searchQ === '' ||
      m.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      m.expertise.some(e => e.toLowerCase().includes(searchQ.toLowerCase())) ||
      m.location.toLowerCase().includes(searchQ.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* ── HERO HEADER ──────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #EBF2FC 0%, #E0F5F8 100%)',
          border: '1px solid #D1DAE8',
          borderRadius: 16,
          padding: '40px 40px 36px',
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative blob */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(0,86,179,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: 120, width: 160, height: 160, borderRadius: '50%', background: 'rgba(14,116,144,0.07)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Community & Mentorship</div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.2 }}>
              Placed PwDs mentoring<br />
              <span style={{ color: '#0056B3' }}>the next generation of PwDs.</span>
            </h1>
            <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.8, maxWidth: 600, marginBottom: 24 }}>
              Our community is powered by <strong style={{ color: '#2D2D2D' }}>persons with disabilities who are already employed</strong> — sharing real workplace knowledge, accessibility hacks, and employment paths that actually worked for them.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('mentors')} className="btn-blue" style={{ fontSize: 14 }}>
                Find a Mentor <ArrowRight size={15} />
              </button>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                border: '1.5px solid #0056B3', background: '#fff', color: '#0056B3', cursor: 'pointer',
              }}>
                <Mic size={15} /> Become a Mentor
              </button>
            </div>
          </div>
        </div>

        {/* ── COMMUNITY STATS ────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
          {communityStats.map((s, i) => (
            <div key={i} className="card p-5" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D', marginTop: 6 }}>{s.label}</div>
              <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 3 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── NAVIGATION TABS ─────────────────────── */}
        <div style={{
          display: 'flex', gap: 4, background: '#FFFFFF', padding: '4px',
          borderRadius: 10, border: '1px solid #D1DAE8', marginBottom: 28,
          overflowX: 'auto'
        }}>
          {[
            { id: 'mentors',   icon: Users,           label: 'Mentors'        },
            { id: 'stories',   icon: Heart,           label: 'Success Stories' },
            { id: 'forum',     icon: MessageCircle,   label: 'Community Forum' },
            { id: 'events',    icon: Calendar,        label: 'Upcoming Events' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', padding: '8px 16px' }}>
              <tab.icon size={15} /> {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════
             TAB: MENTORS
        ══════════════════════════════════════════ */}
        {activeTab === 'mentors' && (
          <div>
            {/* Search + filter bar */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: '1 1 260px' }}>
                <Search size={16} color="#6B7280" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  className="input"
                  style={{ paddingLeft: 38, background: '#FFFFFF' }}
                  placeholder="Search by name, skill, or location..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <Filter size={14} color="#6B7280" />
                {filters.map(f => (
                  <button key={f} onClick={() => setFilterType(f)} style={{
                    padding: '7px 14px', borderRadius: 7, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', border: `1.5px solid ${filterType === f ? '#0056B3' : '#D1DAE8'}`,
                    background: filterType === f ? '#E8F0FA' : '#FFFFFF',
                    color: filterType === f ? '#0056B3' : '#4B5563', transition: 'all 0.15s'
                  }}>{f}</button>
                ))}
              </div>
            </div>

            {/* Mentor "Apply as Mentor" banner */}
            <div style={{
              background: 'linear-gradient(135deg, #003D80, #0056B3)',
              borderRadius: 12, padding: '20px 24px', marginBottom: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 16, flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  Are you employed and living with a disability?
                </div>
                <div style={{ fontSize: 13.5, color: '#BFDBFE', lineHeight: 1.6 }}>
                  Share your experience. Mentor 1 hour/week. Help someone like you find their path.
                </div>
              </div>
              <button style={{
                padding: '10px 22px', borderRadius: 8, background: '#fff', color: '#0056B3',
                fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <Zap size={15} /> Apply as Mentor
              </button>
            </div>

            {/* Results count */}
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
              Showing <strong style={{ color: '#2D2D2D' }}>{filteredMentors.length}</strong> mentor{filteredMentors.length !== 1 ? 's' : ''}
              {filterType !== 'All' ? ` with ${filterType} disability` : ''}
              {searchQ ? ` matching "${searchQ}"` : ''}
            </div>

            {/* Mentor grid */}
            {filteredMentors.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
                {filteredMentors.map(mentor => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onConnect={() => setRequestedId(mentor.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="card p-12" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 38, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 6 }}>No mentors found</div>
                <div style={{ fontSize: 13.5, color: '#4B5563' }}>Try a different filter or search term.</div>
              </div>
            )}

            {/* Connect confirmation toast */}
            {requestedId && (
              <div style={{
                position: 'fixed', bottom: 24, right: 24, zIndex: 100,
                background: '#2D2D2D', color: '#fff', borderRadius: 12, padding: '16px 22px',
                display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                animation: 'pageIn .3s ease both',
              }}>
                <CheckCircle size={22} color="#15803D" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Mentorship request sent!</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
                    {mentors.find(m => m.id === requestedId)?.name} will respond within 24 hours.
                  </div>
                </div>
                <button onClick={() => setRequestedId(null)} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
             TAB: SUCCESS STORIES
        ══════════════════════════════════════════ */}
        {activeTab === 'stories' && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#2D2D2D', marginBottom: 6 }}>
                Real placements. Real journeys.
              </h2>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>
                Stories submitted by community members who found employment through employAIble and mentorship.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {successStories.map((story, i) => {
                const liked = likedStories[i]
                return (
                  <div key={i} className="card" style={{ overflow: 'hidden' }}>
                    {/* Colored side strip */}
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 5, background: '#0056B3', flexShrink: 0, borderRadius: '12px 0 0 12px' }} />
                      <div style={{ flex: 1, padding: '24px 28px' }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                          <Avatar initials={story.avatar} bg={story.avatarBg} size={56} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                              <span style={{ fontSize: 16, fontWeight: 800, color: '#2D2D2D' }}>{story.name}</span>
                              <span style={{ fontSize: 11, color: '#6B7280' }}>
                                <MapPin size={11} color="#6B7280" style={{ verticalAlign: 'middle' }} /> {story.location}
                              </span>
                            </div>
                            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#15803D', marginBottom: 14 }}>
                              ✓ {story.role}
                            </div>

                            {/* Story quote */}
                            <div style={{
                              padding: '16px 20px', background: '#F5F7FA', borderRadius: 10,
                              border: '1px solid #D1DAE8', borderLeft: '4px solid #0056B3',
                              fontSize: 14, color: '#4B5563', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 16
                            }}>
                              "{story.story}"
                            </div>

                            {/* Stats row */}
                            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
                              {[
                                { label: 'Days to placement', val: `${story.daysToPlacement} days`, color: '#0056B3' },
                                { label: 'Final SPP score', val: `${story.spp}%`, color: '#15803D' },
                                { label: 'Mentored by', val: story.mentorName, color: '#B45309' },
                              ].map((s, j) => (
                                <div key={j}>
                                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>{s.label}</div>
                                  <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.val}</div>
                                </div>
                              ))}
                            </div>

                            {/* Reaction row */}
                            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                              <button onClick={() => setLikedStories(p => ({ ...p, [i]: !p[i] }))} style={{
                                display: 'flex', alignItems: 'center', gap: 6, background: liked ? '#FEE2E2' : 'none',
                                border: `1px solid ${liked ? '#FECACA' : '#D1DAE8'}`, borderRadius: 6,
                                padding: '6px 12px', cursor: 'pointer', color: liked ? '#B91C1C' : '#6B7280', fontSize: 13, fontWeight: 600,
                                transition: 'all .15s'
                              }}>
                                <Heart size={14} fill={liked ? '#B91C1C' : 'none'} />
                                {story.likes + (liked ? 1 : 0)}
                              </button>
                              <button style={{
                                display: 'flex', alignItems: 'center', gap: 6, background: 'none',
                                border: '1px solid #D1DAE8', borderRadius: 6, padding: '6px 12px',
                                cursor: 'pointer', color: '#6B7280', fontSize: 13, fontWeight: 600,
                              }}>
                                <Share2 size={14} /> Share
                              </button>
                              <span style={{ fontSize: 12, color: '#6B7280', marginLeft: 'auto' }}>
                                💙 This story has helped many like you
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

            {/* CTA */}
            <div style={{
              marginTop: 28, padding: '28px 32px', background: 'linear-gradient(135deg, #DCFCE7, #E0F5F8)',
              border: '1px solid #A7F3D0', borderRadius: 14, textAlign: 'center'
            }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#2D2D2D', marginBottom: 6 }}>
                Found a job? Share your story.
              </div>
              <p style={{ fontSize: 14, color: '#4B5563', marginBottom: 16 }}>
                Your journey will help the next person take their first step.
              </p>
              <button className="btn-blue">Submit Your Story <ArrowRight size={15} /></button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
             TAB: FORUM
        ══════════════════════════════════════════ */}
        {activeTab === 'forum' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
              {/* Main feed */}
              <div>
                {/* New post composer */}
                <div className="card p-5" style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 12 }}>
                    Start a discussion or share a tip
                  </div>
                  <textarea
                    className="input"
                    style={{ minHeight: 90, resize: 'vertical', marginBottom: 12, fontFamily: 'inherit', lineHeight: 1.6 }}
                    placeholder="Ask a question, share a success, or post a resource for the community..."
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                  />
                  {postSent && (
                    <div style={{ padding: '10px 14px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, fontSize: 13, color: '#15803D', fontWeight: 600, marginBottom: 10 }}>
                      ✓ Your post has been submitted for community review!
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button className="btn-ghost btn-sm">
                      <Mic size={13} /> Voice post
                    </button>
                    <button
                      className="btn-blue btn-sm"
                      disabled={!newPost.trim()}
                      style={{ opacity: newPost.trim() ? 1 : 0.5 }}
                      onClick={() => { setPostSent(true); setNewPost(''); setTimeout(() => setPostSent(false), 4000); }}
                    >
                      <Send size={13} /> Post
                    </button>
                  </div>
                </div>

                {/* Discussion posts */}
                {discussions.map(post => {
                  const liked = likedPosts[post.id]
                  return (
                    <div key={post.id} className="card p-6" style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <Avatar initials={post.avatar} bg={post.avatarBg} size={40} />
                        <div style={{ flex: 1 }}>
                          {/* Author row */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>{post.author}</span>
                            <span style={{ fontSize: 12, color: '#6B7280' }}>· {post.authorRole}</span>
                            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#9CA3AF' }}>{post.time}</span>
                          </div>

                          {/* Tag + Title */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span style={{
                              fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                              background: post.tagBg, color: post.tagColor,
                              textTransform: 'uppercase', letterSpacing: '.04em'
                            }}>{post.tag}</span>
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2D2D', marginBottom: 8, lineHeight: 1.4 }}>
                            {post.title}
                          </div>
                          <div style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.75, marginBottom: 14 }}>
                            {post.body}
                          </div>

                          {/* Reaction bar */}
                          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <button onClick={() => setLikedPosts(p => ({ ...p, [post.id]: !p[post.id] }))} style={{
                              display: 'flex', alignItems: 'center', gap: 5, background: liked ? '#E8F0FA' : 'none',
                              border: `1px solid ${liked ? '#BFDBFE' : '#D1DAE8'}`, borderRadius: 6,
                              padding: '5px 11px', cursor: 'pointer',
                              color: liked ? '#0056B3' : '#6B7280', fontSize: 12.5, fontWeight: 600,
                              transition: 'all .15s'
                            }}>
                              <ThumbsUp size={13} fill={liked ? '#0056B3' : 'none'} />
                              {post.likes + (liked ? 1 : 0)}
                            </button>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: 5, background: 'none',
                              border: '1px solid #D1DAE8', borderRadius: 6, padding: '5px 11px',
                              cursor: 'pointer', color: '#6B7280', fontSize: 12.5, fontWeight: 600,
                            }}>
                              <MessageCircle size={13} /> {post.replies} replies
                            </button>
                            <button style={{
                              background: 'none', border: 'none', cursor: 'pointer',
                              color: '#6B7280', fontSize: 12.5, fontWeight: 600,
                              display: 'flex', alignItems: 'center', gap: 4,
                              marginLeft: 'auto'
                            }}>
                              <Share2 size={13} /> Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Community guidelines */}
                <div className="card p-5">
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Award size={16} color="#0056B3" /> Community guidelines
                  </div>
                  {[
                    'Speak from lived experience',
                    'No employer-specific complaints',
                    'Uplift, do not belittle',
                    'Share verified resources only',
                    'Hindi and regional languages welcome',
                  ].map((g, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#4B5563', padding: '6px 0', borderBottom: i < 4 ? '1px solid #EEF2F7' : 'none' }}>
                      <CheckCircle size={13} color="#15803D" style={{ flexShrink: 0, marginTop: 2 }} /> {g}
                    </div>
                  ))}
                </div>

                {/* Popular topics */}
                <div className="card p-5">
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingUp size={16} color="#0056B3" /> Popular topics
                  </div>
                  {[
                    { tag: '#ScreenReaderTips', posts: 84 },
                    { tag: '#WFHForPwD', posts: 67 },
                    { tag: '#UDIDProcess', posts: 52 },
                    { tag: '#TallyWithNVDA', posts: 48 },
                    { tag: '#InterviewPrep', posts: 41 },
                    { tag: '#MSMESubsidies', posts: 33 },
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 5 ? '1px solid #EEF2F7' : 'none' }}>
                      <span style={{ fontSize: 13, color: '#0056B3', fontWeight: 600, cursor: 'pointer' }}>{t.tag}</span>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>{t.posts} posts</span>
                    </div>
                  ))}
                </div>

                {/* Notification opt-in */}
                <div style={{ padding: '16px 18px', background: '#E8F0FA', border: '1px solid #BFDBFE', borderRadius: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Bell size={15} color="#0056B3" />
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0056B3' }}>Stay updated</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.6, marginBottom: 12 }}>
                    Get SMS alerts when mentors post new resources in your disability category.
                  </p>
                  <button className="btn-blue btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    Enable notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
             TAB: EVENTS
        ══════════════════════════════════════════ */}
        {activeTab === 'events' && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#2D2D2D', marginBottom: 6 }}>
                Upcoming community events
              </h2>
              <p style={{ fontSize: 14, color: '#4B5563' }}>
                Free workshops, mock interviews, and clinics — run by mentors for the community.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {upcomingEvents.map((ev, i) => (
                <div key={i} className="card p-6" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Date block */}
                  <div style={{
                    minWidth: 72, background: '#EEF2F7', borderRadius: 10,
                    padding: '14px 10px', textAlign: 'center', flexShrink: 0
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#0056B3', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                      {ev.date.split(' ')[1]}
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#2D2D2D', lineHeight: 1.1 }}>
                      {ev.date.split(' ')[2]}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                      {ev.date.split(' ')[3]}
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 5,
                        background: ev.typeBg, color: ev.typeColor, textTransform: 'uppercase', letterSpacing: '.05em'
                      }}>{ev.type}</span>
                      <span className="badge badge-gray" style={{ fontSize: 10 }}>
                        <Globe size={10} /> {ev.lang}
                      </span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2D2D', marginBottom: 6 }}>{ev.title}</div>
                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#4B5563' }}>
                        <Users size={13} color="#6B7280" /> Hosted by <strong>{ev.host}</strong>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#4B5563' }}>
                        <Clock size={13} color="#6B7280" /> {ev.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#4B5563' }}>
                        <Video size={13} color="#6B7280" /> {ev.mode}
                      </div>
                    </div>
                  </div>

                  {/* Register */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    {registeredEvent[i] ? (
                      <div style={{ padding: '10px 18px', background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: 8, color: '#15803D', fontWeight: 700, fontSize: 13 }}>
                        ✓ Registered!
                      </div>
                    ) : (
                      <>
                        <button onClick={() => setRegisteredEvent(p => ({ ...p, [i]: true }))}
                          className="btn-blue btn-sm" style={{ display: 'block', width: '100%', justifyContent: 'center', marginBottom: 6 }}>
                          Register Free
                        </button>
                        <div style={{ fontSize: 12, color: ev.spots <= 6 ? '#B91C1C' : '#6B7280', fontWeight: ev.spots <= 6 ? 700 : 400 }}>
                          {ev.spots} spot{ev.spots !== 1 ? 's' : ''} left
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Propose an event */}
            <div style={{ marginTop: 28, padding: '28px 32px', background: '#F5F7FA', border: '1px solid #D1DAE8', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: '#E8F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={22} color="#0056B3" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>Want to host an event?</div>
                  <p style={{ fontSize: 13.5, color: '#4B5563' }}>
                    Mentors can propose free workshops or mock interviews. The platform provides scheduling, video link, and reminders.
                  </p>
                </div>
                <button className="btn-ghost" style={{ flexShrink: 0 }}>
                  Propose event <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
