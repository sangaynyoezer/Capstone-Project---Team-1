import { Course, DiscussionThread } from '../types/course';

export const INSTRUCTORS = {
  dr_chen: {
    id: 'inst-1',
    name: 'Dr. Evelyn Chen',
    title: 'Principal Research Scientist in Computer Vision',
    affiliation: 'Visual Intelligence Lab & Ex-DeepMind',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 4.95,
    studentsCount: 38400,
  },
  prof_dorji: {
    id: 'inst-2',
    name: 'Prof. Tenzin Dorji',
    title: 'Associate Professor of Robotics & Neural Systems',
    affiliation: 'College of Science & Technology (CST)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 4.92,
    studentsCount: 22100,
  },
  marcus_vance: {
    id: 'inst-3',
    name: 'Marcus Vance',
    title: 'Staff Edge AI Engineer & Model Optimization Lead',
    affiliation: 'OpenCV Architecture Contributor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.88,
    studentsCount: 19500,
  },
  dr_priya: {
    id: 'inst-4',
    name: 'Dr. Priya Sharma',
    title: 'Lead Biometrics & Identity Security Architect',
    affiliation: 'Cyber AI Forensics Institute',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 4.96,
    studentsCount: 27900,
  },
};

export const COURSES: Course[] = [
  {
    id: 'cap-ai-rec-101',
    title: 'Complete AI Recognition Systems: From Raw Pixels to Deep Neural Embeddings',
    slug: 'complete-ai-recognition-systems',
    tagline: 'Master the full pipeline of modern computer vision, biometric vector embeddings, and real-time facial feature extraction.',
    description: 'A comprehensive engineering masterclass on designing, training, and deploying real-world AI Recognition Systems. Learn how to transform raw camera feeds into high-dimensional latent space representations, perform 68-point facial landmark regression, compute cosine similarity distances, and build low-latency recognition engines capable of 60 FPS multi-target tracking.',
    level: 'Intermediate',
    category: 'Biometrics & Facial AI',
    thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=80',
    instructor: INSTRUCTORS.dr_chen,
    durationHours: 32,
    lessonsCount: 42,
    rating: 4.96,
    reviewsCount: 3120,
    enrolledCount: 14850,
    featured: true,
    isPopular: true,
    price: '$79.99',
    originalPrice: '$149.99',
    certificateProvided: true,
    prerequisites: ['Basic Python programming', 'Introductory linear algebra and matrix arithmetic', 'Fundamental PyTorch or TensorFlow familiarity'],
    skillsGained: [
      'Facial Landmark Detection (68 & 468 mesh points)',
      'ArcFace & Cosine Margin Loss Architectures',
      'Real-time Video Pipeline Optimization with OpenCV',
      'Vector Database Indexing for 1M+ Identity Match',
      'Liveness Detection & Anti-Spoofing Defense',
      'Production Edge Deployment with TensorRT & ONNX',
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Machine Vision & Matrix Representation',
        duration: '4h 15m',
        lessons: [
          {
            id: 'les-1-1',
            title: '1.1 System Architecture of an Industrial AI Recognition System',
            duration: '18:42',
            type: 'video',
            summary: 'Deconstruct the end-to-end pipeline: image ingestion, color space normalization, bounding box proposals, feature embedding projection, and Euclidean/cosine match matrices.',
            posterImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
            contentMarkdown: `### Architectural Blueprint of Modern Recognition

An industrial AI Recognition System operates across five sequential stages:
1. **Sensor Ingestion & Geometric Rectification:** Acquiring RAW frame buffers, camera undistortion matrices, and dynamic range calibration.
2. **Object Proposal & Spatial Alignment:** Detecting region-of-interest (RoI) bounding boxes and computing Affine transformation matrices based on eye corners and nose tip coordinates.
3. **Deep Feature Extractor (Backbone):** Passing aligned $112 \\times 112$ normalized crops through ResNet-50 / ConvNeXt architectures.
4. **Metric Space Embedding:** Producing unit-normalized 512-dimensional vectors $\\mathbf{z} \\in \\mathbb{R}^{512}$ where $\|\\mathbf{z}\|_2 = 1$.
5. **Fast Nearest Neighbor Indexing:** Searching large databases using HNSW (Hierarchical Navigable Small World) or Faiss under 5ms.`,
            codeSnippet: {
              language: 'python',
              code: `import cv2
import numpy as np

def preprocess_face_crop(frame, bbox, target_size=(112, 112)):
    """Crops, normalizes, and prepares tensor for AI Recognition Backbone"""
    x1, y1, x2, y2 = bbox
    crop = frame[y1:y2, x1:x2]
    # Resize with bilinear interpolation
    resized = cv2.resize(crop, target_size, interpolation=cv2.INTER_LINEAR)
    # BGR to RGB conversion
    rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
    # Mean and std normalization
    normalized = (rgb.astype(np.float32) / 255.0 - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    # Transpose to Channel-First (C, H, W)
    tensor = np.transpose(normalized, (2, 0, 1))
    return np.expand_dims(tensor, axis=0)

# Simulate detection box
sample_frame = np.random.randint(0, 255, (720, 1280, 3), dtype=np.uint8)
input_tensor = preprocess_face_crop(sample_frame, [300, 150, 520, 420])
print(f"Preprocessed Tensor Shape: {input_tensor.shape}")
print(f"Mean value: {input_tensor.mean():.4f}, Std: {input_tensor.std():.4f}")`,
              output: `Preprocessed Tensor Shape: (1, 3, 112, 112)
Mean value: 0.0412, Std: 1.0185
[Success] Face crop normalized for ResNet-50 ArcFace backbone!`,
            },
            quiz: [
              {
                id: 'q-1',
                question: 'Why are feature vectors unit-normalized (L2 norm = 1) in deep face recognition models?',
                options: [
                  'To ensure matrix multiplications fit within 8-bit integer memory',
                  'So that Euclidean distance is directly proportional to Cosine similarity on a hypersphere',
                  'To avoid camera overexposure in bright lighting conditions',
                  'Because OpenCV does not support unnormalized floating point arrays',
                ],
                correctAnswer: 1,
                explanation: 'When feature vectors are L2-normalized to lie on the unit hypersphere, their dot product equals their cosine similarity, making metric margin losses like ArcFace and CosFace geometrically optimal.',
              },
            ],
          },
          {
            id: 'les-1-2',
            title: '1.2 Affine Transformations & 5-Point Eye Alignment',
            duration: '24:10',
            type: 'lab',
            summary: 'Implement similarity transform matrices to rotate and warp off-angle faces into rigid canonical frontal views.',
            posterImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
            codeSnippet: {
              language: 'python',
              code: `import numpy as np
import cv2

def compute_similarity_transform(src_pts, dst_pts):
    """Calculates 2D affine transformation with uniform scaling and rotation"""
    M, _ = cv2.estimateAffinePartial2D(src_pts, dst_pts)
    return M

# Canonical reference landmarks for 112x112 aligned face
CANONICAL_5_PTS = np.array([
    [38.2946, 51.6963],  # Left eye center
    [73.5318, 51.5014],  # Right eye center
    [56.0252, 71.7366],  # Nose tip
    [41.5493, 92.3655],  # Left mouth corner
    [70.7299, 92.2041]   # Right mouth corner
], dtype=np.float32)

print("Canonical reference anchors initialized for 112x112 bounding envelope.")`,
              output: `Canonical reference anchors initialized for 112x112 bounding envelope.
[Ready] Ready to compute similarity warp matrix on incoming video frames.`,
            },
          },
          {
            id: 'les-1-3',
            title: '1.3 Checkpoint Quiz: Metric Space & Geometric Warping',
            duration: '15:00',
            type: 'quiz',
            summary: 'Validate your comprehension of affine warping, homography, and vector embeddings before moving to deep backbones.',
            quiz: [
              {
                id: 'q-2',
                question: 'Which transformation preserves parallel lines but does NOT preserve angles or lengths?',
                options: ['Rigid Euclidean Transform', 'Affine Transformation', 'Projective Homography', 'Scale-Invariant Transform'],
                correctAnswer: 1,
                explanation: 'Affine transformations preserve parallelism and ratios of lengths along parallel line segments, allowing shearing, scaling, rotation, and translation.',
              },
              {
                id: 'q-3',
                question: 'What is the primary vulnerability of naive Euclidean distance in unnormalized feature embeddings?',
                options: [
                  'Magnitude bias: vectors with larger magnitudes can dominate distance computations regardless of direction',
                  'It cannot be computed on GPUs',
                  'It requires color images and fails on grayscale infrared cameras',
                  'It requires square matrices with zero determinant',
                ],
                correctAnswer: 0,
                explanation: 'Without normalization, vector length can be swayed by lighting or contrast, causing false rejections.',
              },
            ],
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: Deep Convolutional Backbones & ArcFace Loss',
        duration: '7h 45m',
        lessons: [
          {
            id: 'les-2-1',
            title: '2.1 Additive Angular Margin Loss (ArcFace) Deep-Dive',
            duration: '31:15',
            type: 'video',
            summary: 'Mathematical formulation of geodesic distance margins on the hypersphere. Learn why ArcFace outperforms Softmax and Triplet Loss.',
          },
          {
            id: 'les-2-2',
            title: '2.2 Building the Backbone: ResNet-IR-50 with Squeeze-and-Excitation',
            duration: '42:50',
            type: 'lab',
            summary: 'Write the PyTorch module for Inverted Residual SE blocks tailored for fine-grained facial feature discrimination.',
          },
          {
            id: 'les-2-3',
            title: '2.3 Handling Occlusion, Glasses, and Lighting Variations',
            duration: '28:10',
            type: 'reading',
            summary: 'Data augmentation techniques including CutOut, Random Erasing, and synthetic shadow projection to harden models.',
          },
        ],
      },
      {
        id: 'mod-3',
        title: 'Module 3: Real-Time Multi-Object Tracking & DeepSORT Integration',
        duration: '6h 30m',
        lessons: [
          {
            id: 'les-3-1',
            title: '3.1 Kalman Filter State Estimation for Bounding Box Trajectories',
            duration: '26:00',
            type: 'video',
            summary: 'Formulating velocity, acceleration, and bounding box aspect ratio state vectors to predict motion during temporary visual occlusions.',
          },
          {
            id: 'les-3-2',
            title: '3.2 Hungarian Algorithm for Mahalanobis & Cosine Assignment',
            duration: '35:40',
            type: 'lab',
            summary: 'Combine spatial distance and appearance embeddings to match tracks across successive video frames without identity switches.',
          },
        ],
      },
      {
        id: 'mod-4',
        title: 'Module 4: Anti-Spoofing, Liveness Detection & Capstone System',
        duration: '8h 20m',
        lessons: [
          {
            id: 'les-4-1',
            title: '4.1 3D Depth, Texture Analysis & Frequency Domain Defense',
            duration: '33:15',
            type: 'video',
            summary: 'Detecting printed 2D photos, screen replay attacks, and silicon 3D masks using Fourier transform and micro-texture CNNs.',
          },
          {
            id: 'les-4-2',
            title: '4.2 Capstone Deployment: Fast Faiss Vector DB + RTSP Stream Pipeline',
            duration: '55:00',
            type: 'lab',
            summary: 'Integrate the full pipeline into an industrial multi-threaded Python service processing live IP camera RTSP streams.',
          },
        ],
      },
    ],
  },
  {
    id: 'cap-yolo-v11',
    title: 'YOLOv11 & Real-Time Computer Vision for Automated Surveillance',
    slug: 'yolov11-real-time-vision-surveillance',
    tagline: 'Build ultra-fast object detection, pose estimation, and segmentation pipelines deployed at the edge.',
    description: 'Learn how to customize and train state-of-the-art YOLOv11 architectures for real-time video surveillance, drone tracking, industrial inspection, and automated license plate recognition (ALPR). Covers custom dataset labeling, mosaic augmentation, dynamic anchor assignment, TensorRT quantization, and low-latency deployment on NVIDIA Jetson and web browsers.',
    level: 'Beginner',
    category: 'Real-Time Detection',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    instructor: INSTRUCTORS.marcus_vance,
    durationHours: 26,
    lessonsCount: 35,
    rating: 4.93,
    reviewsCount: 2450,
    enrolledCount: 18200,
    featured: true,
    isPopular: true,
    price: '$69.99',
    originalPrice: '$129.99',
    certificateProvided: true,
    prerequisites: ['Python basics', 'Familiarity with CLI and command line commands'],
    skillsGained: [
      'YOLOv11 Architecture & C3k2 Bottleneck Modules',
      'Instance Segmentation & Keypoint Pose Estimation',
      'Custom Dataset Annotation & Roboflow Integration',
      'INT8 & FP16 Precision Model Quantization',
      'NVIDIA TensorRT Acceleration for 120+ FPS Inference',
      'Multi-Camera RTSP Stream Decoding with DeepStream',
    ],
    modules: [
      {
        id: 'yolo-mod-1',
        title: 'Module 1: The Evolution of YOLO: From Darknet to v11',
        duration: '5h 10m',
        lessons: [
          {
            id: 'yolo-les-1',
            title: '1.1 Deep Dive into YOLOv11 Architecture Innovations',
            duration: '22:15',
            type: 'video',
            summary: 'Analyze the new C3k2 blocks, SPPF modules, and decoupled detection heads that boost mAP while cutting latency.',
            posterImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
            codeSnippet: {
              language: 'python',
              code: `from ultralytics import YOLO

# Load pre-trained nano model for edge inference
model = YOLO('yolo11n.pt')

# Run inference on live video or test image
results = model('https://ultralytics.com/images/bus.jpg', conf=0.45)

for r in results:
    print(f"Detected {len(r.boxes)} objects with high confidence.")
    for box in r.boxes[:3]:
        cls_name = model.names[int(box.cls[0])]
        conf_score = float(box.conf[0])
        print(f" - {cls_name.upper()}: {conf_score * 100:.1f}% confidence")`,
              output: `Detected 4 objects with high confidence.
 - BUS: 94.2% confidence
 - PERSON: 89.6% confidence
 - PERSON: 87.1% confidence
[Speed] Inference: 6.8ms, NMS: 1.2ms per frame on RTX GPU`,
            },
          },
          {
            id: 'yolo-les-2',
            title: '1.2 Hands-On Lab: Custom Fine-Tuning for Drone Imagery',
            duration: '38:00',
            type: 'lab',
            summary: 'Collect aerial dataset, apply Mosaic and MixUp augmentations, and train weights with PyTorch CUDA acceleration.',
          },
        ],
      },
    ],
  },
  {
    id: 'cap-biometrics-security',
    title: 'Biometric AI & Identity Security: Iris, Voice & Multimodal Fusion',
    slug: 'biometric-ai-identity-security',
    tagline: 'Architect impenetrable biometric authentication systems fusing face, iris, and behavioral dynamics.',
    description: 'Explore the intersection of deep learning, cryptography, and biometric security. Build multimodal recognition engines combining iris texture unwrapping (Daugman rubber-sheet model), 3D facial depth point clouds, voiceprint spectrogram embeddings, and zero-knowledge biometric credential verification.',
    level: 'Advanced',
    category: 'Biometrics & Facial AI',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    instructor: INSTRUCTORS.dr_priya,
    durationHours: 36,
    lessonsCount: 48,
    rating: 4.98,
    reviewsCount: 1890,
    enrolledCount: 9400,
    featured: false,
    isPopular: false,
    price: '$89.99',
    originalPrice: '$179.99',
    certificateProvided: true,
    prerequisites: ['Proficiency with PyTorch', 'Signal processing basics (Fourier & Wavelet transforms)', 'Cryptographic hashing understanding'],
    skillsGained: [
      'Daugman Iris Segmentation & Polar Coordinate Unwrapping',
      'Multimodal Score & Feature-Level Fusion',
      'Homomorphic Encryption on Biometric Vectors',
      'FIDO2 / WebAuthn Biometric Protocol Integration',
      'Adversarial Attack Defense against Generative Deepfakes',
    ],
    modules: [
      {
        id: 'bio-mod-1',
        title: 'Module 1: Mathematical Foundations of Iris Recognition',
        duration: '6h 30m',
        lessons: [
          {
            id: 'bio-les-1',
            title: '1.1 Integro-Differential Operators for Pupil & Limbic Boundary',
            duration: '29:40',
            type: 'video',
            summary: 'John Daugman operator formulation for detecting circular pupillary contours in near-infrared illumination.',
          },
        ],
      },
    ],
  },
  {
    id: 'cap-edge-ai-embedded',
    title: 'Embedded Vision & Edge AI: Deploying Models on Jetson & Raspberry Pi',
    slug: 'embedded-vision-edge-ai-jetson-pi',
    tagline: 'Compile, prune, and quantize heavy computer vision models to run at 60 FPS on edge hardware.',
    description: 'Bridge the gap between server-grade GPU clusters and battery-constrained embedded devices. Learn model quantization (INT8 Post-Training Quantization and QAT), TensorRT engine compilation, OpenCV V4L2 hardware-accelerated pipelines, and low-power smart camera sensor architecture.',
    level: 'Intermediate',
    category: 'Edge AI & Embedded',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
    instructor: INSTRUCTORS.prof_dorji,
    durationHours: 28,
    lessonsCount: 38,
    rating: 4.91,
    reviewsCount: 1740,
    enrolledCount: 11200,
    featured: false,
    isPopular: true,
    price: '$74.99',
    originalPrice: '$139.99',
    certificateProvided: true,
    prerequisites: ['Basic Linux/Bash commands', 'Python 3 syntax', 'C++ basics recommended but optional'],
    skillsGained: [
      'ONNX Graph Optimization & Operator Fusion',
      'TensorRT Engine Serialization',
      'Thermal & Power Profiling on Edge SoCs',
      'Zero-Copy Frame Buffering with GStreamer',
      'TinyML & Microcontrollers (ESP32-CAM & Coral Edge TPU)',
    ],
    modules: [
      {
        id: 'edge-mod-1',
        title: 'Module 1: Embedded Hardware Acceleration Overview',
        duration: '4h 45m',
        lessons: [
          {
            id: 'edge-les-1',
            title: '1.1 Jetson Orin Nano vs Coral Edge TPU Architecture Comparison',
            duration: '21:05',
            type: 'video',
            summary: 'Memory bandwidth, TOPS (Tera Operations Per Second), and power profiles for high-throughput edge AI recognition.',
          },
        ],
      },
    ],
  },
  {
    id: 'cap-deep-learning-core',
    title: 'Mathematical Foundations of Neural Networks for Visual Perception',
    slug: 'mathematical-foundations-neural-networks',
    tagline: 'Understand the core calculus, linear algebra, and backpropagation mechanics behind modern vision transformers.',
    description: 'Go beyond high-level libraries. Derive convolution operations, automatic differentiation computation graphs, attention maps, and gradient descent optimizers from scratch in pure NumPy. Build intuition for why modern deep networks generalize to complex real-world visual scenes.',
    level: 'Beginner',
    category: 'Deep Learning Core',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    instructor: INSTRUCTORS.prof_dorji,
    durationHours: 34,
    lessonsCount: 44,
    rating: 4.94,
    reviewsCount: 2200,
    enrolledCount: 16400,
    featured: false,
    isPopular: false,
    price: '$59.99',
    originalPrice: '$119.99',
    certificateProvided: true,
    prerequisites: ['High school calculus and vector algebra', 'Basic programming in any language'],
    skillsGained: [
      'Backpropagation & Jacobian Gradient Matrices',
      'Spatial Convolution & Pooling Forward/Backward Passes',
      'Vision Transformers (ViT) & Multi-Head Self-Attention',
      'Stochastic Gradient Descent, AdamW & Learning Rate Schedules',
    ],
    modules: [
      {
        id: 'core-mod-1',
        title: 'Module 1: Vector Spaces, Norms & Loss Functions',
        duration: '5h 15m',
        lessons: [
          {
            id: 'core-les-1',
            title: '1.1 Loss Landscapes & Hyperspherical Convex Optimization',
            duration: '25:12',
            type: 'video',
            summary: 'Visualizing high-dimensional loss surfaces and understanding saddle points in deep metric learning.',
          },
        ],
      },
    ],
  },
  {
    id: 'cap-autonomous-vision',
    title: 'Vision for Autonomous Robots: Optical Flow, SLAM & 3D Point Clouds',
    slug: 'vision-autonomous-robots-slam-3d',
    tagline: 'Build spatial awareness for mobile robots using stereo disparity, LiDAR fusion, and visual odometry.',
    description: 'Equip autonomous mobile robots and drones with visual perception. Implement Lucas-Kanade optical flow, ORB-SLAM3 for real-time camera localization, stereo depth disparity mapping, and semantic point cloud segmentation for collision-free trajectory planning.',
    level: 'Advanced',
    category: 'Computer Vision',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    instructor: INSTRUCTORS.dr_chen,
    durationHours: 40,
    lessonsCount: 52,
    rating: 4.97,
    reviewsCount: 1620,
    enrolledCount: 8800,
    featured: false,
    isPopular: false,
    price: '$94.99',
    originalPrice: '$189.99',
    certificateProvided: true,
    prerequisites: ['Solid C++ or Python experience', 'Linear algebra (coordinate transformations, quaternions)', 'OpenCV foundations'],
    skillsGained: [
      'Visual Odometry & Bundle Adjustment',
      'ORB Feature Extraction & Epipolar Geometry',
      'Stereo Vision Depth Estimation & Disparity Maps',
      'ROS2 (Robot Operating System) Perception Nodes',
    ],
    modules: [
      {
        id: 'slam-mod-1',
        title: 'Module 1: Stereo Geometry & Epipolar Constraints',
        duration: '7h 10m',
        lessons: [
          {
            id: 'slam-les-1',
            title: '1.1 The Essential and Fundamental Matrices in Stereo Pairs',
            duration: '32:45',
            type: 'video',
            summary: 'Deriving the 8-point algorithm with RANSAC robust estimation to filter outliers in dynamic robot scenes.',
          },
        ],
      },
    ],
  },
];

export const INITIAL_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'disc-1',
    lessonId: 'les-1-1',
    author: 'Karma Tshering',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    timestamp: '2 hours ago',
    content: 'When normalising face crops to [-1, 1] vs ImageNet standard (mean=[0.485, 0.456, 0.406]), which provides better cosine separation when using ResNet-50 ArcFace pretrained on Glint360k?',
    upvotes: 14,
    replies: [
      {
        id: 'rep-1',
        author: 'Dr. Evelyn Chen',
        authorAvatar: INSTRUCTORS.dr_chen.avatar,
        isInstructor: true,
        timestamp: '1 hour ago',
        content: 'Great question Karma! For ArcFace specifically, standard practice is input in range [-1, 1] using `(x - 127.5) / 128.0`. This preserves zero-centered symmetry across the RGB channels which aligns best with the hypersphere geodesic margin.',
      },
      {
        id: 'rep-2',
        author: 'Sonam Wangchuk',
        authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        timestamp: '30 mins ago',
        content: 'I verified this on my capstone model. Switching from ImageNet stats to `(x - 127.5) / 128.0` increased our TAR@FAR=1e-4 from 98.1% to 99.4% on LFW dataset!',
      },
    ],
  },
  {
    id: 'disc-2',
    lessonId: 'les-1-1',
    author: 'Dechen Pem',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday',
    content: 'Is it possible to run the landmark detection directly on the GPU without round-trip memory copy to host CPU during video decoding?',
    upvotes: 8,
    replies: [
      {
        id: 'rep-3',
        author: 'Marcus Vance',
        authorAvatar: INSTRUCTORS.marcus_vance.avatar,
        isInstructor: true,
        timestamp: '18 hours ago',
        content: 'Yes! Check out lesson 4.2 where we configure NVIDIA DeepStream with NVMM (NVIDIA Memory Management) zero-copy unified memory buffers directly into TensorRT tensors.',
      },
    ],
  },
];
