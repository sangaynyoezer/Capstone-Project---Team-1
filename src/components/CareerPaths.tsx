import React from 'react';
import { Course } from '../types/course';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Compass, Award, Star } from 'lucide-react';

interface CareerPathsProps {
  onSelectCourse: (course: Course) => void;
  courses: Course[];
}

export const CareerPaths: React.FC<CareerPathsProps> = ({ onSelectCourse, courses }) => {
  const paths = [
    {
      id: 'path-cv-biometrics',
      title: 'Biometrics & Facial AI Systems Architect',
      timeline: '12 Weeks · 84 Hours',
      level: 'Comprehensive Professional Track',
      description: 'The definitive track for engineering high-reliability facial recognition, ocular iris biometric matching, and spoof-resistant identification networks.',
      milestones: [
        {
          stage: 'Phase 01',
          name: 'Affine Warping & 68-Point Facial Regression',
          courseSlug: 'complete-ai-recognition-systems',
          skills: 'Geometric Rectification, Homography, Canonical Alignments'
        },
        {
          stage: 'Phase 02',
          name: 'Deep Metric Learning with ArcFace & CosFace',
          courseSlug: 'complete-ai-recognition-systems',
          skills: 'Angular Margins, Unit Hyperspheres, Cosine Distances'
        },
        {
          stage: 'Phase 03',
          name: 'Multi-Modal Iris & 3D Biometric Anti-Spoofing',
          courseSlug: 'biometric-ai-identity-security',
          skills: 'Daugman Rubber-Sheet Model, Fourier Texture Defense'
        },
        {
          stage: 'Phase 04',
          name: 'Industrial Capstone: 1M+ Identity Vector Indexing',
          courseSlug: 'complete-ai-recognition-systems',
          skills: 'Faiss HNSW, Zero-Copy GPU Memory, RTSP Pipelines'
        }
      ]
    },
    {
      id: 'path-edge-yolo',
      title: 'Edge AI & Automated Surveillance Engineer',
      timeline: '10 Weeks · 68 Hours',
      level: 'High-Throughput Vision Track',
      description: 'Design and deploy sub-15ms object detection and tracking pipelines running directly on embedded edge hardware and IoT cameras.',
      milestones: [
        {
          stage: 'Phase 01',
          name: 'YOLOv11 Architecture & Dynamic Anchor Attribution',
          courseSlug: 'yolov11-real-time-vision-surveillance',
          skills: 'C3k2 Blocks, SPPF, Mosaic Augmentation'
        },
        {
          stage: 'Phase 02',
          name: 'Multi-Object Tracking with Kalman Filters & DeepSORT',
          courseSlug: 'yolov11-real-time-vision-surveillance',
          skills: 'State Vectors, Mahalanobis Assignment, Re-ID'
        },
        {
          stage: 'Phase 03',
          name: 'TensorRT Acceleration & Post-Training INT8 Quantization',
          courseSlug: 'embedded-vision-edge-ai-jetson-pi',
          skills: 'Graph Fusion, Operator Tuning, Zero-Copy V4L2'
        }
      ]
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-semibold text-cyan-300">
          <Compass className="h-3.5 w-3.5" />
          <span>Accredited Engineering Tracks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Structured Career Roadmaps
        </h1>
        <p className="text-sm text-slate-300">
          Follow step-by-step engineering tracks designed to take you from foundational mathematics to deploying production recognition systems.
        </p>
      </div>

      {/* Paths Container */}
      <div className="space-y-10">
        {paths.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-cyan-900/50 bg-[#081224] p-6 sm:p-8 shadow-xl space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-wider">
                  {p.level} · {p.timeline}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {p.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  {p.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>Includes Verified Specialization Badge</span>
                </span>
              </div>
            </div>

            {/* Milestones Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {p.milestones.map((m, idx) => {
                const targetCourse = courses.find((c) => c.slug === m.courseSlug) || courses[0];
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
                        <span>{m.stage}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-600" />
                      </div>
                      <h3 className="text-xs font-bold text-slate-100 line-clamp-2">
                        {m.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {m.skills}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectCourse(targetCourse)}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-slate-300 text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Jump to Course</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
