import { useState, useEffect, useRef } from 'react'
import {
  CheckCircle, Wifi, WifiOff, Volume2, VolumeX, Mic, QrCode,
  AlertCircle, MapPin, Download, RotateCcw, Play, Printer,
  FileCheck, Shield, Sparkles, Check, ArrowRight, ArrowLeft
} from 'lucide-react'

// Comprehensive multilingual localization dictionary
const content = {
  'हिंदी': {
    langCode: 'hi-IN',
    portalTitle: 'सीएससी / ग्राम पंचायत सहायक पोर्टल',
    portalDesc: 'ग्रामीण व कस्बाई उम्मीदवारों हेतु सहज, वाणी-निर्देशित और ऑफलाइन-सक्षम पंजीकरण।',
    onlineStatus: 'ऑनलाइन कनेक्टेड (Active)',
    offlineStatus: 'ऑफलाइन मोड सक्रिय (Local Storage)',
    offlineNote: 'इंटरनेट न होने पर भी विवरण सुरक्षित रहेगा और कनेक्शन आने पर स्वतः सिंक होगा।',
    voiceGuideOn: 'आवाज़ गाइड चालू (Speaking)',
    voiceGuideOff: 'आवाज़ गाइड शुरू करें (Voice Guide)',
    listenPrompt: 'निर्देश पुनः सुनें (Play Audio)',
    steps: ['भाषा', 'जानकारी', 'दिव्यांगता', 'कौशल', 'पावती'],
    step0: {
      title: 'अपनी पसंदीदा भाषा चुनें',
      sub: 'Select candidate preferred language',
      btnContinue: 'आगे बढ़ें (Continue)',
      voicePrompt: 'नमस्ते! कृपया अपनी पसंदीदा भाषा चुनें और आगे बढ़ें बटन दबाएं।'
    },
    step1: {
      title: 'मूल पहचान विवरण',
      sub: 'Applicant Personal & Contact Information',
      nameLabel: 'उम्मीदवार का पूरा नाम',
      namePlaceholder: 'जैसे: रमेश कुमार शर्मा...',
      villageLabel: 'गांव / कस्बा / तहसील',
      villagePlaceholder: 'जैसे: किशनगढ़, अजमेर...',
      mobileLabel: '10 अंकों का मोबाइल नंबर',
      mobilePlaceholder: 'जैसे: 98290XXXXX...',
      scanTitle: 'UDID कार्ड क्यूआर कोड स्कैन करें',
      scanSub: 'स्वावलंबन कार्ड से विवरण स्वतः भरें (Auto-fill)',
      scanBtn: 'स्कैन शुरू करें',
      scanSuccess: '✓ UDID कार्ड सफलतापूर्वक स्कैन हुआ: RJ-01-2021-0849201',
      btnBack: 'वापस',
      btnNext: 'आगे बढ़ें',
      voicePrompt: 'कृपया उम्मीदवार का नाम, गांव और मोबाइल नंबर दर्ज करें, या स्वावलंबन कार्ड का क्यूआर कोड स्कैन करें।'
    },
    step2: {
      title: 'दिव्यांगता की श्रेणी चुनें',
      sub: 'Select Government Benchmark Disability Category',
      options: [
        { id: 'visual', emoji: '👁️', title: 'दृष्टि बाधित (Visual Impairment)', desc: 'कम दृष्टि अथवा पूर्ण दृष्टिहीनता (Category A)' },
        { id: 'hearing', emoji: '👂', title: 'श्रवण बाधित (Hearing Impairment)', desc: 'सुनने व बोलने में कठिनाई (Category B)' },
        { id: 'locomotor', emoji: '🦽', title: 'चलन दिव्यांगता (Locomotor Disability)', desc: 'हड्डी, जोड़ या अंगों में गतिशीलता की समस्या (Category C)' },
        { id: 'cognitive', emoji: '🧠', title: 'बौद्धिक / ऑटिज्म (Intellectual / Autism)', desc: 'सीखने, ध्यान या समझ में विशेष सहायता की आवश्यकता (Category D)' },
      ],
      notice: 'यदि सरकारी UDID कार्ड नहीं बना है, तो पोर्टल स्वतः निकटतम जिला पुनर्वास केंद्र (DDRC) को पंजीकरण अग्रेषित करेगा।',
      btnBack: 'वापस',
      btnNext: 'आगे बढ़ें',
      voicePrompt: 'कृपया उम्मीदवार की दिव्यांगता श्रेणी चुनें। प्रमाण पत्र न होने पर भी पंजीकरण मान्य रहेगा।'
    },
    step3: {
      title: 'कार्य क्षमताएं व कौशल',
      sub: 'Select all functional capabilities that candidate can perform',
      options: [
        { id: 'phone', emoji: '📱', label: 'स्मार्टफोन व व्हाट्सएप चलाना आता है' },
        { id: 'computer', emoji: '💻', label: 'कंप्यूटर पर कीबोर्ड टाइपिंग व डेटा एंट्री कर सकते हैं' },
        { id: 'reading', emoji: '📖', label: 'हिंदी अथवा स्थानीय भाषा में कागजात पढ़ सकते हैं' },
        { id: 'numbers', emoji: '🔢', label: 'दुकान या मंडी का सामान्य जोड़-घटाव (हिसाब) कर सकते हैं' },
        { id: 'speaking', emoji: '🗣️', label: 'ग्राहकों व फोन पर स्पष्ट बातचीत कर सकते हैं' },
      ],
      btnBack: 'वापस',
      btnSubmit: 'पंजीकरण पूर्ण करें ✓',
      voicePrompt: 'उम्मीदवार जो-जो काम कर सकते हैं, उन सभी विकल्पों पर टिक करें।'
    },
    step4: {
      badge: 'पंजीकरण सफल (Registration Complete)',
      title: 'बधाई हो! पंजीकरण दर्ज हुआ 🎉',
      sub: 'उम्मीदवार का प्रोफाइल सफलतापूर्वक रोजगार एक्सचेंज में दर्ज हो चुका है।',
      summaryTitle: 'पंजीकरण रसीद विवरण (Profile Summary)',
      nextTitle: 'आगे की प्रक्रिया (Next Steps):',
      next1: '24 से 48 घंटे में योग्य नौकरियों की SMS सूचना पंजीकृत मोबाइल पर प्राप्त होगी।',
      next2: 'ग्राम पंचायत रोजगार सहायक अथवा निकटतम CSC केंद्र से सत्यापन कॉल आएगा।',
      next3: 'RPWD अधिनियम 2016 की धारा 34 के तहत 4% आरक्षित पदों पर प्राथमिकता दी जाएगी।',
      btnDownload: 'आधिकारिक पावती रसीद डाउनलोड करें (Download Slip)',
      btnNew: 'नया उम्मीदवार जोड़ें (Register Another)',
      voicePrompt: 'बधाई हो! पंजीकरण सफलतापूर्वक संपन्न हुआ। पावती रसीद डाउनलोड करें।'
    }
  },

  'English': {
    langCode: 'en-IN',
    portalTitle: 'CSC / Gram Panchayat Assisted Portal',
    portalDesc: 'Accessible, voice-guided, offline-resilient onboarding for rural & semi-urban candidates.',
    onlineStatus: 'Online Connected (Active)',
    offlineStatus: 'Offline Mode Active (Local Storage)',
    offlineNote: 'Data is stored locally in device storage and syncs automatically upon reconnection.',
    voiceGuideOn: 'Voice Guide Active (Speaking)',
    voiceGuideOff: 'Enable Voice Guide',
    listenPrompt: 'Replay Audio Instructions',
    steps: ['Language', 'Details', 'Disability', 'Skills', 'Receipt'],
    step0: {
      title: 'Select Preferred Language',
      sub: 'Choose candidate regional language for full interface & voice prompts',
      btnContinue: 'Continue to Details',
      voicePrompt: 'Welcome! Please choose your preferred language and press continue.'
    },
    step1: {
      title: 'Candidate Identification',
      sub: 'Applicant Personal & Contact Information',
      nameLabel: 'Candidate Full Name',
      namePlaceholder: 'e.g. Ramesh Kumar Sharma...',
      villageLabel: 'Village / Town / Tehsil',
      villagePlaceholder: 'e.g. Kishangarh, Ajmer...',
      mobileLabel: '10-Digit Mobile Number',
      mobilePlaceholder: 'e.g. 98290XXXXX...',
      scanTitle: 'Scan UDID Card QR Code',
      scanSub: 'Auto-fill details directly from Swavlamban Card',
      scanBtn: 'Scan QR Now',
      scanSuccess: '✓ UDID Card Scanned Successfully: RJ-01-2021-0849201',
      btnBack: 'Back',
      btnNext: 'Next Step',
      voicePrompt: 'Please enter candidate name, village, and mobile number, or scan the UDID QR code.'
    },
    step2: {
      title: 'Disability Classification',
      sub: 'Select Government Benchmark Disability Category',
      options: [
        { id: 'visual', emoji: '👁️', title: 'Visual Impairment', desc: 'Low vision or total blindness (Benchmark Category A)' },
        { id: 'hearing', emoji: '👂', title: 'Hearing & Speech Impairment', desc: 'Deaf or hard of hearing (Benchmark Category B)' },
        { id: 'locomotor', emoji: '🦽', title: 'Locomotor Disability', desc: 'Limb, mobility or musculoskeletal condition (Benchmark Category C)' },
        { id: 'cognitive', emoji: '🧠', title: 'Intellectual / Autism Spectrum', desc: 'Cognitive or developmental support needs (Benchmark Category D)' },
      ],
      notice: 'If UDID card is not yet issued, registration is automatically referred to nearest District Disability Rehabilitation Centre (DDRC).',
      btnBack: 'Back',
      btnNext: 'Next Step',
      voicePrompt: 'Please select the candidate disability category.'
    },
    step3: {
      title: 'Functional Capabilities',
      sub: 'Select all functional capabilities that candidate can perform',
      options: [
        { id: 'phone', emoji: '📱', label: 'Can operate smartphone & WhatsApp for work' },
        { id: 'computer', emoji: '💻', label: 'Can perform basic keyboard data entry on computer' },
        { id: 'reading', emoji: '📖', label: 'Can read local language documents & forms' },
        { id: 'numbers', emoji: '🔢', label: 'Can calculate basic shop or inventory sums' },
        { id: 'speaking', emoji: '🗣️', label: 'Can communicate clearly with customers and peers' },
      ],
      btnBack: 'Back',
      btnSubmit: 'Complete Registration ✓',
      voicePrompt: 'Select all functional tasks the candidate can perform comfortably.'
    },
    step4: {
      badge: 'Registration Successful',
      title: 'Congratulations! Profile Registered 🎉',
      sub: 'Candidate record has been synced with the district employment exchange.',
      summaryTitle: 'Official Registration Receipt',
      nextTitle: 'Next Steps & Follow-Up:',
      next1: 'SMS notifications for matching jobs will be dispatched within 24 to 48 hours.',
      next2: 'Local Gram Panchayat employment desk will conduct verification.',
      next3: 'Candidate will be prioritized under Section 34 of RPWD Act 2016 for 4% quota posts.',
      btnDownload: 'Download Official Registration Slip (PDF)',
      btnNew: 'Register Another Candidate',
      voicePrompt: 'Congratulations! Registration has been completed successfully. Please download the receipt slip.'
    }
  },

  'Rajasthani': {
    langCode: 'hi-IN',
    portalTitle: 'सीएससी / पंचायत सेवा केंद्र',
    portalDesc: 'म्हारा दिव्यांग भाई-भाणियां खातर बोल’र समझण और बिना नेट चालण वाळो सहज पोर्टल।',
    onlineStatus: 'नेट चाल रह्यो है (Online)',
    offlineStatus: 'ऑफलाइन चालू है (Local Cache)',
    offlineNote: 'नेट ना होवे तो भी पर्ची सुरक्षित रहसी, नेट आवता ही सरकारी पोर्टल पे जुड़ ज्यासी।',
    voiceGuideOn: 'आवाज़ निर्देश चालू है (Speaking)',
    voiceGuideOff: 'आवाज़ निर्देश सुणो (Voice Guide)',
    listenPrompt: 'निर्देश फेर सुणो (Replay Audio)',
    steps: ['भासा', 'नांव-ठिकाणो', 'दिव्यांगता', 'काम-काज', 'पर्ची'],
    step0: {
      title: 'आपणी भासा चुणो',
      sub: 'Select candidate preferred language',
      btnContinue: 'आगै बधो (Continue)',
      voicePrompt: 'राम-राम सा! आपणी मनपसंद भासा चुण’र आगै बधो वाळो बटन दबाओ सा।'
    },
    step1: {
      title: 'उम्मीदवार रो ब्योरो',
      sub: 'Applicant Personal & Contact Information',
      nameLabel: 'उम्मीदवार रो पूरो नांव',
      namePlaceholder: 'ज्यां: रमेश कुमार शर्मा...',
      villageLabel: 'गांव / ढाणी / कस्बो',
      villagePlaceholder: 'ज्यां: किशनगढ़, अजमेर...',
      mobileLabel: '10 अंका रो मोबाइल नंबर',
      mobilePlaceholder: 'ज्यां: 98290XXXXX...',
      scanTitle: 'स्वावलंबन कार्ड रो QR कोड स्कैन करो',
      scanSub: 'कार्ड सूं सारी जानकारी अपने-आप भर ज्यासी',
      scanBtn: 'QR स्कैन करो',
      scanSuccess: '✓ स्वावलंबन कार्ड स्कैन हो गयो: RJ-01-2021-0849201',
      btnBack: 'पाछा जाओ',
      btnNext: 'आगै बधो',
      voicePrompt: 'उम्मीदवार रो नांव, गांव और फोन नंबर लिखो सा, या स्वावलंबन कार्ड रो क्यूआर कोड स्कैन कराओ सा।'
    },
    step2: {
      title: 'दिव्यांगता री श्रेणी चुणो',
      sub: 'Select Government Benchmark Disability Category',
      options: [
        { id: 'visual', emoji: '👁️', title: 'आंख्यां री दिक्कत (दृष्टि बाधित)', desc: 'कम दीखणो या बिल्कुल ना दीखणो (Category A)' },
        { id: 'hearing', emoji: '👂', title: 'कानां री दिक्कत (श्रवण बाधित)', desc: 'सुणण व बोलण में अड़चन (Category B)' },
        { id: 'locomotor', emoji: '🦽', title: 'हाथ-पगां री दिक्कत (चलन दिव्यांगता)', desc: 'चालण-फिरण या हाथां में तकलीफ (Category C)' },
        { id: 'cognitive', emoji: '🧠', title: 'समझण री दिक्कत (बौद्धिक दिव्यांगता)', desc: 'धीमे सीखण या विशेष समझ री जरूरत (Category D)' },
      ],
      notice: 'अगर सरकारी प्रमाण-पत्र नी बण्यो है, तो पोर्टल आप ही जिला अस्पताल सूं जांच रो संदेश भेज देसी।',
      btnBack: 'पाछा जाओ',
      btnNext: 'आगै बधो',
      voicePrompt: 'उम्मीदवार री दिव्यांगता री श्रेणी चुणो सा। कागद नी होवे तो भी नांव जुड़ ज्यासी।'
    },
    step3: {
      title: 'कांई-कांई काम कर सकै है',
      sub: 'Select all functional capabilities that candidate can perform',
      options: [
        { id: 'phone', emoji: '📱', label: 'मोबाइल फोन अर व्हाट्सएप चला लेवै' },
        { id: 'computer', emoji: '💻', label: 'कंप्यूटर पर लिखाई-पढ़ाई अर टाइपिंग कर सकै' },
        { id: 'reading', emoji: '📖', label: 'कागद अर पर्ची बांच सकै' },
        { id: 'numbers', emoji: '🔢', label: 'दुकान-मंडी रो सीधा हिसाब-किताब कर लेवै' },
        { id: 'speaking', emoji: '🗣️', label: 'लोगां सूं फोन पर साफ बात कर सकै' },
      ],
      btnBack: 'पाछा जाओ',
      btnSubmit: 'पंजीकरण पक्को करो ✓',
      voicePrompt: 'उम्मीदवार जो-जो काम कर सकै है, वां सगळां पै निशान लगाओ सा।'
    },
    step4: {
      badge: 'पंजीकरण पूरो हो गयो सा',
      title: 'बधाई हो सा! नांव जुड़ गयो 🎉',
      sub: 'उम्मीदवार रो प्रोफाइल सरकारी रोजगार केंद्र में दर्ज हो चुक्यौ है।',
      summaryTitle: 'पंजीकरण रसीद (Summary)',
      nextTitle: 'आगै कांई होसी:',
      next1: '24 सूं 48 घंटां में नौकरी रो संदेश मोबाइल पै आवैगो।',
      next2: 'पंचायत रोजगार सहायक या सीएससी केंद्र सूं फोन आवैगो।',
      next3: 'सरकारी 4% कोटा में पहल दी ज्यासी।',
      btnDownload: 'रसीद पर्ची डाउनलोड करो (Download Slip)',
      btnNew: 'दूजो उम्मीदवार जोड़ो (New Candidate)',
      voicePrompt: 'बधाई हो सा! उम्मीदवार रो नांव जुड़ गयो है। रसीद डाउनलोड कर ल्यो सा।'
    }
  },

  'मारवाड़ी': {
    langCode: 'hi-IN',
    portalTitle: 'सीएससी / मारवाड़ पंचायत केंद्र',
    portalDesc: 'म्हारा मारवाड़ी दिव्यांग भाइयां खातर अवाज सूं चालण वाळो सहज केंद्र।',
    onlineStatus: 'नेट चालू है (Online)',
    offlineStatus: 'ऑफलाइन सेफ मोड (Offline)',
    offlineNote: 'नेट ना होवे तो भी नांव सुरक्षित रहसी, नेट आवतां ही केंद्र पै सिंक होसी।',
    voiceGuideOn: 'अवाज निर्देश चालू है (Speaking)',
    voiceGuideOff: 'अवाज निर्देश सुणो (Voice Guide)',
    listenPrompt: 'अवाज फेर सुणो (Audio Replay)',
    steps: ['भासा', 'ठिकाणो', 'दिक्कत', 'काम', 'पर्ची'],
    step0: {
      title: 'आपणी मारवाड़ी भासा चुणो',
      sub: 'Select candidate preferred language',
      btnContinue: 'आगै चालो (Continue)',
      voicePrompt: 'खम्मा घणी सा! आपणी भासा चुण’र आगै चालो बटन दबाओ सा।'
    },
    step1: {
      title: 'उम्मीदवार रो ब्योरो',
      sub: 'Applicant Personal & Contact Information',
      nameLabel: 'उम्मीदवार रो साचो नांव',
      namePlaceholder: 'ज्यां: रमेश कुमार शर्मा...',
      villageLabel: 'गांव / ढाणी / तहसील',
      villagePlaceholder: 'ज्यां: नागौर / मेड़ता...',
      mobileLabel: 'मोबाइल नंबर',
      mobilePlaceholder: 'ज्यां: 98290XXXXX...',
      scanTitle: 'स्वावलंबन कार्ड रो QR कोड स्कैन कराओ',
      scanSub: 'कार्ड सूं सारी विगत अपने-आप दर्ज हो ज्यासी',
      scanBtn: 'QR स्कैन करो',
      scanSuccess: '✓ स्वावलंबन कार्ड स्कैन हो गयो: RJ-21-2020-0193481',
      btnBack: 'पाछा चालो',
      btnNext: 'आगै चालो',
      voicePrompt: 'उम्मीदवार रो नांव, गांव अर मोबाइल नंबर लिखो सा।'
    },
    step2: {
      title: 'दिव्यांगता री श्रेणी चुणो',
      sub: 'Select Government Benchmark Disability Category',
      options: [
        { id: 'visual', emoji: '👁️', title: 'आंख्यां री दिक्कत', desc: 'दीखण में अड़चन (Category A)' },
        { id: 'hearing', emoji: '👂', title: 'कानां री दिक्कत', desc: 'सुणण-बोलण में अड़चन (Category B)' },
        { id: 'locomotor', emoji: '🦽', title: 'हाथ-पगां री दिक्कत', desc: 'चालण-फिरण में तकलीफ (Category C)' },
        { id: 'cognitive', emoji: '🧠', title: 'धीमी समझ री दिक्कत', desc: 'सहज काम री जरूरत (Category D)' },
      ],
      notice: 'सरकारी पर्ची नी होवे तो भी नांव दर्ज हो ज्यासी अर अस्पताल सूं जांच रो संदेश आवैगो।',
      btnBack: 'पाछा चालो',
      btnNext: 'आगै चालो',
      voicePrompt: 'उम्मीदवार री दिव्यांगता री श्रेणी चुणो सा।'
    },
    step3: {
      title: 'कांई-कांई काम कर सकै है',
      sub: 'Select all functional capabilities that candidate can perform',
      options: [
        { id: 'phone', emoji: '📱', label: 'मोबाइल फोन व संदेश चला लेवै' },
        { id: 'computer', emoji: '💻', label: 'कंप्यूटर पै काम अर टाइपिंग कर सकै' },
        { id: 'reading', emoji: '📖', label: 'कागद अर रसीद बांच लेवै' },
        { id: 'numbers', emoji: '🔢', label: 'दुकान रो रुपिया-पैसा रो हिसाब कर सकै' },
        { id: 'speaking', emoji: '🗣️', label: 'लोगां सूं फोन पै सीधी बात कर सकै' },
      ],
      btnBack: 'पाछा चालो',
      btnSubmit: 'पंजीकरण पक्को करो ✓',
      voicePrompt: 'उम्मीदवार जो काम कर सकै है, वां पै टिक लगाओ सा।'
    },
    step4: {
      badge: 'पंजीकरण हो गयो सा',
      title: 'घणी बधाई सा! नांव जुड़ गयो 🎉',
      sub: 'उम्मीदवार रो नांव सरकारी रोजगार एक्सचेंज में जुड़ गयो है।',
      summaryTitle: 'पंजीकरण रसीद ब्योरो',
      nextTitle: 'आगै रो काम:',
      next1: '24 सूं 48 घंटां में नौकरी रो संदेश फोन पै आवैगो।',
      next2: 'पंचायत रोजगार केंद्र सूं फोन आवैगो।',
      next3: 'सरकारी 4% कोटा में पहल दी ज्यासी।',
      btnDownload: 'सरकारी पावती रसीद डाउनलोड करो (Download)',
      btnNew: 'दूजो नांव जोड़ो (New Candidate)',
      voicePrompt: 'घणी बधाई सा! नांव जुड़ गयो है। रसीद डाउनलोड कर ल्यो सा।'
    }
  }
}

export default function CSCOnboarding() {
  const [lang, setLang] = useState('हिंदी')
  const [step, setStep] = useState(0)
  const [offline, setOffline] = useState(false)
  const [voice, setVoice] = useState(true) // Voice on by default for accessibility
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [disability, setDisability] = useState('visual')
  const [skills, setSkills] = useState(['phone', 'computer'])
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [cachedCount, setCachedCount] = useState(3)
  const [form, setForm] = useState({
    name: 'रमेश कुमार शर्मा',
    village: 'किशनगढ़, अजमेर (राजस्थान)',
    mobile: '9829148201',
    udid: 'RJ-01-2021-0849201'
  })

  // Persistent platform ID initialized once
  const [platformId] = useState(() => `EMP-CSC-${Math.floor(54000 + Math.random() * 8900)}`)

  const t = content[lang] || content['हिंदी']
  const speechRef = useRef(null)

  // Real Speech Synthesis Engine with regional phonetic adaptations
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel() // stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = t.langCode || 'hi-IN'
    utterance.rate = 0.92 // slightly slower for rural clarity
    utterance.pitch = 1.0

    // Try to find native Hindi or Indian English voice
    const voices = window.speechSynthesis.getVoices()
    const matchingVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'))
    if (matchingVoice) utterance.voice = matchingVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  // Trigger voice whenever step or language changes (if voice active)
  useEffect(() => {
    if (!voice) {
      stopVoice()
      return
    }

    let promptToSpeak = ''
    if (step === 0) promptToSpeak = t.step0.voicePrompt
    else if (step === 1) promptToSpeak = t.step1.voicePrompt
    else if (step === 2) promptToSpeak = t.step2.voicePrompt
    else if (step === 3) promptToSpeak = t.step3.voicePrompt
    else if (step === 4) promptToSpeak = t.step4.voicePrompt

    if (promptToSpeak) {
      const timer = setTimeout(() => speakText(promptToSpeak), 350)
      return () => clearTimeout(timer)
    }
  }, [step, lang, voice])

  const toggleSkill = id => setSkills(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id])

  const handleScanQR = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanned(true)
      setForm({
        name: 'रमेश कुमार शर्मा',
        village: 'सुभाष नगर वार्ड 14, अजमेर',
        mobile: '9414082910',
        udid: 'RJ-01-2021-0849201'
      })
      setDisability('visual')
      if (voice) speakText('स्वावलंबन कार्ड से रमेश कुमार शर्मा का विवरण स्वतः दर्ज हुआ।')
    }, 1200)
  }

  const handleDownloadSlip = () => {
    const slipText = `
===================================================
      GOVERNMENT OF RAJASTHAN / DEPwD
       CSC ASSISTED ONBOARDING RECEIPT
===================================================
Platform ID    : ${platformId}
Candidate Name : ${form.name}
Village / Town : ${form.village}
Mobile Number  : ${form.mobile}
UDID Number    : ${form.udid}
Category       : ${t.step2.options.find(o => o.id === disability)?.title || 'Visual'}
Skills Count   : ${skills.length} Capabilities Verified
Center Code    : CSC-RAJ-AJM-8821 (Kishangarh VLE)
Date Registered: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
RPWD Mandate   : Eligible under Section 34 4% Reserved Pool
===================================================
Status: Verified & Synced with District Employment Exchange
===================================================
    `
    const blob = new Blob([slipText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Registration_Slip_${platformId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ paddingTop: 58 }} className="page-in">
      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* Page Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="section-label">Common Service Centre (CSC) Access</span>
            <span className="badge badge-blue">VLE Kiosk v2.4</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.025em', marginBottom: 6 }}>
            {t.portalTitle}
          </h1>
          <p style={{ fontSize: 14.5, color: '#4B5563', lineHeight: 1.6 }}>
            {t.portalDesc}
          </p>
        </div>

        {/* Connectivity & Voice Control Status Bar */}
        <div className="card p-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => setOffline(!offline)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                border: `1.5px solid ${offline ? '#B45309' : '#15803D'}`,
                background: offline ? '#FEF3C7' : '#DCFCE7',
                color: offline ? '#B45309' : '#15803D', transition: 'all 0.15s'
              }}
            >
              {offline ? <WifiOff size={15} /> : <Wifi size={15} />}
              {offline ? t.offlineStatus : t.onlineStatus}
            </button>

            {offline && (
              <span style={{ fontSize: 12, color: '#B45309', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle size={13} /> {cachedCount} रिकॉर्ड्स लोकल मेमोरी में सुरक्षित
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => {
                if (voice) stopVoice()
                setVoice(!voice)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                border: `1.5px solid ${voice ? '#0056B3' : '#D1DAE8'}`,
                background: voice ? '#E8F0FA' : '#FFFFFF',
                color: voice ? '#0056B3' : '#4B5563', transition: 'all 0.15s'
              }}
            >
              {voice ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {voice ? t.voiceGuideOn : t.voiceGuideOff}
            </button>

            {voice && (
              <button
                onClick={() => {
                  let promptToSpeak = ''
                  if (step === 0) promptToSpeak = t.step0.voicePrompt
                  else if (step === 1) promptToSpeak = t.step1.voicePrompt
                  else if (step === 2) promptToSpeak = t.step2.voicePrompt
                  else if (step === 3) promptToSpeak = t.step3.voicePrompt
                  else if (step === 4) promptToSpeak = t.step4.voicePrompt
                  speakText(promptToSpeak)
                }}
                title={t.listenPrompt}
                style={{
                  width: 34, height: 34, borderRadius: 7, background: '#0056B3', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'
                }}
              >
                <Play size={15} fill="white" />
              </button>
            )}
          </div>
        </div>

        {/* Live Speaking Indicator Banner */}
        {voice && (
          <div className="card p-4" style={{ border: '1.5px solid #BFDBFE', background: 'linear-gradient(to right, #EBF2FC, #F0F7FF)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: '#0056B3',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              boxShadow: isSpeaking ? '0 0 0 4px rgba(0, 86, 179, 0.2)' : 'none',
              transition: 'box-shadow 0.2s'
            }}>
              <Volume2 size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0E7490', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                {isSpeaking ? '🔊 ऑडियो निर्देश चालू है (Speaking now...)' : '🎙️ आवाज़ निर्देश (Voice Guidance):'}
              </div>
              <div style={{ fontSize: 13.5, color: '#0056B3', fontWeight: 600, marginTop: 2, lineHeight: 1.5 }}>
                {step === 0 && `"${t.step0.voicePrompt}"`}
                {step === 1 && `"${t.step1.voicePrompt}"`}
                {step === 2 && `"${t.step2.voicePrompt}"`}
                {step === 3 && `"${t.step3.voicePrompt}"`}
                {step === 4 && `"${t.step4.voicePrompt}"`}
              </div>
            </div>
          </div>
        )}

        {/* Step Progress Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28, gap: 0 }}>
          {t.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < t.steps.length - 1 ? '1' : '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div className={`step-dot ${i < step ? 'step-dot-done' : i === step ? 'step-dot-active' : 'step-dot-pending'}`}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span style={{
                  fontSize: 11.5, fontWeight: 700,
                  color: i === step ? '#0056B3' : i < step ? '#15803D' : '#6B7280',
                  textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap'
                }}>
                  {s}
                </span>
              </div>
              {i < t.steps.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? '#15803D' : '#D1DAE8', margin: '0 8px', marginBottom: 18 }} />
              )}
            </div>
          ))}
        </div>

        {/* STEP 0: LANGUAGE SELECTION */}
        {step === 0 && (
          <div className="card p-8 space-y-6">
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 38, marginBottom: 8 }}>🌐</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>
                {t.step0.title}
              </h2>
              <p style={{ fontSize: 13.5, color: '#4B5563' }}>{t.step0.sub}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {['हिंदी', 'English', 'Rajasthani', 'मारवाड़ी'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: '20px 16px', borderRadius: 9,
                    border: `2px solid ${lang === l ? '#0056B3' : '#D1DAE8'}`,
                    background: lang === l ? '#E8F0FA' : '#FFFFFF',
                    color: lang === l ? '#0056B3' : '#2D2D2D', fontSize: 18, fontWeight: 800,
                    cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                  }}
                >
                  <span>{l}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: lang === l ? '#0056B3' : '#6B7280' }}>
                    {l === 'हिंदी' ? 'National Hindi' : l === 'English' ? 'Standard English' : l === 'Rajasthani' ? 'राजस्थानी बोली' : 'मारवाड़ी बोली'}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="btn-blue"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15.5 }}
            >
              {t.step0.btnContinue} →
            </button>
          </div>
        )}

        {/* STEP 1: CANDIDATE DETAILS + QR CODE SCAN */}
        {step === 1 && (
          <div className="card p-8 space-y-5">
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>
                {t.step1.title}
              </h2>
              <p style={{ fontSize: 13, color: '#4B5563' }}>{t.step1.sub}</p>
            </div>

            {/* Inputs */}
            <div>
              <label className="label">{t.step1.nameLabel}</label>
              <input
                className="input"
                style={{ fontSize: 15, padding: '12px 14px' }}
                placeholder={t.step1.namePlaceholder}
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">{t.step1.villageLabel}</label>
              <input
                className="input"
                style={{ fontSize: 15, padding: '12px 14px' }}
                placeholder={t.step1.villagePlaceholder}
                value={form.village}
                onChange={e => setForm(p => ({ ...p, village: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">{t.step1.mobileLabel}</label>
              <input
                className="input"
                style={{ fontSize: 15, padding: '12px 14px' }}
                placeholder={t.step1.mobilePlaceholder}
                value={form.mobile}
                onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
              />
            </div>

            {/* UDID QR Code Scanner Box */}
            <div
              onClick={handleScanQR}
              style={{
                padding: '16px 18px',
                background: scanned ? '#DCFCE7' : '#F5F7FA',
                borderRadius: 9,
                border: `1.5px dashed ${scanned ? '#15803D' : '#0056B3'}`,
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer', transition: 'all .2s'
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 8,
                background: scanned ? '#15803D' : '#0056B3',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <QrCode size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: scanned ? '#15803D' : '#2D2D2D' }}>
                  {scanned ? t.step1.scanSuccess : t.step1.scanTitle}
                </div>
                <div style={{ fontSize: 12, color: scanned ? '#15803D' : '#4B5563', marginTop: 2 }}>
                  {scanned ? 'UDID No: RJ-01-2021-0849201 · Swavlamban Verified' : t.step1.scanSub}
                </div>
              </div>
              <button
                type="button"
                className={scanned ? "badge badge-green" : "badge badge-blue"}
                style={{ padding: '6px 12px', fontSize: 12, fontWeight: 700 }}
              >
                {scanning ? 'स्कैनिंग...' : scanned ? '✓ Verified' : t.step1.scanBtn}
              </button>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              <button onClick={() => setStep(0)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                ← {t.step1.btnBack}
              </button>
              <button onClick={() => setStep(2)} className="btn-blue" style={{ flex: 2, justifyContent: 'center', fontSize: 15, padding: 12 }}>
                {t.step1.btnNext} →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DISABILITY CATEGORY */}
        {step === 2 && (
          <div className="card p-8 space-y-5">
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>
                {t.step2.title}
              </h2>
              <p style={{ fontSize: 13, color: '#4B5563' }}>{t.step2.sub}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {t.step2.options.map(d => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDisability(d.id)
                    if (voice) speakText(`${d.title} चुना गया`)
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', borderRadius: 9, cursor: 'pointer',
                    border: `1.5px solid ${disability === d.id ? '#0056B3' : '#D1DAE8'}`,
                    background: disability === d.id ? '#E8F0FA' : '#FFFFFF',
                    width: '100%', textAlign: 'left', transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: 26 }}>{d.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: disability === d.id ? '#0056B3' : '#2D2D2D' }}>
                      {d.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>{d.desc}</div>
                  </div>
                  {disability === d.id && (
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0056B3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div style={{ padding: '12px 16px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AlertCircle size={17} color="#B45309" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 12.5, color: '#B45309', lineHeight: 1.5 }}>
                {t.step2.notice}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                ← {t.step2.btnBack}
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!disability}
                className="btn-blue"
                style={{ flex: 2, justifyContent: 'center', fontSize: 15, padding: 12, opacity: disability ? 1 : 0.5 }}
              >
                {t.step2.btnNext} →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: FUNCTIONAL SKILLS */}
        {step === 3 && (
          <div className="card p-8 space-y-5">
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>
                {t.step3.title}
              </h2>
              <p style={{ fontSize: 13, color: '#4B5563' }}>{t.step3.sub}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {t.step3.options.map(s => {
                const checked = skills.includes(s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSkill(s.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderRadius: 9, cursor: 'pointer',
                      border: `1.5px solid ${checked ? '#15803D' : '#D1DAE8'}`,
                      background: checked ? '#DCFCE7' : '#FFFFFF',
                      width: '100%', textAlign: 'left', transition: 'all 0.15s'
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{s.emoji}</span>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: checked ? '#15803D' : '#2D2D2D', flex: 1 }}>
                      {s.label}
                    </span>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6,
                      border: `1.5px solid ${checked ? '#15803D' : '#D1DAE8'}`,
                      background: checked ? '#15803D' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {checked && <Check size={14} color="white" />}
                    </div>
                  </button>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                ← {t.step3.btnBack}
              </button>
              <button onClick={() => setStep(4)} className="btn-blue" style={{ flex: 2, justifyContent: 'center', fontSize: 15, padding: 12 }}>
                {t.step3.btnSubmit}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: COMPLETION & PRINTABLE SLIP */}
        {step === 4 && (
          <div className="card p-8 text-center" style={{ border: '1.5px solid #A7F3D0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', border: '1.5px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={32} color="#15803D" />
            </div>
            <span className="badge badge-green" style={{ marginBottom: 8 }}>{t.step4.badge}</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#2D2D2D', marginBottom: 4 }}>
              {t.step4.title}
            </h2>
            <p style={{ fontSize: 14, color: '#4B5563', marginBottom: 24 }}>
              {t.step4.sub}
            </p>

            {/* Official Registration Receipt Box */}
            <div className="card p-6" style={{ textAlign: 'left', marginBottom: 20, background: '#F8FAFC', border: '1px solid #D1DAE8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderBottom: '1px solid #E2E8F0', paddingBottom: 10 }}>
                <div style={{ fontSize: 13, color: '#0E7490', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  {t.step4.summaryTitle}
                </div>
                <span className="badge badge-blue">Official Record</span>
              </div>

              {[
                ['Candidate Full Name', form.name],
                ['Village / Town', form.village],
                ['Mobile Contact', form.mobile],
                ['Registered UDID No.', form.udid],
                ['Selected Language', `${lang} (Interface & Audio)`],
                ['Disability Benchmark', t.step2.options.find(d => d.id === disability)?.title || 'Visual Impairment'],
                ['Verified Capabilities', `${skills.length} Functional Tasks Recorded`],
                ['Permanent Platform ID', platformId],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #EEF2F7', fontSize: 13.5 }}>
                  <span style={{ color: '#64748B' }}>{k}</span>
                  <span style={{ color: k === 'Permanent Platform ID' ? '#0056B3' : '#1E293B', fontWeight: 700, fontFamily: k === 'Permanent Platform ID' || k === 'Registered UDID No.' ? 'monospace' : 'inherit' }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Next steps notice */}
            <div style={{ padding: '16px 18px', background: '#E8F0FA', border: '1px solid #BFDBFE', borderRadius: 8, fontSize: 13, color: '#0056B3', lineHeight: 1.7, textAlign: 'left', marginBottom: 20 }}>
              <div style={{ fontWeight: 800, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Shield size={16} color="#0056B3" /> {t.step4.nextTitle}
              </div>
              <div>• {t.step4.next1}</div>
              <div>• {t.step4.next2}</div>
              <div>• {t.step4.next3}</div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => {
                  setStep(0)
                  setScanned(false)
                }}
                className="btn-ghost"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {t.step4.btnNew}
              </button>

              <button
                onClick={handleDownloadSlip}
                className="btn-blue"
                style={{ flex: 2, justifyContent: 'center', padding: '13px', fontSize: 15, gap: 8 }}
              >
                <Download size={16} /> {t.step4.btnDownload}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
