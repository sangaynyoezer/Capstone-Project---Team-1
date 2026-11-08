import React from 'react';
import { Sparkles } from 'lucide-react';
import { assetUrl } from '../../utils/assetUrl';

interface ProtoNavbarProps {
  activeTab: 'home' | 'lessons' | 'activities' | 'notes' | 'tutor' | 'assessment' | 'login';
  setActiveTab: (tab: 'home' | 'lessons' | 'activities' | 'notes' | 'tutor' | 'assessment' | 'login') => void;
  onOpenLogin: () => void;
  userLoggedIn: boolean;
  studentName?: string;
  studentId?: string;
}

export const ProtoNavbar: React.FC<ProtoNavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLogin,
  userLoggedIn,
  studentName,
  studentId,
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'activities', label: 'Activities' },
    { id: 'notes', label: 'Notes' },
    { id: 'assessment', label: 'Assessment' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b16]/95 backdrop-blur-md border-b border-[#1b253b] px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Eye Logo Icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0b172e] to-[#050b17] border border-[#00f5c4]/40 flex items-center justify-center shadow-[0_0_14px_rgba(0,245,196,0.25)] group-hover:scale-105 group-hover:border-[#00f5c4] group-hover:shadow-[0_0_20px_rgba(0,245,196,0.45)] transition-all p-1">
            <img 
              src={assetUrl('assets/logo_eye.png')}
              alt="AI Recognition System Eye Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(0,245,196,0.35)]"
            />
          </div>

          <span className="text-white font-bold text-lg sm:text-xl tracking-tight">
            AI Recognition System
          </span>

          {/* Coral Outline Pill: CLASS IX */}
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#ff6b6b] border border-[#ff6b6b]/60 uppercase ml-0.5">
            CLASS IX
          </span>
        </div>

        {/* Navigation Tabs (Without duplicate AI Tutor) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1 transition-colors ${
                  isActive ? 'text-[#00f5c4] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-[#00f5c4] rounded-full shadow-[0_0_8px_#00f5c4]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3.5">
          {/* AI Study buddy Button */}
          <button 
            onClick={() => setActiveTab('tutor')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all shadow-sm ${
              activeTab === 'tutor'
                ? 'bg-[#00f5c4]/15 border-[#00f5c4] text-[#00f5c4] shadow-[0_0_12px_rgba(0,245,196,0.3)]'
                : 'bg-[#0d1627] border-[#1d2d4b] text-slate-200 hover:border-[#00f5c4]/50 hover:text-white'
            }`}
            title="Chat with your AI Study buddy"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f5c4] shadow-[0_0_6px_#00f5c4] animate-pulse" />
            <span className="text-xs font-medium tracking-wide">AI Study buddy</span>
          </button>

          {/* Student Profile or Sign In Button */}
          {userLoggedIn ? (
            <div 
              onClick={() => setActiveTab('login')}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#0d1627] border border-[#1e2f4e] hover:border-[#00f5c4]/60 cursor-pointer transition-all"
              title="Student Profile & Settings"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-fuchsia-500 p-[1.5px]">
                <div className="w-full h-full rounded-full bg-[#0b1020] flex items-center justify-center overflow-hidden text-xs">
                  🧑‍💻
                </div>
              </div>
              <span className="text-xs font-medium text-slate-200 hidden sm:inline max-w-[90px] truncate">
                {studentName ? studentName.split(' ')[0] : 'Profile'}
              </span>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1627] border border-[#00f5c4]/50 hover:border-[#00f5c4] text-[#00f5c4] hover:bg-[#00f5c4]/15 text-xs font-semibold cursor-pointer transition-all shadow-sm"
              title="Sign In or Register"
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav drawer row */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto pt-2.5 gap-4 text-xs scrollbar-none border-t border-slate-800/60 mt-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === item.id ? 'bg-[#00f5c4]/15 text-[#00f5c4] font-semibold' : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => setActiveTab('tutor')}
          className={`whitespace-nowrap px-2 py-1 rounded flex items-center gap-1.5 ${
            activeTab === 'tutor' ? 'bg-[#00f5c4]/15 text-[#00f5c4] font-semibold' : 'text-slate-400'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4]" />
          <span>AI Study buddy</span>
        </button>
        <button
          onClick={() => setActiveTab('login')}
          className={`whitespace-nowrap px-2 py-1 rounded ${
            activeTab === 'login' ? 'bg-[#00f5c4]/15 text-[#00f5c4] font-semibold' : 'text-slate-400'
          }`}
        >
          {userLoggedIn ? 'Profile' : 'Sign In'}
        </button>
      </div>
    </header>
  );
};
