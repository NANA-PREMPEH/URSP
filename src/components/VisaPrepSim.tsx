import React, { useState } from "react";
import { VISA_QUESTIONS } from "../data";
import { HelpCircle, Sparkles, Send, ShieldAlert, CheckCircle, BookOpen, AlertCircle } from "lucide-react";

export default function VisaPrepSim() {
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbackResult, setFeedbackResult] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  const currentQuestion = VISA_QUESTIONS[selectedQuestionIdx];

  const handleSelectQuestion = (index: number) => {
    setSelectedQuestionIdx(index);
    setStudentAnswer("");
    setFeedbackResult("");
    setErrorText("");
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswer.trim()) {
      setErrorText("Please write or draft a mock answer to submit for evaluation.");
      return;
    }
    if (studentAnswer.trim().length < 20) {
      setErrorText("Your answer is too short to evaluate. Please provide a more detailed sentence (at least 20 characters) representing how you would answer the Consular Officer.");
      return;
    }
    setErrorText("");
    setIsLoading(true);
    setFeedbackResult("");

    try {
      const response = await fetch("/api/visa/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          studentAnswer,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Embassy feedback server failed to respond. Please review console logs.");
      }

      setFeedbackResult(data.text);
    } catch (err: any) {
      setFeedbackResult(
        `### Evaluation Offline\n\n${err.message || "An unexpected error occurred."}\n\n**Setup fix:** Add \`OPENROUTER_API_KEY\` to \`.env.local\`. If you still have \`GEMINI_API_KEY\`, replace it and restart \`npm run dev\`.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreFillSuggested = () => {
    setStudentAnswer(currentQuestion.exampleStrongText);
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="visa-simulator-workspace">
      <div className="max-w-5xl mx-auto">
        
        {/* Visa Intro Section */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-120 text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded mb-4">
            <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
            <span>Embassy Prep Room</span>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            F-1 Visa Interview Simulator
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto">
            Our legendary mock visa interviews are reproduced here. Consular officers decide in 2-3 minutes. Practice answering these high-frequency questions to check for red flags and polish your confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Question select column list (Left) */}
          <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-2">
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-2 mb-3">
              EMBASSY Q&amp;A TRACKS
            </span>
            {VISA_QUESTIONS.map((q, qIdx) => (
              <button
                key={q.id}
                onClick={() => handleSelectQuestion(qIdx)}
                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-start gap-2.5 cursor-pointer ${
                  selectedQuestionIdx === qIdx
                    ? "bg-indigo-700 border-indigo-700 text-white shadow-sm font-bold scale-[1.01]"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
                id={`visa-q-tab-${qIdx}`}
              >
                <HelpCircle className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${selectedQuestionIdx === qIdx ? "text-indigo-250" : "text-slate-400"}`} />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider font-mono opacity-85 mb-0.5">
                    {q.category}
                  </span>
                  <span className="line-clamp-2">{q.question}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive simulator controls workspace (Middle/Right) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Simulation Input Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden" id="simulator-interactive-box">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
              
              <div className="border-b border-rose-100 bg-rose-50/70 p-4 rounded-lg flex items-start gap-3 mb-6">
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                <div className="text-xs sm:text-sm text-slate-800">
                  <span className="font-bold text-rose-800">Consular Advice Guard: </span>
                  {currentQuestion.focusTip}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">
                Consular Officer Ask: &quot;<span className="text-indigo-900 font-serif italic">{currentQuestion.question}</span>&quot;
              </h3>

              {errorText && (
                <p className="text-xs font-semibold text-red-650 mb-3 bg-red-50 p-2 rounded border border-red-200/60">
                  {errorText}
                </p>
              )}

              <form onSubmit={handleSubmitAnswer} className="space-y-4">
                <textarea
                  rows={4}
                  placeholder="Type your mock response here just like you would speak it to the immigration officer..."
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  className="w-full text-xs sm:text-sm p-4 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-slate-50 focus:bg-white leading-relaxed Transition-all"
                  id="visa-answer-textarea"
                />

                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  {/* Prefill button */}
                  <button
                    type="button"
                    onClick={handlePreFillSuggested}
                    className="text-xs text-indigo-700 hover:text-indigo-850 font-bold flex items-center gap-1 cursor-pointer"
                    id="prefill-visa-btn"
                  >
                    <span>Pre-fill High-Yield Sample Response</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-700 hover:bg-indigo-850 text-white font-extrabold rounded-lg shadow-xs active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-mono"
                    id="evaluate-visa-btn"
                  >
                    <Sparkles className={`h-4.5 w-4.5 ${isLoading ? "animate-spin text-white" : "text-white"}`} />
                    <span>{isLoading ? "Analyzing..." : "Analyze Answer / Coach Me"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Analysis Results Display panel */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl min-h-[300px] flex flex-col justify-between" id="simulator-feedback-box">
              <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3 mb-4">
                <div className={`w-2.5 h-2.5 rounded-full ${feedbackResult ? "bg-indigo-600 animate-pulse" : "bg-slate-300"}`} />
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500">
                  Embassy Coach Feedback Report
                </span>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[350px]">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-slate-800 animate-spin mb-4" />
                    <p className="font-semibold text-slate-800 text-sm">Reviewing your sponsorship & ties statement...</p>
                    <p className="text-xs text-slate-400 mt-1">Checking for immigration intent and funding discrepancies.</p>
                  </div>
                ) : feedbackResult ? (
                  <div className="text-slate-700 text-sm whitespace-pre-line leading-relaxed pb-2" id="visa-feedback-text">
                    {/* Format evaluation header styles beautifully */}
                    {feedbackResult.split("\n").map((line, fIdx) => {
                      if (line.startsWith("- **Strength Check**") || line.startsWith("**Strength Check**") || line.search("Strength Checks") !== -1) {
                        return (
                          <div key={fIdx} className="flex gap-2 text-emerald-950 bg-emerald-50 border border-emerald-100 p-3 rounded-lg my-3 align-top">
                            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="text-xs sm:text-sm"><strong>Strength check:</strong> {line.replace(/.*Strength.*Check:\s*/gi, "").replace(/\*\*/g, "")}</div>
                          </div>
                        );
                      }
                      if (line.startsWith("- **Risk Factors**") || line.startsWith("**Risk Factors**") || line.search("Risk Factors") !== -1) {
                        return (
                          <div key={fIdx} className="flex gap-2 text-rose-950 bg-rose-50 border border-rose-100 p-3 rounded-lg my-3 align-top">
                            <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                            <div className="text-xs sm:text-sm"><strong>Consular risk factor check:</strong> {line.replace(/.*Risk.*Factor.:\s*/gi, "").replace(/\*\*/g, "")}</div>
                          </div>
                        );
                      }
                      if (line.startsWith("- **Revised Script**") || line.startsWith("**Revised Script**") || line.search("Revised Script") !== -1) {
                        return (
                          <div key={fIdx} className="bg-slate-900 text-slate-100 p-4 rounded-xl my-4 border border-slate-800">
                            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono font-bold uppercase tracking-widest mb-2">
                              <Sparkles className="h-4.5 w-4.5 stroke-[2px]" />
                              <span>SUGGESTED EMBASSY REVISED SCRIPT</span>
                            </div>
                            <p className="text-xs sm:text-sm italic leading-relaxed text-slate-200">
                              {line.replace(/.*Revised.*Script.*:\s*/gi, "").replace(/\*\*/g, "")}
                            </p>
                          </div>
                        );
                      }
                      if (line.startsWith("### ")) {
                        return <h4 key={fIdx} className="text-sm uppercase font-mono tracking-wider text-slate-400 mt-5 mb-1.5">{line.replace("### ", "")}</h4>;
                      }
                      if (line.startsWith("## ") || line.startsWith("**") && line.endsWith("**")) {
                        return <h3 key={fIdx} className="text-sm sm:text-base font-extrabold text-slate-900 mt-6 mb-2 tracking-tight">{line.replace("## ", "").replace(/\*\*/g, "")}</h3>;
                      }
                      if (line.startsWith("- ")) {
                        return (
                          <div key={fIdx} className="flex gap-1.5 text-slate-700 font-medium text-xs sm:text-sm my-1 pl-1">
                            <span className="text-indigo-600">•</span>
                            <span>{line.substring(2)}</span>
                          </div>
                        );
                      }
                      return <p key={fIdx} className="my-2 text-slate-650 text-xs sm:text-sm">{line}</p>;
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
                    <ShieldAlert className="h-10 w-10 text-slate-350 mb-3" />
                    <p className="font-semibold text-slate-700 text-xs sm:text-sm">Practice makes permanent</p>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">
                      Type your answer above to evaluate for common red flags like work intent, excessive confidence, or unclear co-sponsorship.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
