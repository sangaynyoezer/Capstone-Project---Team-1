import React from 'react';
import { X, Users, GraduationCap, School, Award, Mail, IdCard, CheckCircle2 } from 'lucide-react';
import { assetUrl } from '../../utils/assetUrl';

interface CreatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  name: string;
  role: string;
  email: string;
  studentId: string;
  isLead?: boolean;
}

export const CreatorsModal: React.FC<CreatorsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const creators: TeamMember[] = [
    {
      name: 'Sangay Namling Yoezer',
      role: 'Student Lead & Full-Stack Developer',
      email: '08230188.sce@rub.edu.bt',
      studentId: '08230188',
      isLead: true,
    },
    {
      name: 'Sangay Rinchen',
      role: 'Curriculum & Interactive Content Specialist',
      email: '08230185.sce@rub.edu.bt',
      studentId: '08230185',
    },
    {
      name: 'Sonam Choden',
      role: 'Instructional Designer & Activity Developer',
      email: '08230193.sce@rub.edu.bt',
      studentId: '08230193',
    },
    {
      name: 'Rinche Dema',
      role: 'Assessment & Pedagogical Evaluator',
      email: '08230177.sce@rub.edu.bt',
      studentId: '08230177',
    },
    {
      name: 'Deki Tshomo',
      role: 'Media & Interactive Experience Lead',
      email: '08230115.sce@rub.edu.bt',
      studentId: '08230115',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0b1122] border border-[#21355a] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-white max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pr-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0b172e] to-[#050b17] border border-[#00f5c4]/40 flex items-center justify-center p-2 flex-shrink-0 shadow-[0_0_20px_rgba(0,245,196,0.25)]">
            <img 
              src={assetUrl('assets/logo_eye.png')}
              alt="AI Recognition System Eye Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,245,196,0.35)]"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
              PROJECT TEAM & CREATORS
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Samtse College of Education
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Royal University of Bhutan • Bachelor of Education in IT (B.Ed in IT)
            </p>
          </div>
        </div>

        {/* Institutional & Curriculum Card */}
        <div className="p-4 rounded-2xl bg-[#070b16] border border-[#182640] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00f5c4] flex-shrink-0">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Class IX Digital Technology & Innovation (DTI)</h4>
              <p className="text-xs text-slate-400">Chapter 10: Artificial Intelligence Recognition Systems</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Engineered as an interactive, competency-based digital learning course designed by pre-service IT educators at Samtse College of Education to help Class IX Bhutanese students master AI recognition cycles, computer vision modalities, gesture interactions, and ethical considerations.
          </p>
        </div>

        {/* Academic Guidance */}
        <div className="p-3.5 rounded-xl bg-[#0f172a] border border-[#1b2b48] flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-[#ff6b6b] flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Module Tutor</span>
              <div className="text-sm font-bold text-white">Ms. Sapna Thapa</div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Faculty Advisor
          </span>
        </div>

        {/* Team Members List with Student ID and College Email */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00f5c4]" />
              <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                Project Creators (5 Members)
              </h4>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">
              Samtse College of Education (SCE / RUB)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 text-xs">
            {creators.map((member, index) => (
              <div 
                key={index}
                className={`p-3.5 rounded-xl border transition-all ${
                  member.isLead
                    ? 'bg-gradient-to-r from-[#0d1c2d] to-[#071322] border-[#00f5c4]/50 shadow-[0_0_15px_rgba(0,245,196,0.12)]'
                    : 'bg-[#090f1d] border-[#18253d] hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                      member.isLead
                        ? 'bg-[#00f5c4] text-[#070b16]'
                        : 'bg-[#1a2538] text-slate-300'
                    }`}>
                      {index + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {member.name}
                        </span>
                        {member.isLead && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00f5c4]/15 text-[#00f5c4] border border-[#00f5c4]/40 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Lead
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Student ID & Email Credentials */}
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end pl-10 sm:pl-0">
                    {/* Student ID Badge */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#070c17] border border-cyan-800/60 font-mono text-[11px] text-[#00f5c4]">
                      <span className="text-slate-400">ID:</span>
                      <span className="font-bold">{member.studentId}</span>
                    </div>

                    {/* Email Mailto Link */}
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#070c17] border border-slate-700 hover:border-[#00f5c4] text-slate-300 hover:text-[#00f5c4] font-mono text-[11px] transition-colors"
                      title={`Send email to ${member.name}`}
                    >
                      <Mail className="w-3 h-3 text-cyan-400" />
                      <span>{member.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Banner Visual */}
        <div className="rounded-2xl overflow-hidden border border-[#1e2f4f] bg-[#070b16] shadow-inner">
          <img 
            src={assetUrl('assets/aistudio/Gemini_Generated_Image_ohi75yohi75yohi7_afdc3e63.jpg')}
            alt="AI Recognition System Official Banner" 
            className="w-full h-28 object-cover object-center"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.3)] transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
