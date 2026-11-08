import React from 'react';
import { 
  Play, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Scan, 
  Users, 
  Zap, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { assetUrl } from '../utils/assetUrl';

interface HeroBannerProps {
  onExploreCourses: () => void;
  onLaunchLab: () => void;
  onSelectCategory: (category: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCourses,
  onLaunchLab,
  onSelectCategory,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-cyan-950/80 bg-gradient-to-b from-[#060c1a] via-[#091326] to-[#070e1e] py-14 lg:py-20">
      {/* Background Circuit Grid & Glow effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e223d15_1px,transparent_1px),linear-gradient(to_bottom,#0e223d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Pill & Course Meta */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs text-cyan-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-semibold tracking-wide">CAP Online Course & Vision Academy</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">Updated for YOLOv11 & ArcFace v2</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Master <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">AI Recognition</span> & Computer Vision Systems
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Industrial-grade curriculum for engineers and researchers. Build real-time biometric identification engines, facial feature mesh trackers, high-speed surveillance pipelines, and edge AI neural networks.
            </p>

            {/* Quick Filter Categories */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Core Tracks:</span>
              {[
                'Biometrics & Facial AI',
                'Real-Time Detection',
                'Edge AI & Embedded',
                'Deep Learning Core',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/40 border border-slate-700/60 text-slate-300 transition cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCourses}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <BookOpen className="h-4.5 w-4.5 text-slate-950" />
                <span>Explore All Courses</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onLaunchLab}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-semibold text-sm transition-all cursor-pointer shadow-lg group"
              >
                <Terminal className="h-4.5 w-4.5 text-emerald-400 group-hover:rotate-6 transition-transform" />
                <span>Launch Interactive Vision Lab</span>
              </button>
            </div>

            {/* Social Proof & Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/70 text-slate-300">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">24,500+</p>
                <p className="text-xs text-slate-400">Active Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-cyan-400 tracking-tight">98.4%</p>
                <p className="text-xs text-slate-400">Lab Pass Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">60 FPS</p>
                <p className="text-xs text-slate-400">Real-Time Edge Labs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 tracking-tight">15+</p>
                <p className="text-xs text-slate-400">Accredited Certs</p>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Cyber Recognition Eye Card (using uploaded logo) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0c1933] via-[#09152b] to-[#060e20] p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
              
              {/* Corner Tech Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-950">
                <div className="flex items-center gap-2">
                  <Scan className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
                    Model Stream: Active
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>14.2ms Latency</span>
                </div>
              </div>

              {/* Primary Visual: The Logo Visual Container */}
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950 aspect-video flex items-center justify-center p-2 group-hover:border-cyan-400 transition">
                <img 
                  src={assetUrl('assets/aistudio/image_159078bf.png')}
                  alt="AI Recognition System Architecture Preview" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                />

                {/* Simulated HUD Overlays */}
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                  ROI: [112, 112, 3]
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                  CONFIDENCE: 99.82%
                </div>
              </div>

              {/* Sub-features list */}
              <div className="mt-5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <Cpu className="h-4 w-4 text-cyan-400" />
                    <span>Neural Vector Embedding</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">512-dim ArcFace</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <ShieldCheck className="h-4 w-4 text-indigo-400" />
                    <span>Liveness & Anti-Spoofing</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">3D Depth + FFT</span>
                </div>
              </div>

              {/* Action Button inside Card */}
              <button
                onClick={onLaunchLab}
                className="mt-4 w-full py-2.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Test Live Model in Browser Sandbox</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
