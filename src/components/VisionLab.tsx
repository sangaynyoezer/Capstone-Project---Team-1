import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  CameraOff, 
  Sliders, 
  Code, 
  Check, 
  Copy, 
  RefreshCw, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Maximize2,
  Terminal,
  Activity
} from 'lucide-react';

interface PresetFeed {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  modelType: 'face' | 'iris' | 'yolo' | 'pose';
  detections: {
    label: string;
    conf: number;
    bbox: [number, number, number, number]; // [x, y, w, h] in percentages
    color: string;
    points?: [number, number][]; // optional landmarks
  }[];
}

const PRESET_FEEDS: PresetFeed[] = [
  {
    id: 'iris-mesh',
    name: 'Biometric Iris & Ocular Recognition (Logo System)',
    description: '468-point mesh regression, pupil limbic boundary segmentation, and biometric vector encoding matching the AI Eye core.',
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200&auto=format&fit=crop&q=80',
    modelType: 'iris',
    detections: [
      {
        label: 'IRIS_CORE: #8942-A (99.7%)',
        conf: 0.997,
        bbox: [32, 28, 36, 42],
        color: '#06b6d4',
        points: [
          [42, 45], [44, 43], [48, 42], [52, 42], [56, 44], [58, 48],
          [56, 52], [52, 54], [48, 54], [44, 52], [50, 48]
        ]
      }
    ]
  },
  {
    id: 'face-recog',
    name: 'ArcFace Multi-Identity Biometrics',
    description: 'High-dimensional cosine margin metric space embeddings matching known student & faculty database records.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    modelType: 'face',
    detections: [
      {
        label: 'ID: CST-ENG-9104 (98.9%)',
        conf: 0.989,
        bbox: [22, 20, 24, 45],
        color: '#06b6d4',
      },
      {
        label: 'ID: CST-ENG-9105 (97.4%)',
        conf: 0.974,
        bbox: [54, 22, 26, 48],
        color: '#818cf8',
      }
    ]
  },
  {
    id: 'yolo-surveillance',
    name: 'YOLOv11 Real-Time Object Tracking',
    description: 'Surveillance detection with C3k2 decoupled heads predicting pedestrians, vehicles, and velocity vectors.',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&auto=format&fit=crop&q=80',
    modelType: 'yolo',
    detections: [
      {
        label: 'VEHICLE: 96.2%',
        conf: 0.962,
        bbox: [28, 58, 22, 28],
        color: '#38bdf8',
      },
      {
        label: 'PEDESTRIAN [TRACK_#12]: 93.8%',
        conf: 0.938,
        bbox: [68, 62, 10, 24],
        color: '#10b981',
      },
      {
        label: 'PEDESTRIAN [TRACK_#13]: 91.5%',
        conf: 0.915,
        bbox: [80, 60, 11, 26],
        color: '#10b981',
      }
    ]
  }
];

export const VisionLab: React.FC = () => {
  const [selectedFeedId, setSelectedFeedId] = useState<string>('iris-mesh');
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.75);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [activeModel, setActiveModel] = useState<string>('ArcFace-ResNet50');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'architecture'>('preview');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const currentPreset = PRESET_FEEDS.find((f) => f.id === selectedFeedId) || PRESET_FEEDS[0];

  // Start / Stop Webcam
  const toggleWebcam = async () => {
    if (isWebcamActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsWebcamActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsWebcamActive(true);
      } catch (err) {
        console.warn('Webcam permission denied or unavailable:', err);
        alert('Webcam access was not granted or is not available. You can continue testing using the high-resolution AI neural test streams!');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Draw overlay on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isWebcamActive) {
      // Draw simulated live tracker on webcam center
      if (showBoundingBoxes) {
        const w = canvas.width;
        const h = canvas.height;
        const boxW = w * 0.35;
        const boxH = h * 0.45;
        const boxX = (w - boxW) / 2;
        const boxY = (h - boxH) / 2;

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Tech corners
        const cornerLen = 16;
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#22d3ee';
        
        // TL
        ctx.beginPath();
        ctx.moveTo(boxX, boxY + cornerLen);
        ctx.lineTo(boxX, boxY);
        ctx.lineTo(boxX + cornerLen, boxY);
        ctx.stroke();

        // TR
        ctx.beginPath();
        ctx.moveTo(boxX + boxW - cornerLen, boxY);
        ctx.lineTo(boxX + boxW, boxY);
        ctx.lineTo(boxX + boxW, boxY + cornerLen);
        ctx.stroke();

        // Label
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(boxX, boxY - 24, 180, 22);
        ctx.fillStyle = '#020617';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('LIVE_SCAN: 99.1% COSINE', boxX + 6, boxY - 8);

        // Center reticle
        if (showLandmarks) {
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 28, 0, 2 * Math.PI);
          ctx.stroke();

          // Hexagon inside like logo
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = w / 2 + 14 * Math.cos(angle);
            const y = h / 2 + 14 * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      return;
    }

    // Render preset detections
    currentPreset.detections.forEach((det) => {
      if (det.conf < confidenceThreshold) return;

      const [pctX, pctY, pctW, pctH] = det.bbox;
      const x = (pctX / 100) * canvas.width;
      const y = (pctY / 100) * canvas.height;
      const w = (pctW / 100) * canvas.width;
      const h = (pctH / 100) * canvas.height;

      if (showBoundingBoxes) {
        ctx.strokeStyle = det.color;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(x, y, w, h);

        // Header tag
        const tagText = det.label;
        ctx.font = 'bold 11px monospace';
        const textWidth = ctx.measureText(tagText).width;

        ctx.fillStyle = det.color;
        ctx.fillRect(x, y - 22, textWidth + 14, 20);

        ctx.fillStyle = '#020617';
        ctx.fillText(tagText, x + 6, y - 7);
      }

      // Landmarks if any
      if (showLandmarks && det.points) {
        ctx.fillStyle = '#38bdf8';
        det.points.forEach(([px, py]) => {
          const ptX = (px / 100) * canvas.width;
          const ptY = (py / 100) * canvas.height;
          ctx.beginPath();
          ctx.arc(ptX, ptY, 3, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Connect points for mesh outline
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        det.points.forEach(([px, py], idx) => {
          const ptX = (px / 100) * canvas.width;
          const ptY = (py / 100) * canvas.height;
          if (idx === 0) ctx.moveTo(ptX, ptY);
          else ctx.lineTo(ptX, ptY);
        });
        ctx.closePath();
        ctx.stroke();
      }
    });
  }, [currentPreset, confidenceThreshold, showLandmarks, showBoundingBoxes, isWebcamActive]);

  const pythonProductionCode = `import cv2
import torch
import numpy as np
from insightface.app import FaceAnalysis

# 1. Initialize High-Performance AI Recognition System
app = FaceAnalysis(name='antelopev2', providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))

# 2. Ingest Video Capture or Camera Stream
cap = cv2.VideoCapture(0) # or 'rtsp://admin:pass@192.168.1.50:554/live'

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # 3. Detect 5-point landmarks & extract 512-dim ArcFace embeddings
    faces = app.get(frame)
    
    for face in faces:
        if face.det_score < ${confidenceThreshold.toFixed(2)}:
            continue
            
        bbox = face.bbox.astype(int)
        embedding = face.embedding # 512-dim normalized unit vector
        
        # 4. Compare with enrolled student / credential database via Cosine Similarity
        # score = np.dot(embedding, enrolled_vector)
        
        # Draw bounding boxes and landmarks
        cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (0, 210, 255), 2)
        cv2.putText(frame, f"AI_MATCH: {face.det_score * 100:.1f}%", 
                    (bbox[0], bbox[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 200), 2)

    cv2.imshow('CAP AI Recognition System Live Output', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`;

  const copyCode = () => {
    navigator.clipboard.writeText(pythonProductionCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Title & Info Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Activity className="h-4 w-4" />
            <span>Interactive Computer Vision Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            AI Recognition System Live Playground
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Experience real-time landmark regression, bounding box inference, and cosine vector matching in the browser.
          </p>
        </div>

        {/* Live System Metrics Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">FPS:</span>
            <span className="text-emerald-300 font-bold">59.8</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-slate-400">Latency:</span>
            <span className="text-cyan-300 font-bold">12.4ms</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-slate-400">Precision:</span>
            <span className="text-indigo-300 font-bold">FP16 TensorRT</span>
          </div>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Canvas & Stream (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Visual Stream Screen */}
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black aspect-video shadow-[0_0_40px_rgba(6,182,212,0.15)] flex items-center justify-center group">
            
            {/* Tech Corner Overlays */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

            {/* Video or Image Source */}
            {isWebcamActive ? (
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />
            ) : (
              <img
                src={currentPreset.imageUrl}
                alt={currentPreset.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* Canvas Overlay for Detections */}
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* Stream Status Overlay HUD */}
            <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono text-slate-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{isWebcamActive ? 'DEVICE_CAMERA_ONLINE' : currentPreset.name.toUpperCase()}</span>
            </div>

            {/* Switch Camera Button Top Right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={toggleWebcam}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  isWebcamActive
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900'
                    : 'bg-slate-900/90 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-950'
                }`}
              >
                {isWebcamActive ? (
                  <>
                    <CameraOff className="h-3.5 w-3.5" />
                    <span>Stop Camera</span>
                  </>
                ) : (
                  <>
                    <Camera className="h-3.5 w-3.5" />
                    <span>Use Live Webcam</span>
                  </>
                )}
              </button>
            </div>

            {/* Sub-bar HUD with active model */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">{activeModel}</span>
                <span className="text-slate-600">|</span>
                <span>IO: 640x640 RGB</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>PRESS ESC TO RESET</span>
              </div>
            </div>

          </div>

          {/* Test Preset Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Switch Neural Test Scenarios:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESET_FEEDS.map((feed) => {
                const isSelected = selectedFeedId === feed.id && !isWebcamActive;
                return (
                  <button
                    key={feed.id}
                    onClick={() => {
                      if (isWebcamActive) toggleWebcam();
                      setSelectedFeedId(feed.id);
                    }}
                    className={`text-left p-3 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <p className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {feed.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {feed.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Parameter Tuning & Code Tab (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Tabs: Controls vs Code */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'preview' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Inference Config</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'code' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Python Script</span>
            </button>
          </div>

          {activeTab === 'preview' ? (
            <div className="rounded-2xl border border-slate-800 bg-[#091222] p-5 space-y-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-cyan-400" />
                <span>Detection & Filtering Parameters</span>
              </h3>

              {/* Confidence Threshold Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Confidence Cutoff ($\tau$):</span>
                  <span className="font-mono text-cyan-300 font-bold">{Math.round(confidenceThreshold * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="0.95"
                  step="0.05"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>High Recall (40%)</span>
                  <span>High Precision (95%)</span>
                </div>
              </div>

              {/* Model Architecture Switcher */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-medium text-slate-300 block">Backbone Architecture:</label>
                <div className="space-y-1.5">
                  {[
                    { id: 'ArcFace-ResNet50', desc: '512-D Geodesic Metric (Identity Focus)' },
                    { id: 'YOLOv11n-Surveillance', desc: 'Single-Stage Detection (Speed Focus)' },
                    { id: 'IrisDaugman-MeshNet', desc: 'Ocular Limbic Rubber-Sheet Model' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveModel(m.id)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition cursor-pointer ${
                        activeModel === m.id
                          ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-bold">{m.id}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Overlays Toggles */}
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Show Bounding Boxes</span>
                  <input
                    type="checkbox"
                    checked={showBoundingBoxes}
                    onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                    className="h-4 w-4 rounded accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Show Feature Landmarks Mesh</span>
                  <input
                    type="checkbox"
                    checked={showLandmarks}
                    onChange={(e) => setShowLandmarks(e.target.checked)}
                    className="h-4 w-4 rounded accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Did you know callout */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Curriculum Connection</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  Module 1.1 covers how this landmark matrix is converted into an affine warp transformation to feed the ArcFace backbone.
                </p>
              </div>

            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-[#091222] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span>Production PyTorch Script</span>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-lg bg-black/80 border border-slate-800 p-3 font-mono text-[11px] text-cyan-200 overflow-x-auto max-h-[380px] leading-relaxed">
                <pre>{pythonProductionCode}</pre>
              </div>

              <p className="text-[11px] text-slate-400">
                You can run this directly in Lesson 1.2's interactive browser terminal or in your local Python 3.11 environment.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
