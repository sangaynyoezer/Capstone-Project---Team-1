import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, Mic, Send, Sparkles, BookOpen } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot' | 'system';
  content: string;
  source?: string;
  sourceLinks?: { label: string; url: string }[];
  isError?: boolean;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike extends ArrayLike<SpeechRecognitionAlternativeLike> {
  isFinal: boolean;
}

interface SpeechRecognitionEventLike extends Event {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionWindow extends Window {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
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
        content: "👋 Hi! I'm Study Buddy. Ask about Chapter 10 and I'll use hints and real-life examples to help you reason it out instead of giving the answer straight away.",
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
  const [speechStatus, setSpeechStatus] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const chatStreamRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ch10_study_buddy_history', JSON.stringify(messages));
    } catch {}
    const chatStream = chatStreamRef.current;
    if (chatStream) {
      chatStream.scrollTo({ top: chatStream.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;
      if (recognition) {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.abort();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
    const speechWindow = window as SpeechRecognitionWindow;
    const SpeechRec = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechStatus('Voice input is not supported in this browser. Please type your question instead.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setSpeechStatus('Voice input stopped.');
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'en-IN';
      rec.continuous = false;
      rec.interimResults = true;

      rec.onstart = () => {
        setSpeechStatus('Listening… speak your question now.');
        setInterimTranscript('');
        setIsListening(true);
      };

      rec.onresult = (event) => {
        let finalTranscript = '';
        let partialTranscript = '';
        for (let index = 0; index < event.results.length; index += 1) {
          const result = event.results[index];
          const transcript = result[0]?.transcript ?? '';
          if (result.isFinal) {
            finalTranscript += transcript;
          } else {
            partialTranscript += transcript;
          }
        }

        if (finalTranscript.trim()) {
          setInput((previous) => {
            const existing = previous.trim();
            return existing ? `${existing} ${finalTranscript.trim()}` : finalTranscript.trim();
          });
          setSpeechStatus('Question captured. Review it, then press Send.');
        }
        setInterimTranscript(partialTranscript.trim());
      };

      rec.onerror = (event) => {
        const statusByError: Record<string, string> = {
          'not-allowed': 'Microphone access was blocked. Allow microphone access in your browser settings, then try again.',
          'service-not-allowed': 'The browser speech service is unavailable. Check your connection or type your question.',
          'audio-capture': 'No microphone was found. Connect a microphone or type your question.',
          network: 'Voice recognition needs a network connection. Check your connection or type your question.',
          'no-speech': 'No speech was detected. Try again and speak after the microphone starts.',
          'language-not-supported': 'English (India) voice recognition is unavailable in this browser.',
          aborted: 'Voice input stopped.',
        };
        setSpeechStatus(statusByError[event.error] || `Voice input failed (${event.error}). Please try again or type your question.`);
        setInterimTranscript('');
        setIsListening(false);
        if (recognitionRef.current === rec) recognitionRef.current = null;
      };

      rec.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
        if (recognitionRef.current === rec) recognitionRef.current = null;
        setSpeechStatus((current) =>
          current === 'Listening… speak your question now.'
            ? 'No speech was captured. Tap the microphone and try again.'
            : current
        );
      };

      recognitionRef.current = rec;
      setSpeechStatus('Starting microphone…');
      rec.start();
    } catch (error) {
      console.error('Could not start voice input:', error);
      recognitionRef.current = null;
      setSpeechStatus('Could not start the microphone. Check its browser permission and try again.');
      setIsListening(false);
    }
  };

  // Intelligent Socratic Tutor reasoning based strictly on Chapter 10 textbook content
  const generateTutorResponse = (query: string): {
    reply: string;
    source: string;
    sourceLinks?: { label: string; url: string }[];
  } => {
    const q = query.toLowerCase();
    const socraticReply = (hint: string, example: string, question: string) =>
      `Let's reason it out together.\n\nHint: ${hint}\n\nReal-life example: ${example}\n\nYour turn: ${question}`;

    if (q.includes('6 step') || q.includes('cycle') || q.includes('steps')) {
      return {
        reply: socraticReply(
          'Follow a phone face-unlock attempt from the moment the camera sees you to the moment the phone opens. Think about what must happen to a blurry image before it can be compared.',
          'A phone adjusts a dim or blurry face image, looks for distinguishing details, compares them with a saved pattern, then decides whether to unlock.',
          'What do you think should happen first, and which step would improve a noisy image?'
        ),
        source: 'Recognition System Cycle (6 steps)',
      };
    }

    if (q.includes('limitation') || q.includes('challenge') || q.includes('drawback') || q.includes('disadvantage') || q.includes('ethical') || q.includes('privacy') || q.includes('cost') || q.includes('bias')) {
      return {
        reply: socraticReply(
          'Think about what could go wrong when a recognition system sees poor-quality data, learns from unbalanced examples, or stores sensitive personal information.',
          'Imagine a school attendance camera in a dark classroom: it may fail to recognize some students, while the stored face data still needs careful protection.',
          'Which concern would affect a student most in this example, and what safeguard could help?'
        ),
        source: 'Limitations of AI Recognition System',
      };
    }

    if (q.includes('bhutan') || q.includes('aics') || q.includes('phuntsholing') || q.includes('immigration')) {
      return {
        reply: socraticReply(
          'Think about how an automated border gate can check that a traveller matches an identity record without relying only on a paper document.',
          'At an airport, a gate may scan a traveller’s face and compare identifying details with a saved record before allowing them through.',
          'What kind of personal feature might help the system check identity, and why should that data be protected?'
        ),
        source: 'ICT in Context (Interesting Facts)',
      };
    }

    if (q.includes('adc') || q.includes('automated data capture') || q.includes('data capture')) {
      return {
        reply: socraticReply(
          'Look for the difference between information a person types manually and information a device collects from a real-world input.',
          'A school scanner can collect attendance from a fingerprint, instead of asking a teacher to type every student’s name.',
          'Which part of that example is being collected automatically, and how could it save time?'
        ),
        source: 'Tips: Automated Data Capture (ADC)',
      };
    }

    if (q.includes('benefit') || q.includes('advantage') || q.includes('why use')) {
      return {
        reply: socraticReply(
          'Compare a fast automatic check with a person entering the same information by hand. Consider speed, repeated effort, and consistency.',
          'A phone that recognizes its owner can unlock with a glance instead of requiring a password each time.',
          'What becomes easier for the user, and what should the phone still do to protect the owner?'
        ),
        source: 'Benefits of AI Recognition System',
      };
    }

    if (q.includes('biometric') || q.includes('fingerprint') || q.includes('iris') || q.includes('face id') || q.includes('facial')) {
      return {
        reply: socraticReply(
          'Ask what makes a body feature different from a password that can be changed or a card that can be replaced.',
          'A school attendance scanner reads a fingerprint and compares its ridge pattern with an enrolled record.',
          'Which physical detail is the scanner using, and what is the name for a stored pattern used in a comparison?'
        ),
        source: 'Types of Recognition Systems (Table 10.1) & Key Words',
      };
    }

    if (q.includes('speech') || q.includes('voice') || q.includes('siri') || q.includes('alexa')) {
      return {
        reply: socraticReply(
          'Think about what happens between speaking a command and a device carrying it out. The system needs to work with sound before it can choose an action.',
          'When you ask a smart speaker to set a timer, it listens to your words and then starts the timer.',
          'What does the device need to identify in the audio before it can follow your command?'
        ),
        source: 'Types of Recognition Systems (Table 10.1)',
      };
    }

    if (q.includes('gesture') || q.includes('hand movement') || q.includes('sign language')) {
      return {
        reply: socraticReply(
          'Consider how a camera can follow the position and movement of a hand, rather than reading a printed page or listening to speech.',
          'A touch-free game might detect a raised hand and use that movement to control something on screen.',
          'What information about the hand’s movement would help the system decide which action you intended?'
        ),
        source: 'Types of Recognition Systems (Table 10.1)',
      };
    }

    if (q.includes('image') || q.includes('photo') || q.includes('picture') || q.includes('object')) {
      return {
        reply: socraticReply(
          'Focus on the visual patterns in a camera image: shapes, edges, and details that distinguish one object from another.',
          'A photo app can find a dog in a picture by comparing visual details with patterns it has learned.',
          'What visual clues might help it tell a dog from a cat?'
        ),
        source: 'Types of Recognition Systems (Table 10.1)',
      };
    }

    if (q.includes('emotion') || q.includes('feeling')) {
      return {
        reply: socraticReply(
          'Think about visible cues such as the position of eyebrows and mouth, and remember that a visible expression does not always reveal someone’s full feelings.',
          'A learning activity might notice a smile or a frown, but it should not assume it knows exactly how a student feels.',
          'What could make an expression-recognition system misread a person, and why should its result be treated carefully?'
        ),
        source: 'Types of Recognition Systems (Table 10.1) & Limitations',
      };
    }

    if (q.includes('text') || q.includes('ocr') || q.includes('handwriting') || q.includes('document')) {
      return {
        reply: socraticReply(
          'Imagine turning letters in a photo into text you can edit. The system must first locate and distinguish the characters.',
          'A phone scanning a printed page can make its words searchable instead of leaving them as pixels in an image.',
          'What does the system need to identify on the page before it can produce editable text?'
        ),
        source: 'Types of Recognition Systems (Table 10.1)',
      };
    }

    if (q.includes('what is a recognition system') || (q.includes('recognition system') && q.includes('definition'))) {
      return {
        reply: socraticReply(
          'Ask whether the computer is creating new material or identifying something already present in an input.',
          'A phone camera checks a face that is already in front of it and uses that information to decide whether to unlock.',
          'What does the system receive, and what is it trying to identify?'
        ),
        source: 'Section 10.1: Recognition Systems in Artificial Intelligence',
      };
    }

    if (!/\b(recognition|biometric|fingerprint|iris|facial|speech|gesture|image|text recognition|ocr|emotion|automated data capture|adc|sensor|cctv|smart home|aics|privacy|bias|limitation|benefit|classification|feature extraction|pattern matching|pre-processing|template)\b/.test(q)) {
      const encodedQuery = encodeURIComponent(query.trim());
      const sourceLinks = [
        {
          label: 'Khan Academy: search this topic',
          url: `https://www.khanacademy.org/search?page_search_query=${encodedQuery}`,
        },
        {
          label: 'Britannica: find reference articles',
          url: `https://www.google.com/search?q=${encodedQuery}+site%3Abritannica.com`,
        },
      ];

      if (/\b(ai|artificial intelligence|machine learning|deep learning|neural network)\b/.test(q)) {
        sourceLinks.unshift({
          label: 'Google: Machine Learning Crash Course',
          url: 'https://developers.google.com/machine-learning/crash-course',
        });
      } else if (/\b(html|css|javascript|typescript|programming|web development|coding)\b/.test(q)) {
        sourceLinks.unshift({
          label: 'MDN: search web development guides',
          url: `https://developer.mozilla.org/en-US/search?q=${encodedQuery}`,
        });
      }

      return {
        reply: `That topic is outside Chapter 10, so let's investigate it rather than guess. Start by identifying the key idea in your question, then compare what two trusted sources say.\n\nReal-life connection: think of a time you encountered this topic in a class, at home, or online. What did you already notice about it?\n\nYour turn: after checking a resource below, what is one clue you found and what question do you still have?`,
        source: 'External learning resources',
        sourceLinks,
      };
    }

    return {
      reply: socraticReply(
        'Break the question into three parts: what the system senses, what pattern it looks for, and what action follows.',
        'A motion-aware CCTV camera senses a scene, looks for movement, and can begin recording when something passes.',
        'Which part of your question is about the input, and what evidence would help you work out the system’s decision?'
      ),
      source: 'Section 10.1 & Chapter 10 Overview',
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
    }
    recognitionRef.current = null;
    setIsListening(false);
    setInterimTranscript('');
    setSpeechStatus('');

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
      const { reply, source, sourceLinks } = generateTutorResponse(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: reply,
        source,
        sourceLinks,
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
          content: "👋 Hi! I'm Study Buddy. Ask about Chapter 10 and I'll use hints and real-life examples to help you reason it out instead of giving the answer straight away.",
        },
      ];
      setMessages(initial);
      setSpeechStatus('');
      setInterimTranscript('');
      try {
        localStorage.removeItem('ch10_study_buddy_history');
      } catch {}
    }
  };

  const speechError = /not supported|blocked|unavailable|no microphone|network|no speech|failed|could not/i.test(speechStatus);

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
        <div ref={chatStreamRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
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
                  {!isUser && m.sourceLinks && (
                    <ul className="mt-2 space-y-1.5 text-xs">
                      {m.sourceLinks.map((source) => (
                        <li key={source.url}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-300 underline underline-offset-2 hover:text-cyan-100"
                          >
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
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
            onChange={(e) => {
              setInput(e.target.value);
              setSpeechStatus('');
              setInterimTranscript('');
            }}
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
            aria-label={isListening ? 'Stop voice input' : 'Speak your question'}
            aria-pressed={isListening}
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
        {(speechStatus || interimTranscript) && (
          <div
            aria-live="polite"
            className={`px-4 pb-3 text-xs ${speechError ? 'text-rose-300' : 'text-cyan-300'}`}
          >
            {interimTranscript ? `Hearing: ${interimTranscript}` : speechStatus}
          </div>
        )}
      </div>
    </div>
  );
};
