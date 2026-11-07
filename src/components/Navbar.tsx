import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Terminal, 
  Award, 
  Compass, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Sparkles,
  Flame,
  CheckCircle2,
  Bell
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'lab' | 'dashboard' | 'paths';
  onSelectTab: (tab: 'catalog' | 'lab' | 'dashboard' | 'paths') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  enrolledCount: number;
  completedCount: number;
  onOpenCertificateModal: () => void;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  enrolledCount,
  completedCount,
  onOpenCertificateModal,
  studentName,
  onUpdateStudentName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateStudentName(tempName.trim());
      setEditingName(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/40 bg-[#070e1e]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onSelectTab('catalog')}
            className="flex items-center gap-3.5 group text-left cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] overflow-hidden group-hover:border-cyan-400 transition">
              <img 
                src="/assets/aistudio/image_159078bf.png" 
                alt="AI Recognition System Logo" 
                className="h-full w-full object-cover scale-125 object-center"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent uppercase">
                  AI Recognition
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60">
                  CAP
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                Online Course & Systems Lab
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Main Navigation">
            <button
              onClick={() => onSelectTab('catalog')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'catalog'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="h-4 w-4 text-cyan-400" />
              <span>Courses</span>
            </button>

            <button
              onClick={() => onSelectTab('lab')}
              className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'lab'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>AI Vision Lab</span>
              <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 rounded border border-emerald-500/40 animate-pulse">
                LIVE
              </span>
            </button>

            <button
              onClick={() => onSelectTab('paths')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'paths'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="h-4 w-4 text-sky-400" />
              <span>Career Paths</span>
            </button>

            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Flame className="h-4 w-4 text-amber-400" />
              <span>My Learning</span>
              {enrolledCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {enrolledCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden lg:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search CV, ArcFace, YOLO..."
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Certificate View Trigger */}
          <button
            onClick={onOpenCertificateModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-500/40 rounded-lg hover:bg-amber-900/40 hover:border-amber-400 transition cursor-pointer"
            title="View verified course certificates"
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>Certificates ({completedCount})</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-700 p-4 shadow-xl z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-200">System Notifications</span>
                  <span className="text-[10px] text-cyan-400">CAP System Hub</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <p className="font-semibold text-cyan-300">New Lab Ready!</p>
                    <p className="text-slate-400 mt-0.5 text-[11px]">
                      Interactive YOLOv11 & Biometric Mesh playground is active in the AI Vision Lab.
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <p className="font-semibold text-emerald-300">Course Verification Available</p>
                    <p className="text-slate-400 mt-0.5 text-[11px]">
                      Your authenticated credential ID is tied to student account #{studentName}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Identity Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline-block text-xs font-medium text-slate-200 max-w-[100px] truncate">
                {studentName}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 p-4 shadow-2xl z-50">
                <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-800">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {studentName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-semibold text-slate-100 truncate">{studentName}</p>
                    <p className="text-[11px] text-cyan-400 font-mono">ID: CST-CAP-2026</p>
                  </div>
                </div>

                {editingName ? (
                  <form onSubmit={handleSaveName} className="mb-3 space-y-2">
                    <label className="text-[11px] text-slate-400 block font-medium">Edit Student Name (Certificate):</label>
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingName(false)}
                        className="text-[11px] px-2 py-1 text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-[11px] px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      setTempName(studentName);
                      setEditingName(true);
                    }}
                    className="w-full text-left text-xs text-slate-300 hover:text-cyan-300 py-1.5 px-2 rounded hover:bg-slate-800/60 mb-2 transition flex items-center justify-between"
                  >
                    <span>Edit Name for Certificates</span>
                    <span className="text-[10px] text-slate-500">Edit</span>
                  </button>
                )}

                <div className="space-y-1 pt-2 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => {
                      onSelectTab('dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left py-1.5 px-2 rounded text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-2"
                  >
                    <Flame className="h-3.5 w-3.5 text-amber-400" />
                    <span>My Enrolled Courses ({enrolledCount})</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenCertificateModal();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left py-1.5 px-2 rounded text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-2"
                  >
                    <Award className="h-3.5 w-3.5 text-amber-400" />
                    <span>Official Verified Certificate</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#070e1e] px-4 pt-3 pb-5 space-y-2">
          <div className="mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search CV, ArcFace, YOLO..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
          <button
            onClick={() => {
              onSelectTab('catalog');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'catalog' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40' : 'text-slate-300'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Courses Catalog</span>
          </button>
          <button
            onClick={() => {
              onSelectTab('lab');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'lab' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40' : 'text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>Interactive AI Vision Lab</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40">
              LIVE
            </span>
          </button>
          <button
            onClick={() => {
              onSelectTab('paths');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'paths' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40' : 'text-slate-300'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Career Roadmaps</span>
          </button>
          <button
            onClick={() => {
              onSelectTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'dashboard' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40' : 'text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Flame className="h-4 w-4 text-amber-400" />
              <span>My Learning Dashboard</span>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              {enrolledCount} enrolled
            </span>
          </button>
          <button
            onClick={() => {
              onOpenCertificateModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-amber-300 bg-amber-950/40 border border-amber-600/30"
          >
            <Award className="h-4 w-4 text-amber-400" />
            <span>Official Certificates</span>
          </button>
        </div>
      )}
    </header>
  );
};
