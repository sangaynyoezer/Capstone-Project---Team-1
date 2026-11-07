/**
 * Video Checkpoint Quizzes for Subtopics 2, 3, and 4.
 * Each quiz contains 10 questions tailored specifically to the respective video lesson:
 * - Multiple Choice Questions (MCQ)
 * - Matching pairs (modality/concept matching)
 * - Fill-in-the-blank questions
 */

export type QuestionType = 'mcq' | 'matching' | 'fill_blank';

export interface MatchingPair {
  left: string;
  right: string;
}

export interface VideoQuizQuestion {
  id: number;
  type: QuestionType;
  title: string;
  prompt: string;
  // For MCQ & Fill-in-the-blank
  options?: string[];
  correctOptionIndex?: number;
  // For Matching
  matchingPairs?: MatchingPair[];
  explanation: string;
}

// -------------------------------------------------------------------------------------------------
// 1. LESSON 2 VIDEO QUIZ: "AI Recognition Cycle" (YouTube: https://youtu.be/PUE9JxUIaC0)
// -------------------------------------------------------------------------------------------------
export const LESSON2_VIDEO_QUIZ: VideoQuizQuestion[] = [
  {
    id: 1,
    type: 'mcq',
    title: 'Stage 1: Input Sensing',
    prompt: 'According to the AI Recognition Cycle video, what is the initial step that begins the entire process?',
    options: [
      'Capturing physical sensory data (photons, soundwaves, pressure) via a sensor or camera',
      'Immediately searching an encrypted database for matching records',
      'Displaying a green checkmark on a computer screen',
      'Deleting background files from hard drive memory',
    ],
    correctOptionIndex: 0,
    explanation: 'The cycle always starts with Input Acquisition: capturing environmental light, acoustic oscillations, or thermal pressure via sensors.',
  },
  {
    id: 2,
    type: 'fill_blank',
    title: 'Analog to Digital Conversion',
    prompt: 'Sensors pass incoming analog light or sound signals through an ADC to convert them into a digital matrix of _____.',
    options: [
      'numerical values (pixels & coordinates)',
      'mechanical clock gears',
      'printed paper cards',
      'acoustic radio tones',
    ],
    correctOptionIndex: 0,
    explanation: 'Computers cannot process raw analog waves; they require numbers (matrices of pixels or spectrogram frequencies).',
  },
  {
    id: 3,
    type: 'matching',
    title: 'Match the 4 Cycle Stages to Their Core Actions',
    prompt: 'Match each of the 4 recognition cycle stages to its correct operational task:',
    matchingPairs: [
      { left: '1. Input Sensing', right: 'Captures photons or soundwaves from environment' },
      { left: '2. Pre-Processing', right: 'Removes glare, crops boundaries, and filters noise' },
      { left: '3. Feature Extraction', right: 'Calculates geometric vectors and biometric landmarks' },
      { left: '4. Decision / Matching', right: 'Compares vectors against templates using confidence threshold' },
    ],
    explanation: 'The canonical 4 stages are: Input Sensing → Pre-Processing → Feature Extraction → Decision/Matching.',
  },
  {
    id: 4,
    type: 'mcq',
    title: 'Stage 2: Pre-Processing Objective',
    prompt: 'Why does the video emphasize that facial images must undergo Pre-Processing before classification?',
    options: [
      'To color-code the background for graphic design purposes',
      'To normalize lighting variations, eliminate blur, and align face orientation so models compare consistent data',
      'To send the raw photo directly to social media servers',
      'To increase the file size of the image',
    ],
    correctOptionIndex: 1,
    explanation: 'Pre-processing removes irrelevant noise (shadows, tilt, low lighting) so the neural network can extract reliable features.',
  },
  {
    id: 5,
    type: 'fill_blank',
    title: 'Biometric Landmarks',
    prompt: 'During feature extraction, AI face models pinpoint specific anchor coordinates on eyes, nose, and lips called biometric _____.',
    options: [
      'landmarks (keypoints)',
      'watermarks',
      'barcodes',
      'glitches',
    ],
    correctOptionIndex: 0,
    explanation: 'Biometric landmarks (like the 68-point dlib facial mesh or MediaPipe mesh) identify consistent anchor coordinates on the face.',
  },
  {
    id: 6,
    type: 'matching',
    title: 'Match the Cycle Component to Its Example',
    prompt: 'Match the system cycle component to its practical lab example:',
    matchingPairs: [
      { left: 'Sensory Input', right: 'CMOS camera captures light reflected off student' },
      { left: 'Filtered Noise', right: 'Grayscale normalization removing room shadow' },
      { left: 'Biometric Vector', right: 'Distance ratio between eye centers and nose tip' },
      { left: 'Threshold Decision', right: 'Similarity score of 98.4% clears the 95% pass gate' },
    ],
    explanation: 'Each stage transforms the physical signal closer to a mathematical certainty rating.',
  },
  {
    id: 7,
    type: 'fill_blank',
    title: 'Confidence Threshold',
    prompt: 'The predetermined minimum probability score that an AI system requires to grant access is known as the confidence _____.',
    options: [
      'threshold',
      'bandwidth',
      'frequency',
      'resolution',
    ],
    correctOptionIndex: 0,
    explanation: 'If similarity probability meets or exceeds the confidence threshold (e.g. 95%), access is granted.',
  },
  {
    id: 8,
    type: 'mcq',
    title: 'Template Security',
    prompt: 'Why is comparing mathematical vector templates safer than saving raw facial photos in an enrollment database?',
    options: [
      'Mathematical vectors cannot be visually displayed on phone screens',
      'A mathematical vector template is a one-way representation that cannot be reverse-engineered into the original photo',
      'Vectors do not consume any computer RAM',
      'Raw photos automatically delete themselves after 24 hours',
    ],
    correctOptionIndex: 1,
    explanation: 'Storing vectors prevents data breaches from leaking actual facial photographs; vectors are one-way cryptographic-like embeddings.',
  },
  {
    id: 9,
    type: 'matching',
    title: 'Match System Outcome to Condition',
    prompt: 'Match the recognition decision outcome with the system condition:',
    matchingPairs: [
      { left: 'Access Granted', right: 'Similarity score exceeds confidence threshold (e.g., 97% >= 90%)' },
      { left: 'Access Denied', right: 'Similarity score falls below required threshold (e.g., 64% < 90%)' },
      { left: 'False Positive', right: 'Unauthorized person incorrectly accepted due to overly low threshold' },
      { left: 'False Negative', right: 'Legitimate authorized person rejected due to bad lighting' },
    ],
    explanation: 'Calibrating confidence thresholds balances security against false rejections.',
  },
  {
    id: 10,
    type: 'mcq',
    title: 'Feedback Loop',
    prompt: 'What happens when the cycle encounters an ambiguous input (e.g., face partially occluded by a scarf)?',
    options: [
      'The system feedback loop prompts the user to adjust position, improve lighting, or re-scan',
      'The entire computer operating system crashes and formats the drive',
      'The system immediately assigns a random identity from the database',
      'The camera sensor shuts off permanently',
    ],
    correctOptionIndex: 0,
    explanation: 'A resilient recognition system utilizes an interactive feedback loop to ask for clearer input when confidence is low.',
  },
];

// -------------------------------------------------------------------------------------------------
// 2. LESSON 3 VIDEO QUIZ: "Types of Recognition Systems" (YouTube: https://youtu.be/_DnfUSonn5k)
// -------------------------------------------------------------------------------------------------
export const LESSON3_VIDEO_QUIZ: VideoQuizQuestion[] = [
  {
    id: 1,
    type: 'mcq',
    title: 'Modality 1: Speech & Voice Recognition',
    prompt: 'In voice recognition systems, what raw sensory data does the microphone capture?',
    options: [
      'Acoustic pressure soundwaves converted into frequency spectrograms',
      'Visual light reflections off the vocal cords',
      'Thermal body heat variations from speech',
      'Text ASCII characters typed on a keyboard',
    ],
    correctOptionIndex: 0,
    explanation: 'Microphones measure air pressure oscillations, transforming acoustic soundwaves into time-frequency spectrograms.',
  },
  {
    id: 2,
    type: 'fill_blank',
    title: 'OCR Terminology',
    prompt: 'Converting printed or handwritten document photographs into editable text strings is performed by Optical _____ Recognition.',
    options: [
      'Character (OCR)',
      'Camera',
      'Confidence',
      'Coordinate',
    ],
    correctOptionIndex: 0,
    explanation: 'OCR stands for Optical Character Recognition, recognizing typographic glyphs and handwriting.',
  },
  {
    id: 3,
    type: 'matching',
    title: 'Match the Recognition Modality to Its Primary Sensor',
    prompt: 'Match each AI recognition modality to the physical hardware sensor it uses:',
    matchingPairs: [
      { left: 'Facial Recognition', right: 'Optical CMOS Camera or 3D Structured Light Sensor' },
      { left: 'Voice Recognition', right: 'Condenser Microphone capturing air oscillations' },
      { left: 'Fingerprint Recognition', right: 'Capacitive or Optical Ridge Scanner' },
      { left: 'OCR Text Recognition', right: 'Flatbed Scanner or Document Camera' },
    ],
    explanation: 'Different recognition modalities rely on specialized sensors to capture their unique physical phenomena.',
  },
  {
    id: 4,
    type: 'mcq',
    title: 'Biometric Uniqueness',
    prompt: 'Why are Fingerprint and Iris recognition classified as Biometric Recognition systems?',
    options: [
      'Because they measure distinctive, permanent biological characteristics unique to an individual human',
      'Because they only run on battery-powered mobile phones',
      'Because they can only recognize animals in a forest',
      'Because they do not require any computer software',
    ],
    correctOptionIndex: 0,
    explanation: 'Biometric systems measure physiological or behavioral traits that uniquely identify human individuals.',
  },
  {
    id: 5,
    type: 'fill_blank',
    title: 'Fingerprint Minutiae Points',
    prompt: 'The distinctive points where fingerprint ridges split, merge, or terminate are technically called _____ points.',
    options: [
      'minutiae',
      'pixels',
      'vertices',
      'wavelengths',
    ],
    correctOptionIndex: 0,
    explanation: 'Minutiae points (ridge endings, bifurcations, islands) form the mathematical foundation of fingerprint vector matching.',
  },
  {
    id: 6,
    type: 'matching',
    title: 'Match the Real-World System to Its Recognition Category',
    prompt: 'Match each everyday system to its corresponding AI recognition type:',
    matchingPairs: [
      { left: 'Siri / Google Voice Assistant', right: 'Speech & Acoustic Wave Recognition' },
      { left: 'Phuentsholing AICS Pedestrian Gate', right: 'Facial & Biometric Identity Verification' },
      { left: 'Google Lens scanning a receipt', right: 'Optical Character Recognition (OCR)' },
      { left: 'School Lab Laptop Unlock Button', right: 'Capacitive Fingerprint Biometric' },
    ],
    explanation: 'Understanding the 5 key modalities enables students to identify AI systems in modern society.',
  },
  {
    id: 7,
    type: 'mcq',
    title: 'Bhutan Case Study Context',
    prompt: "In the Phuentsholing Automated Immigration Clearance System (AICS) in Bhutan, what is the primary purpose of biometric recognition?",
    options: [
      'To speed up safe, automated identity verification for daily pedestrian commuters crossing the border',
      'To charge people money for taking photographs',
      'To prevent students from carrying books across the gate',
      'To test how loud people can speak into a microphone',
    ],
    correctOptionIndex: 0,
    explanation: 'Phuentsholing AICS automated border identity checks through facial and fingerprint biometrics to streamline safe traffic flow.',
  },
  {
    id: 8,
    type: 'fill_blank',
    title: 'Audio Frequency Representation',
    prompt: 'A visual heat map showing how audio pitch frequencies change over milliseconds of speech is called a _____.',
    options: [
      'spectrogram',
      'histogram',
      'bitmap',
      'spreadsheet',
    ],
    correctOptionIndex: 0,
    explanation: 'Speech recognition AI reads spectrograms like visual images, identifying phonemes across frequency bands.',
  },
  {
    id: 9,
    type: 'matching',
    title: 'Match Modality Advantage to Recognition Type',
    prompt: 'Match the distinctive technical advantage to its recognition category:',
    matchingPairs: [
      { left: 'Iris Recognition', right: 'Extremely high entropy patterns stable throughout life' },
      { left: 'Gait Recognition', right: 'Identifies individuals from afar based on walking mechanics' },
      { left: 'Voice Recognition', right: 'Hands-free operation ideal for driving or accessibility' },
      { left: 'Facial Recognition', right: 'Contactless high-throughput scanning in public gateways' },
    ],
    explanation: 'Each modality offers unique security and accessibility trade-offs.',
  },
  {
    id: 10,
    type: 'mcq',
    title: 'Multimodal Systems',
    prompt: 'What is a "Multimodal" AI recognition system?',
    options: [
      'A system that combines two or more recognition types (e.g. Face + Fingerprint) for higher security',
      'A system that only works on Sundays',
      'A computer that has two monitors plugged into it',
      'A system that cannot connect to the internet',
    ],
    correctOptionIndex: 0,
    explanation: 'Multimodal systems integrate multiple sensory inputs (e.g. face and iris or voice and pin) to virtually eliminate false accepts.',
  },
];

// -------------------------------------------------------------------------------------------------
// 3. LESSON 4 VIDEO QUIZ: "AI Recognition in the Real World" (YouTube: https://youtu.be/CdpsGjuaXaQ)
// -------------------------------------------------------------------------------------------------
export const LESSON4_VIDEO_QUIZ: VideoQuizQuestion[] = [
  {
    id: 1,
    type: 'mcq',
    title: 'Verification vs Identification',
    prompt: 'In real-world security systems, what is the difference between 1:1 Verification and 1:N Identification?',
    options: [
      '1:1 compares a live face against one specific enrolled passport chip; 1:N searches one face across an entire database',
      '1:1 is only used in classrooms, while 1:N is used only in banks',
      '1:1 uses soundwaves, while 1:N uses thermal heat',
      'There is no difference; they mean the exact same thing',
    ],
    correctOptionIndex: 0,
    explanation: '1:1 verification answers "Are you who you claim to be?"; 1:N identification answers "Who are you among these thousands?".',
  },
  {
    id: 2,
    type: 'fill_blank',
    title: 'Preventing Spoofing',
    prompt: 'To prevent people from bypassing recognition gates using a printed color photograph or phone video, systems employ _____ detection.',
    options: [
      'liveness (anti-spoofing)',
      'resolution',
      'bandwidth',
      'contrast',
    ],
    correctOptionIndex: 0,
    explanation: 'Liveness detection analyzes micro-texture, 3D depth, and involuntary pupil/blink reflexes to ensure a real human is present.',
  },
  {
    id: 3,
    type: 'matching',
    title: 'Match the Industrial Deployment to Its Security Benefit',
    prompt: 'Match each real-world deployment to its primary organizational benefit:',
    matchingPairs: [
      { left: 'Airport Smart E-Gates', right: 'Fast contactless passenger verification reducing queue wait times' },
      { left: 'Banking Mobile Apps', right: 'Biometric authorization preventing fraudulent fund transfers' },
      { left: 'School Attendance Terminals', right: 'Automated attendance logging eliminating buddy punching' },
      { left: 'Hospital Patient Check-in', right: 'Accurate record retrieval even when patients are unconscious' },
    ],
    explanation: 'Real-world deployments improve operational speed, prevent fraud, and secure sensitive premises.',
  },
  {
    id: 4,
    type: 'mcq',
    title: 'Lab Role-Play: System Administrator',
    prompt: 'In the Class IX computer lab simulator role-play, what was the primary responsibility of the System Administrator role?',
    options: [
      'Auditing matching confidence scores, adjusting sensitivity thresholds, and investigating flagged false rejects',
      'Writing physical detention slips for students',
      'Unplugging all computers at the end of class',
      'Typing passwords for students whenever they made mistakes',
    ],
    correctOptionIndex: 0,
    explanation: 'The system administrator oversees algorithmic thresholds, ensuring legitimate users pass while security threats are blocked.',
  },
  {
    id: 5,
    type: 'fill_blank',
    title: 'Error Types: False Acceptance',
    prompt: 'When an AI recognition gate erroneously unlocks for an unauthorized intruder because the threshold was set too low, it is called a False _____.',
    options: [
      'Acceptance (False Positive)',
      'Negative',
      'Rejection',
      'Format',
    ],
    correctOptionIndex: 0,
    explanation: 'A False Acceptance Rate (FAR) occurs when an imposter is mistakenly verified as an authorized user.',
  },
  {
    id: 6,
    type: 'matching',
    title: 'Match the Vulnerability to Its Defense Mechanism',
    prompt: 'Match the real-world vulnerability to the technical defense used in modern AI engineering:',
    matchingPairs: [
      { left: 'Printed Paper Mask', right: 'Infrared depth camera & 3D facial mesh reflection test' },
      { left: 'Cloud Server Outage', right: 'Edge AI processing on dedicated local neural processors' },
      { left: 'Database Leak Risk', right: 'One-way irreversible mathematical hash embeddings' },
      { left: 'Harsh Afternoon Glare', right: 'Infrared illumination & adaptive histogram normalization' },
    ],
    explanation: 'Modern biometric engineering addresses real-world challenges through both hardware and software countermeasures.',
  },
  {
    id: 7,
    type: 'mcq',
    title: 'Edge Processing vs Cloud Inference',
    prompt: 'Why do modern smartphones process face unlocking on an on-device "Neural Processing Unit" (NPU) rather than sending frames to the cloud?',
    options: [
      'For instant millisecond unlock latency and maximum privacy (raw biometric points never leave the phone)',
      'Because phone batteries only work when disconnected from WiFi',
      'Because cloud servers do not know what faces look like',
      'To prevent the phone screen from dimming',
    ],
    correctOptionIndex: 0,
    explanation: 'Edge computing provides near-zero latency and guarantees that private biometric vectors remain securely on the user device.',
  },
  {
    id: 8,
    type: 'fill_blank',
    title: 'Human Oversight',
    prompt: 'To protect civil liberties and prevent algorithmic bias, high-stakes security checkpoints enforce human-in-the-_____ oversight.',
    options: [
      'loop',
      'door',
      'corner',
      'camera',
    ],
    correctOptionIndex: 0,
    explanation: '"Human-in-the-loop" ensures automated AI decisions are reviewable by trained human supervisors in boundary cases.',
  },
  {
    id: 9,
    type: 'matching',
    title: 'Match the Metric to Its Definition',
    prompt: 'Match the performance metric to its real-world definition:',
    matchingPairs: [
      { left: 'False Acceptance Rate (FAR)', right: 'Percentage of times unauthorized users are wrongly admitted' },
      { left: 'False Rejection Rate (FRR)', right: 'Percentage of times legitimate authorized users are wrongly denied' },
      { left: 'Throughput Speed', right: 'Number of individuals the system can verify per minute' },
      { left: 'Equal Error Rate (EER)', right: 'The threshold point where False Acceptance equals False Rejection' },
    ],
    explanation: 'Balancing FAR and FRR is the core calibration challenge in biometric deployment.',
  },
  {
    id: 10,
    type: 'mcq',
    title: 'Demographic Diversity in Training Data',
    prompt: 'What happens when a real-world facial recognition model is trained primarily on photos of light-skinned adult men?',
    options: [
      'The model exhibits higher false rejection and error rates for women, children, and people with darker skin tones',
      'The model becomes 50% faster for everyone',
      'The model uses less memory storage',
      'The model automatically learns how to translate English into Dzongkha',
    ],
    correctOptionIndex: 0,
    explanation: 'Algorithmic bias occurs when training datasets lack diverse representation, causing significant accuracy drops across demographics.',
  },
];
