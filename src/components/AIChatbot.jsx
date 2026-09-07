import { useState, useRef, useEffect } from 'react'
import {
  MessageSquare, X, Send, Bot, Sparkles, Volume2, VolumeX,
  RotateCcw, ChevronDown, CheckCircle, ExternalLink, User,
  Shield, Landmark, Briefcase, Award, Zap
} from 'lucide-react'

// Pre-packaged domain knowledge engine for employAIble
const KNOWLEDGE_RESPONSES = [
  {
    triggers: ['scheme', 'yojana', 'welfare', 'benefit', 'subsidy', 'government', 'govt'],
    response: `Here are the key Government Welfare Schemes under DEPwD & MSJE:

1. **ADIP Scheme (ARJUN Portal)**:
   • Free assistive devices (Smart Cane, DAISY Player, Wheelchairs, BTE Hearing Aids).
   • Up to ₹25,000 subsidy for Motorised Tricycles (80%+ locomotor disability, age 18+).
   • 100% grant for income <= ₹22,500/month.

2. **Swavlamban Health Insurance**:
   • ₹2,00,000 health cover per year (covers all 21 RPwD categories).
   • 100% free premium for families earning <= ₹3 Lakh/year.

3. **NIRAMAYA Health Scheme (National Trust)**:
   • ₹1,00,000 health cover for Autism, Cerebral Palsy & Intellectual Disabilities.
   • Premium only ₹250 to ₹500/year with no pre-insurance medical test.

4. **NHFDC Concessional Loans**:
   • Low-interest loans up to ₹5 Lakhs for starting self-employment, retail kiosks, or home ventures.

5. **4% Statutory Quota (Section 34)**:
   • Reserved seats across central & state government departments.`,
    chips: ['Tell me about ADIP', 'How to apply for Swavlamban?', 'Explain 4% Quota']
  },
  {
    triggers: ['spp', 'score', 'algorithm', 'probability', 'match', 'calculation'],
    response: `**SPP (Sustainable Placement Probability)** is employAIble's predictive retention algorithm.

Unlike standard job boards that only match resume keywords, SPP predicts whether a placement will last beyond **90 days** using 5 weighted dimensions:

• **Skill Match (30%)**: Functional capability for role tasks.
• **Transit Feasibility (20%)**: Accessible corridors, low-floor buses & commute distance.
• **Workplace Accessibility (20%)**: Elevators, ramps, and accessible washrooms.
• **Assistive Tech Compatibility (15%)**: Compatibility with NVDA, screen magnifiers, or AAC tools.
• **Shift Compatibility (15%)**: Daylight shifts & flexible working hours.

*Tip:* An SPP score above 80% represents a high-sustainability placement!`,
    chips: ['How to increase my SPP?', 'View Candidate Matches', 'Why 90 days?']
  },
  {
    triggers: ['adip', 'device', 'wheelchair', 'cane', 'hearing aid', 'tricycle', 'prosthetic', 'limbs'],
    response: `**ADIP Scheme (Assistance to Disabled Persons for Purchase/Fitting of Aids & Appliances)**:

Nodal Portal: **adip.disabilityaffairs.gov.in (ARJUN Portal)**

**What devices can you get?**
• **Visual Impairment**: Ultrasonic Smart Cane, Universal Braille Slate, DAISY Audio Player, Android Tablet with screen reader.
• **Locomotor**: Adult Folding Wheelchair, Crutches, Rollators, Artificial Limbs (ALIMCO), Motorised Tricycle (₹25k subsidy for 80%+ disability).
• **Hearing**: Digital BTE (Behind-The-Ear) hearing aids & Cochlear Implant surgical assistance via AYJNISHD Mumbai.
• **Intellectual**: Age-banded Teaching-Learning Material (TLM) kits.

*Income Slab:* Free devices if income is <= ₹22,500/month; 50% subsidy if ₹22,501–₹30,000/month.`,
    chips: ['Motorised Tricycle rules', 'Check other schemes', 'Official Portals']
  },
  {
    triggers: ['employer', 'msme', 'company', 'hire', 'subsidy for employer', 'cost', 'accommodation'],
    response: `**Employer Benefits & Workplace Subsidies**:

Employers often fear that hiring PwD candidates is expensive. Here is how employAIble & the government support employers:

1. **MSME Accessible India Scheme**:
   • Covers up to **70% of workplace adaptation costs** (ramps, tactile trails, ergonomic desks).
   • Net employer out-of-pocket investment drops to under ₹6,000 on average.

2. **EPFO / PF Contribution Waiver**:
   • Government reimburses the employer's share of EPF/ESI contributions for PwD employees earning up to ₹25,000/month for up to 3 years.

3. **Tax Deductions & Incentives**:
   • Special tax deductions under Section 80JJAA for new inclusive hiring.

4. **Retention Advantage**:
   • Studies show PwD employees have a **2.4x higher retention rate** when provided reasonable accommodations.`,
    chips: ['Go to Employer Portal', 'What is 4% mandate?', 'Calculate my cost']
  },
  {
    triggers: ['quota', '4%', 'section 34', 'reservation', 'rpwd', 'law', 'legal'],
    response: `**Section 34 of the RPwD Act, 2016 (4% Employment Mandate)**:

Every government establishment and public enterprise must reserve at least **4% of vacancies** for benchmark disabilities (40%+ disability), distributed equally:

• **1% - Category A**: Blindness and Low Vision.
• **1% - Category B**: Deaf and Hard of Hearing.
• **1% - Category C**: Locomotor Disability (including Cerebral Palsy, Leprosy Cured, Dwarfism, Acid Attack Victims).
• **1% - Category D & E**: Autism, Intellectual Disability, Specific Learning Disability, Mental Illness & Multiple Disabilities.

Our **Government Dashboard (/government)** tracks compliance across all these categories for state departments.`,
    chips: ['View Govt Dashboard', 'What is benchmark disability?', 'Candidate Rights']
  },
  {
    triggers: ['udid', 'card', 'certificate', 'swavlamban card', 'swavlambancard'],
    response: `**UDID (Unique Disability ID) Card**:

• **What is it?** A single national digital ID and disability certificate issued under the Ministry of Social Justice & Empowerment.
• **Official Portal**: **swavlambancard.gov.in**
• **Why is it essential?** It eliminates the need to carry multiple hospital papers. A single UDID card is accepted across India for:
  - 4% government job reservations.
  - Concessional railway and bus travel.
  - Swavlamban health insurance & ADIP device dispatches.
  - State subsistence pensions.

*You can use our CSC Rural Kiosk (/csc) to scan your UDID QR code directly!*`,
    chips: ['How to verify UDID?', 'Go to CSC Desk', 'Health Insurance']
  },
  {
    triggers: ['job', 'vacancy', 'career', 'work', 'hiring', 'candidate', 'apply'],
    response: `**Looking for inclusive jobs on employAIble?**

We have gazetted opportunities mapped directly to transit and accommodations:
• **Ajmer Central Co-operative Bank**: Data Entry & CBS Assistant (₹18,500 - ₹22,000/mo, Screen reader certified).
• **TechSeva Solutions**: Remote Citizen Helpdesk / Bookkeeper (₹15,000 - ₹19,000/mo, 100% WFH).
• **District Information Office**: Digital Records Cataloguer (₹15,000 - ₹19,000/mo, OCR-assisted).
• **e-NAM Mandi Terminal**: Electronic Billing & Weighment Operator (₹14,500 - ₹18,000/mo).

👉 Head to the **Candidate Portal (/candidate)** to get your custom SPP-ranked matches!`,
    chips: ['Open Candidate Portal', 'Calculate SPP Score', 'Show Schemes']
  }
]

// Fallback intelligent generator
function generateAIResponse(userText) {
  const query = userText.toLowerCase().trim()
  
  for (const item of KNOWLEDGE_RESPONSES) {
    if (item.triggers.some(t => query.includes(t))) {
      return { text: item.response, chips: item.chips }
    }
  }

  // Smart contextual default
  return {
    text: `I am **Sahayak AI**, your inclusive employment and welfare guide.

I can assist you with:
• **Government Welfare Schemes**: ADIP free devices, Swavlamban health insurance (₹2L cover), NIRAMAYA, and scholarships.
• **SPP Scoring**: How your skills, transit corridors, and accessibility needs are matched.
• **RPwD Act Rights**: The 4% government reservation quota under Section 34.
• **Employer Subsidies**: Up to 70% reimbursement under Accessible India for MSMEs.

Please ask me any question or choose one of the quick topics below!`,
    chips: [
      'What schemes am I eligible for?',
      'How does SPP matching work?',
      'Free assistive devices under ADIP',
      'What subsidies do employers get?'
    ]
  }
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Namaste! 🙏 I am **Sahayak AI**, your career and government scheme assistant.\n\nHow can I help you today? You can ask about government welfare schemes, your SPP match score, or job vacancies!`,
      time: 'Just now',
      chips: [
        '💡 What schemes am I eligible for?',
        '🎯 How does SPP score work?',
        '♿ ADIP free assistive devices',
        '🏢 Employer subsidies (70%)'
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [unread, setUnread] = useState(1)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (open) {
      scrollToBottom()
      setUnread(0)
    }
  }, [messages, open])

  // Speech synthesis reader
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[*#•_`]/g, '').replace(/\[.*?\]\(.*?\)/g, '')
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = 'en-IN'
    utterance.rate = 0.95
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim()
    if (!query) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiReply = generateAIResponse(query)
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: aiReply.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: aiReply.chips
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)

      if (voiceEnabled) {
        speakText(aiReply.text)
      }
    }, 550)
  }

  const handleChipClick = (chip) => {
    handleSend(chip.replace(/^[^\w\s]+/, '').trim())
  }

  const handleClearChat = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Chat history reset. How can I assist you with your career or government benefits?',
        time: 'Just now',
        chips: [
          '💡 What schemes am I eligible for?',
          '🎯 How does SPP score work?',
          '♿ ADIP free assistive devices',
          '🏢 Employer subsidies (70%)'
        ]
      }
    ])
  }

  return (
    <>
      {/* Floating Trigger Button */}
      {!open && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <button
            onClick={() => setOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 30,
              background: 'linear-gradient(135deg, #0056B3 0%, #0E7490 100%)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 86, 179, 0.35)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              fontWeight: 700,
              fontSize: 14.5
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            aria-label="Open Sahayak AI Chatbot"
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={18} color="#FFFFFF" />
            </div>
            <span>Sahayak AI</span>
            <span style={{
              fontSize: 10.5,
              background: '#DCFCE7',
              color: '#15803D',
              padding: '2px 7px',
              borderRadius: 12,
              fontWeight: 800,
              letterSpacing: '.04em'
            }}>
              ONLINE
            </span>
            {unread > 0 && (
              <span style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#B91C1C',
                color: '#fff',
                fontSize: 11,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff'
              }}>
                {unread}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Main Chatbot Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 'clamp(340px, 92vw, 420px)',
            height: 'clamp(520px, 80vh, 620px)',
            background: '#FFFFFF',
            borderRadius: 16,
            boxShadow: '0 12px 40px rgba(0, 30, 80, 0.22)',
            border: '1.5px solid #BFDBFE',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, #0056B3 0%, #003D80 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid rgba(255,255,255,0.4)'
              }}>
                <Bot size={20} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>Sahayak AI</span>
                  <span style={{
                    fontSize: 10,
                    background: 'rgba(220, 252, 231, 0.25)',
                    color: '#86EFAC',
                    border: '1px solid rgba(134, 239, 172, 0.4)',
                    padding: '1px 6px',
                    borderRadius: 10,
                    fontWeight: 700
                  }}>
                    Govt & SPP Guide
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: '#BFDBFE', opacity: 0.9 }}>
                  Inclusive Career & Welfare Assistant
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Voice Read Aloud Toggle */}
              <button
                type="button"
                onClick={() => {
                  const nextVoice = !voiceEnabled
                  setVoiceEnabled(nextVoice)
                  if (!nextVoice && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel()
                  }
                }}
                title={voiceEnabled ? 'Turn off voice speech' : 'Turn on audio voice reading'}
                style={{
                  background: voiceEnabled ? '#15803D' : 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: 6,
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF'
                }}
              >
                {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              {/* Reset / Clear Chat */}
              <button
                type="button"
                onClick={handleClearChat}
                title="Reset chat history"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: 6,
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF'
                }}
              >
                <RotateCcw size={14} />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
                }}
                title="Close chat"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: 6,
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Voice active notification banner */}
          {voiceEnabled && (
            <div style={{
              background: '#DCFCE7',
              borderBottom: '1px solid #BBF7D0',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 11.5,
              color: '#15803D',
              fontWeight: 600
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Volume2 size={13} /> Voice guidance is ON (reading responses aloud)
              </span>
              <button
                type="button"
                onClick={() => {
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
                }}
                style={{ background: 'none', border: 'none', color: '#15803D', cursor: 'pointer', fontSize: 11, textDecoration: 'underline', fontWeight: 700 }}
              >
                Stop Audio
              </button>
            </div>
          )}

          {/* Messages Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            background: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            gap: 14
          }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  maxWidth: '88%',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: msg.sender === 'user' ? '#0E7490' : '#0056B3',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2
                  }}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={15} />}
                  </div>

                  {/* Message Bubble */}
                  <div style={{
                    background: msg.sender === 'user' ? '#0056B3' : '#FFFFFF',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#2D2D2D',
                    padding: '12px 14px',
                    borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    whiteSpace: 'pre-line'
                  }}>
                    {msg.text}

                    {/* Speaker icon on bot message */}
                    {msg.sender === 'bot' && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, paddingTop: 4, borderTop: '1px solid #F1F5F9' }}>
                        <button
                          type="button"
                          onClick={() => speakText(msg.text)}
                          title="Listen to this response"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#0056B3',
                            fontSize: 11,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontWeight: 600
                          }}
                        >
                          <Volume2 size={12} /> Listen
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <span style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 3, marginInline: '36px' }}>
                  {msg.time}
                </span>

                {/* Quick Reply Chips below bot message */}
                {msg.sender === 'bot' && msg.chips && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginTop: 8,
                    marginLeft: 36,
                    maxWidth: '85%'
                  }}>
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        style={{
                          background: '#E8F0FA',
                          border: '1px solid #BFDBFE',
                          color: '#0056B3',
                          padding: '4px 10px',
                          borderRadius: 14,
                          fontSize: 11.5,
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all .15s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#0056B3'
                          e.currentTarget.style.color = '#FFFFFF'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = '#E8F0FA'
                          e.currentTarget.style.color = '#0056B3'
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Typing indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: '#0056B3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>
                  <Bot size={15} />
                </div>
                <div style={{
                  background: '#FFFFFF', padding: '10px 14px', borderRadius: 14,
                  border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 5
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0056B3', animation: 'pulse 1s infinite' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0056B3', animation: 'pulse 1s infinite 0.2s' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0056B3', animation: 'pulse 1s infinite 0.4s' }} />
                  <span style={{ fontSize: 11.5, color: '#64748B', marginLeft: 4, fontWeight: 600 }}>Analyzing RPwD standards...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions bar */}
          <div style={{
            background: '#FFFFFF',
            borderTop: '1px solid #EEF2F7',
            padding: '8px 14px',
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {[
              '💡 Welfare Schemes',
              '🎯 SPP Formula',
              '♿ ADIP Devices',
              '🏢 Employer Subsidies',
              '📜 4% Quota Rules'
            ].map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(topic.replace(/^[^\w\s]+/, '').trim())}
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  borderRadius: 12,
                  padding: '3px 9px',
                  fontSize: 11,
                  color: '#475569',
                  cursor: 'pointer',
                  fontWeight: 600,
                  flexShrink: 0
                }}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            style={{
              padding: '10px 14px',
              background: '#FFFFFF',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about schemes, jobs, or SPP..."
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: 8,
                border: '1.5px solid #D1DAE8',
                fontSize: 13.5,
                outline: 'none',
                background: '#F8FAFC'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#0056B3'}
              onBlur={e => e.currentTarget.style.borderColor = '#D1DAE8'}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: input.trim() ? '#0056B3' : '#CBD5E1',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'background .15s'
              }}
              title="Send question"
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </>
  )
}
