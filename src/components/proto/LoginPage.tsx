import React, { useState } from 'react';
import { Mail, User, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, Check, BadgeCheck } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string, username: string, name: string) => void;
  onBackToCourse: () => void;
  userLoggedIn: boolean;
  currentUser: {
    email: string;
    username: string;
    name: string;
  };
  onLogout: () => void;
  onResetProgress: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToCourse,
  userLoggedIn,
  currentUser,
  onLogout,
  onResetProgress,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  
  // Fields for Sign In
  const [identifier, setIdentifier] = useState<string>(''); // Email, Student ID, or Username
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Additional Fields for Register
  const [fullName, setFullName] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerUsername, setRegisterUsername] = useState<string>('');

  // Error States
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');
  const [formSuccessMessage, setFormSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Validate Email Helper
  const isValidEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMessage('');
    setFormSuccessMessage('');

    const trimmedId = identifier.trim();
    const trimmedPass = password.trim();

    if (!trimmedId) {
      setFormErrorMessage('Please enter your email, username, or student ID.');
      return;
    }

    if (!trimmedPass) {
      setFormErrorMessage('Please enter your password.');
      return;
    }

    if (trimmedPass.length < 3) {
      setFormErrorMessage('Password must be at least 3 characters long.');
      return;
    }

    setIsSubmitting(true);

    // Determine email and username from identifier
    let derivedEmail = trimmedId;
    let derivedUsername = trimmedId.split('@')[0];
    let derivedName = trimmedId.split('@')[0];

    // Format display name nicely
    derivedName = derivedName
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    if (!derivedEmail.includes('@')) {
      derivedEmail = `${trimmedId.toLowerCase()}@rub.edu.bt`;
    }

    setFormSuccessMessage('Authentication successful! Loading course...');

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(derivedEmail, derivedUsername, derivedName);
    }, 400);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMessage('');
    setFormSuccessMessage('');

    const trimmedName = fullName.trim();
    const trimmedEmail = registerEmail.trim();
    const trimmedUser = registerUsername.trim();
    const trimmedPass = password.trim();

    if (!trimmedName) {
      setFormErrorMessage('Please enter your full name.');
      return;
    }

    if (!trimmedEmail) {
      setFormErrorMessage('Please enter your email address.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setFormErrorMessage('Please enter a valid email address containing "@" and domain (e.g. 08230188.sce@rub.edu.bt).');
      return;
    }

    if (!trimmedUser || trimmedUser.length < 3) {
      setFormErrorMessage('Please enter a username or student ID of at least 3 characters.');
      return;
    }

    if (!trimmedPass || trimmedPass.length < 3) {
      setFormErrorMessage('Please create a password of at least 3 characters.');
      return;
    }

    setIsSubmitting(true);
    setFormSuccessMessage('Account registered successfully! Redirecting...');

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(trimmedEmail, trimmedUser, trimmedName);
    }, 400);
  };

  const handleSimulateQuickFill = () => {
    if (isRegisterMode) {
      setFullName('Sangay Namling Yoezer');
      setRegisterEmail('08230188.sce@rub.edu.bt');
      setRegisterUsername('08230188');
      setPassword('class9dti');
    } else {
      setIdentifier('08230188.sce@rub.edu.bt');
      setPassword('class9dti');
    }
    setFormErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#070b16] py-12 px-4 sm:px-6 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back button */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onBackToCourse}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#00f5c4] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Home</span>
        </button>

        <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
          SECURE PORTAL
        </span>
      </div>

      {/* Main Login / Register Card */}
      <div className="w-full max-w-md bg-[#0b1222] border border-[#1e2f4e] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0b172e] to-[#050b17] border border-[#00f5c4]/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,245,196,0.25)] p-2">
            <img 
              src="/assets/logo_eye.png" 
              alt="AI Recognition System Eye Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,245,196,0.35)]"
            />
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              AI Recognition System
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider text-[#ff6b6b] border border-[#ff6b6b]/60 uppercase">
              CLASS IX DTI
            </span>
          </div>

          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {userLoggedIn
              ? 'Your student account is active. Manage your profile or resume studying.'
              : isRegisterMode
              ? 'Register a new student account to save your Chapter 10 progress.'
              : 'Sign in with your email or student ID to access your course lessons.'}
          </p>
        </div>

        {/* If user is already logged in, show profile overview card */}
        {userLoggedIn ? (
          <div className="space-y-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#090f1e] border border-[#1d2d4c] space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#142036]">
                <span className="text-slate-400">Account Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-mono">{currentUser.email || 'student@rub.edu.bt'}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Username / ID:</span>
                <span className="text-[#00f5c4] font-mono font-bold">@{currentUser.username || 'student'}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Student Name:</span>
                <span className="text-white font-medium">{currentUser.name || 'Student'}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={onBackToCourse}
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Lessons</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onResetProgress}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
              >
                Reset Chapter Progress to 0%
              </button>

              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Login / Registration Form with Live Error Handling */
          <div className="space-y-4">
            {/* Mode Selector Tab (Sign In vs Register) */}
            <div className="flex bg-[#070c17] p-1 rounded-xl border border-[#1b2b48] text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(false);
                  setFormErrorMessage('');
                  setFormSuccessMessage('');
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  !isRegisterMode
                    ? 'bg-[#00f5c4] text-[#070b16] shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(true);
                  setFormErrorMessage('');
                  setFormSuccessMessage('');
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isRegisterMode
                    ? 'bg-[#00f5c4] text-[#070b16] shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            {/* Global Error Alert Banner */}
            {formErrorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/60 text-rose-200 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{formErrorMessage}</span>
              </div>
            )}

            {/* Global Success Alert Banner */}
            {formSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/60 text-emerald-200 text-xs flex items-start gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{formSuccessMessage}</span>
              </div>
            )}

            {!isRegisterMode ? (
              /* ----------------- SIGN IN FORM ----------------- */
              <form noValidate onSubmit={handleSignIn} className="space-y-4">
                {/* Email or Username or Student ID */}
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-300 font-semibold flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#00f5c4]" />
                    <span>Email, Student ID, or Username</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        setFormErrorMessage('');
                      }}
                      placeholder="e.g. 08230188.sce@rub.edu.bt or sangay"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-[#1b2b48] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f5c4] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-300 font-semibold flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#00f5c4]" />
                    <span>Password</span>
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFormErrorMessage('');
                      }}
                      placeholder="Enter your password"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-[#1b2b48] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f5c4] transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me & Demo quick fill */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-[#00f5c4] focus:ring-0"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleSimulateQuickFill}
                    className="text-[11px] text-[#00f5c4] hover:underline flex items-center gap-1 font-mono cursor-pointer"
                    title="Fill sample student credentials"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Autofill Sample</span>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_20px_rgba(0,245,196,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Signing In...' : 'Sign In & Start Learning'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* ----------------- REGISTER FORM ----------------- */
              <form noValidate onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-300 font-semibold flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#00f5c4]" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setFormErrorMessage('');
                    }}
                    placeholder="e.g. Sangay Namling Yoezer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-[#1b2b48] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f5c4] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-300 font-semibold flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#00f5c4]" />
                    <span>Email Address (College / School)</span>
                  </label>
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                      setFormErrorMessage('');
                    }}
                    placeholder="e.g. 08230188.sce@rub.edu.bt"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-[#1b2b48] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f5c4] transition-all"
                  />
                </div>

                {/* Student ID or Username */}
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-300 font-semibold flex items-center gap-2">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#00f5c4]" />
                    <span>Student ID / Username</span>
                  </label>
                  <input
                    type="text"
                    value={registerUsername}
                    onChange={(e) => {
                      setRegisterUsername(e.target.value);
                      setFormErrorMessage('');
                    }}
                    placeholder="e.g. 08230188"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-[#1b2b48] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f5c4] transition-all"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-300 font-semibold flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#00f5c4]" />
                    <span>Create Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFormErrorMessage('');
                      }}
                      placeholder="At least 3 characters"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-[#1b2b48] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f5c4] transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Autofill sample button */}
                <div className="flex justify-end text-xs">
                  <button
                    type="button"
                    onClick={handleSimulateQuickFill}
                    className="text-[11px] text-[#00f5c4] hover:underline flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Autofill Sample</span>
                  </button>
                </div>

                {/* Register Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_20px_rgba(0,245,196,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Registering...' : 'Register & Start Learning'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Guest Option */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onLoginSuccess('guest.learner@rub.edu.bt', 'guest_learner', 'Guest Learner')}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Continue exploring as Guest →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Security badge at bottom */}
      <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500 z-10">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>End-to-end encrypted biometric lab environment</span>
      </div>
    </div>
  );
};
