import React from 'react';
import { Github, Twitter, Facebook, Video } from 'lucide-react';
import { assetUrl } from '../../utils/assetUrl';

interface ProtoFooterProps {
  onNavigateTab: (tab: 'home' | 'lessons' | 'activities' | 'notes' | 'tutor' | 'assessment' | 'login') => void;
}

export const ProtoFooter: React.FC<ProtoFooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="w-full bg-[#050811] border-t border-[#162032] pt-14 pb-8 px-6 sm:px-12 text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#131c2d]">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div 
              onClick={() => onNavigateTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0b172e] to-[#050b17] border border-[#00f5c4]/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,245,196,0.25)] group-hover:border-[#00f5c4] transition-all p-0.5">
                <img 
                  src={assetUrl('assets/logo_eye.png')}
                  alt="RecognAI Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(0,245,196,0.3)]"
                />
              </div>
              <span className="text-white font-bold text-xl tracking-wide group-hover:text-[#00f5c4] transition-colors">
                RecognAI
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An immersive digital learning curriculum designed to make high-level technology education accessible, interactive, and exciting for Class IX students.
            </p>
          </div>

          {/* Syllabus Links - DTI Chapter 10 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#00f5c4] uppercase font-bold">
              SYLLABUS
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigateTab('lessons')}
                  className="hover:text-white transition-colors text-left text-slate-200 font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4]" />
                  <span>DTI Chapter 10: AI Recognition Systems</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Features Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#00f5c4] uppercase font-bold">
              FEATURES
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigateTab('lessons')}
                  className="hover:text-white transition-colors text-left"
                >
                  Interactive PPTs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('activities')}
                  className="hover:text-white transition-colors text-left"
                >
                  Playground Simulation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('assessment')}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Diagnostic Quiz
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('notes')}
                  className="hover:text-white transition-colors text-left"
                >
                  Additional Teacher and Learner Tools
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © 2026 RecognAI Platform. All rights reserved.
          </p>

          <div className="font-mono text-center space-y-1">
            <p className="text-[#00f5c4] font-semibold text-xs tracking-wide">
              Samtse College of Education • Bachelors of Education in IT
            </p>
            <p className="text-slate-400 text-[11px]">
              Student Lead: <span className="text-white font-medium">Sangay Namling Yoezer</span> | Module Tutor: <span className="text-white font-medium">Ms. Sapna Thapa</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#facebook" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#twitter" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#video" className="hover:text-white transition-colors" aria-label="Video">
              <Video className="w-4 h-4" />
            </a>
            <a href="#github" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
