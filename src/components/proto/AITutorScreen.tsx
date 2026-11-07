import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, Mic, Send, Sparkles, BookOpen } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot' | 'system';
  content: string;
  source?: string;
  isError?: boolean;
}

// Full Chapter 10 Knowledge Base from the Class IX DTI Textbook provided by the user
const CHAPTER_CONTENT = `
CHAPTER 10: AI RECOGNITION SYSTEM (Class IX DTI Textbook)

LEARNING OBJECTIVES:
- Explain how recognition systems such as image, speech, and biometric recognition work in automated data capture.
- Describe real-world applications of AI recognition systems.
- Analyse the benefits and limitations of using recognition technologies for automated data capture.

=== 10.1 Recognition Systems in Artificial Intelligence ===
Recognition systems in AI are technologies that allow computers to identify and interpret human-related inputs such as images, speech, and biometric features. They work by analysing pixel patterns, shapes, and edges in data using models trained on large sets of labelled examples. Through this learning process, the system becomes capable of accurately recognising new objects, faces, or voices. These systems are widely used in facial recognition for security, object detection in autonomous vehicles, medical imaging, and surveillance, enabling automation and real-time decision-making.

They play a major role in daily life, from unlocking smartphones to verifying identities at airports, by analysing patterns in real-world data efficiently and intelligently. Unlike generative AI, which creates new content like images or text, recognition AI focuses solely on identifying and classifying existing data.

=== Recognition System Cycle (6 steps) ===
A recognition system follows a step-by-step cycle to identify and respond to data from the real world:
1. Input (Sensing): The system first collects raw data such as images, video, audio, or biometric information using sensors (cameras, microphones, scanners, or other sensing devices).
2. Pre-processing: The raw data is cleaned, filtered, and adjusted to improve its quality. The system removes noise, corrects lighting, reduces blur, or normalises the data.
3. Feature Extraction: The system identifies and extracts important features from the cleaned data: key characteristics such as facial points (eyes, nose, mouth), unique voice patterns, or fingerprint ridges that help distinguish one input from another.
4. Pattern Matching / Classification: The extracted features are compared against stored patterns or a database. Using algorithms and models, the system tries to find the closest match.
5. Decision / Output: Based on the results of pattern matching or classification, the system makes a decision and produces an output (e.g. unlocking a device, accepting or rejecting a command, granting or denying access).
6. Feedback and Learning: The system uses feedback to learn from its mistakes and successes, improving its performance over time. By updating its models with new data and outcomes, it becomes better at recognising patterns, adapting to users, and increasing accuracy.

=== Types of Recognition Systems (Table 10.1) ===
1. Image Recognition: Input: visual data (images/videos). Process: captures image, enhances, extracts features (shapes, facial points), matches with stored patterns, outputs identification/classification. Examples: facial unlock on phones, CCTV surveillance, social media tagging.
2. Speech Recognition: Input: audio data (voice). Process: records voice, removes noise, extracts voice features (pitch, tone, phonemes), matches with stored patterns, converts to text or action. Examples: Siri, Alexa, Google Assistant, voice typing software.
3. Biometric Recognition: Input: biological traits (fingerprints, iris, face geometry). Process: scans trait, enhances, extracts unique features, compares/matches with stored template, verifies identity. Examples: fingerprint scanners, iris scanners at airport/bank, attendance systems at school/office.
4. Gesture Recognition: Input: human body movements or hand gestures. Process: motion tracking, feature extraction (angles, position), matches with gesture dataset, outputs classification/prediction. Examples: Xbox Kinect gaming, touchless interfaces, sign language recognition.
5. Text Recognition (OCR): Input: written or printed text. Process: scans text, enhances clarity, extracts characters/features, matches with stored character patterns, converts to digital text. Examples: document scanning, digitising handwritten notes, automated translation.
6. Emotion Recognition: Input: facial expressions, voice tone, body language. Process: captures expression, enhances image/audio, extracts emotional features, matches with emotional patterns, outputs emotion. Examples: classroom engagement monitoring, customer service AI.

=== 10.2 Real World Examples ===
- Sensor camera CCTV: Most CCTV systems use motion sensors to record only when someone or something moves in front of the camera, saving storage space. They also have infrared sensors for night vision, allowing clear recording even in the dark.
- Smart home devices: Internet-connected gadgets that automate and control household functions like lighting, security, temperature, and entertainment (including smart speakers like Alexa and Google Assistant, thermostats, lighting, locks, cameras, plugs, doorbells, and appliances) all managed via apps or voice commands.
- AI at school: In schools, AI recognition systems are becoming an important tool to support both learning and safety. They can monitor classrooms, track learner attendance, and notice when a learner may need extra help. They are particularly useful in Special Education, where learners may require individualised attention or support.

=== Benefits of AI Recognition System ===
- Quickly process and identify patterns in large datasets, reducing human effort and errors.
- Accurately recognise faces, fingerprints, and voices, enhancing security in airports, offices, and banks.
- Detect unusual behaviour, aiding in fraud prevention and preventing unauthorised access.
- Enable faster and more reliable decision-making due to consistent performance without fatigue.
- Improve user convenience through features like face unlock, voice assistants, and fingerprint scanning.
- Provide personalised services by learning individual preferences.

=== Limitations of AI Recognition System ===
- High cost: Setting up AI recognition systems requires expensive hardware, specialised software, and ongoing maintenance.
- Privacy and ethical concerns: Biometric data (faces, fingerprints, voices) is highly sensitive, and misuse or theft can lead to identity theft or impersonation.
- Job displacement: Automation through AI may replace certain human jobs.
- Accuracy issues: Poor lighting, background noise, incomplete data, or biased training datasets can cause errors or biased outcomes.
- Over dependence on technology: Failure or power loss of AI systems can disrupt important tasks.
- Limited understanding: AI can recognise patterns but cannot fully understand context or make human-like judgments beyond its training.
- Need for responsible management: Strong security measures and ethical data handling are essential to minimise risks.

=== Key Words ===
- Recognition system: a system that identifies patterns, objects, voices, or traits.
- Image recognition: AI that detects objects or faces in pictures or videos.
- Speech recognition: AI that converts spoken words into text or actions.
- Biometric recognition: AI that identifies people using unique biological or behavioural characteristics of a person (e.g., fingerprint, voice print, gait).
- Automated data capture (ADC): the process of automatically collecting and converting information from a physical format into a digital format.
- Template: a stored digital pattern (e.g., fingerprint or face data) used for comparison.

=== Tips: Automated Data Capture (ADC) ===
ADC refers to technologies or systems that collect data automatically without manual typing or human input. AI systems use ADC to gather information quickly, accurately, and in real time.
- Banking: ADC scans checks -> AI recognition verifies handwriting, signatures, and fraud patterns.
- Healthcare: ADC digitises patient forms -> AI recognition extracts medical terms and links them to patient records.
- Retail: ADC via barcode/RFID -> AI recognition predicts buying patterns and manages inventory.
- Education: ADC captures student quiz sheets -> AI recognition grades them automatically and analyses performance trends.

=== ICT in Context (interesting facts) ===
- The first mobile phone released with a fingerprint recognition system was the Pantech GI100 (2004), then Motorola Atrix 4G (2011), and finally the iPhone 5S (2013).
- Voice recognition can be used to translate languages in real time.
- Any information, once it is online, can be accessed by a cybercriminal willing enough to go through the pain of stealing it.
- Bhutan's Automated Immigration Clearance System (AICS) at the Phuntsholing gate relies on facial recognition and biometric technology to speed up border crossing. It was launched on His Majesty The King's birthday in 2025 by the Department of Immigration (Kuensel, 2025).

=== Industry 4.0 ===
"The general definition of Industry 4.0 is the rise of digital industrial technology. Industry 4.0 transformations allow us to work alongside machines in new, highly productive ways." (Daniel Burrus)
Industry 4.0 integrates IoT, AI, big data, robotics, and automation into manufacturing to create smart, connected factories.
`;

const SUGGESTIONS = [
  'What is a recognition system?',
  'What are the 6 steps of the recognition cycle?',
  'Give me an example of biometric recognition',
  'What are the limitations of AI recognition?',
  "Tell me about Bhutan's AICS system",
  'What is Automated Data Capture (ADC)?',
];

export const AITutorScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ch10_study_buddy_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'init-1',
        role: 'system',
        content: "👋 Hi! I'm Study Buddy, here to help with Chapter 10: AI Recognition System. Ask me anything from the chapter!",
      },
    ];
  });

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [speakOn, setSpeakOn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ch10_speak') === '1';
    } catch {
      return false;
    }
  });
  const [isListening, setIsListening] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ch10_study_buddy_history', JSON.stringify(messages));
    } catch {}
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    try {
      localStorage.setItem('ch10_speak', speakOn ? '1' : '0');
    } catch {}
    if (!speakOn && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [speakOn]);

  const speakText = (text: string) => {
    if (!speakOn || !('speechSynthesis' in window)) return;
    const clean = text.replace(/📖\s*Source:.*$/gim, '').replace(/[*_`#]/g, '').trim();
    if (!clean) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-IN';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition Setup (Web Speech API)
  const handleToggleMic = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech recognition is not supported in this browser. Please type your query in the box.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'en-IN';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
        }
      };

      rec.onerror = (event: any) => {
        console.warn('Speech error:', event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Intelligent Socratic Tutor reasoning based strictly on Chapter 10 textbook content
  const generateTutorResponse = (query: string): { reply: string; source: string } => {
    const q = query.toLowerCase();

    // 1. Definition of recognition system
    if (q.includes('what is a recognition system') || (q.includes('recognition system') && q.includes('definition'))) {
      return {
        reply: `A recognition system in AI is a technology that allows computers to identify and interpret human-related inputs such as images, speech, and biometric features.

It works by analysing pixel patterns, shapes, and edges in data using models trained on large sets of labelled examples. Through this learning process, the system becomes capable of accurately recognising new objects, faces, or voices!

Unlike generative AI (which creates new content like pictures or essays), recognition AI focuses solely on identifying and classifying existing data.

Can you think of one device you used today that has a recognition system built-in?`,
        source: 'Section 10.1: Recognition Systems in Artificial Intelligence',
      };
    }

    // 2. Recognition cycle (6 steps)
    if (q.includes('6 step') || q.includes('cycle') || q.includes('steps')) {
      return {
        reply: `Every AI recognition system follows a 6-step cycle to identify and respond to data:

1. Input (Sensing): Sensors (cameras, mics, scanners) collect raw sensory data.
2. Pre-processing: Raw data is cleaned, filtered, and lighting/noise is corrected.
3. Feature Extraction: Key distinguishing characteristics (e.g. eye distance, voice pitch, fingerprint ridges) are extracted.
4. Pattern Matching / Classification: Extracted features are compared against stored patterns or database templates.
5. Decision / Output: The system makes a decision (e.g., unlock phone, grant access, reject command).
6. Feedback and Learning: The system learns from mistakes and updates its models to increase future accuracy.

Which of these 6 steps do you think happens when a camera removes glare or blur from your face?`,
        source: 'Recognition System Cycle (6 steps)',
      };
    }

    // 3. Biometric recognition & examples
    if (q.includes('biometric') || q.includes('fingerprint') || q.includes('iris') || q.includes('face id') || q.includes('facial')) {
      return {
        reply: `Biometric recognition identifies people using unique biological or behavioural characteristics such as fingerprints, iris scans, voice prints, or face geometry!

For example:
- Smartphone fingerprint sensors (like the Touch ID or under-display sensors).
- Airport and bank iris scanners for rapid identity verification.
- Automated school/office attendance systems that verify face geometry.

Because biometric traits cannot easily be forgotten or stolen like a plastic card, they offer high security. 

What do you think is a stored digital pattern called that the system compares your face against? (Hint: check Table 10.1 or Key Words!)`,
        source: 'Types of Recognition Systems (Table 10.1) & Key Words',
      };
    }

    // 4. Limitations & Challenges
    if (q.includes('limitation') || q.includes('challenge') || q.includes('drawback') || q.includes('disadvantage') || q.includes('ethical') || q.includes('privacy') || q.includes('cost')) {
      return {
        reply: `In Chapter 10, several key limitations of AI recognition systems are highlighted:

1. High Cost: Requires expensive hardware, thermal sensors, and high-performance processing servers.
2. Privacy & Ethical Concerns: Misuse or theft of sensitive biometric data can lead to impersonation.
3. Job Displacement: Automation may replace human checkpoint and data-entry jobs.
4. Accuracy & Bias Issues: Poor lighting, noise, or biased training datasets cause misclassification.
5. Overdependence on Technology: Power outages or system freezes can halt entry doors and critical services.
6. Limited Understanding: AI detects patterns but cannot understand human context or emotional nuance beyond its training.

Why do you think biased training data is particularly dangerous in security and facial recognition?`,
        source: 'Limitations of AI Recognition System',
      };
    }

    // 5. Bhutan's AICS system
    if (q.includes('bhutan') || q.includes('aics') || q.includes('phuntsholing') || q.includes('immigration')) {
      return {
        reply: `That's an exciting real-world example from our textbook!

Bhutan's Automated Immigration Clearance System (AICS) at the Phuntsholing gate relies on facial recognition and biometric technology to speed up border crossing.

It was officially launched on His Majesty The King's birthday in 2025 by the Department of Immigration (Kuensel, 2025). It allows citizens and visitors to clear immigration gates rapidly without manual paper stamps!`,
        source: 'ICT in Context (Interesting Facts)',
      };
    }

    // 6. Automated Data Capture (ADC)
    if (q.includes('adc') || q.includes('automated data capture') || q.includes('data capture')) {
      return {
        reply: `Automated Data Capture (ADC) refers to technologies or systems that collect data automatically without manual typing or human keyboard input!

AI systems use ADC to gather real-time data quickly. Everyday examples:
- Banking: ADC scans checks -> AI verifies signatures and fraud patterns.
- Healthcare: ADC digitises patient forms -> AI extracts medical terms.
- Retail: ADC scans barcodes/RFID -> AI predicts buying trends.
- Education: ADC captures student quiz sheets -> AI grades them automatically!

How does ADC save time compared to manual typing?`,
        source: 'Tips: Automated Data Capture (ADC)',
      };
    }

    // 7. Benefits
    if (q.includes('benefit') || q.includes('advantage') || q.includes('why use')) {
      return {
        reply: `The primary benefits of AI recognition systems in Chapter 10 include:
- Rapid processing of massive datasets with reduced human fatigue and errors.
- Enhanced security at airports, schools, and banks.
- Consistent 24/7 performance without getting tired.
- High convenience (instant touchless face unlock and voice commands).
- Personalized services tailored to user preferences.`,
        source: 'Benefits of AI Recognition System',
      };
    }

    // 8. General textbook fallback
    return {
      reply: `That's a great question about "${query}". 

In Chapter 10, recognition systems capture real-world inputs (light, soundwaves, biometrics) through sensors, pre-process the data to remove noise, extract key mathematical features, and match them against stored database templates to make decisions.

Would you like to look at the 6-step recognition cycle, real-world examples like CCTV & Smart Homes, or the ethical limitations next?`,
      source: 'Section 10.1 & Chapter 10 Overview',
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, source } = generateTutorResponse(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: reply,
        source,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(reply);
    }, 500);
  };

  const handleClearChat = () => {
    if (window.confirm('Clear this conversation?')) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      const initial: ChatMessage[] = [
        {
          id: 'init-1',
          role: 'system',
          content: "👋 Hi! I'm Study Buddy, here to help with Chapter 10: AI Recognition System. Ask me anything from the chapter!",
        },
      ];
      setMessages(initial);
      try {
        localStorage.removeItem('ch10_study_buddy_history');
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] py-8 px-4 sm:px-8 text-slate-100 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-140px)] min-h-[620px] bg-[#0c1426] border border-[#1e2f4e] rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* ----------------- CH10 STUDY BUDDY HEADER ----------------- */}
        <header className="px-6 py-4.5 bg-gradient-to-r from-[#0e1930] via-[#0c162c] to-[#091224] border-b border-[#1b2b48] flex items-center gap-4">
          {/* Futuristic Robot Badge SVG (Exact from provided HTML) */}
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <svg className="w-full h-full p-1" viewBox="0 0 64 64" role="img" aria-label="Study Buddy logo">
              <rect width="64" height="64" rx="16" fill="#3b82f6" />
              <circle cx="32" cy="27" r="15" fill="#ffffff" />
              <rect x="25" y="39" width="14" height="6" rx="2" fill="#ffffff" />
              <rect x="26" y="46" width="12" height="4" rx="2" fill="#cffafe" />
              <rect x="28.5" y="51" width="7" height="3" rx="1.5" fill="#cffafe" />
              <path d="M32 40V31M32 31L25.5 24M32 31L38.5 24" fill="none" stroke="#3b82f6" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="25.5" cy="23.5" r="2.4" fill="#06b6d4" />
              <circle cx="38.5" cy="23.5" r="2.4" fill="#06b6d4" />
              <circle cx="32" cy="40" r="2.4" fill="#06b6d4" />
            </svg>
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <span>CH10 - Study Buddy</span>
              <span className="w-2 h-2 rounded-full bg-[#00f5c4] shadow-[0_0_8px_#00f5c4] animate-pulse" />
            </h1>
            <p className="text-xs text-slate-400">
              AI Recognition Systems (Class IX DTI)
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="ml-auto flex items-center gap-2">
            {/* Read Aloud Toggle */}
            <button
              onClick={() => setSpeakOn(!speakOn)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                speakOn
                  ? 'bg-cyan-500/20 text-[#00f5c4] border-[#00f5c4]/60 shadow-[0_0_12px_rgba(0,245,196,0.2)]'
                  : 'bg-[#101a2f] text-slate-300 border-[#233556] hover:text-white hover:border-slate-500'
              }`}
              title="Read answers aloud using speech synthesis"
            >
              {speakOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">Read aloud: {speakOn ? 'On' : 'Off'}</span>
            </button>

            {/* Clear Chat */}
            <button
              onClick={handleClearChat}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#101a2f] text-slate-300 border border-[#233556] hover:text-rose-300 hover:border-rose-500/50 transition-colors flex items-center gap-1.5"
              title="Clear conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear chat</span>
            </button>
          </div>
        </header>

        {/* ----------------- CHAT STREAM ----------------- */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            if (m.role === 'system') {
              return (
                <div key={m.id} className="text-center py-2 px-4">
                  <span className="inline-block py-1 px-4 rounded-full text-xs text-slate-400 bg-slate-900/60 border border-slate-800">
                    {m.content}
                  </span>
                </div>
              );
            }

            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] ${
                  isUser ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-sm shadow-[0_4px_14px_rgba(59,130,246,0.3)]'
                      : 'bg-[#0f172a] text-slate-200 border border-[#1e2f4e] border-l-[3px] border-l-[#06b6d4] rounded-bl-sm shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {m.content}

                  {/* Textbook Citation Line */}
                  {!isUser && m.source && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>📖 Source: {m.source}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#0f172a] border border-[#1e2f4e] border-l-[3px] border-l-[#06b6d4] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ----------------- QUICK SUGGESTIONS CHIPS ----------------- */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#090f1e] border-t border-[#16233b] flex flex-wrap gap-2 overflow-x-auto scrollbar-none">
          {SUGGESTIONS.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-full text-xs bg-[#101a2f] border border-[#21355a] text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-white transition-all whitespace-nowrap active:scale-95 shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* ----------------- INPUT FORM WITH MIC & SEND ----------------- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-[#090f1d] border-t border-[#182742] flex items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? 'Listening… speak your Chapter 10 question now' : 'Ask something about Chapter 10...'}
            className="flex-1 px-4 py-3 rounded-2xl bg-[#060b17] border border-[#1f3152] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#06b6d4] transition-colors"
          />

          {/* Microphone Button with Pulsing Red State when listening */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 border-rose-500 text-white animate-pulse shadow-[0_0_20px_rgba(225,29,72,0.5)]'
                : 'bg-[#101a2f] border-[#223556] text-cyan-400 hover:border-cyan-400 hover:text-white'
            }`}
            title={isListening ? 'Stop listening' : 'Speak your question'}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-[#06b6d4] text-[#042f3a] hover:bg-[#0891b2] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
