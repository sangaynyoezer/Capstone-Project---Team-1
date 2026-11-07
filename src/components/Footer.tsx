import React from 'react';
import { Terminal, Shield, Github, BookOpen, Award, ExternalLink, Cpu } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onLaunchLab: () => void;
  onOpenCertificateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onLaunchLab,
  onOpenCertificateModal,
}) => {
  return (
    <footer className="border-t border-cyan-950/80 bg-[#040813] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_159078bf.png"
                  alt="AI Recognition System Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Recognition System
                </span>
                <p className="text-[11px] text-cyan-400 font-medium">CAP Applied Vision Academy</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Industrial online education platform dedicated to computer vision, neural metric spaces, biometric identity verification, and real-time edge AI inference.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Edge Testbed: 60 FPS Online</span>
              </div>
            </div>
          </div>

          {/* Curriculum Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2">
              {[
                'Biometrics & Facial AI',
                'Real-Time Detection',
                'Edge AI & Embedded',
                'Deep Learning Core',
                'Computer Vision',
              ].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-cyan-300 transition cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hands-On Sandbox */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Interactive Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onLaunchLab}
                  className="hover:text-cyan-300 transition cursor-pointer flex items-center gap-1.5 text-left"
                >
                  <Terminal className="h-3 w-3 text-emerald-400" />
                  <span>AI Vision Sandbox</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCertificateModal}
                  className="hover:text-cyan-300 transition cursor-pointer flex items-center gap-1.5 text-left"
                >
                  <Award className="h-3 w-3 text-amber-400" />
                  <span>Certificate Verifier</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500">TensorRT Profiler (Lab)</span>
              </li>
              <li>
                <span className="text-slate-500">Faiss Vector Database (512-D)</span>
              </li>
            </ul>
          </div>

          {/* Affiliation & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Standards & Research
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Curriculum aligned with ISO/IEC 19794 biometric data interchange formats and NIST FRVT facial recognition benchmarks.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              CAP Prototype · CST & RUB
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AI Recognition System Course Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition cursor-pointer">Security Policy</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Biometric Privacy</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
