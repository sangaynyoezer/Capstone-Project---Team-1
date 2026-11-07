import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, AlertCircle, Award, ArrowRight, RotateCcw, 
  HelpCircle, Check, Sparkles, Layers, ListOrdered
} from 'lucide-react';
import { VideoQuizQuestion } from './videoQuizData';

interface VideoCheckpointQuizProps {
  quizTitle: string;
  subtopicNumber: number;
  questions: VideoQuizQuestion[];
  onComplete: (score: number, total: number) => void;
  isAlreadyCompleted?: boolean;
}

export const VideoCheckpointQuiz: React.FC<VideoCheckpointQuizProps> = ({
  quizTitle,
  subtopicNumber,
  questions,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  
  // Matching question state
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [userMatches, setUserMatches] = useState<{ [leftIdx: number]: number }>({});
  
  // Question submission & score tracking
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [answeredResults, setAnsweredResults] = useState<{ [qId: number]: boolean }>({});
  const [isFinished, setIsFinished] = useState<boolean>(isAlreadyCompleted);

  const currentQ = questions[currentIdx];
  const totalQuestions = questions.length;
  const score = Object.values(answeredResults).filter(Boolean).length;

  // Handle MCQ or Fill-in-the-blank option click
  const handleSelectOption = (idx: number) => {
    if (isQuestionSubmitted) return;
    setSelectedMcqOption(idx);
  };

  // Handle Matching click
  const handleMatchLeft = (leftIdx: number) => {
    if (isQuestionSubmitted) return;
    setSelectedLeft(leftIdx);
  };

  const handleMatchRight = (rightIdx: number) => {
    if (isQuestionSubmitted || selectedLeft === null) return;
    setUserMatches(prev => ({
      ...prev,
      [selectedLeft]: rightIdx,
    }));
    setSelectedLeft(null);
  };

  // Submit Answer (Strict single attempt)
  const handleSubmit = () => {
    if (isQuestionSubmitted) return;

    let correct = false;

    if (currentQ.type === 'mcq' || currentQ.type === 'fill_blank') {
      if (selectedMcqOption === null) return;
      correct = selectedMcqOption === currentQ.correctOptionIndex;
    } else if (currentQ.type === 'matching') {
      const pairs = currentQ.matchingPairs || [];
      const totalPairs = pairs.length;
      let matchedCorrectly = 0;
      for (let i = 0; i < totalPairs; i++) {
        if (userMatches[i] === i) {
          matchedCorrectly++;
        }
      }
      correct = matchedCorrectly === totalPairs;
    }

    setIsAnswerCorrect(correct);
    setIsQuestionSubmitted(true);
    setAnsweredResults(prev => ({
      ...prev,
      [currentQ.id]: correct,
    }));
  };

  // Move to next question or complete
  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1);
      setSelectedMcqOption(null);
      setSelectedLeft(null);
      setUserMatches({});
      setIsQuestionSubmitted(false);
      setIsAnswerCorrect(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (isAnswerCorrect ? 1 : 0);
      onComplete(finalScore, totalQuestions);
    }
  };

  // Check if current question is ready to submit
  const canSubmit = () => {
    if (isQuestionSubmitted) return false;
    if (currentQ.type === 'mcq' || currentQ.type === 'fill_blank') {
      return selectedMcqOption !== null;
    }
    if (currentQ.type === 'matching') {
      const pairs = currentQ.matchingPairs || [];
      return Object.keys(userMatches).length === pairs.length;
    }
    return false;
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#090f1d] border-2 border-[#1c2e4e] shadow-2xl space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#182845]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#00f5c4] bg-[#00f5c4]/10 border border-[#00f5c4]/30 uppercase">
              SUBTOPIC 0{subtopicNumber} VIDEO CHECKPOINT
            </span>
            <span className="text-xs font-mono text-slate-400">
              10 Mandatory Questions
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {quizTitle}
          </h3>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-2 bg-[#0c162b] px-3.5 py-1.5 rounded-xl border border-[#21355a] text-xs font-mono self-start sm:self-auto">
          <span className="text-slate-400">Progress:</span>
          <span className="text-[#00f5c4] font-bold">
            {isFinished ? totalQuestions : currentIdx + 1} / {totalQuestions}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Score:</span>
          <span className="text-amber-400 font-bold">{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#121c2e] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#00f5c4] to-cyan-400 transition-all duration-300"
          style={{ width: `${((isFinished ? totalQuestions : currentIdx) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Finished Summary View */}
      {isFinished ? (
        <div className="py-6 text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-[#00f5c4] uppercase tracking-wider font-bold">
              CHECKPOINT CLEARED
            </span>
            <h4 className="text-2xl font-extrabold text-white">
              Video Understanding Verified!
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              You answered all 10 video questions. Your score: <strong className="text-emerald-400">{score} of {totalQuestions}</strong> ({Math.round((score / totalQuestions) * 100)}%).
              The next lesson has been unlocked below!
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Activity Completed • Proceed Button Unlocked Below</span>
          </div>
        </div>
      ) : (
        /* Question Card */
        <div className="space-y-6">
          {/* Question Header & Prompt */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                Q{currentQ.id}
              </span>
              <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                {currentQ.type === 'mcq' ? 'Multiple Choice' : currentQ.type === 'fill_blank' ? 'Fill in the Blank' : 'Interactive Concept Matching'}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.prompt}
            </h4>
          </div>

          {/* 1. MCQ Options */}
          {(currentQ.type === 'mcq' || currentQ.type === 'fill_blank') && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedMcqOption === idx;
                const isCorrect = idx === currentQ.correctOptionIndex;
                
                let btnStyle = 'bg-[#0f172a] border-[#223555] text-slate-200 hover:border-slate-500';
                if (isQuestionSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-[#0c1426] border-[#18263f] text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-[#00f5c4]/15 border-[#00f5c4] text-white shadow-[0_0_12px_rgba(0,245,196,0.25)]';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isQuestionSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isQuestionSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isQuestionSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Matching Pairs */}
          {currentQ.type === 'matching' && currentQ.matchingPairs && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 italic">
                Step 1: Click an item on the left. Step 2: Click its matching definition on the right.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column Items */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    Concepts / Stages
                  </span>
                  {currentQ.matchingPairs.map((pair, leftIdx) => {
                    const isSelected = selectedLeft === leftIdx;
                    const matchedRightIdx = userMatches[leftIdx];
                    const isMatched = matchedRightIdx !== undefined;

                    return (
                      <div
                        key={leftIdx}
                        onClick={() => handleMatchLeft(leftIdx)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#00f5c4]/20 border-[#00f5c4] text-white ring-2 ring-[#00f5c4]/40'
                            : isMatched
                            ? 'bg-[#13223d] border-cyan-500/50 text-cyan-200'
                            : 'bg-[#0f172a] border-[#223555] text-slate-200 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{pair.left}</span>
                          {isMatched && (
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                              Linked → {String.fromCharCode(65 + matchedRightIdx)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column Definitions */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    Definitions / Roles
                  </span>
                  {currentQ.matchingPairs.map((pair, rightIdx) => {
                    const linkedByLeft = Object.entries(userMatches).find(([_, r]) => r === rightIdx);

                    return (
                      <div
                        key={rightIdx}
                        onClick={() => handleMatchRight(rightIdx)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          linkedByLeft
                            ? 'bg-[#13223d] border-cyan-500/50 text-slate-200'
                            : 'bg-[#0f172a] border-[#223555] text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 text-slate-400">
                            {String.fromCharCode(65 + rightIdx)}
                          </span>
                          <span>{pair.right}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Explanation Banner (Appears after submission) */}
          {isQuestionSubmitted && (
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 animate-in fade-in duration-200 ${
              isAnswerCorrect 
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isAnswerCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Incorrect: Note the Concept:</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono text-slate-400">
              {isQuestionSubmitted ? 'Answer locked (single attempt)' : 'Select an answer to submit'}
            </span>

            {!isQuestionSubmitted ? (
              <button
                type="button"
                disabled={!canSubmit()}
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,245,196,0.3)] cursor-pointer transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[0_0_15px_rgba(255,107,107,0.3)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>{currentIdx + 1 < totalQuestions ? 'Next Question' : 'Complete Quiz & Unlock Lesson'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
