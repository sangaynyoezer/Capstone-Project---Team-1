import React, { useState } from 'react';
import { Course } from '../types/course';
import { X, Award, Printer, Check, Copy, ShieldCheck, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  course: Course;
  studentName: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStudentName: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  studentName,
  isOpen,
  onClose,
  onUpdateStudentName,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [nameInput, setNameInput] = useState(studentName);
  const [isEditingName, setIsEditingName] = useState(false);

  if (!isOpen) return null;

  const certificateId = `CAP-AI-REC-${course.id.toUpperCase()}-VERIFIED-${Math.floor(10000 + Math.random() * 90000)}`;
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
    });
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(`https://verify.cap-ai-recognition.edu/cert/${certificateId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const saveName = () => {
    if (nameInput.trim()) {
      onUpdateStudentName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#081224] border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden my-8">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#060d1b] text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <Award className="h-4 w-4 text-amber-400" />
            <span>Official Accredited Credential Preview</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close Certificate Modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#050b18] via-[#09152b] to-[#040812] text-slate-100 relative print:m-0 print:p-6 border-8 border-double border-cyan-900/60 m-4 rounded-xl shadow-inner">
          
          {/* Corner Watermarks */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/80" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/80" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/80" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/80" />

          {/* Header with Logo */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-16 w-16 rounded-2xl bg-slate-950 border border-cyan-500/50 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <img
                src="/assets/aistudio/image_159078bf.png"
                alt="AI Recognition System"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#ff6b6b] font-bold">
                CLASS IX DIGITAL TECHNOLOGY AND INNOVATION (DTI)
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-wide text-white uppercase font-black">
                Certificate of Completion
              </h2>
              <div className="pt-1">
                <span className="px-3 py-1 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/30 text-[#00f5c4] text-xs font-mono font-bold">
                  Chapter 10 • Topic: AI Recognition System
                </span>
              </div>
            </div>
          </div>

          {/* Body Text */}
          <div className="mt-8 text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              This is to certify that
            </p>

            {/* Editable Student Name */}
            {isEditingName ? (
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="text-xl sm:text-2xl font-serif text-cyan-300 font-bold bg-slate-900 border border-cyan-500 px-3 py-1 rounded text-center"
                  autoFocus
                />
                <button
                  onClick={saveName}
                  className="px-3 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setIsEditingName(true)}
                className="group inline-flex items-center gap-2 cursor-pointer border-b-2 border-dotted border-cyan-500/50 hover:border-cyan-400 pb-1"
                title="Click to change student name"
              >
                <h3 className="text-2xl sm:text-3xl font-serif text-cyan-200 font-extrabold tracking-wide">
                  {studentName}
                </h3>
                <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition">
                  (Edit)
                </span>
              </div>
            )}

            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              has successfully fulfilled all curriculum requirements, hands-on lab code assessments, and practical model deployments for:
            </p>

            <h4 className="text-lg sm:text-xl font-bold text-white font-sans max-w-lg mx-auto leading-snug">
              {course.title}
            </h4>

            <p className="text-xs text-slate-400 max-w-xl mx-auto italic">
              Demonstrating mastery in deep metric learning, 68-point feature landmark regression, high-dimensional vector embeddings, and real-time edge computer vision inference.
            </p>
          </div>

          {/* Footer Signatures and Verification Seal */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-xs">
            
            {/* Instructor Signature */}
            <div className="text-center sm:text-left space-y-1">
              <p className="font-serif italic text-cyan-300 text-base border-b border-slate-700/80 pb-1 max-w-[180px] mx-auto sm:mx-0">
                {course.instructor.name}
              </p>
              <p className="font-bold text-slate-300 text-[11px]">{course.instructor.title}</p>
              <p className="text-[10px] text-slate-500">{course.instructor.affiliation}</p>
            </div>

            {/* Official Center Seal */}
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              <div className="h-14 w-14 rounded-full border-2 border-amber-400/80 bg-amber-950/40 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <ShieldCheck className="h-7 w-7 text-amber-400" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                VERIFIED CREDENTIAL
              </span>
            </div>

            {/* Verification Metadata */}
            <div className="text-center sm:text-right space-y-1 font-mono text-[10px] text-slate-400">
              <p>Issue Date: <span className="text-slate-200">{issueDate}</span></p>
              <p className="truncate">Cert ID: <span className="text-cyan-400 font-bold">{certificateId}</span></p>
              <p className="text-slate-500">Accredited by CAP AI Systems Consortium</p>
            </div>

          </div>

        </div>

        {/* Verification Link Action */}
        <div className="p-4 bg-[#060c18] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Cryptographic Verification Link:</span>
            <code className="text-cyan-400 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded">
              verify.cap-ai-recognition.edu/{certificateId.slice(0, 16)}...
            </code>
          </div>

          <button
            onClick={handleCopyHash}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition cursor-pointer"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Verification URL'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
