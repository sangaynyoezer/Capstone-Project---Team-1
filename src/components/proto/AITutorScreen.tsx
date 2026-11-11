import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, Mic, Send, Sparkles, BookOpen } from 'lucide-react';
import { askStudyBuddy, supabase } from '../../lib/supabase';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot' | 'system';
  content: string;
  source?: string;
  sourceLinks?: { label: string; url: string }[];
  expectedConcepts?: string[][];
  conceptLabels?: string[];
  conceptHints?: string[];
  collectedAnswer?: string;
  teachingAnswer?: string;
  isError?: boolean;
}

interface TutorResponse {
  reply: string;
  source: string;
  sourceLinks?: { label: string; url: string }[];
  expectedConcepts?: string[][];
  conceptLabels?: string[];
  conceptHints?: string[];
  collectedAnswer?: string;
  teachingAnswer?: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike extends ArrayLike<SpeechRecognitionAlternativeLike> {
  isFinal: boolean;
}

interface SpeechRecognitionEventLike extends Event {
  results: ArrayLike<SpeechRecognitionResultLike>;
  resultIndex?: number;
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

interface AITutorScreenProps {
  studentId: string | null;
  studentName: string;
  canUseGemini: boolean;
}

const LEGACY_HISTORY_KEY = 'ch10_study_buddy_history';

function getTutorHistoryKey(studentId: string | null): string {
  if (studentId) return `${LEGACY_HISTORY_KEY}:${studentId}`;

  let visitorId: string | null = null;
  try {
    visitorId = sessionStorage.getItem('ch10_study_buddy_visitor_id');
    if (!visitorId) {
      visitorId = window.crypto.randomUUID();
      sessionStorage.setItem('ch10_study_buddy_visitor_id', visitorId);
    }
  } catch {
    visitorId = window.crypto.randomUUID();
  }
  return `${LEGACY_HISTORY_KEY}:visitor:${visitorId}`;
}

function createWelcomeMessage(studentName: string): ChatMessage {
  const firstName = studentName.trim().split(/\s+/)[0] || 'there';
  return {
    id: 'init-1',
    role: 'system',
    content: `👋 Hi, ${firstName}! I'm Study Buddy. Ask about Chapter 10 and we'll learn it together with clear explanations, examples, and encouraging feedback.`,
  };
}

function loadChatHistory(storageKey: string, studentName: string): ChatMessage[] {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const validMessages = parsed.filter((message): message is ChatMessage =>
          typeof message === 'object' &&
          message !== null &&
          'id' in message &&
          typeof message.id === 'string' &&
          'role' in message &&
          (message.role === 'user' || message.role === 'bot' || message.role === 'system') &&
          'content' in message &&
          typeof message.content === 'string'
        );
        if (validMessages.length > 0) return validMessages;
      }
    }
  } catch {
    // Start a fresh conversation if this browser's saved history cannot be read.
  }
  return [createWelcomeMessage(studentName)];
}

export const AITutorScreen: React.FC<AITutorScreenProps> = ({ studentId, studentName, canUseGemini }) => {
  const [historyKey] = useState(() => getTutorHistoryKey(studentId));
  const firstName = studentName.trim().split(/\s+/)[0] || 'there';
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return loadChatHistory(historyKey, studentName);
  });

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatStorageError, setChatStorageError] = useState<string>('');
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
  const voiceTranscriptRef = useRef<string>('');

  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_HISTORY_KEY);
      localStorage.setItem(historyKey, JSON.stringify(messages));
      setChatStorageError('');
    } catch {
      setChatStorageError('Chat history could not be saved in this browser.');
    }
    const chatStream = chatStreamRef.current;
    if (chatStream) {
      chatStream.scrollTo({ top: chatStream.scrollHeight, behavior: 'smooth' });
    }
  }, [historyKey, messages, isTyping]);

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
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = true;

      rec.onstart = () => {
        setSpeechStatus('Listening… speak your question now.');
        setInterimTranscript('');
        voiceTranscriptRef.current = '';
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const firstChangedResult = event.resultIndex ?? Math.max(0, event.results.length - 1);
        let partialTranscript = '';
        for (let index = firstChangedResult; index < event.results.length; index += 1) {
          const result = event.results[index];
          const transcript = result[0]?.transcript ?? '';
          if (result.isFinal) {
            voiceTranscriptRef.current = [voiceTranscriptRef.current, transcript.trim()]
              .filter(Boolean)
              .join(' ');
          } else {
            partialTranscript += transcript;
          }
        }
        setInterimTranscript([voiceTranscriptRef.current, partialTranscript.trim()].filter(Boolean).join(' '));
      };

      rec.onerror = (event) => {
        const statusByError: Record<string, string> = {
          'not-allowed': 'Microphone access was blocked. Allow microphone access in your browser settings, then try again.',
          'service-not-allowed': 'The browser speech service is unavailable. Check your connection or type your question.',
          'audio-capture': 'No microphone was found. Connect a microphone or type your question.',
          network: 'Voice recognition needs a network connection. Check your connection or type your question.',
          'no-speech': 'No speech was detected. Try again and speak after the microphone starts.',
          'language-not-supported': 'English voice recognition is unavailable in this browser.',
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
        const transcript = voiceTranscriptRef.current.trim();
        voiceTranscriptRef.current = '';
        if (transcript) {
          setInput((previous) => [previous.trim(), transcript].filter(Boolean).join(' '));
          setSpeechStatus('Question captured. Review it, then press Send.');
        } else {
          setSpeechStatus((current) =>
            current === 'Listening… speak your question now.'
              ? 'No speech was captured. Tap the microphone and try again.'
              : current
          );
        }
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

  const normalizeAnswer = (text: string) =>
    text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ').trim();

  const isLikelyNewQuestion = (text: string) =>
    /\?$/.test(text.trim()) ||
    /^(what|why|how|when|where|who|which|can|could|would|should|is|are|do|does|did|tell me|explain|define)\b/i.test(text.trim());

  const matchesExpectedConcept = (answer: string, concepts: string[]) => {
    const normalizedAnswer = normalizeAnswer(answer);
    return concepts.some((concept) => {
      const normalizedConcept = normalizeAnswer(concept);
      if (` ${normalizedAnswer} `.includes(` ${normalizedConcept} `)) return true;
      if (normalizedConcept.includes(' ')) return false;
      return normalizedAnswer.split(' ').some((word) =>
        word === normalizedConcept ||
        (normalizedConcept.length >= 4 && word.length > normalizedConcept.length && word.startsWith(normalizedConcept))
      );
    });
  };

  const hasExpectedAnswerConcept = (answer: string, previousPrompt: ChatMessage) =>
    (previousPrompt.expectedConcepts ?? []).some((concepts) => matchesExpectedConcept(answer, concepts));

  const evaluateStudentAnswer = (answer: string, previousPrompt: ChatMessage) => {
    const combinedAnswer = [previousPrompt.collectedAnswer, answer].filter(Boolean).join(' ');
    const matchedConcepts = (previousPrompt.expectedConcepts ?? []).map((concepts, index) => ({
      index,
      matched: matchesExpectedConcept(combinedAnswer, concepts),
    }));
    const matchedIndexes = matchedConcepts.filter(({ matched }) => matched).map(({ index }) => index);
    const missingIndexes = matchedConcepts.filter(({ matched }) => !matched).map(({ index }) => index);
    const labels = previousPrompt.conceptLabels ?? [];
    const hints = previousPrompt.conceptHints ?? [];

    if (matchedIndexes.length === matchedConcepts.length && matchedConcepts.length > 0) {
      return {
        complete: true,
        answer: combinedAnswer,
        reply: `That's excellent, ${firstName}! You correctly connected ${matchedIndexes.map((index) => labels[index]).join(' and ')}.\n\nHere's the complete answer: ${previousPrompt.teachingAnswer ?? 'Your answer identifies the important idea. A recognition system collects input, analyzes useful patterns, and uses them to make a decision.'}\n\nYou should feel proud of that reasoning. What would you like to explore next?`,
      };
    }

    if (matchedIndexes.length > 0) {
      const missingHint = hints[missingIndexes[0]] ?? 'Think about the other part of the question.';
      return {
        complete: false,
        answer: combinedAnswer,
        reply: `You're off to a good start, ${firstName}! You already identified ${matchedIndexes.map((index) => labels[index]).join(' and ')}. One more idea will complete it. Hint: ${missingHint} What else can you add?`,
      };
    }

    return {
      complete: false,
      answer: combinedAnswer,
      reply: `Thanks for giving it a try, ${firstName}—learning happens one step at a time. Let's look at it together. Hint: ${hints[0] ?? 'Look for the key idea in the example I gave.'} What clue in the example could help you decide?`,
    };
  };

  // Socratic prompts and follow-up checks are grounded in the Chapter 10 textbook.
  const generateTutorResponse = (query: string): TutorResponse => {
    const q = query.toLowerCase();
    const socraticReply = (hint: string, example: string, question: string) =>
      `Great question, ${firstName}! Let's reason it out together.\n\nHint: ${hint}\n\nReal-life example: ${example}\n\nYour turn: ${question}`;

    if (q.includes('6 step') || q.includes('cycle') || q.includes('steps')) {
      return {
        reply: socraticReply(
          'Follow a phone face-unlock attempt from the moment the camera sees you to the moment the phone opens. Think about what must happen to a blurry image before it can be compared.',
          'A phone adjusts a dim or blurry face image, looks for distinguishing details, compares them with a saved pattern, then decides whether to unlock.',
          'What do you think should happen first, and which step would improve a noisy image?'
        ),
        source: 'Recognition System Cycle (6 steps)',
        expectedConcepts: [
          ['input', 'sensing', 'sensor', 'camera', 'collect', 'capture'],
          ['pre-processing', 'preprocessing', 'clean', 'cleaning', 'noise', 'blur', 'lighting'],
        ],
        conceptLabels: ['the system first senses or collects input', 'pre-processing improves noisy or blurry data'],
        conceptHints: ['What does the camera or microphone do before the system can analyze anything?', 'Which stage cleans the input or corrects blur and noise?'],
        teachingAnswer: 'The six stages are input/sensing (collect raw data), pre-processing (clean or improve it), feature extraction (find useful details), pattern matching/classification (compare those details with learned patterns), decision/output (produce a result), and feedback/learning (use outcomes to improve later performance).',
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
        expectedConcepts: [
          ['poor lighting', 'dark', 'lighting', 'accuracy', 'inaccurate', 'error', 'mistake', 'bias', 'biased', 'misrecognize', 'misidentify'],
          ['privacy', 'protect', 'secure', 'security', 'consent', 'encrypt', 'permission'],
        ],
        conceptLabels: ['recognition accuracy can fail in poor conditions', 'personal biometric data needs protection'],
        conceptHints: ['What might a dark or blurry camera image do to the accuracy of recognition?', 'What should a school do to keep stored face or fingerprint data safe?'],
        teachingAnswer: 'Common limitations include high cost, errors in poor conditions, bias from unbalanced data, privacy and ethical risks, and possible job displacement. Systems should use secure data handling, consent, representative data, and human oversight.',
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
        expectedConcepts: [
          ['face', 'facial', 'fingerprint', 'iris', 'biometric', 'body feature', 'physical feature'],
          ['identity', 'verify', 'verification', 'match', 'compare', 'record', 'template', 'stored pattern'],
        ],
        conceptLabels: ['a biometric feature such as a face or fingerprint', 'checking it against an identity record'],
        conceptHints: ['Which unique physical feature could the scanner read?', 'What does the system compare that feature with before making a decision?'],
        teachingAnswer: 'A border or identity-check system may capture a biometric feature such as a face, compare its extracted features with an enrolled identity record, and use the match to help verify identity. Biometric information is sensitive and should be protected.',
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
        expectedConcepts: [
          ['attendance', 'fingerprint', 'scan', 'scanner', 'student', 'data', 'information'],
          ['automatically', 'automatic', 'without typing', 'manual typing', 'typing', 'time', 'faster', 'quick'],
        ],
        conceptLabels: ['the scanner collects attendance information', 'it reduces manual entry'],
        conceptHints: ['What information is the school scanner collecting?', 'How is scanning different from typing each student’s details by hand?'],
        teachingAnswer: 'Automated Data Capture (ADC) collects information directly from its source using devices such as scanners or sensors instead of requiring a person to type it all manually. This can save time and reduce data-entry errors.',
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
        expectedConcepts: [
          ['convenient', 'convenience', 'easy', 'easier', 'quick', 'fast', 'time', 'effort'],
          ['password', 'secure', 'security', 'protect', 'owner', 'consent', 'privacy'],
        ],
        conceptLabels: ['recognition can make access quicker or more convenient', 'security and privacy still matter'],
        conceptHints: ['What does recognizing the owner save them from doing every time?', 'What should happen if the phone is not sure who is looking at it?'],
        teachingAnswer: 'Recognition systems can process information quickly and consistently, reduce repetitive manual work, and make tasks such as unlocking a phone more convenient. Their results still need appropriate privacy and security safeguards.',
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
        expectedConcepts: [
          ['fingerprint', 'iris', 'face', 'facial', 'biometric', 'body feature', 'physical feature'],
          ['template', 'stored pattern', 'pattern', 'record', 'compare', 'match', 'identity', 'verify'],
        ],
        conceptLabels: ['a unique physical trait', 'a stored pattern or record used for comparison'],
        conceptHints: ['Which body feature is unique to the person?', 'What stored digital pattern is compared with that feature?'],
        teachingAnswer: 'Biometric recognition uses a physical or behavioral characteristic—such as a fingerprint, face, iris, or voice. The system extracts useful features and compares them with a stored template to help verify or identify someone.',
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
        expectedConcepts: [
          ['word', 'words', 'speech', 'spoken', 'voice', 'command', 'audio'],
          ['text', 'action', 'instruction', 'phoneme', 'meaning', 'recognize', 'recognise', 'identify'],
        ],
        conceptLabels: ['the spoken words or sounds', 'identifying them so the device can produce text or an action'],
        conceptHints: ['What is the person saying to the device?', 'What must the system do with those sounds before it can act?'],
        teachingAnswer: 'Speech recognition captures audio, processes the sound, identifies spoken words, and may convert them into text or an instruction. A voice assistant can then use that instruction to perform an action, such as setting a timer.',
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
        expectedConcepts: [
          ['hand', 'gesture', 'movement', 'motion', 'position', 'angle', 'finger'],
          ['track', 'tracking', 'classify', 'classification', 'action', 'command', 'control', 'compare', 'match', 'pattern'],
        ],
        conceptLabels: ['the hand’s movement or position', 'tracking it to interpret an action'],
        conceptHints: ['What movement or position does the camera observe?', 'How could the system use that movement to choose an action?'],
        teachingAnswer: 'Gesture recognition tracks body or hand movements, extracts features such as position and motion, and classifies the gesture so a device can choose an action.',
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
        expectedConcepts: [
          ['shape', 'shapes', 'edge', 'edges', 'colour', 'color', 'feature', 'pattern', 'visual', 'pixel'],
          ['compare', 'match', 'identify', 'recognize', 'recognise', 'classify', 'trained', 'learned', 'learn'],
        ],
        conceptLabels: ['visual clues such as shapes and edges', 'comparing those clues with learned patterns'],
        conceptHints: ['What visible details can you notice in a picture?', 'How could the system use those details to decide what is shown?'],
        teachingAnswer: 'Image recognition analyzes visual input such as pixels, shapes, edges, and other features, then compares them with learned patterns to identify or classify what appears in an image.',
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
        expectedConcepts: [
          ['expression', 'face', 'facial', 'eyebrow', 'mouth', 'lighting', 'culture', 'context', 'different'],
          ['not always', 'cannot know', 'cannot fully understand', 'misread', 'misinterpret', 'uncertain', 'careful', 'assume'],
        ],
        conceptLabels: ['expressions can be affected by context or appearance', 'a system cannot know a person’s full feelings for certain'],
        conceptHints: ['Can the same facial expression always mean the same thing for every person?', 'What should we avoid assuming from a system’s guess about someone’s feelings?'],
        teachingAnswer: 'Emotion-recognition systems may analyze facial expressions, voice, or body language, but those cues can be affected by culture, context, and individual differences. A system cannot know a person’s full feelings with certainty, so its conclusions should be treated cautiously.',
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
        expectedConcepts: [
          ['letter', 'letters', 'character', 'characters', 'text', 'word', 'words'],
          ['scan', 'image', 'photo', 'pattern', 'recognize', 'recognise', 'identify', 'digital', 'editable'],
        ],
        conceptLabels: ['the letters or characters on the page', 'recognizing them and converting them into digital text'],
        conceptHints: ['What symbols are printed or handwritten on the page?', 'What should the scanner produce after identifying each symbol?'],
        teachingAnswer: 'Optical Character Recognition (OCR) analyzes an image of printed or handwritten text, identifies its letters and characters, and converts them into digital text that can be searched or edited.',
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
        expectedConcepts: [
          ['input', 'image', 'speech', 'sound', 'data', 'face', 'voice', 'pattern'],
          ['identify', 'identifies', 'recognize', 'recognises', 'recognizes', 'classify', 'classification', 'interpret'],
        ],
        conceptLabels: ['the system receives real-world input', 'it identifies or classifies a pattern in that input'],
        conceptHints: ['What might a camera, microphone, or scanner give the computer?', 'What is the computer trying to find in that input?'],
        teachingAnswer: 'An AI recognition system analyzes real-world input—such as an image, sound, or biometric feature—to identify or classify patterns in it. For example, a phone may analyze a face and use the result to decide whether to unlock.',
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
        teachingAnswer: 'This is outside the Chapter 10 topics I can reliably explain from the course material. Use the linked learning resources to check the details, and I can help you think through what you find.',
      };
    }

    return {
      reply: socraticReply(
        'Break the question into three parts: what the system senses, what pattern it looks for, and what action follows.',
        'A motion-aware CCTV camera senses a scene, looks for movement, and can begin recording when something passes.',
        'Which part of your question is about the input, and what evidence would help you work out the system’s decision?'
      ),
      source: 'Section 10.1 & Chapter 10 Overview',
      expectedConcepts: [
        ['input', 'sensor', 'camera', 'sound', 'image', 'data', 'sensing', 'movement'],
        ['pattern', 'feature', 'match', 'compare', 'identify', 'recognize', 'recognise', 'classify', 'decision', 'output'],
      ],
      conceptLabels: ['the input the system senses', 'the pattern it analyzes to make a decision'],
      conceptHints: ['What does the camera, microphone, or other sensor detect?', 'What feature or pattern does the system look for in that input?'],
      teachingAnswer: 'A recognition system collects input through a sensor, processes it to find useful features, compares those features with learned patterns, and produces a classification or decision. For example, a CCTV camera can detect motion and respond by starting a recording.',
    };
  };

  const handleSend = (textToSend?: string) => {
    if (isTyping) return;
    const text = textToSend || input;
    if (!text.trim()) return;
    let previousMessageIndex = -1;
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role !== 'system') {
        previousMessageIndex = index;
        break;
      }
    }

    const latestMessage = messages[previousMessageIndex];
    let previousUserMessage: ChatMessage | undefined;
    for (let index = previousMessageIndex - 1; index >= 0; index -= 1) {
      if (messages[index].role === 'user') {
        previousUserMessage = messages[index];
        break;
      }
    }

    const regeneratedPrompt = latestMessage?.role === 'bot' && !latestMessage.expectedConcepts && previousUserMessage
      ? generateTutorResponse(previousUserMessage.content)
      : null;
    const previousMessage =
      latestMessage?.role === 'bot' && regeneratedPrompt?.expectedConcepts &&
      regeneratedPrompt.source === latestMessage.source
        ? {
            ...latestMessage,
            expectedConcepts: regeneratedPrompt.expectedConcepts,
            conceptLabels: regeneratedPrompt.conceptLabels,
            conceptHints: regeneratedPrompt.conceptHints,
          }
        : latestMessage;
    const answerContext =
      previousMessage?.role === 'bot' &&
      previousMessage.expectedConcepts &&
      (!isLikelyNewQuestion(text) || hasExpectedAnswerConcept(text, previousMessage))
        ? previousMessage
        : null;

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
      void (async () => {
        let response: TutorResponse;
        let isError = false;
        try {
          if (canUseGemini && supabase) {
            const history = messages
              .filter((message): message is ChatMessage & { role: 'user' | 'bot' } =>
                message.role === 'user' || message.role === 'bot'
              )
              .slice(-10)
              .map((message) => ({
                role: message.role,
                content: message.content,
              }));
            response = await askStudyBuddy(text.trim(), history);
          } else {
            response = answerContext
              ? (() => {
                  const evaluation = evaluateStudentAnswer(text.trim(), answerContext);
                  return {
                    reply: evaluation.reply,
                    source: answerContext.source ?? 'Chapter 10',
                    teachingAnswer: answerContext.teachingAnswer,
                    ...(!evaluation.complete
                      ? {
                          expectedConcepts: answerContext.expectedConcepts,
                          conceptLabels: answerContext.conceptLabels,
                          conceptHints: answerContext.conceptHints,
                          collectedAnswer: evaluation.answer,
                          teachingAnswer: answerContext.teachingAnswer,
                        }
                      : {}),
                  };
                })()
              : generateTutorResponse(text);
          }
        } catch (error) {
          isError = true;
          const fallback = generateTutorResponse(text);
          const reason = error instanceof Error ? error.message : 'unknown error';
          response = {
            ...fallback,
            reply: `Gemini AI is temporarily unavailable (${reason}). Here's the local Study Buddy response instead:\n\n${fallback.reply}`,
            source: `Offline fallback · ${fallback.source}`,
          };
        }

      const { reply, source, sourceLinks } = response;
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: reply,
        source,
        sourceLinks,
        teachingAnswer: response.teachingAnswer,
        expectedConcepts: response.expectedConcepts,
        conceptLabels: response.conceptLabels,
        conceptHints: response.conceptHints,
        collectedAnswer: response.collectedAnswer,
        isError,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(reply);
      })();
    }, 500);
  };

  const handleClearChat = () => {
    if (window.confirm('Clear this conversation?')) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      const initial = [createWelcomeMessage(studentName)];
      setMessages(initial);
      setSpeechStatus('');
      setInterimTranscript('');
      try {
        localStorage.removeItem(historyKey);
        setChatStorageError('');
      } catch {
        setChatStorageError('Could not clear this conversation from browser storage.');
      }
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
              {canUseGemini
                ? `Gemini AI · messages are processed by Google; avoid sharing private information · Learning with ${firstName}`
                : `Local tutor · Learning with ${firstName}`}
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
              disabled={isTyping}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#101a2f] text-slate-300 border border-[#233556] hover:text-rose-300 hover:border-rose-500/50 transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Clear conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear chat</span>
            </button>
          </div>
        </header>

        {/* ----------------- CHAT STREAM ----------------- */}
        <div ref={chatStreamRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {chatStorageError && (
            <div role="status" className="rounded-xl border border-amber-500/40 bg-amber-950/30 px-3 py-2 text-xs text-amber-200">
              {chatStorageError}
            </div>
          )}
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
                      : m.isError
                        ? 'bg-amber-950/50 text-amber-100 border border-amber-500/40 border-l-[3px] border-l-amber-400 rounded-bl-sm shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
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
              disabled={isTyping}
              className="px-3 py-1.5 rounded-full text-xs bg-[#101a2f] border border-[#21355a] text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-white transition-all whitespace-nowrap active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={!input.trim() || isTyping}
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
