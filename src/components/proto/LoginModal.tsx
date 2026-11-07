import React, { useState } from 'react';
import { X, User, KeyRound, CheckCircle2, RotateCcw, Mail, AlertCircle, Check } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string, id: string) => void;
  userLoggedIn: boolean;
  onLogout: () => void;
  onResetProgress: () => void;
  currentName: string;
  currentId: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  userLoggedIn,
  onLogout,
  onResetProgress,
  currentName,
  currentId,
}) => {
  const [email, setEmail] = useState<string>('norbu.student@springdale.edu');
  const [emailError, setEmailError] = useState<string>('');
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [name, setName] = useState<string>(currentName || 'Tenzin Norbu');
  const [studentId, setStudentId] = useState<string>(currentId || 'IX-A-407');
  const [password, setPassword] = useState<string>('class9pass');
  const [formError, setFormError] = useState<string>('');

  if (!isOpen) return null;

  const validateEmailFormat = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Email address is required.';
    }
    if (!trimmed.includes('@')) {
      return 'Email must contain the "@" symbol (e.g. name@school.edu).';
    }
    const [local, domain] = trimmed.split('@');
    if (!local) return 'Please include a user identifier before "@".';
    if (!domain) return 'Please specify a domain after "@" (e.g., school.edu).';
    if (!domain.includes('.')) return 'Domain after "@" must have an extension like .edu or .bt.';
    return '';
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setFormError('');
    if (emailTouched || val.length > 0) {
      setEmailError(validateEmailFormat(val));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmailFormat(email));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);

    const err = validateEmailFormat(email);
    if (err) {
      setEmailError(err);
      setFormError(err);
      return;
    }
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!studentId.trim()) {
      setFormError('Please enter your student Roll No. / ID.');
      return;
    }

    onSuccess(name, studentId);
    onClose();
  };

  const isEmailValid = email.trim().length > 0 && !emailError && email.includes('@');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0b1122] border border-[#21355a] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            STUDENT & TEACHER PORTAL
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            {userLoggedIn ? 'Student Profile Active' : 'Class IX Portal Login'}
          </h3>
          <p className="text-xs text-slate-400">
            {userLoggedIn
              ? 'Springdale High School • Class IX DTI'
              : 'Sign in with your student credentials to save lab session progress.'}
          </p>
        </div>

        {userLoggedIn ? (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-[#090f1e] border border-[#1d2d4c] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Student Name:</span>
                <span className="text-white font-bold">{currentName || 'Student'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Roll No:</span>
                <span className="text-[#00f5c4] font-mono">{currentId || 'IX-A-407'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Biometric Verification:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onResetProgress();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Progress (Start Fresh 0%)</span>
              </button>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Global Error Banner */}
            {formError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/60 text-rose-200 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{formError}</span>
              </div>
            )}

            {/* Email Field with Real-time error handling */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00f5c4]" />
                  <span>Student Email Address</span>
                </label>
                {emailTouched && emailError && (
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">
                    Missing @
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder="e.g. norbu.student@springdale.edu"
                  className={`w-full p-3 rounded-xl bg-[#070b16] text-white focus:outline-none transition-all pr-8 ${
                    emailTouched && emailError
                      ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 bg-rose-950/15'
                      : isEmailValid
                      ? 'border border-emerald-500/50'
                      : 'border border-[#1b2b48] focus:border-[#00f5c4]'
                  }`}
                />
                {isEmailValid && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              {emailTouched && emailError && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#00f5c4]" />
                Student Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tenzin Norbu"
                className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#00f5c4]" />
                Student Roll No. / ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. IX-A-407"
                className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-[#00f5c4]" />
                Password / Lab PIN
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.25)] transition-all active:scale-95 cursor-pointer"
              >
                Sign In to Course Portal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
