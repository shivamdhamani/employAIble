export const GOVT_SCHEMES_DATA = {
  // Cross-disability schemes that apply to all
  umbrella: [
    {
      id: 'udid',
      name: 'UDID (Unique Disability ID)',
      body: 'DEPwD, Ministry of Social Justice & Empowerment',
      benefit: 'Single Digital ID & Nationwide Certificate',
      whatItDoes: 'Acts as the single national digital ID and disability certificate. Serves as the mandatory gateway document for accessing all central and state welfare schemes, train passes, and pensions.',
      eligibility: 'Any Person with Disability (21 RPwD categories); issued via district medical boards.',
      portalName: 'Swavlamban Portal',
      portalUrl: 'https://www.swavlambancard.gov.in',
      tag: 'Gateway ID',
      badgeColor: '#0056B3'
    },
    {
      id: 'swavlamban-ins',
      name: 'Swavlamban Health Insurance Scheme',
      body: 'National Insurance Co. / DEPwD',
      benefit: '₹2,00,000 Health Cover / Year',
      whatItDoes: 'Comprehensive affordable health insurance cover of ₹2 Lakhs per year. 100% free premium for families with income <= ₹3,00,000/yr. Covers OPD, pre-existing conditions, hospitalization, and all 21 RPwD categories.',
      eligibility: 'Valid UDID or disability certificate; family income <= ₹3 Lakh/yr for 100% subsidy.',
      portalName: 'DEPwD Swavlamban',
      portalUrl: 'https://disabilityaffairs.gov.in',
      tag: 'Health Insurance',
      badgeColor: '#15803D'
    },
    {
      id: 'adip-umbrella',
      name: 'ADIP Scheme (Aids & Appliances)',
      body: 'MSJE via ALIMCO & State Channelising Agencies',
      benefit: '100% Free / Subsidised Assistive Devices',
      whatItDoes: 'Provides modern, durable, and sophisticated ISI-certified aids and assistive appliances to improve physical, social, and psychological independence and employment readiness.',
      eligibility: '40%+ benchmark disability; monthly income <= ₹30,000 (100% subsidy if <= ₹22,500/mo; 50% subsidy above).',
      portalName: 'ARJUN Portal (ADIP)',
      portalUrl: 'https://adip.disabilityaffairs.gov.in',
      tag: 'Assistive Tech',
      badgeColor: '#0E7490'
    },
    {
      id: 'scholarships-pwd',
      name: 'National Scholarships for Students with Disabilities',
      body: 'DEPwD, Ministry of Social Justice & Empowerment',
      benefit: 'Monthly Allowance + Full Fee Reimbursement',
      whatItDoes: 'Six merged umbrella scholarship schemes: Pre-Matric (₹500–₹800/mo + book grant), Post-Matric (maintenance allowance up to ₹1,600/mo hostellers / ₹750 day scholars), Top Class Education, and National Fellowship for M.Phil/PhD.',
      eligibility: '40%+ benchmark disability; family income ceiling <= ₹2.5 Lakh/yr.',
      portalName: 'National Scholarship Portal',
      portalUrl: 'https://scholarships.gov.in',
      tag: 'Education Grant',
      badgeColor: '#6D28D9'
    },
    {
      id: 'nhfdc-loans',
      name: 'NHFDC Concessional Self-Employment Loans',
      body: 'National Handicapped Finance & Development Corp.',
      benefit: 'Concessional Business Loans up to ₹5,00,000',
      whatItDoes: 'Low-interest financial assistance to start retail kiosks, cyber centers, digital bookkeeping desks, tailoring units, or micro-businesses. Also covers skill-training grants under Vishesh Microfinance Yojana.',
      eligibility: 'Indian citizen with 40%+ disability; annual income ceiling <= ₹3,00,000.',
      portalName: 'NHFDC Portal',
      portalUrl: 'https://nhfdc.nic.in',
      tag: 'Self-Employment',
      badgeColor: '#B45309'
    },
    {
      id: 'quota-4-percent',
      name: '4% Statutory Employment Reservation',
      body: 'DoPT / State Governments (Under RPwD Act 2016)',
      benefit: 'Mandatory 4% Public Sector & Govt Jobs',
      whatItDoes: 'Mandates 4% reserved seats in all government departments, universities, and public sector undertakings across 4 categories: 1% Blindness/Low Vision, 1% Deaf/Hard of Hearing, 1% Locomotor/Cerebral Palsy, and 1% Autism/Multiple/Intellectual.',
      eligibility: '40%+ benchmark disability certified by designated medical authority.',
      portalName: 'DoPT Gazette Roster',
      portalUrl: 'https://dopt.gov.in',
      tag: 'Statutory Quota',
      badgeColor: '#0056B3'
    },
    {
      id: 'travel-concession',
      name: 'National Rail & Bus Concession',
      body: 'Ministry of Railways / RSRTC State Transport',
      benefit: 'Up to 75% Fare Concession + Free Escort Pass',
      whatItDoes: 'Concessional travel across all classes (including 3AC/Sleeper) for PwD plus one accompanying escort or attendant on production of photo disability certificate or UDID card.',
      eligibility: 'Valid UDID or Railway Disability Concession Card.',
      portalName: 'IRCTC Concession System',
      portalUrl: 'https://www.irctc.co.in',
      tag: 'Transit Benefit',
      badgeColor: '#4B5563'
    },
    {
      id: 'igndps-pension',
      name: 'IGNDPS (Indira Gandhi National Disability Pension)',
      body: 'Ministry of Rural Development under NSAP',
      benefit: 'Monthly Direct Benefit Transfer Cash Pension',
      whatItDoes: 'Direct monthly cash pension deposited into the candidate bank account to provide social security and subsistence allowance.',
      eligibility: '80%+ severe disability or multiple disabilities; BPL (Below Poverty Line) cardholder.',
      portalName: 'NSAP DBT Portal',
      portalUrl: 'https://nsap.nic.in',
      tag: 'Direct Pension',
      badgeColor: '#B91C1C'
    }
  ],

  // Specific to Visual Impairment
  visual: [
    {
      id: 'adip-visual-devices',
      name: 'ADIP Visual Assistive Tech Toolkit',
      body: 'ALIMCO / DEPwD (ARJUN Portal)',
      benefit: 'Free Smart Cane, DAISY Player, Tablet & Braille Slate',
      whatItDoes: 'Dispatches high-value assistive kits: Ultrasonic Smart Cane, Universal Braille Slate, Taylor Frame, Abacus, Hand Magnifier, DAISY Audio Player for textbooks, and Android Accessible Tablet preloaded with screen reader software.',
      eligibility: 'Visual impairment (Blindness or Low Vision 40%+); income <= ₹30,000/mo.',
      portalName: 'ARJUN Portal (ADIP)',
      portalUrl: 'https://adip.disabilityaffairs.gov.in',
      tag: 'Hardware Kit',
      badgeColor: '#0056B3'
    },
    {
      id: 'niepvd-dehradun',
      name: 'National Institute (NIEPVD Dehradun) Training & Tools',
      body: 'National Institute for Empowerment of Persons with Visual Disabilities',
      benefit: 'Specialized Computer Training, Screen Reader & Braille Tools',
      whatItDoes: 'Provides high-end digital orientation training, NVDA/JAWS certification, refreshable Braille displays, and job-placement linkage for visually impaired youth.',
      eligibility: 'Visually impaired candidates seeking vocational qualification.',
      portalName: 'NIEPVD Official',
      portalUrl: 'https://niepvd.nic.in',
      tag: 'Skill & Tools',
      badgeColor: '#0056B3'
    },
    {
      id: 'ddrs-blind',
      name: 'DDRS (Deendayal Disabled Rehabilitation Scheme)',
      body: 'MSJE via Registered Blind Welfare NGOs',
      benefit: 'Free Mobility, Orientation & Scribe Support',
      whatItDoes: 'Funds community NGOs to provide white-cane mobility training, orientation on public transport routes, audio-recorded study materials, and exam scribe assistance.',
      eligibility: 'All visual impairment candidates.',
      portalName: 'e-Anudaan (MSJE)',
      portalUrl: 'https://eanudaan.dosje.gov.in',
      tag: 'Rehabilitation',
      badgeColor: '#0E7490'
    }
  ],

  // Specific to Hearing Impairment
  hearing: [
    {
      id: 'adip-hearing-aids',
      name: 'ADIP Digital Hearing Aid Distribution',
      body: 'ALIMCO / DEPwD (ARJUN Portal)',
      benefit: 'High-Fidelity BTE (Behind-The-Ear) Digital Hearing Aids',
      whatItDoes: 'Issues customized Mild, Moderate, or Extra-Strong Class BTE digital hearing aids with audiogram testing and free battery packs. Eliminates communication barriers for workplace calls and meetings.',
      eligibility: 'Deaf or Hard of Hearing (40%+ loss); monthly income <= ₹30,000/mo.',
      portalName: 'ARJUN Portal (ADIP)',
      portalUrl: 'https://adip.disabilityaffairs.gov.in',
      tag: 'Hearing Devices',
      badgeColor: '#6D28D9'
    },
    {
      id: 'ayjnishd-cochlear',
      name: 'Cochlear Implant Surgical Assistance (AYJNISHD)',
      body: 'Ali Yavar Jung National Institute, Mumbai / MSJE',
      benefit: 'Full Surgical Support up to ₹6,00,000',
      whatItDoes: 'High-cost surgical cochlear implant procedure along with 2 years of post-operative speech-language therapy for eligible individuals, transforming congenital hearing loss into functional speech.',
      eligibility: 'Profound hearing impairment; income <= ₹20,000/mo; recommended through empanelled hospitals.',
      portalName: 'AYJNISHD Portal',
      portalUrl: 'http://ayjnihh.nic.in',
      tag: 'Surgical Support',
      badgeColor: '#6D28D9'
    },
    {
      id: 'islrtc-sign',
      name: 'ISLRTC Sign Language & Video Relay Services',
      body: 'Indian Sign Language Research and Training Centre',
      benefit: 'Certified Video Interpreters & Work Translators',
      whatItDoes: 'Provides access to digital Indian Sign Language (ISL) dictionary, video relay interpretation for interviews, and accessible workplace training modules.',
      eligibility: 'Deaf & Hard of Hearing individuals, employers, and educational institutions.',
      portalName: 'ISLRTC Portal',
      portalUrl: 'https://islrtc.nic.in',
      tag: 'Accessibility',
      badgeColor: '#0E7490'
    }
  ],

  // Specific to Locomotor Disability
  locomotor: [
    {
      id: 'motorised-tricycle-subsidy',
      name: 'Motorised Tricycle & Wheelchair Subsidy',
      body: 'ALIMCO / DEPwD under ADIP Scheme',
      benefit: 'Special Subsidy up to ₹25,000 for Motorised Vehicle',
      whatItDoes: 'Provides high-power battery-operated motorized tricycles or electric wheelchairs, enabling independent long-distance travel to offices, industrial clusters, and college campuses.',
      eligibility: 'Age 18+ years; 80%+ benchmark locomotor disability; provided once every 10 years.',
      portalName: 'ARJUN Portal (ADIP)',
      portalUrl: 'https://adip.disabilityaffairs.gov.in',
      tag: 'Motorised Mobility',
      badgeColor: '#0E7490'
    },
    {
      id: 'adip-mobility-appliances',
      name: 'ADIP Wheelchairs, Walkers & Tricycles',
      benefit: 'Free Adult Wheelchairs, Tricycles, Rollators & Crutches',
      body: 'ALIMCO / State Social Welfare Camps',
      whatItDoes: 'Free dispatches of ergonomic adult folding wheelchairs, quadripod walking sticks, elbow crutches, standing frames, and rollators for home-to-transit mobility.',
      eligibility: '40%+ locomotor disability; monthly income <= ₹30,000.',
      portalName: 'ARJUN Portal (ADIP)',
      portalUrl: 'https://adip.disabilityaffairs.gov.in',
      tag: 'Mobility Aids',
      badgeColor: '#0E7490'
    },
    {
      id: 'adip-prosthetics-orthotics',
      name: 'Advanced Orthotic & Prosthetic Appliances',
      body: 'ALIMCO Artificial Limb Fitting Centres',
      benefit: 'Free AFO, KAFO, HKAFO Surgical Shoes & Artificial Limbs',
      whatItDoes: 'Custom fabrication and fitting of modular artificial lower/upper limbs, AFO/KAFO calipers with specialized surgical shoes, knee cages, and corrective orthopedic surgeries.',
      eligibility: 'Limb amputation, polio, or orthopedic impairment (40%+).',
      portalName: 'ALIMCO National Hub',
      portalUrl: 'https://www.alimco.in',
      tag: 'Prosthetics',
      badgeColor: '#15803D'
    },
    {
      id: 'nhfdc-transport-shop',
      name: 'NHFDC Micro-Kiosk & Transport Loans',
      body: 'NHFDC / State Channelising Agencies',
      benefit: 'Concessional Loan for Adapted Vehicle or Home Retail',
      whatItDoes: 'Provides low-interest financing specifically to set up sedentary work (e.g., CSC kiosk, digital bookkeeping desk, photocopy center) suited to candidates with reduced mobility.',
      eligibility: 'Locomotor disability (40%+); income <= ₹3 Lakh/year.',
      portalName: 'NHFDC Portal',
      portalUrl: 'https://nhfdc.nic.in',
      tag: 'Livelihood Loan',
      badgeColor: '#B45309'
    }
  ],

  // Specific to Autism, Intellectual Disability, Cerebral Palsy & Multiple
  cognitive: [
    {
      id: 'niramaya-health',
      name: 'NIRAMAYA Health Insurance Scheme',
      body: 'The National Trust (Statutory Body under MSJE)',
      benefit: '₹1,00,000/yr Health Cover (Premium ₹250–₹500/yr)',
      whatItDoes: 'Dedicated insurance tailored for Autism, Cerebral Palsy, Intellectual Disability, and Multiple Disabilities. Covers OPD visits, dental, psychiatric therapy, surgeries, AYUSH, and sensory therapies. No pre-insurance medical test required; no age cap.',
      eligibility: 'Valid certificate under National Trust Act; open to all income categories (₹250/yr for BPL, ₹500/yr for non-BPL).',
      portalName: 'The National Trust Portal',
      portalUrl: 'https://thenationaltrust.gov.in',
      tag: 'Special Insurance',
      badgeColor: '#B45309'
    },
    {
      id: 'sambhav-resource',
      name: 'SAMBHAV Assistive Technology & Aids Centres',
      body: 'The National Trust',
      benefit: 'Access to Assistive Software, AAC Boards & Adaptive Devices',
      whatItDoes: 'Resource centres set up to showcase and loan augmentative & alternative communication (AAC) devices, sensory toys, cognitive training software, and modified keyboards.',
      eligibility: 'Persons with Autism, Cerebral Palsy, Intellectual Disability, or Multiple Disabilities.',
      portalName: 'The National Trust Portal',
      portalUrl: 'https://thenationaltrust.gov.in',
      tag: 'Resource Hub',
      badgeColor: '#0E7490'
    },
    {
      id: 'vikaas-vocational',
      name: 'VIKAAS (Day Care & Vocational Skill Building)',
      body: 'The National Trust',
      benefit: 'Free Day Care & Employment Readiness Training',
      whatItDoes: 'Day-care centres for individuals aged 10+ years providing vocational capability building, interpersonal communication skills, and sheltered workshop activities.',
      eligibility: 'Age 10+ years with benchmark neurodivergent or intellectual disability.',
      portalName: 'The National Trust Portal',
      portalUrl: 'https://thenationaltrust.gov.in',
      tag: 'Day Care & Skills',
      badgeColor: '#6D28D9'
    },
    {
      id: 'prerna-marketing',
      name: 'PRERNA Marketing & Livelihood Assistance',
      body: 'The National Trust',
      benefit: 'Sales Exhibition Space & Fair-Trade Product Linkage',
      whatItDoes: 'Provides financial and logistical assistance to market goods, handicrafts, and digital products produced by PwDs in sheltered workshops or home units.',
      eligibility: 'Registered organizations and SHGs of persons under National Trust Act.',
      portalName: 'The National Trust Portal',
      portalUrl: 'https://thenationaltrust.gov.in',
      tag: 'Market Linkage',
      badgeColor: '#15803D'
    },
    {
      id: 'adip-tlm-kits',
      name: 'ADIP Teaching-Learning Material (TLM) Kits',
      body: 'ALIMCO / NIEPID Secunderabad',
      benefit: 'Age-Banded Cognitive Learning Kits (0–18 Years)',
      whatItDoes: 'Distributes age-banded cognitive and educational kits (0–3, 4–6, 7–11, 12–18 yrs) with sensory development tools, functional math puzzles, and self-help training modules.',
      eligibility: 'Certified intellectual disability / autism; income <= ₹30,000/mo.',
      portalName: 'ARJUN Portal (ADIP)',
      portalUrl: 'https://adip.disabilityaffairs.gov.in',
      tag: 'Learning Kits',
      badgeColor: '#B45309'
    },
    {
      id: 'samarth-gharaunda',
      name: 'SAMARTH & GHARAUNDA (Group Home & Respite Care)',
      body: 'The National Trust',
      benefit: 'Lifelong Care, Permanent Shelter & Respite Support',
      whatItDoes: 'Provides lifelong residential homes and short-term respite care for adults with autism and intellectual disabilities when aging parents can no longer care for them.',
      eligibility: 'Adults with conditions under National Trust Act; priority for orphans and BPL families.',
      portalName: 'The National Trust Portal',
      portalUrl: 'https://thenationaltrust.gov.in',
      tag: 'Social Security',
      badgeColor: '#4B5563'
    }
  ]
};

// Helper to get all schemes for a candidate
export function getSchemesForDisability(disabilityId) {
  const specific = GOVT_SCHEMES_DATA[disabilityId] || [];
  const umbrella = GOVT_SCHEMES_DATA.umbrella || [];
  return {
    specific,
    umbrella,
    totalCount: specific.length + umbrella.length
  };
}
