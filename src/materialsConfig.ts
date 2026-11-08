/**
 * =========================================================================================
 * COURSE MATERIALS & MEDIA INTEGRATION CONFIGURATION
 * =========================================================================================
 * 
 * Hi! This is your centralized configuration file for all course media:
 * 1. VIDEOS (Lesson 2, Lesson 3, Lesson 4, and Voice-Over Audio)
 * 2. INTERACTIVE SLIDE DECKS / PPTs (Lesson 1 Slide Presentation or Google Slides / Canva / OneDrive iframe)
 * 3. QUIZZES & ASSESSMENTS (Lesson 1 Diagnostic, Lesson 5 Debate Quiz, 10-Question Final Assessment, Gesture Quizzes)
 * 
 * TO REPLACE ANY MATERIAL WITH YOUR OWN:
 * - Videos: Put your direct MP4 URL, YouTube embed URL, or local video path in the `url` property.
 * - Slides: Put your Google Slides iframe URL or update the slide array in `slides`.
 * - Quizzes: Edit or append questions in `quizzes`.
 * - Audio: Put your voice-over MP3/audio link in `COURSE_MATERIALS.audio.activityVoiceOver`.
 * =========================================================================================
 */

import { assetUrl } from './utils/assetUrl';

export interface VideoMaterial {
  slotId: string;
  title: string;
  subtitle: string;
  duration: string;
  posterImage?: string;
  /**
   * Put direct video URL (e.g. '/assets/my-video.mp4', 'https://www.youtube.com/embed/...', etc.)
   * If left as empty string or 'preview', an interactive animated cyber visualizer will be shown.
   */
  embedUrl: string;
  description: string;
}

export interface SlideItem {
  slideNumber: number;
  totalSlides: number;
  badge: string;
  title: string;
  description: string;
  bulletPoints?: string[];
  graphicType: 'diagram' | 'matrix' | 'flow' | 'ai-face';
}

export interface SlideDeckMaterial {
  slotId: string;
  title: string;
  /**
   * If you have a Google Slides or Canva embed link (e.g. "https://docs.google.com/presentation/d/e/.../embed"),
   * paste it here to render your live presentation inside the course viewer!
   */
  iframeEmbedUrl?: string;
  slides: SlideItem[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category?: string;
}

export interface ActivityCard {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Challenge';
  duration: string;
  description: string;
  badge: string;
  accentColor: string;
  gestureTarget: string;
  quizPrompt: string;
  options: string[];
  correctOptionIndex: number;
}

export interface TeacherMaterial {
  id: string;
  title: string;
  category: 'Curriculum Guide' | 'Lesson Plan' | 'Worksheet' | 'Slide Resource' | 'Rubric';
  description: string;
  downloadUrl?: string; // Direct link (Google Drive, PDF URL, local file)
  fileSize?: string;
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'LINK';
  badge: string;
  tags: string[];
}

export const COURSE_MATERIALS = {
  // ---------------------------------------------------------------------------------------
  // 1. VIDEOS CONFIGURATION
  // ---------------------------------------------------------------------------------------
  videos: {
    /**
     * [SLOT: VIDEO_LESSON_2] - Lesson 2 Explainer Animation
     * Location in UI: Lessons -> Subtopic 02 -> "AI Recognition Cycle"
     */
    lesson2Explainer: {
      slotId: 'SLOT_VIDEO_LESSON_2',
      title: 'AI Recognition Cycle',
      subtitle: 'EXPLAINER ANIMATION',
      duration: '04:12',
      posterImage: assetUrl('assets/aistudio/image_901c3e75.png'),
      embedUrl: 'https://youtu.be/PUE9JxUIaC0',
      description: 'Animated visual breakdown tracing sensory light input, digital normalization, matrix alignment, and confidence scoring in real time.',
    } as VideoMaterial,

    /**
     * [SLOT: VIDEO_LESSON_3] - Lesson 3 Lecture Clips
     * Location in UI: Lessons -> Subtopic 03 -> "Types of Recognition Systems"
     */
    lesson3Categories: {
      slotId: 'SLOT_VIDEO_LESSON_3',
      title: 'Types of Recognition Systems',
      subtitle: 'LECTURE VIDEO CLIPS',
      duration: '06:45',
      posterImage: assetUrl('assets/aistudio/image_519fbce2.png'),
      embedUrl: 'https://youtu.be/_DnfUSonn5k',
      description: 'Watch how digital systems capture biometric vectors in our laboratory video. Learn how text scanner OCR converts letters in real-time, and observe how soundwave waveforms filter vocal dynamics.',
    } as VideoMaterial,

    /**
     * [SLOT: VIDEO_LESSON_4] - Lesson 4 Co-Learning Simulator Role-Play
     * Location in UI: Lessons -> Subtopic 04 -> "AI Recognition in the Real World"
     */
    lesson4RolePlay: {
      slotId: 'SLOT_VIDEO_LESSON_4',
      title: 'AI Recognition in the Real World',
      subtitle: 'CO-LEARNING SIMULATOR',
      duration: '05:30',
      posterImage: assetUrl('assets/aistudio/image_e84fa640.png'),
      embedUrl: 'https://youtu.be/CdpsGjuaXaQ',
      description: "Two students act as 'System Administrator' and 'Client sensor' to debug a gateway recognition system live. Watch how raw scan coordinates clear security manifests!",
    } as VideoMaterial,
  },

  // ---------------------------------------------------------------------------------------
  // 2. AUDIO & VOICE-OVER CONFIGURATION
  // ---------------------------------------------------------------------------------------
  audio: {
    /**
     * [SLOT: AUDIO_ACTIVITIES] - Classroom Rules & Voice-Over
     * Location in UI: Activities Tab -> Bottom Audio Player Card
     */
    activityVoiceOver: {
      slotId: 'SLOT_AUDIO_ACTIVITIES',
      title: 'Voice Instruction',
      speaker: 'Class IX DTI Instructor',
      audioUrl: assetUrl('assets/aistudio/Voice_instruction_32219017.wav'),
      duration: '01:16',
      transcript: `Welcome, Class IX students, to the interactive AI Recognition System lab activities! Today, you will experience artificial intelligence and computer vision in real time through two hands-on activities.

First, in the Facial Expression Recognition activity, make sure your webcam is enabled and your face is well-lit and centered. As you change your facial expressions (such as happy, surprised, or neutral), observe how the AI extracts 68 facial landmark coordinates across your eyebrows, nose, and mouth to classify your emotions with confidence percentages.

Second, in the Hand Gesture Activity, position your hand within the camera frame. The vision model will track your hand joint nodes and fingertips in real-time, allowing you to trigger selections and answer questions using physical gestures in the air.

Remember our classroom AI ethics: biometric data processed during these activities stays private on your local browser and is never recorded or stored. Stay curious, take your time testing different expressions and gestures, and click 'Mark as Done' once you've completed both activities. Let's begin!`,
    },
  },

  // ---------------------------------------------------------------------------------------
  // 3. INTERACTIVE SLIDE DECK / PPT CONFIGURATION
  // ---------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------
  slideDecks: {
    /**
     * [SLOT: PPT_LESSON_1] - Lesson 1 Slide Presentation
     * Location in UI: Lessons -> Module 01 -> "Interactive Slide Deck"
     */
    lesson1Deck: {
      slotId: 'SLOT_PPT_LESSON_1',
      title: 'What Are AI Recognition Systems?',
      slides: [
        {
          slideNumber: 1,
          totalSlides: 4,
          badge: 'AI INTRO PPT • PART 1',
          title: 'Sensory Inputs vs Manual Commands',
          description: 'Traditional software waits for keyboard clicks. AI recognition systems passively sense the external physical environment (light, sound, pressure).',
          bulletPoints: ['Optical photons captured via CMOS camera sensor', 'Acoustic air oscillations via condenser microphone', 'Thermal resistance gradients in fingerprint sensors'],
          graphicType: 'diagram',
        },
        {
          slideNumber: 2,
          totalSlides: 4,
          badge: 'AI INTRO PPT • PART 2',
          title: 'Classification vs Regression',
          description: "Recognition systems mostly perform classification tasks (e.g., 'Is this object a cat or a dog?').",
          bulletPoints: ['Classification outputs discrete categories (e.g. Authorized vs Unauthorized)', 'Confidence threshold determines if a face clears the gate (e.g. 98.4%)', 'Regression predicts continuous numbers (e.g. age estimate or temperature)'],
          graphicType: 'matrix',
        },
        {
          slideNumber: 3,
          totalSlides: 4,
          badge: 'AI INTRO PPT • PART 3',
          title: 'The Feature Matrix Blueprint',
          description: 'Machines do not understand human appearance. They compute relative Euclidean distances between facial landmarks: nose tip, cheekbones, and inter-pupil distance.',
          bulletPoints: ['68 to 468 landmark mesh anchors', 'Rotational invariance calibration', 'Encrypted 512-dimension vector output'],
          graphicType: 'ai-face',
        },
        {
          slideNumber: 4,
          totalSlides: 4,
          badge: 'AI INTRO PPT • PART 4',
          title: 'Hardware Sensors to Algorithmic Tensors',
          description: 'How real analog waves turn into numbers. Pixel matrices undergo Gaussian blurring and edge-detection Sobel convolutions.',
          bulletPoints: ['Analog-to-Digital Converter (ADC) sampling at 44.1kHz or 60fps', 'Grayscale normalization removes distracting color illumination', 'Kernel convolutions isolate high-contrast edges'],
          graphicType: 'flow',
        },
      ],
      iframeEmbedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vTEiEXD8SLSZtOgbz3KwKtE70ikMhYsCrPrhjGiBF-tLiHNQC1eSFbw9_wGm1keSw/embed?start=false&loop=false&delayms=3000',
    } as SlideDeckMaterial,

    /**
     * [SLOT: PPT_LESSON_5] - Lesson 5 Slide Presentation (Benefits of AI Recognition Systems)
     * Location in UI: Lessons -> Module 05 -> "Interactive Slide Deck"
     */
    lesson5Deck: {
      slotId: 'SLOT_PPT_LESSON_5',
      title: 'Benefits of AI Recognition Systems',
      iframeEmbedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vT2kauToneKE_OCZRjobajnsUNUyo7qyOjgcZTeLg3GCTTpI-m5BFV7pCu5drNdsw/embed?start=false&loop=false&delayms=3000',
      slides: [
        {
          slideNumber: 1,
          totalSlides: 14,
          badge: 'SUBTOPIC 05 • BENEFITS',
          title: 'Benefits of AI Recognition Systems',
          description: 'Class IX DTI Curriculum: An interactive inquiry into the practical advantages and operational speed of modern recognition technology.',
          bulletPoints: ['Subtopic 05: Topic 2 Part 1 Core Concepts', 'Speed, 24/7 consistency, biometric accuracy, fraud detection', 'Interactive Checkpoints with Star Assessment'],
          graphicType: 'ai-face',
        },
      ],
    } as SlideDeckMaterial,

    /**
     * [SLOT: PPT_LESSON_6] - Lesson 6 Slide Presentation (Limitations & Ethical Challenges)
     * Location in UI: Lessons -> Subtopic 06 -> "Interactive Slide Deck"
     */
    lesson6Deck: {
      slotId: 'SLOT_PPT_LESSON_6',
      title: 'Limitations of AI Recognition Systems',
      iframeEmbedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vTw7gotjl0jKP86uyguzuBXkxv3f_4GuOicUa5W8Ho8VEbMjsJ8pdlJ7hk7jUE8-w/embed?start=false&loop=false&delayms=3000',
      slides: [
        {
          slideNumber: 1,
          totalSlides: 20,
          badge: 'SUBTOPIC 06 • LIMITATIONS & ETHICS',
          title: 'Limitations & Ethical Challenges of AI Recognition Systems',
          description: 'Class IX DTI Curriculum: Critical inquiry into accuracy drops, lighting/bias issues, biometric privacy risks, capital costs, job shifts, and system overdependence.',
          bulletPoints: ['Subtopic 06: Topic 2 Part 2 Core Concepts', '6 Critical Limitations & Ethical Dilemmas', 'Bhutan Phuentsholing Pedestrian Terminal Case Study', 'Interactive 6-Question Quiz with Star Assessment'],
          graphicType: 'ai-face',
        },
      ],
    } as SlideDeckMaterial,
  },

  // ---------------------------------------------------------------------------------------
  // 4. QUIZZES & ASSESSMENTS CONFIGURATION
  // ---------------------------------------------------------------------------------------
  quizzes: {
    /**
     * [SLOT: QUIZ_LESSON_1] - Lesson 1 Quick Diagnostic
     * Location in UI: Lessons -> Module 01 -> "Quick Diagnostic Check"
     */
    lesson1QuickDiagnostic: {
      slotId: 'SLOT_QUIZ_LESSON_1',
      question: 'Which computational model matches an AI recognition system definition best?',
      options: [
        'Classification matching sensory data',
        'Standard text spreadsheet query',
        'Manual static HTML rule checker',
      ],
      correctAnswerIndex: 0,
      explanation: 'AI recognition systems match raw sensory inputs against trained classification models to identify patterns.',
    },

    /**
     * [SLOT: QUIZ_LESSON_5] - Lesson 5 Classroom Debate Lab
     * Location in UI: Lessons -> Module 05 -> "Classroom Debate Lab"
     */
    lesson5Debate: {
      slotId: 'SLOT_QUIZ_LESSON_5',
      title: 'Facial Verification Gateway',
      context: 'Springdale High proposes automated face scan locks at the main computer lab doors to automatically register student attendance.',
      prompt: 'How could this technology be useful?',
      options: [
        'It makes entry perfectly secure under any light',
        'It automates attendance logs instantly',
        'It keeps student biometric databases public',
      ],
      correctAnswerIndex: 1,
      perspectiveTitle: 'Correct Perspective',
      perspectiveText: 'Biometric door scanners prioritize operational speed. They automate paper registries directly, though students must weigh this benefit against the security risk of continuous camera observation.',
    },

    /**
     * [SLOT: QUIZ_ASSESSMENT_FINAL] - Chapter 10 Diagnostic Test (10 Questions)
     * Location in UI: Assessment Tab -> "Chapter Quiz"
     */
    assessmentDiagnostic: [
      {
        id: 1,
        question: "Which computational model matches an AI recognition system's primary task best?",
        options: [
          'A standard relational spreadsheet lookup query',
          'Classification matching raw sensory pixels to database folders',
          'Regression math predicting continuous coordinate scales',
          'A simple text terminal shell echo protocol',
        ],
        correctAnswerIndex: 1,
        explanation: 'AI recognition systems classify high-dimensional sensory inputs into recognized identities or categorical labels.',
      },
      {
        id: 2,
        question: 'What is the primary role of the Pre-Processing stage in the recognition cycle?',
        options: [
          'Directly deciding whether to unlock a door',
          'Stripping away noise, correcting tilt, and normalizing lighting variations',
          'Saving uncompressed raw photos to a public server',
          'Manually asking an administrator for confirmation',
        ],
        correctAnswerIndex: 1,
        explanation: 'Pre-processing removes background clutter and standardizes image lighting so neural features can be extracted consistently.',
      },
      {
        id: 3,
        question: 'What does OCR stand for in modern AI perception pipelines?',
        options: [
          'Optical Character Recognition',
          'Online Computed Resolution',
          'Output Confidence Ratio',
          'Open Cognitive Registry',
        ],
        correctAnswerIndex: 0,
        explanation: 'Optical Character Recognition converts pixel coordinates of letterforms and handwriting into digital alphanumeric strings.',
      },
      {
        id: 4,
        question: 'What is a Biometric Template?',
        options: [
          'A raw color photograph stored without compression',
          'A mathematical vector representing physiological landmarks securely',
          'A plastic physical card swiped at security gates',
          'A printed password written on student notebooks',
        ],
        correctAnswerIndex: 1,
        explanation: 'A biometric template is a mathematical vector derived from biometric points that cannot be reverse-engineered into the original photo.',
      },
      {
        id: 5,
        question: 'Which of the following is an everyday example of Voice Recognition?',
        options: [
          'Google Home or Siri wake word detection ("Hey Google")',
          'Watching a muted YouTube video with English subtitles',
          'Unlocking a smartphone with an optical fingerprint scanner',
          'Typing words into a Google search bar',
        ],
        correctAnswerIndex: 0,
        explanation: 'Voice assistants continuously parse acoustic spectrogram waveforms to isolate distinctive wake phrases.',
      },
      {
        id: 6,
        question: 'Why do AI systems output a "Confidence Score" instead of a 100% yes/no certainty?',
        options: [
          'Because the computer is uncertain whether it is turned on',
          'Statistical models measure similarity probability against training data thresholds',
          'To make the recognition process run deliberately slower',
          'Because computers cannot calculate whole numbers',
        ],
        correctAnswerIndex: 1,
        explanation: 'Neural models calculate cosine similarity or softmax probabilities, triggering an action once a threshold (e.g. 95%) is cleared.',
      },
      {
        id: 7,
        question: 'In smartphone facial recognition, what danger does "Liveness Detection" prevent?',
        options: [
          'Spoofing the camera with a 2D printed photo or phone screen recording',
          'The battery draining when opening the lock screen',
          'The screen brightness getting too high',
          'The phone connecting to weak Wi-Fi networks',
        ],
        correctAnswerIndex: 0,
        explanation: 'Liveness detection uses infrared dot projection and eye blink detection to ensure a real 3D face is physically present.',
      },
      {
        id: 8,
        question: 'Which ethical concern occurs when an AI system is trained on unbalanced demographic datasets?',
        options: [
          'High memory bandwidth consumption',
          'Algorithmic bias leading to higher error rates for underrepresented groups',
          'Excessive heat generated by CPU fans',
          'Inability to read alphanumeric passwords',
        ],
        correctAnswerIndex: 1,
        explanation: 'Biased training datasets cause neural networks to underperform on individuals whose traits were underrepresented in training.',
      },
      {
        id: 9,
        question: 'What is the key advantage of an automated biometric airport security gate?',
        options: [
          'It requires 10 staff members per passenger',
          'High throughput speed and automated manifest matching without manual paperwork',
          'It only works when the terminal is completely dark',
          'It eliminates the need for airline passenger tickets entirely',
        ],
        correctAnswerIndex: 1,
        explanation: 'Biometric gates cross-reference passport chip vectors with passenger live scans in under 2 seconds.',
      },
      {
        id: 10,
        question: 'What happens when an AI recognition system encounters "System Dependency" during a power outage?',
        options: [
          'It automatically upgrades itself to a newer model version',
          'Physical access could be blocked or vulnerable without manual mechanical override keys',
          'It replaces digital locks with handwritten notes',
          'It transmits all database credentials over radio waves',
        ],
        correctAnswerIndex: 1,
        explanation: 'Over-reliance on automated digital systems without mechanical failsafes poses severe vulnerabilities during outages.',
      },
    ] as QuizQuestion[],
  },

  // ---------------------------------------------------------------------------------------
  // 5. INTERACTIVE ACTIVITIES CONFIGURATION
  // ---------------------------------------------------------------------------------------
  activities: [
    {
      id: 'act-facial-recognition',
      title: 'AI Facial Expression Recognition',
      difficulty: 'Medium',
      duration: '15 Mins',
      description: 'Start your camera to analyze facial expressions in real-time. Test Free Play, try the Scenario Challenge, and beat the Quick Mirror timer!',
      badge: 'ACTIVITY 01',
      accentColor: 'border-cyan-400 text-cyan-400',
      gestureTarget: 'Live Facial Expression Landmark Detection',
      quizPrompt: 'Which facial movement triggers the happy expression gate?',
      options: ['Mouth smile & cheek squint', 'Frowning & inner brow raise'],
      correctOptionIndex: 0,
    },
    {
      id: 'act-hand-gesture',
      title: 'Hand Gesture Activity',
      difficulty: 'Challenge',
      duration: '15 Mins',
      description: 'Point your finger in the air like a magic wand to hover and select answers! A live camera 10-question quiz testing your knowledge of AI Recognition System types.',
      badge: 'ACTIVITY 02',
      accentColor: 'border-pink-400 text-pink-400',
      gestureTarget: 'Point Index Finger (Magic Wand Hover Cursor)',
      quizPrompt: 'Which recognition system detects ridge endings and bifurcations?',
      options: ['Biometric Fingerprint Scanner', 'Speech Audio Synthesizer'],
      correctOptionIndex: 0,
    },
  ] as ActivityCard[],

  // ---------------------------------------------------------------------------------------
  // 6. TEACHER MATERIALS & CLASSROOM DOWNLOADS
  // ---------------------------------------------------------------------------------------
  /**
   * Upload or link teacher guides, answer keys, rubrics, and activity sheets here.
   * Teachers and students can view or download them directly from the "Notes" tab.
   */
  teacherMaterials: [
    {
      id: 'mat-01',
      title: 'Class IX DTI Chapter 10: Teacher & Learner Guide & Lesson Plan',
      category: 'Curriculum Guide',
      description: 'Comprehensive pedagogical overview for teaching AI recognition systems, lesson timings, learning objectives, and discussion prompts.',
      downloadUrl: '', // PASTE YOUR GOOGLE DRIVE OR PDF URL HERE
      fileSize: '1.4 MB',
      fileType: 'PDF',
      badge: 'OFFICIAL GUIDE',
      tags: ['Pedagogy', 'Class IX DTI', 'Lesson Plan'],
    },
    {
      id: 'mat-02',
      title: 'Lesson 5 Checkpoint Quizzes: Master Answer Key & Explanation Rubric',
      category: 'Rubric',
      description: 'Complete breakdown of all 5 checkpoint questions, misconception alerts, student hints, and textbook-aligned explanations.',
      downloadUrl: '', // PASTE YOUR LINK HERE
      fileSize: '820 KB',
      fileType: 'PDF',
      badge: 'ANSWER KEY',
      tags: ['Assessment', 'Answer Key', 'Rubric'],
    },
    {
      id: 'mat-03',
      title: 'Bhutan Real-World Case Study: Phuentsholing AICS Handout',
      category: 'Worksheet',
      description: 'Student classroom printable analyzing automated biometric pedestrian terminals and national digital identity integration.',
      downloadUrl: '', // PASTE YOUR LINK HERE
      fileSize: '650 KB',
      fileType: 'DOCX',
      badge: 'CASE STUDY',
      tags: ['Bhutan Context', 'Phuentsholing', 'Biometrics'],
    },
  ] as TeacherMaterial[],
};
