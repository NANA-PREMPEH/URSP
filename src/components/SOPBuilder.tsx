import React, { useState } from "react";
import { Sparkles, Copy, FileText, CheckCircle, ChevronRight, HelpCircle } from "lucide-react";

export default function SOPBuilder() {
  const [targetDegree, setTargetDegree] = useState<string>("Masters");
  const [targetMajor, setTargetMajor] = useState<string>("");
  const [academicBackground, setAcademicBackground] = useState<string>("");
  const [motivation, setMotivation] = useState<string>("");
  const [keyAchievements, setKeyAchievements] = useState<string>("");
  const [careerGoals, setCareerGoals] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sopResult, setSopResult] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [errorWord, setErrorWord] = useState<string>("");

  const handlePreFillSample = () => {
    setTargetMajor("MSc in Renewable Energy Systems Engineering");
    setAcademicBackground("BSc in Electrical Engineering, University of Cape Coast, Ghana. GPA: 3.65/4.0.");
    setMotivation("Deep passion for addressing solar grid intermittency in suburban West Africa, ensuring rural hospitals have uninterrupted healthcare electricity.");
    setKeyAchievements("Led a senior project co-developing an affordable 2kW smart inverter unit. Served as President of UCC Local Students Union.");
    setCareerGoals("Return to Ghana as a principal investigator at the Accra Renewable Commission to develop utility-scale municipal solar networks.");
  };

  const handleAssembleSOP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMajor || !academicBackground) {
      setErrorWord("Please fill in at least your target major and academic background to start outline tailoring.");
      return;
    }
    setErrorWord("");
    setIsLoading(true);
    setSopResult("");

    try {
      const response = await fetch("/api/sop/polish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetDegree,
          targetMajor,
          academicBackground,
          motivation,
          keyAchievements,
          careerGoals,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Admissions server failed to reply properly. Check if the OpenRouter service is operational.");
      }

      setSopResult(data.text || "No structured draft assembled.");
    } catch (err: any) {
      setSopResult(
        `### Outline Assembly Interrupted\n\n${err.message || "An unexpected error occurred."}\n\n**Setup fix:** Add \`OPENROUTER_API_KEY\` to \`.env.local\`. If you still have \`GEMINI_API_KEY\`, replace it and restart \`npm run dev\`.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!sopResult) return;
    navigator.clipboard.writeText(sopResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="sop-architect-workspace">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Intro Section */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-120 text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded mb-4">
            <FileText className="h-3.5 w-3.5 text-indigo-600" />
            <span>Academic Branding Academy</span>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Statement of Purpose (SOP) Architect
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto">
            A strong SOP is not a copy of your exam certificates. It is an honest, compelling narrative. Insert your history to synthesize a highly customized SOP outline rooted in the Ubuntu philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form input controls (Left) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-extrabold text-slate-900 tracking-tight text-md">Profile Coordinates</h3>
              <button
                type="button"
                onClick={handlePreFillSample}
                className="text-[11px] font-mono text-indigo-700 hover:text-indigo-850 font-bold border border-indigo-200 bg-indigo-50/40 px-2 py-1 rounded-md transition-colors cursor-pointer"
                id="prefill-sample-btn"
              >
                Pre-Fill Demo Data
              </button>
            </div>

            {errorWord && (
              <p className="text-xs font-semibold text-red-600 mb-4 bg-red-50 p-2.5 rounded border border-red-200/50">
                {errorWord}
              </p>
            )}

            <form onSubmit={handleAssembleSOP} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Target Degree track
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Bachelors", "Masters", "PhD"].map((degOpt) => (
                    <button
                      key={degOpt}
                      type="button"
                      onClick={() => setTargetDegree(degOpt)}
                      className={`py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                        targetDegree === degOpt
                          ? "bg-indigo-700 border-indigo-700 text-white font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {degOpt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Target Major & Degree Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. MSc in Higher Education Administration"
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
                  id="sop-major-input"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Academic Milestones (GPA, School, Honors)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. BSc in Educational Leadership, University of Cape Coast, Ghana. GPA: 3.7/4.0."
                  value={academicBackground}
                  onChange={(e) => setAcademicBackground(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
                  id="sop-bg-input"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Coaching Interest & Motivation (Why this major?)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Passionate about reforming student advising structures across public universities."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
                  id="sop-motivation-input"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Key Achievements & Leadership Experience
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Led high-impact peer advisory programs at university, managed department webinars, created student welfare fund."
                  value={keyAchievements}
                  onChange={(e) => setKeyAchievements(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
                  id="sop-achievements-input"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Career Aspirations & Return Vision
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Return to Ghana to serve as Director of Guidance Counseling at public higher education commissions."
                  value={careerGoals}
                  onChange={(e) => setCareerGoals(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
                  id="sop-goals-input"
                />
              </div>

              <button
                type="submit"
                id="sop-assemble-btn"
                disabled={isLoading}
                className="w-full py-3 bg-indigo-700 hover:bg-indigo-850 text-white font-extrabold rounded-lg shadow-sm active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className={`h-4 w-4 ${isLoading ? "animate-spin text-white" : "text-white"}`} />
                <span>{isLoading ? "Assembling SOP Outline..." : "Draft Custom SOP Outline"}</span>
              </button>
            </form>
          </div>

          {/* SOP Output Window (Right) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs min-h-[500px] flex flex-col justify-between" id="sop-output-window">
            
            {/* Header toolbar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
                  AI Architecture Sandbox
                </span>
              </div>
              {sopResult && (
                <button
                  onClick={handleCopyText}
                  id="copy-sop-btn"
                  className="text-xs font-bold text-slate-700 hover:text-indigo-800 transition-colors flex items-center gap-1 border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-md cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Outline</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Main response displaying field */}
            <div className="flex-1 overflow-y-auto max-h-[550px] pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="relative mb-6">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-indigo-600 animate-pulse" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Weaving Ubuntu values into your record...</h4>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Our AI advisor is structuring your academic branding profile to emphasize leadership, research drive, and global change.
                  </p>
                </div>
              ) : sopResult ? (
                <div className="text-slate-705 text-sm whitespace-pre-line leading-relaxed pb-4" id="sop-result-text">
                  {/* Process Markdown-like headers to look beautiful */}
                  {sopResult.split("\n").map((line, lIdx) => {
                    if (line.startsWith("### ")) {
                      return <h4 key={lIdx} className="text-sm font-extrabold text-indigo-900 mt-6 mb-2 tracking-tight">{line.replace("### ", "")}</h4>;
                    }
                    if (line.startsWith("## ") || line.startsWith("**")) {
                      return <h3 key={lIdx} className="text-xs sm:text-sm font-extrabold text-slate-950 mt-8 mb-3 tracking-tight border-b border-indigo-500/10 pb-1">{line.replace("## ", "").replace(/\*\*/g, "")}</h3>;
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <div key={lIdx} className="flex gap-2 text-xs sm:text-sm text-slate-700 my-1.5 align-top pl-2">
                          <span className="text-indigo-600 mt-0.5">•</span>
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }
                    return <p key={lIdx} className="my-2.5 text-slate-650 text-xs sm:text-sm">{line}</p>;
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 text-slate-400">
                  <FileText className="h-12 w-12 text-slate-200 mb-4" />
                  <p className="font-semibold text-slate-700">Generate Your Outline Structure</p>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Fill out the form details on the left, or use the sample demo pre-fill to see how our AI mentor dynamically aligns your resume to funded application metrics.
                  </p>
                </div>
              )}
            </div>

            {/* Foot note warning warning */}
            <div className="border-t border-slate-100 pt-4 mt-4 text-[11px] text-slate-500/95 leading-relaxed flex items-start gap-2">
              <span className="bg-amber-50 text-amber-900 border border-amber-200/50 font-mono font-bold px-1.5 py-0.5 rounded shrink-0">CRITICAL SAFETY:</span>
              <span>
                Statement of Purpose outlines should be used strictly as a structural guide. Under no circumstances should you copy-paste AI responses directly. Your Statement of Purpose must contain your unique authentic voice. Plagiarism will result in immediate disqualification by graduate admissions panels.
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
